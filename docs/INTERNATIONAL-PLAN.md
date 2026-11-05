# Mexico and Canada expansion

Extend the existing procedural SVG/Sharp renderer with all 32 Mexican federal entities and all 13 Canadian provinces and territories. Keep all 50 US designs and legacy US API/CLI usage working.

## Organization and interface
- Country keys: us, mx, ca. New designs under src/countries; previews and reference catalogs grouped by country.
- render(jurisdiction, {country, seed, width, height}); omitted country retains US.
- CLI --country us|mx|ca|all; explicit country batches write country subdirectories and identify country in manifests.
- Shared geometry remains reusable. Existing US artwork remains byte-identical.

## Work and checkpoints
1. Research public specimen imagery; record exact sources, what was actually inspected, and unavailable or historical references.
2. Implement original regional decorative compositions, without reproducing official seals, text or machine-readable elements.
3. Render and inspect every design, fix concrete issues, repeat until satisfactory. Save source snapshots, contact sheets and honest per-design notes at each round.
4. Integrate country catalogs, preserve legacy CLI, validate coverage, deterministic rendering, seed diversity, and SVG/PNG outputs.
5. Publish progress commits and final country galleries with review evidence.

## Visual acceptance
Light central field, visibly warped variable-spacing linework, distinct regional motifs and palettes, intentional edges, no accidental motif intersections, and snowcaps constrained to the actual mountain geometry. Inspect seed variants as well as the default. Any reference gaps remain explicit instead of being presented as verified licence-derived details.
