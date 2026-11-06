# Integrate draw-backgrounds

**Scope:** Development on `main`. Use the README at an exact Git tag for historical behavior. Start with [installation](../../IMPORT.md) to distinguish source tags from npm releases.

The library renders original synthetic backgrounds for 50 US states, 32 Mexican federal entities, and 13 Canadian provinces and territories. The host composes any text, photos, or data over the background.

| Task | Entry point | Example or visual evidence |
| --- | --- | --- |
| Generate SVG in Node or a browser bundler | `render(jurisdiction, options?)` from `@lambdawalker/draw-backgrounds` | [JavaScript examples](../../README.md#javascript-api), [gallery](../../previews/README.md) |
| Draw pixels or encode a PNG in Node | `renderCanvas(jurisdiction, options?)` from `@lambdawalker/draw-backgrounds/canvas` | [Canvas example](../../README.md#canvas-renderer), [renderer parity tests](../../test/canvas.test.js) |
| List supported slugs | `jurisdictionsByCountry`, `countries`, `countryNames`, or `states` from the root import | [Public exports](../../src/public.js) |

Both renderers take a jurisdiction slug and optional `{ country, seed, width, height }`. Defaults are `"us"`, `42`, `1400`, and `880`. Country codes are `us`, `mx`, and `ca`. `states` is the US-only list. Seed must be a uint32. Dimensions must be positive integers no greater than 8192 each, with at most 40 million pixels total. Invalid inputs throw `RangeError` synchronously.

`render` returns a standalone SVG string. `renderCanvas` returns an allocated Node Canvas surface owned by the caller. Rendering is synchronous. Call `await canvas.encode("png")` for PNG bytes. Keep the surface alive while reading its raw buffer, or copy the buffer before handing it to asynchronous work. Identical inputs reproduce a design within the same renderer and runtime. Rasterizers can differ in antialiasing and compositing.

If Canvas cannot load, check the Node platform and reinstall with optional dependencies enabled. Browser consumers use the root SVG entry point. If a jurisdiction is rejected, look it up in the catalog for its country rather than normalizing display names heuristically.

The batch CLI, preview generation, and benchmarks run from the source checkout. See [release and visual review maintenance](../RELEASING.md).
