import { waves, rosette, samples } from "../../../geometry.js";
function drawPaper(c) {
  c.add(c.rect(0, 0, 1400, 880, "#f6f5f1"));
}

function drawMedallionRings(c, p) {
  for (let j = 0; j < 28; j++) {
    c.add(
      c.line(
        samples(
          (t) => {
            const a = (t / 180) * Math.PI,
              r = 250 + j * 3 + 26 * Math.sin(7 * a + p);
            return [880 + r * Math.cos(a), 445 + r * 0.86 * Math.sin(a)];
          },
          0,
          360,
          2,
        ),
        "#7ca4bf",
        0.8,
        0.24,
      ),
    );
  }
}

function drawCentralContours(c, p) {
  for (let j = 0; j < 18; j++)
    c.add(
      c.line(
        samples(
          (y) => [
            650 + 160 * Math.sin(y / 160 + p) + j * 6 + 23 * Math.sin(y / 65),
            y,
          ],
          -30,
          910,
          7,
        ),
        "#bd8587",
        0.8,
        0.36,
      ),
    );
}

function drawRightContours(c, p) {
  for (let j = 0; j < 12; j++)
    c.add(
      c.line(
        samples(
          (y) => [1020 + 95 * Math.sin(y / 210 + p) + j * 5, y],
          -30,
          910,
          7,
        ),
        "#b9848c",
        0.8,
        0.25,
      ),
    );
}

function drawLowerContours(c, p) {
  for (let j = 0; j < 14; j++)
    c.add(
      c.line(
        samples(
          (x) => [x, 790 + j * 4 + 48 * Math.sin(x / 220 + p)],
          -20,
          1420,
          9,
        ),
        "#c29196",
        0.8,
        0.3,
      ),
    );
}

export default function (c, p) {
  drawPaper(c);
  c.glow(820, 450, 740, 530, "#b5d7ed", 0.45);
  waves(c, {
    color: "#74a7c1",
    opacity: 0.19,
    spacing: 6,
    amplitude: 6,
    phase: p,
  });
  rosette(c, 900, 420, 105, "#739ab6", {
    rings: 30,
    lobes: 23,
    amplitude: 18,
    opacity: 0.22,
  });
  rosette(c, 900, 420, 68, "#739ab6", {
    rings: 5,
    lobes: 23,
    amplitude: 2,
    opacity: 0.25,
  });
  drawMedallionRings(c, p);
  drawCentralContours(c, p);
  drawRightContours(c, p);
  drawLowerContours(c, p);
}
