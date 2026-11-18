import * as Sentry from "@sentry/nextjs";

const SentryEdgeConfig = {
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
  environment: process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.RAILWAY_GIT_COMMIT_SHA || undefined,
};

export default SentryEdgeConfig;
