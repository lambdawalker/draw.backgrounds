import { samples } from "../../../geometry.js";
function drawPaper(c) {
  c.add(
    c.rect(
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
}

function drawFadedEngraving(c, p, ink) {
  const field = [];
  for (let x = -120; x < 1500; x += 9 + 1.3 * Math.sin(x / 180))
    field.push(
      c.line(
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
  c.verticalFade(field);
}

function drawUpperChevronBand(c, p) {
  for (let j = 0; j < 20; j++)
    c.add(
      c.line(
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
        0.43,
      ),
    );
}

function drawLowerWaveBand(c) {
  for (let j = 0; j < 18; j++)
    c.add(
      c.line(
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

export default function (c, p) {
  drawPaper(c);
  const ink = c.gradient([
    [0, "#3b8dad"],
    [45, "#83a865"],
    [100, "#4c9abc"],
  ]);
  drawFadedEngraving(c, p, ink);
  drawUpperChevronBand(c, p);
  drawLowerWaveBand(c);
}
