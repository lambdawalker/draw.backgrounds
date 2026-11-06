# Concepts and ownership

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.
<!-- publication-status:end -->

The host chooses a country, a jurisdiction slug, seed and size; the renderer draws a fixed composition with seeded variation. No external service, authentication, network request or global renderer lifecycle is required.

## Selection and determinism

Country keys are `us`, `mx`, `ca`. Jurisdiction keys are lowercase ASCII slugs from the catalog, not translated labels. `countryNames` provides English country labels, not jurisdiction names. Do not infer slugs by stripping accents; look them up. Country and jurisdiction must agree.

The seed controls procedural details such as wave phases and ridges. It does not select a different document edition or radically rearrange a composition. The same source, renderer, options and runtime reproduce the output. SVG equality is deterministic; raster encoders and native libraries may change bytes or antialiasing across runtimes. Record source revision, options and toolchain with datasets.

Artwork uses a 1400 × 880 logical coordinate system. Both axes scale independently to the requested output. A different aspect ratio stretches the design. Use proportional sizes such as 700 × 440 to retain proportions.

## Values and resources

`render` allocates and returns a standalone SVG string. It does not mutate caller options, save files or retain a session. The host decides how to display or persist it. Repeated identical SVGs can contain identical definition IDs; use separate image documents rather than blindly concatenating SVG markup into one shared document.

`renderCanvas` allocates a native Canvas surface per call. The caller owns it and its derived buffers. `await canvas.encode('png')` produces encoded bytes. Keep the surface alive while reading its raw `data()` buffer, or use `Buffer.from(canvas.data())` to copy before asynchronous handoff. Surface methods belong to the native dependency, not extra draw.backgrounds exports.

Rendering is synchronous and blocks the calling thread. There are no progress callbacks, cancellation tokens, streaming jobs, worker pools or explicit library disposal method. Bound concurrency and memory in the host; use workers for CPU isolation if needed. File writes and asynchronous encoding can fail independently of drawing. Release references after use; do not hold an entire large batch in memory.

Catalog objects and arrays are frozen. Treat them as read-only; create a copy before sorting or adding UI choices. See [API](api.md) for all exports and [limitations](limitations.md) for visual guarantees.
