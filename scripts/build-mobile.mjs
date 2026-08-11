import { build } from "esbuild";
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "mobile-dist");
const sourceHtml = resolve(projectRoot, "index.html");
const bridgeMarker = "    <script>\n      (() => {";

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

let html = await readFile(sourceHtml, "utf8");
if (!html.includes(bridgeMarker)) {
  throw new Error("Could not find the Round 27 application script marker");
}

html = html
  .replace(
    bridgeMarker,
    `    <script src="./native-bridge.js"></script>\n${bridgeMarker}`,
  )
  .replaceAll('"/story-bg.png"', '"./story-bg.png"');

await writeFile(resolve(outputRoot, "index.html"), html, "utf8");
await copyFile(
  resolve(projectRoot, "public", "story-bg.png"),
  resolve(outputRoot, "story-bg.png"),
);
await copyFile(
  resolve(projectRoot, "public", "favicon.svg"),
  resolve(outputRoot, "favicon.svg"),
);

await build({
  entryPoints: [resolve(projectRoot, "mobile", "native-bridge.ts")],
  outfile: resolve(outputRoot, "native-bridge.js"),
  bundle: true,
  minify: true,
  format: "iife",
  platform: "browser",
  target: ["chrome120"],
  legalComments: "none",
});

console.log("Round 27 mobile web bundle is ready.");
