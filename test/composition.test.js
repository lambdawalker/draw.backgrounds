import assert from "node:assert/strict";
import test from "node:test";
import { createComposition, renderComposition } from "../src/public.js";
import { renderCompositionCanvas } from "../src/canvas.js";
import { related } from "@lambdawalker/draw-backgrounds/color";

const options = {
  seed: 2081,
  width: 420,
  height: 264,
  photoIdBoundingBox: { x: 0.06, y: 0.24, width: 0.28, height: 0.6 },
  colorScheme: {
    paper: "#F4F0E7",
    primary: "#386A73",
    secondary: "#718A67",
    accent: "#B67B57",
  },
};

test("one composition survives JSON and replays in SVG and Canvas", () => {
  const recipe = createComposition(options);
  const saved = JSON.parse(JSON.stringify(recipe));
  assert.deepEqual(recipe, createComposition(options));
  assert.match(renderComposition(saved), /^<svg /);
  assert.equal(renderComposition(recipe), renderComposition(saved));
  const canvas = renderCompositionCanvas(saved);
  assert.equal(canvas.width, 420);
  assert.equal(canvas.height, 264);
  assert.deepEqual(canvas.data(), renderCompositionCanvas(recipe).data());
});

test("seeds vary motif types and layout while accents stay outside the photo", () => {
  const kinds = new Set();
  const centers = new Set();
  for (const photo of [
    options.photoIdBoundingBox,
    { x: 0.65, y: 0.15, width: 0.3, height: 0.7 },
    { x: 0.2, y: 0.22, width: 0.6, height: 0.56 },
  ]) {
    for (let seed = 0; seed < 32; seed++) {
      const { accents } = createComposition({
        ...options,
        seed,
        photoIdBoundingBox: photo,
      });
      for (const { kind, bounds: b } of accents) {
        kinds.add(kind);
        centers.add(b.x);
        assert.ok(
          b.x + b.width <= photo.x ||
            b.x >= photo.x + photo.width ||
            b.y + b.height <= photo.y ||
            b.y >= photo.y + photo.height,
        );
      }
    }
  }
  assert.equal(kinds.size, 3);
  assert.ok(centers.size > 10);
  const full = createComposition({
    ...options,
    photoIdBoundingBox: { x: 0, y: 0, width: 1, height: 1 },
  });
  assert.deepEqual(full.accents, []);
});

test("reject invalid bounds, colors and untrusted replay input", () => {
  assert.throws(
    () =>
      createComposition({
        ...options,
        photoIdBoundingBox: { x: 0.8, y: 0, width: 0.3, height: 1 },
      }),
    /photoIdBoundingBox/,
  );
  const recipe = createComposition(options);
  assert.throws(() => renderComposition({ ...recipe, version: 2 }), /version/);
  assert.throws(
    () => renderComposition({ ...recipe, paper: '" onload="x' }),
    /color/,
  );
});

test("shared color helper preserves the editor's CSS format and sampling order", () => {
  const ranges = [];
  const color = related(
    "#386A73",
    {
      range(a, b) {
        ranges.push([a, b]);
        return 0;
      },
    },
    0.4,
  );
  assert.deepEqual(ranges, [
    [-25, 25],
    [-24, 12],
  ]);
  assert.equal(color, "rgba(56,106,115,0.4)");
});

test("both backends keep focal ink out of the photo area", async () => {
  const { default: sharp } = await import("sharp");
  const svgPixels = (recipe) =>
    sharp(Buffer.from(renderComposition(recipe)))
      .ensureAlpha()
      .raw()
      .toBuffer();
  const canvasPixels = (recipe) => renderCompositionCanvas(recipe).data();
  const photo = options.photoIdBoundingBox;
  const checked = new Set();
  for (let seed = 0; seed < 30 && checked.size < 3; seed++) {
    const recipe = createComposition({ ...options, seed });
    const accent = recipe.accents[0];
    if (!accent || checked.has(accent.kind)) continue;
    checked.add(accent.kind);
    const withAccent = { ...recipe, accents: [accent] };
    const base = { ...recipe, accents: [] };
    for (const pixels of [svgPixels, canvasPixels]) {
      const rendered = await pixels(withAccent);
      const background = await pixels(base);
      assert.notDeepEqual(rendered, background);
      const left = Math.ceil(photo.x * recipe.width);
      const right = Math.floor((photo.x + photo.width) * recipe.width);
      const top = Math.ceil(photo.y * recipe.height);
      const bottom = Math.floor((photo.y + photo.height) * recipe.height);
      for (let y = top; y < bottom; y++) {
        const start = (y * recipe.width + left) * 4;
        const end = (y * recipe.width + right) * 4;
        assert.deepEqual(
          rendered.subarray(start, end),
          background.subarray(start, end),
        );
      }
    }
  }
  assert.equal(checked.size, 3);
});
