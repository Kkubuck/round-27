import { mkdir, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resourceRoot = resolve(projectRoot, "android", "app", "src", "main", "res");

const iconSvg = (transparent = false) => Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    ${transparent ? "" : '<rect width="1024" height="1024" rx="224" fill="#050505"/>'}
    <g fill="none" stroke="#ffffff" stroke-width="92" stroke-linecap="round" stroke-linejoin="round">
      <path d="M210 350 C210 235 300 185 402 200 C500 214 535 285 510 356 C485 426 394 472 220 700 L520 700"/>
      <path d="M585 218 H832 L648 724"/>
    </g>
  </svg>
`);

const legacySizes = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

const foregroundSizes = {
  mdpi: 108,
  hdpi: 162,
  xhdpi: 216,
  xxhdpi: 324,
  xxxhdpi: 432,
};

for (const [density, size] of Object.entries(legacySizes)) {
  const directory = resolve(resourceRoot, `mipmap-${density}`);
  await mkdir(directory, { recursive: true });
  const icon = await sharp(iconSvg()).resize(size, size).png().toBuffer();
  await sharp(icon).toFile(resolve(directory, "ic_launcher.png"));
  await sharp(icon).toFile(resolve(directory, "ic_launcher_round.png"));
}

for (const [density, size] of Object.entries(foregroundSizes)) {
  const directory = resolve(resourceRoot, `mipmap-${density}`);
  await mkdir(directory, { recursive: true });
  await sharp(iconSvg(true)).resize(size, size).png().toFile(
    resolve(directory, "ic_launcher_foreground.png"),
  );
}

const splashDirectories = (await readdir(resourceRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("drawable"))
  .map((entry) => resolve(resourceRoot, entry.name));

for (const directory of splashDirectories) {
  const splashPath = resolve(directory, "splash.png");
  try {
    const metadata = await sharp(splashPath).metadata();
    const width = metadata.width ?? 2732;
    const height = metadata.height ?? 2732;
    const markSize = Math.round(Math.min(width, height) * 0.32);
    const mark = await sharp(iconSvg(true)).resize(markSize, markSize).png().toBuffer();
    await sharp({
      create: { width, height, channels: 4, background: "#050505" },
    })
      .composite([{ input: mark, gravity: "center" }])
      .png()
      .toFile(splashPath);
  } catch {
    // Some generated drawable folders do not contain a splash bitmap.
  }
}

console.log("Round 27 Android icons and splash screens are ready.");
