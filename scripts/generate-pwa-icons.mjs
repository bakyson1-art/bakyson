/**
 * Generates the PWA/app icon set from a single vector source.
 *
 * Run with: npm run icons
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const iconsDir = path.join(root, "public", "icons");
const appDir = path.join(root, "src", "app");

const MARK = `
  <g fill="#ffffff">
    <rect x="150" y="120" width="60" height="272" rx="30" />
    <path fill-rule="evenodd" d="
      M180 120 H300
      A70 70 0 0 1 300 260
      H180 Z
      M238 168 H292
      A22 22 0 0 1 292 212
      H238 Z" />
    <path fill-rule="evenodd" d="
      M180 260 H312
      A66 66 0 0 1 312 392
      H180 Z
      M238 306 H300
      A30 30 0 0 1 300 366
      H238 Z" />
  </g>
`;

function iconSvg({ rounded = true, padding = 0 } = {}) {
  const scale = 1 - padding * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF8A2B" />
      <stop offset="1" stop-color="#E85D00" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" ${rounded ? 'rx="112"' : ""} fill="url(#bg)" />
  <g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
    ${MARK}
  </g>
</svg>`;
}

const roundedSvg = Buffer.from(iconSvg());
const maskableSvg = Buffer.from(iconSvg({ rounded: false, padding: 0.12 }));

await mkdir(iconsDir, { recursive: true });

// Installable icons are full-bleed; the platform applies its own mask.
await Promise.all([
  sharp(maskableSvg).resize(192, 192).png().toFile(path.join(iconsDir, "icon-192.png")),
  sharp(maskableSvg).resize(512, 512).png().toFile(path.join(iconsDir, "icon-512.png")),
  sharp(maskableSvg).resize(512, 512).png().toFile(path.join(iconsDir, "maskable-512.png")),
  sharp(maskableSvg).resize(180, 180).png().toFile(path.join(iconsDir, "apple-touch-icon.png")),
]);

// Browser tab icon: SVG for modern browsers...
await writeFile(path.join(appDir, "icon.svg"), iconSvg());

// ...and a multi-resolution ICO fallback for older ones.
const icoSizes = [16, 32, 48, 64, 128, 256];
const icoPngs = await Promise.all(
  icoSizes.map((size) => sharp(roundedSvg).resize(size, size).png().toBuffer())
);

const headerSize = 6 + icoSizes.length * 16;
let offset = headerSize;
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoSizes.length, 4); // image count

icoSizes.forEach((size, index) => {
  const entry = 6 + index * 16;
  header.writeUInt8(size >= 256 ? 0 : size, entry); // width (0 means 256)
  header.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
  header.writeUInt8(0, entry + 2); // palette size
  header.writeUInt8(0, entry + 3); // reserved
  header.writeUInt16LE(1, entry + 4); // color planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(icoPngs[index].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += icoPngs[index].length;
});

await writeFile(
  path.join(appDir, "favicon.ico"),
  Buffer.concat([header, ...icoPngs])
);

console.log("PWA icons generated in public/icons and src/app.");
