# draw.backgrounds

Ten original, code-generated card backgrounds inspired by public US driver-license specimens. Built in JavaScript with procedural SVG geometry and Sharp PNG export. The artwork contains no text, photographs, official seals, state outlines or encoded data.

![All ten generated backgrounds](previews/contact-sheet.jpg)

## Generate backgrounds

Requires Node.js 22 or newer. From the repository root:

```sh
npm ci
# One SVG and PNG per state, plus a manifest (20 images total).
npm run generate -- --state all --seed 42 --format both --out output
# 1,000 PNG images: 100 variations of each of the ten designs.
npm run generate -- --state all --count 100 --seed 1000 --format png --out output/dataset
# One state at a custom resolution.
npm run generate -- --state arkansas --width 1750 --height 1100 --format both --out output/arkansas
```

`--count` is **per state**. Seeds increment for each variation. Each manifest item records state, seed, relative filenames and SHA-256 hashes. Repeated state/seed/dimensions produce identical SVG; PNG byte identity is expected within the same Sharp/libvips runtime. Raster encoders may differ between environments.

Use a new output directory for each batch: matching filenames and `manifest.json` are overwritten on reruns. A batch is written sequentially; disk/encoding failures may leave a partial batch. The manifest is written after successful generation.

Default dimensions are 1400 × 880. Geometry scales to the requested dimensions; a different aspect ratio intentionally stretches the design. Width and height must be positive integers up to 8192, with a maximum of 40 million pixels. `--seed` accepts unsigned 32-bit integers; the entire batch seed range must fit. `--count` accepts 1–10000. Run `npm run generate -- --help` for all options.

## Designs and downloads

| State | Composition | SVG | PNG | Visual passes |
|---|---|---|---|---|
| Washington | Ice-blue engraving, alpine ridge, evergreen | [SVG](previews/washington.svg) | [PNG](previews/washington.png) | 3 |
| Arkansas | Warped blue grid, gold panels and diamonds | [SVG](previews/arkansas.svg) | [PNG](previews/arkansas.png) | 3 |
| Illinois | Blue circular filigree and coral ribbons | [SVG](previews/illinois.svg) | [PNG](previews/illinois.png) | 3 |
| Tennessee | Coral field and engraved architectural pavilion | [SVG](previews/tennessee.svg) | [PNG](previews/tennessee.png) | 3 |
| Alaska | Mint peaks, pink flowers and interwoven header | [SVG](previews/alaska.svg) | [PNG](previews/alaska.png) | 3 |
| Wyoming | Green/cyan contour field and zigzag borders | [SVG](previews/wyoming.svg) | [PNG](previews/wyoming.png) | 2 |
| Louisiana | Warm yellow waves, blue rosette and stepped tower | [SVG](previews/louisiana.svg) | [PNG](previews/louisiana.png) | 3 |
| Utah | Coral canyon faces, etched strata and dotted edge | [SVG](previews/utah.svg) | [PNG](previews/utah.png) | 3 |
| Colorado | Lavender sky, blue peaks, sage/gold foothills | [SVG](previews/colorado.svg) | [PNG](previews/colorado.png) | 3 |
| Idaho | Cyan mesh, pale mountain and engraved bluebird | [SVG](previews/idaho.svg) | [PNG](previews/idaho.png) | 3 |

Previews use seed 42. Seeds vary wave phases and, in landscape designs, ridge detail. The principal motifs and palettes remain stable; seeds do not simulate different physical print processes or radically rearrange the composition.

## JavaScript API

The SVG renderer has no dependencies and can also run in browser modules. Import it directly from the checkout (the package is not published):

```js
import { render, states } from './src/index.js';
import { writeFile } from 'node:fs/promises';

const svg = render('wyoming', { seed: 123, width: 1400, height: 880 });
await writeFile('wyoming.svg', svg);
console.log(states);
```

Only CLI PNG export and preview generation require Sharp. `node src/cli.js --format svg` can run without installing dependencies.

## Organization

- `src/designs/`: one composition module per state.
- `src/geometry.js`: shared warped grids, waves, guilloche, clipped hatching and illustrative motifs.
- `src/index.js`: deterministic renderer and supported-state registry.
- `src/cli.js`: file export, batch seeds, input validation and manifests.
- `scripts/previews.js`: regenerates the individual previews, contact sheet and preview manifest.
- `references/sources.json`: the ten inspected specimen image URLs, source pages, edition labels and observed cues.
- [Reference study](docs/REFERENCES.md): how those cues informed original compositions.
- [Visual review log](docs/reviews/REVIEW.md): all review decisions and three contact-sheet checkpoints.

## Verification and maintenance

```sh
npm test
npm run format:check
npm run previews
npm run select-states
```

Tests check all ten renders, deterministic SVG output, different-seed pixel variation, image dimensions, self-contained SVG content, batch seed assignment, file hashes and invalid CLI options. Regenerate previews after changing geometry. The selected states come from a reproducible seeded shuffle of all 50 states; the selection algorithm is in `scripts/select-states.js`.

The samples are visual references, including historical designs, not a claim about current credential formats. Reference images are linked but not redistributed or embedded. Generated artwork is deliberately stylized. Visual acceptance does not establish OCR/detector training accuracy; evaluate the generated dataset against your own held-out real images.
