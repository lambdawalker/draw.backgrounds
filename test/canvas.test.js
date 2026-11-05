import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { jurisdictionsByCountry, render } from "../src/index.js";
import { renderCanvas } from "../src/canvas.js";

test("Canvas covers every jurisdiction and closely matches the SVG raster", async () => {
  for (const [country, jurisdictions] of Object.entries(
    jurisdictionsByCountry,
  )) {
    const options = { country, width: 420, height: 264, seed: 42 };
    for (const jurisdiction of jurisdictions) {
      const svg = await sharp(Buffer.from(render(jurisdiction, options)))
        .ensureAlpha()
        .raw()
        .toBuffer();
      const canvas = renderCanvas(jurisdiction, options);
      assert.equal(canvas.width, options.width);
      assert.equal(canvas.height, options.height);
      const pixels = canvas.data();
      assert.equal(pixels.length, svg.length);
      let delta = 0;
      for (let i = 0; i < pixels.length; i++)
        delta += Math.abs(svg[i] - pixels[i]);
      assert.ok(
        delta / pixels.length < 4,
        `${country}/${jurisdiction}: mean RGBA delta ${delta / pixels.length}`,
      );
    }
  }
});

test("Canvas honors seeds, dimensions, and US input validation", () => {
  const options = { width: 251, height: 137, seed: 1 };
  const first = renderCanvas("wyoming", options).data();
  assert.deepEqual(first, renderCanvas("wyoming", options).data());
  assert.notDeepEqual(
    first,
    renderCanvas("wyoming", { ...options, seed: 2 }).data(),
  );
  assert.throws(() => renderCanvas("__proto__"), /Unknown state/);
  assert.throws(() => renderCanvas("utah", { seed: -1 }), /seed/);
  assert.throws(() => renderCanvas("utah", { width: 0 }), /dimensions/);
  assert.throws(
    () => renderCanvas("utah", { country: "ca" }),
    /Unknown jurisdiction/,
  );
  assert.throws(
    () => renderCanvas("utah", { country: "invalid" }),
    /Unknown country/,
  );
});
