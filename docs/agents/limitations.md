# Limitations and compatibility

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.

No npm publication is confirmed here. A Git tag is source availability only. Use [installation](../../IMPORT.md) and [migration](migration.md) to select a reviewed snapshot.
<!-- publication-status:end -->

The drawings are original stylized backgrounds inspired by public references and regional studies. They are not replicas, claims of current credential formats, official seals, encoded data, or complete identity documents. Reference coverage varies; visual review does not establish OCR or detector accuracy. Evaluate datasets against held-out real images for your actual task.

Only the 95 cataloged jurisdictions are supported. There is no custom country registration, plugin API, arbitrary motif editor or palette parameter. Seeds vary procedural details while preserving the principal motif and palette. No camera distortion, print process, wear, lighting or photographic augmentation is simulated.

Node requires version 22 or later. The root ESM SVG entry is usable by browser bundlers. Canvas is Node-only and depends on a compatible optional native `@napi-rs/canvas` installation. No CommonJS entry point, browser Canvas adapter or package CLI binary is declared. Sharp belongs to repository tooling, not the public SVG runtime.

SVG output is deterministic for a given source and inputs. Raster bytes are runtime-dependent. SVG and Canvas share geometry but differ in antialiasing and compositing; parity tests compare visual error rather than demand exact pixels. Size limits prevent some invalid allocations but do not guarantee that a large render or batch fits available memory. Rendering blocks its thread and offers no cancellation or progress events.

The library owns only background rendering. The host owns input validation at trust boundaries, overlay content, UI accessibility, storage, scheduling, cleanup and dataset evaluation. Generated backgrounds contain no text, so sharing images between documentation locales does not represent translated UI.
