import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("desktop bundle is complete and offline", async () => {
  const [html, preload, main, ...assets] = await Promise.all([
    readFile(projectFile("desktop-dist/index.html"), "utf8"),
    readFile(projectFile("desktop/preload.mjs"), "utf8"),
    readFile(projectFile("desktop/main.mjs"), "utf8"),
    stat(projectFile("desktop-dist/backgrounds/dawn-box.webp")),
    stat(projectFile("desktop-dist/backgrounds/arena-light.webp")),
    stat(projectFile("desktop-dist/backgrounds/concrete-room.webp")),
    stat(projectFile("desktop-dist/backgrounds/chalk-air.webp")),
    stat(projectFile("desktop-dist/backgrounds/rainy-warehouse.webp")),
    stat(projectFile("desktop-resources/icon.png")),
  ]);

  assert.match(html, /27 ROUND CHALLENGE/);
  assert.match(html, /\.\/backgrounds\/dawn-box\.webp/);
  assert.equal((html.match(/class="background-choice"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /https?:\/\//i);
  assert.match(preload, /platform: "windows"/);
  assert.match(main, /contextIsolation: true/);
  assert.match(main, /nodeIntegration: false/);
  assets.slice(0, 5).forEach((background) => assert.ok(background.size > 50_000));
  assert.ok(assets.at(-1).size > 1_000);
});
