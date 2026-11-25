/*
 * Bakyson service worker
 *
 * Strategy:
 *  - Precache the public pages and the assets they reference at install time.
 *  - Navigations: network first, falling back to the cached page, then /offline.
 *  - Hashed build assets and icons: cache first (they never change in place).
 *  - Other same-origin GETs: stale-while-revalidate.
 *
 * Bump CACHE_VERSION whenever the caching logic or precache list changes.
 */
const CACHE_VERSION = "2026-11-25.1";
const CACHE_PREFIX = "bakyson-";
const STATIC_CACHE = `${CACHE_PREFIX}static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}pages-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";
const NAVIGATION_TIMEOUT_MS = 4000;

const PRECACHE_PAGES = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/case-studies",
  "/blog",
  "/careers",
  "/contact",
  "/quote",
  "/support",
  OFFLINE_URL,
];

const PRECACHE_ASSETS = [
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
];

const ASSET_EXTENSIONS = /\.(?:css|js|mjs|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf)$/i;
const MEDIA_EXTENSIONS = /\.(?:mp4|webm|ogg|mp3|wav|m4a)$/i;

const toUrl = (path) => new URL(path, self.location.origin).href;

function pageKey(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return toUrl(normalized || "/");
}

function isCacheable(response) {
  if (!response || !response.ok || response.type !== "basic") {
    return false;
  }

  const cacheControl = response.headers.get("cache-control") || "";
  return !cacheControl.includes("no-store") && !cacheControl.includes("private");
}

function extractHtmlAssets(html) {
  const urls = new Set();
  const attributePattern = /(?:src|href|poster)="([^"]+)"/g;
  let match;

  while ((match = attributePattern.exec(html)) !== null) {
    const value = match[1].replace(/&amp;/g, "&");

    if (!value.startsWith("/") || value.startsWith("//")) {
      continue;
    }

    const pathname = value.split("?")[0];
    const isBuildAsset = pathname.startsWith("/_next/static/");
    const isIcon = pathname.startsWith("/icons/");
    const isImage = /\.(?:png|jpe?g|gif|svg|webp|avif|ico)$/i.test(pathname);

    if (isBuildAsset || isIcon || isImage) {
      urls.add(value);
    }
  }

  return [...urls];
}

function extractCssAssets(css) {
  const urls = new Set();
  const urlPattern = /url\(\s*(['"]?)(\/_next\/static\/[^)'"]+)\1\s*\)/g;
  let match;

  while ((match = urlPattern.exec(css)) !== null) {
    urls.add(match[2]);
  }

  return [...urls];
}

async function fetchAndCache(cache, path, options = {}) {
  const url = toUrl(path);
  const existing = await cache.match(url);

  if (existing && !options.refresh) {
    return existing;
  }

  const response = await fetch(new Request(url, { cache: "reload" }));

  if (!isCacheable(response)) {
    return null;
  }

  await cache.put(url, response.clone());

  if (path.endsWith(".css")) {
    const css = await response.clone().text();
    await Promise.allSettled(
      extractCssAssets(css).map((asset) => fetchAndCache(cache, asset))
    );
  }

  return response;
}

async function precachePage(pageCache, staticCache, path) {
  const url = toUrl(path);
  const response = await fetch(new Request(url, { cache: "reload" }));

  if (!isCacheable(response)) {
    throw new Error(`Unable to precache ${path}`);
  }

  await pageCache.put(url, response.clone());

  const html = await response.text();
  await Promise.allSettled(
    extractHtmlAssets(html).map((asset) => fetchAndCache(staticCache, asset))
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const [pageCache, staticCache] = await Promise.all([
        caches.open(PAGE_CACHE),
        caches.open(STATIC_CACHE),
      ]);

      await Promise.allSettled(
        PRECACHE_ASSETS.map((asset) => fetchAndCache(staticCache, asset))
      );

      // Cache each page independently: one failure should not block the install.
      await Promise.allSettled(
        PRECACHE_PAGES.map((page) => precachePage(pageCache, staticCache, page))
      );
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const currentCaches = new Set([STATIC_CACHE, PAGE_CACHE]);
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith(CACHE_PREFIX) && !currentCaches.has(name))
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

async function networkFirst(request, pageCachePromise) {
  const pageCache = await pageCachePromise;
  const url = new URL(request.url);
  const cacheKey = pageKey(url.pathname);
  const cached = await pageCache.match(cacheKey);

  if (!cached) {
    return fetch(request);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), NAVIGATION_TIMEOUT_MS);

  try {
    const response = await fetch(request, { signal: controller.signal });

    if (isCacheable(response) && (response.headers.get("content-type") || "").includes("text/html")) {
      await pageCache.put(cacheKey, response.clone());
    }

    return response.ok ? response : cached;
  } catch {
    return cached;
  } finally {
    clearTimeout(timeout);
  }
}

async function cacheFirst(request, cache) {
  const cached = await cache.match(request, { ignoreSearch: true });

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (isCacheable(response)) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return new Response("", { status: 504, statusText: "Offline" });
  }
}

async function staleWhileRevalidate(event, cache) {
  const { request } = event;
  const cached = await cache.match(request, { ignoreSearch: true });

  const network = fetch(request)
    .then(async (response) => {
      if (isCacheable(response)) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Refresh in the background; the caller gets the cached copy immediately.
    event.waitUntil(network);
    return cached;
  }

  const response = await network;
  if (response) {
    return response;
  }

  return new Response("", { status: 504, statusText: "Offline" });
}

async function offlineResponse() {
  const pageCache = await caches.open(PAGE_CACHE);
  const cachedOfflinePage = await pageCache.match(toUrl(OFFLINE_URL));

  if (cachedOfflinePage) {
    return cachedOfflinePage;
  }

  return new Response(
    "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Offline | Bakyson</title></head><body style=\"font-family: system-ui, sans-serif; margin: 0; display: grid; min-height: 100vh; place-items: center; text-align: center; padding: 2rem;\"><div><h1>You are offline</h1><p>Reconnect to continue browsing Bakyson.</p><a href=\"/\">Try again</a></div></body></html>",
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  // Never intercept API calls, authenticated portal pages, HMR, media streams,
  // or Next.js router data (its response depends on request headers).
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname === "/portal" ||
    url.pathname.startsWith("/portal/") ||
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.startsWith("/_next/data/") ||
    MEDIA_EXTENSIONS.test(url.pathname) ||
    request.headers.has("range") ||
    request.headers.has("RSC") ||
    request.headers.has("Next-Router-State-Tree")
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      networkFirst(request, caches.open(PAGE_CACHE)).catch(() => offlineResponse())
    );
    return;
  }

  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/favicon.ico" ||
    ASSET_EXTENSIONS.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(caches.open(STATIC_CACHE).then((cache) => cacheFirst(request, cache)));
    return;
  }

  event.respondWith(caches.open(STATIC_CACHE).then((cache) => staleWhileRevalidate(event, cache)));
});
