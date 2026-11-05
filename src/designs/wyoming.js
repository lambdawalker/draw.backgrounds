import { rect, line, samples } from "../geometry.js";
export default function (c, p) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, "#dfeff3"],
        [40, "#eff4dc"],
        [100, "#e1f0ef"],
      ]),
    ),
  );
  const ink = c.gradient([
    [0, "#3b8dad"],
    [45, "#83a865"],
    [100, "#4c9abc"],
  ]);
  const field = c.body.length;
  for (let x = -120; x < 1500; x += 9 + 1.3 * Math.sin(x / 180))
    c.add(
      line(
        samples(
          (y) => [
            x +
              54 * Math.sin(y / 145 + x / 210 + p) +
              28 * Math.sin(y / 70 + x / 290),
            y,
          ],
          -30,
          920,
          7,
        ),
        ink,
        0.85,
        0.42,
      ),
    );
  const fieldPaths = c.body.splice(field).join("");
  const mask = c.id();
  c.defs.push(
    `<linearGradient id="${mask}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="white" stop-opacity=".12"/><stop offset=".2" stop-color="white"/><stop offset=".82" stop-color="white"/><stop offset="1" stop-color="white" stop-opacity=".1"/></linearGradient><mask id="${mask}m"><rect width="1400" height="880" fill="url(#${mask})"/></mask>`,
  );
  c.add(`<g mask="url(#${mask}m)">${fieldPaths}</g>`);
  for (let j = 0; j < 20; j++)
    c.add(
      line(
        samples(
          (x) => [
            x,
            10 +
              j * 6 +
              6 * (2 / Math.PI) * Math.asin(Math.sin(x / 14 + p)) +
              9 * Math.sin(x / 65),
          ],
          -20,
          1420,
          3,
        ),
        "#397c9e",
        1,
        0.5,
      ),
    );
  for (let j = 0; j < 18; j++)
    c.add(
      line(
        samples(
          (x) => [x, 810 + j * 4 + 16 * Math.sin(x / 20 + j * 0.16)],
          -20,
          1420,
          4,
        ),
        "#398dab",
        0.8,
        0.32,
      ),
    );
}
