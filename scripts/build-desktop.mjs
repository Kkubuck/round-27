import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "desktop-dist");
const resourceRoot = resolve(projectRoot, "desktop-resources");

const iconSvg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <rect width="1024" height="1024" rx="224" fill="#050505"/>
    <g fill="none" stroke="#ffffff" stroke-width="92" stroke-linecap="round" stroke-linejoin="round">
      <path d="M210 350 C210 235 300 185 402 200 C500 214 535 285 510 356 C485 426 394 472 220 700 L520 700"/>
      <path d="M585 218 H832 L648 724"/>
    </g>
  </svg>
`);

await rm(outputRoot, { recursive: true, force: true });
await rm(resourceRoot, { recursive: true, force: true });
await Promise.all([
  mkdir(outputRoot, { recursive: true }),
  mkdir(resourceRoot, { recursive: true }),
]);

const desktopHtml = await readFile(resolve(projectRoot, "index.html"), "utf8");

await Promise.all([
  writeFile(resolve(outputRoot, "index.html"), desktopHtml, "utf8"),
  copyFile(resolve(projectRoot, "public", "favicon.svg"), resolve(outputRoot, "favicon.svg")),
  cp(resolve(projectRoot, "public", "backgrounds"), resolve(outputRoot, "backgrounds"), { recursive: true }),
  sharp(iconSvg).resize(1024, 1024).png().toFile(resolve(resourceRoot, "icon.png")),
]);

console.log("Round 27 desktop bundle is ready.");
