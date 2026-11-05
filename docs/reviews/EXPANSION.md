# Forty-state expansion

The first ten designs were merged to main before this expansion. Forty additional states each received thirteen sequential render–inspect–refine passes. Four groups of ten keep the contact sheets readable. The first eight passes were followed by five additional passes requested for all fifty states. Every pass retains the exact source used for that review, a rendered contact sheet, and state-by-state observations. Git commits publish the groups' corresponding pass together.

| Group | States | References | Thirteen review checkpoints |
|---|---|---|---|
| A | Alabama, Arizona, California, Connecticut, Delaware, Florida, Georgia, Hawaii, Indiana, Iowa | [Sources](../../references/us/expansion-a.json) | [Reviews](expansion-a/) |
| B | Kansas, Kentucky, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana | [Sources](../../references/us/expansion-b.json) | [Reviews](expansion-b/) |
| C | Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma | [Sources](../../references/us/expansion-c.json) | [Reviews](expansion-c/) |
| D | Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Texas, Vermont, Virginia, West Virginia, Wisconsin | [Sources](../../references/us/expansion-d.json) | [Reviews](expansion-d/) |

Each group contains `pass-1` through `pass-13`, with `contact.jpg`, `review.md`, and `source/`. Contact-sheet labels are separate from generated artwork. Source snapshots can be restored to the matching `src/expansion/<group>/` folder to reproduce a checkpoint. They deliberately retain their original formatting; production modules may be formatted after review without changing rendering.

The references include historical public specimens. Where only grayscale specimens were available, palettes are original artistic choices rather than inferred specimen colors. Artwork is procedural SVG: specimen pixels, credential text, portraits, seals, barcodes and machine-readable payloads are not embedded.

Reusable elements include warped grids with locally changing line spacing, engraving and hatching, botanical paths, architecture, wave fields, and ridges. State compositions select different arrangements, palettes and motifs; they are not forty recolors of one template. Illinois now has a visible circular leaf stem around its rosette, and original warped-grid geometry remains locally uneven.

The Washington, Alaska and Colorado snowcaps now use the actual seeded ridge polygon as a clip. This removes the detached triangular peaks from the prior version. A raster regression checks three seeds and requires every significant snow pixel to remain inside that silhouette.

Final preview sheets use the public renderer and seed 42. The CLI supports all fifty states; `--count` remains per state. Validation includes deterministic output, five consecutive seeds, raster diversity, self-contained SVG, ID isolation, dimensions, and batch manifest hashes.

## Integration acceptance

All 56 tests pass, including 50 state render checks, the 100-record/200-file batch CLI check, disjoint SVG IDs, five-seed raster diversity, invalid input handling, and snow confinement. Prettier passes. The four final group sheets were independently inspected during integration; final production previews contain all 50 SVG/PNG pairs and five paged contact sheets. Five further passes refine original and expansion motifs, with additional review of alternate seeds and smaller exports. The original-ten additional snapshots and state-specific reviews are in `original-additional/pass-1` through `pass-5`.
