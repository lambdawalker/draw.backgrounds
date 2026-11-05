import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { Canvas, rng, ridge, snowOnRidge } from "../src/geometry.js";
const svg = (c, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="880"><defs>${c.defs.join("")}</defs>${body}</svg>`;
test("snow never creates a peak outside the actual seeded mountain silhouette", async () => {
  for (const seed of [1, 42, 119]) {
    const c = new Canvas(rng(seed));
    // A summit followed by a descending shoulder: the prior independent cap invented a second peak.
    const geometry = ridge(
      c,
      [
        [-40, 650],
        [520, 490],
        [650, 280],
        [740, 330],
        [800, 410],
        [1440, 610],
      ],
      { fill: "#fff", opacity: 1, hatch: false },
    );
    const silhouette = await sharp(Buffer.from(svg(c, geometry.silhouette)))
      .ensureAlpha()
      .raw()
      .toBuffer();
    c.body = [];
    snowOnRidge(c, geometry, { lineY: 410, opacity: 1 });
    const snow = await sharp(Buffer.from(svg(c, c.body.join(""))))
      .ensureAlpha()
      .raw()
      .toBuffer();
    let covered = 0;
    for (let i = 3; i < snow.length; i += 4) {
      if (snow[i] > 10) {
        covered++;
        assert.ok(silhouette[i] > 0, "snow escaped the ridge");
      }
    }
    assert.ok(covered > 1000, "snow remains visible");
  }
});
