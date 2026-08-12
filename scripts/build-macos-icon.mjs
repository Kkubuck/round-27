import { spawnSync } from "node:child_process";
import { mkdir, rm, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

if (process.platform !== "darwin") {
  throw new Error("The macOS icon must be built on macOS with iconutil");
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resourceRoot = resolve(projectRoot, "desktop-resources");
const sourceIcon = resolve(resourceRoot, "icon.png");
const iconsetRoot = resolve(resourceRoot, "icon.iconset");
const outputIcon = resolve(resourceRoot, "icon.icns");
const icons = [
  ["icon_16x16.png", 16],
  ["icon_16x16@2x.png", 32],
  ["icon_32x32.png", 32],
  ["icon_32x32@2x.png", 64],
  ["icon_128x128.png", 128],
  ["icon_128x128@2x.png", 256],
  ["icon_256x256.png", 256],
  ["icon_256x256@2x.png", 512],
  ["icon_512x512.png", 512],
  ["icon_512x512@2x.png", 1024],
];

await rm(iconsetRoot, { recursive: true, force: true });
await rm(outputIcon, { force: true });
await mkdir(iconsetRoot, { recursive: true });
await Promise.all(icons.map(([name, size]) => (
  sharp(sourceIcon).resize(size, size).png().toFile(resolve(iconsetRoot, name))
)));

const result = spawnSync("iconutil", ["-c", "icns", iconsetRoot, "-o", outputIcon], {
  stdio: "inherit",
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = await stat(outputIcon);
if (output.size < 10_000) throw new Error("Generated macOS icon is unexpectedly small");
await rm(iconsetRoot, { recursive: true, force: true });
console.log("Round 27 macOS icon is ready.");
