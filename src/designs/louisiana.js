import { rect, waves, rosette, tower, line, samples } from "../geometry.js";
export default function (c, p) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, "#f6f3da"],
        [50, "#faf7df"],
        [100, "#f2f1d7"],
      ]),
    ),
  );
  c.glow(630, 660, 680, 390, "#dbeac9", 0.4);
  waves(c, {
    color: "#b7b36c",
    opacity: 0.22,
    spacing: 8,
    amplitude: 30,
    period: 110,
    phase: p,
  });
  for (let j = 0; j < 25; j++)
    c.add(
      line(
        samples(
          (y) => [520 + j * 3 + 35 * Math.sin(y / 60 + p), y],
          -20,
          900,
          5,
        ),
        "#8eb4bd",
        0.8,
        0.35,
      ),
    );
  rosette(c, 1080, 240, 100, "#6a94af", {
    rings: 26,
    lobes: 17,
    amplitude: 18,
    opacity: 0.3,
  });
  tower(c, 795, 820, 1.4, "#537f98");
  for (let j = 0; j < 14; j++)
    c.add(
      line(
        samples(
          (x) => [x, 850 + j * 3 + 22 * Math.sin(x / 130 + p)],
          -20,
          1420,
          8,
        ),
        "#a7ad6f",
        0.8,
        0.24,
      ),
    );
}
