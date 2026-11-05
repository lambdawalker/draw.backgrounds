import {
  rect,
  waves,
  ridge,
  pine,
  line,
  samples,
  snowOnRidge,
  rockEtching,
} from "../geometry.js";
export default function (c, p) {
  c.add(rect(0, 0, 1400, 880, "#eef5f3"));
  c.glow(440, 220, 1000, 680, "#b8dce7", 0.55);
  waves(c, {
    color: "#468ea6",
    opacity: 0.22,
    spacing: 6,
    amplitude: 5,
    period: 280,
    phase: p,
  });
  const mountain = ridge(
    c,
    [
      [-80, 690],
      [130, 635],
      [260, 520],
      [410, 580],
      [580, 335],
      [655, 292],
      [700, 330],
      [760, 305],
      [850, 435],
      [950, 495],
      [1050, 590],
      [1430, 650],
    ],
    { fill: "#c7dce3", ink: "#80a8b7", opacity: 0.6 },
  );
  snowOnRidge(c, mountain, { lineY: 405 });
  rockEtching(
    c,
    [
      [410, 580],
      [580, 335],
      [655, 292],
      [700, 330],
      [760, 305],
      [850, 435],
      [950, 495],
      [1050, 590],
    ],
    { opacity: 0.13 },
  );
  for (let j = 0; j < 15; j++)
    pine(c, 1050 + j * 25, 850, 50 + Math.sin(j * 1.7) * 18, "#658c89", 0.2);
  pine(c, 1130, 859, 170, "#98a559", 0.65);
  for (let j = 0; j < 14; j++)
    c.add(
      line(
        samples(
          (x) => [x, 810 + j * 4 + 9 * Math.sin(x / 90 + p + j * 0.05)],
          -20,
          1420,
          10,
        ),
        "#639baa",
        0.8,
        0.26,
      ),
    );
}
