import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the hosted timer matches the app source", async () => {
  const [appSource, hostedSource] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../public/cindy.html", import.meta.url), "utf8"),
  ]);

  assert.equal(hostedSource, appSource);
});
