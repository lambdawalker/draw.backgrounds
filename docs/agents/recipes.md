# Recipes and runnable examples

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.
<!-- publication-status:end -->

All repository commands below run from the checkout root after `npm ci` on Node.js 22+. Use a new output directory to avoid overwriting previous results.

## Plan a background around a photo

The SVG and Node Canvas renderers replay the same recipe. The example writes SVG, PNG and recipe JSON. Run `node examples/render-composition.mjs /tmp/draw-composition`.

```js
import { createComposition, renderComposition } from '@lambdawalker/draw-backgrounds';
import { renderCompositionCanvas } from '@lambdawalker/draw-backgrounds/canvas';

const recipe = createComposition({
  seed: 2081,
  width: 700,
  height: 440,
  photoIdBoundingBox: { x: 0.06, y: 0.24, width: 0.28, height: 0.6 },
  colorScheme: {
    paper: '#F4F0E7', primary: '#386A73',
    secondary: '#718A67', accent: '#B67B57',
  },
});
const svg = renderComposition(recipe);
const canvas = renderCompositionCanvas(recipe);
```

## SVG and Canvas demonstrations

| Example | Run | Expected result |
| --- | --- | --- |
| [SVG source](../../examples/render-svg.mjs) | `node examples/render-svg.mjs /tmp/draw-svg` | Three 700 × 440 SVGs and a metadata manifest |
| [Canvas source](../../examples/render-canvas.mjs) | `node examples/render-canvas.mjs /tmp/draw-canvas` | Three 700 × 440 PNGs and a metadata manifest |

Both cover `us/texas`, `mx/jalisco`, `ca/quebec` with seed 42. Run twice and compare hashes within the same runtime. Change a seed to see procedural variation; change country without changing the slug to exercise validation. Canvas load failures usually indicate missing optional native dependencies; use the SVG example while resolving platform support.

## Encode a PNG

Complete ESM consumer script, after installing a reviewed API-compatible source snapshot:

```js
import { writeFile } from 'node:fs/promises';
import { renderCanvas } from '@lambdawalker/draw-backgrounds/canvas';

const canvas = renderCanvas('quebec', {
  country: 'ca', seed: 42, width: 700, height: 440,
});
await writeFile('quebec.png', await canvas.encode('png'));
```

The canvas remains in scope until encoding finishes. For raw pixels, copy `Buffer.from(canvas.data())` if the consumer outlives the surface. PNG bytes and raw RGBA are different formats.

## Enumerate all designs

This fragment uses the root package catalog; process results sequentially or with bounded concurrency:

```js
import { countries, jurisdictionsByCountry, render } from '@lambdawalker/draw-backgrounds';

for (const country of countries) {
  for (const jurisdiction of jurisdictionsByCountry[country]) {
    const svg = render(jurisdiction, { country, seed: 42 });
    console.log(country, jurisdiction, svg.length);
  }
}
```

## Repository batch CLI

The CLI is source-checkout tooling, not a published package binary. Sharp is a development dependency for CLI PNG rasterization; CLI PNG does not use the Canvas renderer.

```sh
npm run generate -- --country all --state all --seed 42 --format both --out /tmp/draw-all
npm run generate -- --country mx --state jalisco --count 3 --seed 100 --format svg --out /tmp/draw-jalisco
npm run generate -- --help
```

Defaults are US, all states, count 1, seed 42, 1400 × 880 and format both. `--count` is per jurisdiction, accepts 1–10000, and increments the seed for variations; the full range must fit uint32. Explicit `--country` produces country subdirectories and a version-2 manifest. Omitting it preserves flat US output and version-1 manifests. `--country all` requires `--state all`. Formats are `svg`, `png`, `both`. The manifest records seeds, relative filenames and SHA-256 hashes. Files are written sequentially and may remain after a failure; the manifest is written only after successful generation.

## Browser display and composition

Use the root SVG entry point with your ESM bundler. For an image element, create a Blob from the returned SVG string, assign an object URL, and revoke it when the host no longer needs it. The library supplies no browser UI or DOM lifecycle. Add labels, photos, masks or synthetic metadata in the host composition layer; these are not renderer options. See [limitations](limitations.md).
