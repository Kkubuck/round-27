import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("mobile bundle is complete and fully offline", async () => {
  const [html, bridge, ...backgrounds] = await Promise.all([
    readFile(projectFile("mobile-dist/index.html"), "utf8"),
    readFile(projectFile("mobile-dist/native-bridge.js"), "utf8"),
    stat(projectFile("mobile-dist/backgrounds/dawn-box.webp")),
    stat(projectFile("mobile-dist/backgrounds/arena-light.webp")),
    stat(projectFile("mobile-dist/backgrounds/concrete-room.webp")),
    stat(projectFile("mobile-dist/backgrounds/chalk-air.webp")),
    stat(projectFile("mobile-dist/backgrounds/rainy-warehouse.webp")),
  ]);

  assert.match(html, /<title>ROUND 27 — AMRAP TIMER<\/title>/);
  assert.match(html, /src="\.\/native-bridge\.js"/);
  assert.match(html, /27 ROUND CHALLENGE/);
  assert.match(html, /\.\/backgrounds\/dawn-box\.webp/);
  assert.equal((html.match(/class="background-choice"/g) ?? []).length, 5);
  assert.ok(bridge.length > 1_000);
  backgrounds.forEach((background) => assert.ok(background.size > 50_000));
  assert.doesNotMatch(html, /https?:\/\//i);
});

test("Capacitor has copied the bundle into the Android project", async () => {
  const nativeRoot = projectFile("android/app/src/main/assets/public/");
  await Promise.all([
    access(new URL("index.html", nativeRoot)),
    access(new URL("native-bridge.js", nativeRoot)),
    access(new URL("backgrounds/dawn-box.webp", nativeRoot)),
    access(new URL("backgrounds/rainy-warehouse.webp", nativeRoot)),
  ]);

  const config = await readFile(
    projectFile("android/app/src/main/assets/capacitor.config.json"),
    "utf8",
  );
  assert.match(config, /app\.jisanglee\.round27/);
  assert.match(config, /Round 27/);
});
