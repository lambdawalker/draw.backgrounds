# Quickstart

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.

For a consumer dependency, the confirmed historical source tag is installed with:

```sh
npm install "github:lambdawalker/draw.backgrounds#v0.0.1"
```

That tag's manifest declares `0.1.0`; the Git selector and manifest version differ. This is historical source availability, not proof of npm publication or a promise that Development documentation describes that snapshot. Read the [tagged README](https://github.com/lambdawalker/draw.backgrounds/blob/v0.0.1/README.md). [IMPORT.md](../../IMPORT.md) owns installation status. SVG-only consumers can omit optional dependencies.
<!-- publication-status:end -->

Node integrations require Node.js 22 or newer and ESM. Browser bundlers can consume the root SVG entry point; the native Canvas entry point is Node-only.

## Choose a source

For reproducible repository examples, check out the reviewed repository commit, then run:

```sh
npm ci
node examples/render-svg.mjs /tmp/draw-svg
node examples/render-canvas.mjs /tmp/draw-canvas
```

The scripts create Texas, Jalisco and Quebec SVGs or PNGs plus JSON metadata recording the options and output hashes. They print the output directory. Choose a fresh directory: matching files are overwritten. Canvas needs optional dependencies enabled. These examples import `../src/public.js` and `../src/canvas.js` to exercise this checkout.

## Complete consumer example

Save as `example.mjs` after installing a source snapshot whose API you have checked:

```js
import { writeFile } from 'node:fs/promises';
import { render, jurisdictionsByCountry } from '@lambdawalker/draw-backgrounds';

const country = 'mx';
const jurisdiction = 'jalisco';
if (!jurisdictionsByCountry[country].includes(jurisdiction)) {
  throw new Error('Unsupported jurisdiction');
}
const svg = render(jurisdiction, { country, seed: 42, width: 700, height: 440 });
await writeFile('jalisco.svg', svg);
```

Run `node example.mjs`. The result is a standalone 700 × 440 SVG with no external images or fonts. Open it in a browser or rasterize it in your host. Rendering itself performs no file I/O. Continue with [Canvas and batch recipes](recipes.md) and [API bounds](api.md).
