# Mexico and Canada visual review

The country expansion adds 32 Mexican federal entities and 13 Canadian provinces/territories to the unchanged 50 US renderers. These are original decorative backgrounds, informed by public samples and regional imagery. They are not replicas of credential formats.

## Recorded rounds

| Collection | Entities | Rounds | Evidence |
|---|---:|---:|---|
| Mexico north/west | 11 | 4 | [Pass 1](mx-north/pass-1/review.md), [2](mx-north/pass-2/review.md), [3](mx-north/pass-3/review.md), [4](mx-north/pass-4/review.md) |
| Mexico central | 11 | 3 | [Round 1](mx-central/round-1/REVIEW.md), [2](mx-central/round-2/REVIEW.md), [3](mx-central/round-3/REVIEW.md) |
| Mexico south/east | 10 | 4 | [Pass 1](mx-south/pass-01/review.md), [2](mx-south/pass-02/review.md), [3](mx-south/pass-03/review.md), [4](mx-south/pass-04/review.md) |
| Canada | 13 | 3 | [Pass 1](ca/pass-01/notes.md), [2](ca/pass-02/notes.md), [3](ca/pass-03/notes.md) |

Every round directory contains the exact source snapshot and a JPEG contact sheet. The historical snapshots preserve the source as reviewed, including its formatting; they are evidence rather than independent runnable packages. The colocated render helpers use live source and should only be run into a **new** round directory. Final production previews use the public API at seed 42, whereas some early regional studies used fixed local RNG/phase values.

## Changes made from visual inspection

- Replaced fan-shaped palms with separate etched fronds and a perfectly geometric coastal arch with irregular rock faces.
- Added clipped mountain strata, botanical veins, aqueduct masonry, butterfly details and grounded basalt/waterfall geometry.
- Differentiated Canadian botanical silhouettes, changed Nunavut from a repeated iceberg to tundra, enlarged Newfoundland's iceberg and strengthened the lighthouse outline.
- Recovered additional specimen images and refined selected Mexican palettes and line ornaments in round four. Geographic illustration remains original; provenance files distinguish it from observed licence details.
- Reviewed every regional contact sheet again after these changes. The final acceptance keeps pale fields and quiet centers for overlaid content; intentionally low-contrast motifs are backgrounds rather than standalone illustrations.

## Reference confidence

[Mexico north](../../references/mx/north.json) records seven full public card/sample views, two partial card photographs and one official digital sample. Baja California Sur remains a geographic interpretation because its available card photograph was too blurred for motif analysis.

[Mexico central](../../references/mx/central.json) records nine inspected public specimen/sample views. Estado de México and Guanajuato retain explicit image-availability gaps.

[Mexico south](../../references/mx/south.json) records six inspected card/specimen views. Chiapas, Guerrero and Yucatán could not be retrieved as usable specimen imagery; the downloaded Zacatecas illustration was rejected as a cartoon mock-up. Those four backgrounds are geographic interpretations.

[Canada](../../references/ca/sources.json) records inspected samples for all 13 jurisdictions, including historical editions and three third-party reproductions. It makes no claim that every sample is the current issue. Source imagery is linked, not redistributed.

## Integration checks

The automated suite covers all 95 designs, exact jurisdiction coverage, deterministic output, visibly different seeds, self-contained SVG, raster dimensions, manifests and checksums, invalid options, legacy US output and the existing mountain snow confinement regression. An independent code review additionally checked 380 SVG renders across four seeds: no duplicate IDs, unresolved references or invalid coordinates. All 50 existing US default SVGs were compared byte-for-byte and retained.

Final galleries and individual SVG/PNG downloads are grouped under [United States](../../previews/us/README.md), [Mexico](../../previews/mx/README.md) and [Canada](../../previews/ca/README.md). Their manifests describe the actual final files.

Final integration verification (2026-11-05): `npm test` passed 105/105; `npm run format:check` passed. All 95 stored default SVGs match the current renderer, and all 190 preview SVG/PNG hashes match the country manifests. `git diff --check` passed.
