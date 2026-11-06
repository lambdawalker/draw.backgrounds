import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { render } from "../src/index.js";

const fixtures = [
  ["us", "texas"],
  ["mx", "jalisco"],
  ["ca", "quebec"],
];
const hash = (data) => createHash("sha256").update(data).digest("hex");

for (const [country, jurisdiction] of fixtures) {
  test(`reviewed gallery baseline: ${country}/${jurisdiction}`, async () => {
    const folder = new URL(`../previews/${country}/`, import.meta.url);
    const { seed, width, height, items } = JSON.parse(
      await readFile(new URL("manifest.json", folder), "utf8"),
    );
    const { files } = items.find((item) => item.jurisdiction === jurisdiction);
    assert.equal(files.length, 2);
    for (const { filename, sha256 } of files) {
      assert.equal(hash(await readFile(new URL(filename, folder))), sha256);
    }
    const baseline = files.find(({ filename }) => filename.endsWith(".svg"));
    assert.equal(
      hash(render(jurisdiction, { country, seed, width, height })),
      baseline.sha256,
    );
  });
}
