# Visual review history

All designs use seed 42 at 1400 × 880. Passes count rendered evaluations, not individual code edits. Contact sheets are retained; full SVG and PNG previews are reproducible from the corresponding commit. Each pass was inspected visually. Scores are not automated fidelity measurements.

## Pass 1 — first complete compositions

[Contact sheet](pass-1.jpg)

| State | Observation | Next action |
|---|---|---|
| Washington | Horizontal engraved field works; mountain and white snowcap are too geometric; tree floats above the forest. | Replace snow stroke with natural snow facets and rock hatching; connect foreground tree to ground. |
| Arkansas | Warped spacing works; diamonds crowd top edge; gold panels look like wire rectangles. | Lower diamonds; add ornamental arch and stippled panel detail; reduce mesh toward warm edge. |
| Illinois | Palette is suitable; rosette reads as turbine blades, not interlaced engraving. | Replace phase-shifted expanding rings with intersecting guilloche loops; add a second ribbon. |
| Tennessee | Palette and placement work; architecture looks like a schematic; circle dominates. | Add roof and stone shading, deeper engraving, soften circular field. |
| Alaska | Mountain/flower cues present; mountain is polygonal, flowers too evenly spaced, snow stroke heavy. | Add snow facets and ridgelines; cluster flowers with stems; introduce contrasting header mesh. |
| Wyoming | Distinctive contour spacing; top/bottom bands collide too abruptly with main lines. | Fade the main field toward bands, refine the header zigzag and soften lower interlace. |
| Louisiana | Warm base works; same turbine rosette problem; architecture too similar to Tennessee. | Use interlaced guilloche; replace pavilion with a narrow stepped tower; soften base yellow. |
| Utah | Canyon is too much like nested polygon outlines; dotted edge good. | Add faceted rock walls and contour strata, including thin angled fracture lines. |
| Colorado | Palette distinct; landscape too flat and angular, snow looks like a white outline. | Add irregular peak geometry, triangular snowfields and natural foothill contours. |
| Idaho | Bird recognizable but wings are one-sided and diagrammatic; mesh overwhelms subject. | Redraw two asymmetric wings with tapered feather contours and feather hatching; soften the central grid. |

No design accepted after pass 1. All ten move to pass 2.

## Pass 2 — geometry and engraving revisions

[Contact sheet](pass-2.jpg). Also inspected Tennessee, Idaho and Illinois individually at full size.

| State | Observation | Next action / decision |
|---|---|---|
| Washington | Snow is now an attached shape rather than a thick line; tree reaches baseline. | Add subtle etched slopes to the mountain; final full-size inspection. |
| Arkansas | Diamonds fit the top margin; arch panels add detail without dominating. | Add small engraved corner ornaments and a few inset medallions for depth. |
| Illinois | Rosette is symmetric and interlaced; dense inner edges still too dark. | Reduce rosette contrast and add a fine inner ring to balance its center. |
| Tennessee | More masonry is visible, but tower and roof still feel schematic at full size. | Replace tower geometry with layered cornices, window arches and tiled roof engraving. |
| Alaska | Flower grouping and snow facets are better; top mesh needs more distinct rainbow interlace. | Add a pale complementary weave and rock hatching. |
| Wyoming | Header/main-field transition is smooth; lower band does not dominate; line spacing varies clearly. | Accepted after 2 passes; keep geometry unchanged. |
| Louisiana | New stepped tower is distinct, but too faint; rosette contrast is strong relative to tower. | Strengthen tower linework and reduce rosette density/contrast. |
| Utah | Canyon planes now read as rock walls; bottom outlines still relatively parallel. | Add short clipped diagonal striations and inspect at full size. |
| Colorado | Snowfields and jagged silhouettes improve depth; broad rock slopes remain flat. | Add clipped slope etching and soften green saturation slightly. |
| Idaho | Two wings now read correctly; feathers look like narrow rays and body is sparse. | Add layered covert feathers and shorten the tail; improve the wing/body join. |

The generator validation suite passed all 13 tests: every design rasterizes, repeated seeds match, alternate seeds change pixels, batches have correct hashes and invalid CLI inputs fail.

## Pass 3 — finishing detail

[Contact sheet](pass-3.jpg). Full-size Washington, Arkansas, Alaska, Wyoming, Louisiana, Utah and Colorado renders were additionally inspected; Idaho, Illinois and Tennessee detail changes were compared against their full-size pass-2 views.

| State | Result | Decision |
|---|---|---|
| Washington | Snow is attached to consistent ridge points; slope etching adds depth; fine horizontal field remains calm. | Accepted, 3 passes. |
| Arkansas | Blue warped mesh and gold panels stay distinct; diamonds sit within margins; small rosettes add detail. | Accepted, 3 passes. |
| Illinois | Inner medallion balances the now softer interlaced rosette; coral ribbons remain legible but subtle. | Accepted, 3 passes. |
| Tennessee | Rebuilt pavilion has arched windows, layered cornices, roof hatching and consistent column geometry. | Accepted, 3 passes. |
| Alaska | Pale two-color header weave, mountain engraving and flowering edge read as a coherent composition. | Accepted, 3 passes. |
| Wyoming | Unchanged since pass 2; confirmed smooth variation and clean band transitions. | Accepted, 2 passes. |
| Louisiana | Rosette no longer overpowers tower; warm base remains light; tower is deliberately understated. | Accepted, 3 passes. |
| Utah | Sandstone planes and clipped fractures provide texture without dark broad fills. | Accepted, 3 passes. |
| Colorado | Peak engraving and snow facets give depth; muted foothills preserve contrast for later overlays. | Accepted, 3 passes. |
| Idaho | Layered covert feathers improve wing roots; shortened tail improves proportions; background remains pale. | Accepted, 3 passes. |

All ten meet the visual brief for original procedural dataset backgrounds. None reached the six-pass limit. These are stylized illustrations; photographic landscape realism and reproduction of state security features are not goals. No downstream OCR or detector accuracy claim is made.
