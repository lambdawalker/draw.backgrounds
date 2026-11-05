# Procedural state-inspired backgrounds

Goal: ten original, text-free backgrounds for synthetic card datasets. Reference public specimen licenses for palette, broad composition, ornamental linework and landscape themes. Do not embed reference pixels in generated assets.

## Selection

Fisher–Yates shuffle of the 50 states in alphabetical order, seed 20261105, using the 32-bit LCG `s = (1664525*s + 1013904223) mod 2^32`. First ten: Washington, Arkansas, Illinois, Tennessee, Alaska, Wyoming, Louisiana, Utah, Colorado, Idaho. Reference editions may be historical; this is not a catalog of current credentials.

## Implementation choices

JavaScript ES modules produce self-contained SVG. Sharp exports PNG. Shared geometry helpers support warped grids with locally varying spacing, engraving, landscapes and ornaments; each state gets a separate composition module. Seed and dimensions are explicit. Output contains no text, portrait, state outline, official seal or machine-readable data.

## Work and commits

1. Record plan and reproducible random selection.
2. Collect and inspect ten public specimen references; document sources and design cues.
3. Build generator and first render of all ten.
4. Visually evaluate every design, revise and commit each review pass. Stop per design when satisfactory or after six passes. Keep a per-state review log and rendered contact sheets.
5. Verify determinism, variation, exports and CLI failures; document usage and publish final previews.

Each stage and each visual pass is committed and pushed to `feat/state-backgrounds` for progress monitoring.
