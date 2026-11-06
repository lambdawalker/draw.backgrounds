# Public API reference

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.
<!-- publication-status:end -->

ESM only. Public exports are defined by `package.json` and `src/public.js`; `drawJurisdiction`, drawing targets and geometry helpers are internal, even if source files export them.

```js
import {
  render, states, countries, countryNames, jurisdictionsByCountry,
} from '@lambdawalker/draw-backgrounds';
import { renderCanvas } from '@lambdawalker/draw-backgrounds/canvas';
```

## Renderer contracts

| Declaration | Result | Environment |
| --- | --- | --- |
| `render(jurisdiction, options = {})` | Standalone SVG `string` | Node or browser bundler |
| `renderCanvas(state, options = {})` | Newly allocated native Canvas surface | Node with `@napi-rs/canvas` |

`state` in the Canvas declaration means any supported jurisdiction, not just a US state. Both calls accept the same options and synchronously render one image. Neither writes files or returns a Promise. Canvas encoding is a separate asynchronous operation.

| Input | Default | Contract |
| --- | --- | --- |
| `jurisdiction` / `state` | None | Exact string from the selected country's catalog |
| `options.country` | `'us'` | `'us'`, `'mx'` or `'ca'`; `'all'` is CLI-only |
| `options.seed` | `42` | Integer from 0 through 4294967295 |
| `options.width` | `1400` | Integer from 1 through 8192 |
| `options.height` | `880` | Integer from 1 through 8192 |

Width × height must also be at most 40,000,000. Numbers are not coerced from strings. Omit options or pass an object; `null` is not a supported options value. Unknown properties are not customization controls. The API does not expose palette, motif, margin, font or image overlay options.

Unknown country, mismatched/unknown jurisdiction, invalid seed and invalid dimensions throw `RangeError` synchronously. US errors say `Unknown state`; other countries say `Unknown jurisdiction for ...`. Incorrect options shapes can raise JavaScript `TypeError`; native loading/allocation and encoding errors are not normalized by the library. Validate external data before calling and catch rendering and encoding errors separately.

## Catalogs

| Export | Value and meaning |
| --- | --- |
| `countries` | Frozen array `['us', 'mx', 'ca']` |
| `countryNames` | Frozen object `{ us: 'United States', mx: 'Mexico', ca: 'Canada' }` |
| `states` | Frozen list of 50 US jurisdiction slugs; legacy alias |
| `jurisdictionsByCountry` | Frozen object of frozen slug arrays: 50 `us`, 32 `mx`, 13 `ca` |

`jurisdictionsByCountry.us === states`. Mexican and Canadian slugs are sorted. Read the arrays instead of maintaining a duplicate catalog. Catalogs contain keys only: there is no public per-design metadata or reference-provenance lookup API.

## Output guarantees

SVG declares its width, height, `viewBox="0 0 1400 880"` and `preserveAspectRatio="none"`. Definitions and geometry are self-contained; the generated artwork has no text, photographs, scripts or external resource references. Canvas shares motif geometry and seed handling but is not guaranteed pixel-identical to an SVG rasterizer. See [ownership](concepts.md), [recipes](recipes.md), and [limitations](limitations.md).

Source: [public exports](../../src/public.js), [SVG implementation](../../src/index.js), [Canvas implementation](../../src/canvas.js), [renderer parity tests](../../test/canvas.test.js). These source links correspond to the selected documentation snapshot.
