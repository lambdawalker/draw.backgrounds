# Integrate draw.backgrounds

<!-- publication-status:start -->
**Scope: Development (`main`).** No npm release is confirmed by these guides. [Installation](../../IMPORT.md) distinguishes source tags from published packages. Historical consumers must use the README at their exact tag.
<!-- publication-status:end -->

Generate original synthetic card backgrounds for 50 US states, 32 Mexican federal entities and 13 Canadian provinces and territories. The host adds text, photos and data. This is a drawing library, not a credential generator, document validator or autonomous agent service.

| Task | Public entry | Read next |
| --- | --- | --- |
| Produce a standalone SVG in Node or a browser bundler | `render` from the root package | [Quickstart](quickstart.md) |
| Produce pixels or PNG in Node | `renderCanvas` from `/canvas` | [Recipes](recipes.md) |
| Discover valid country and jurisdiction keys | Root catalog exports | [API](api.md) |
| Reproduce and compare an output | Explicit seed and dimensions | [Concepts](concepts.md) |
| Diagnose an integration failure | Validation and runtime checks | [Troubleshooting](troubleshooting.md) |

Both renderers are synchronous, default to US, seed 42 and 1400 × 880, and validate identifiers and numeric bounds. Canvas encoding is asynchronous. The caller owns outputs, file writes, concurrency and cleanup. `states` is US-only; use `jurisdictionsByCountry` for all countries. Use public package entry points, never internal geometry modules.

[Quickstart](quickstart.md) · [Concepts and ownership](concepts.md) · [API contracts](api.md) · [Recipes and demos](recipes.md) · [Gallery](gallery.md) · [Limitations](limitations.md) · [Troubleshooting](troubleshooting.md) · [Migration](migration.md)
