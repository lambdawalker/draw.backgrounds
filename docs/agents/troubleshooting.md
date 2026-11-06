# Troubleshooting

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.
<!-- publication-status:end -->

Start by recording the exact source tag/commit, Node version, operating system, architecture, renderer, jurisdiction and options. Reproduce with one image at 700 × 440 before investigating a batch.

| Symptom | Cause to check | Correction |
| --- | --- | --- |
| `Unknown country` | Display name or `all` passed to the API | Use `us`, `mx`, `ca`; enumerate for batches |
| `Unknown state` / `Unknown jurisdiction` | Wrong country, case or translated name | Select the exact slug from `jurisdictionsByCountry[country]` |
| Seed error | Negative, fractional, string or out-of-range input | Pass an integer in 0–4294967295 |
| Dimensions error | Noninteger, zero, axis >8192 or product >40 million | Validate both axes and their product |
| `TypeError` with options | `null` or malformed input | Omit options or pass an ordinary object |
| Canvas import/native binding failure | Optional dependencies omitted or incompatible platform | Reinstall optional dependencies and inspect native support; use root SVG if appropriate |
| Browser bundler resolves native modules | Import from `/canvas` | Use the root SVG entry in the browser |
| Package subpath is not exported | Deep import of implementation files | Import only root or `/canvas` |
| PNG bytes differ across machines | Different encoder/native runtime | Pin the toolchain; compare decoded pixels with an explicit tolerance |
| Image looks stretched | Output ratio differs from 1400:880 | Use proportional dimensions |
| Batch files exist without manifest | Encoding or disk write failed partway | Fix the failure and rerun into a new directory |
| `npm` reports version 0.1.0 for tag v0.0.1 | Historical tag/manifest mismatch | Preserve the tag selector and record both identities |

Run the repository examples from [recipes](recipes.md). `npm test` checks rendering and validation; Canvas tests need the native optional dependency and Sharp. A successful SVG example does not prove Canvas platform support. A successful render does not prove a later disk write or PNG encode succeeded.

For reports include a minimal invocation, exact error and whether SVG or Canvas fails. Avoid debugging with private geometry imports: they are not the public contract. [API](api.md) gives bounds; [concepts](concepts.md) explains ownership.
