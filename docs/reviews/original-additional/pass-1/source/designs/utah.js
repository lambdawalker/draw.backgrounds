import {
  rect,
  waves,
  ridge,
  line,
  samples,
  ellipse,
  polygon,
  rockEtching,
} from "../geometry.js";
export default function (c, p) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, "#fbefeb"],
        [48, "#f8f7f3"],
        [100, "#eaf1f4"],
      ]),
    ),
  );
  waves(c, {
    color: "#8aa5bf",
    opacity: 0.2,
    spacing: 7,
    amplitude: 20,
    phase: p,
  });
  const edge = [
    [580, 780],
    [650, 600],
    [710, 590],
    [750, 380],
    [810, 350],
    [830, 310],
    [900, 330],
    [935, 410],
    [1010, 440],
    [1040, 550],
    [1120, 580],
    [1200, 730],
    [1450, 780],
  ];
  ridge(c, edge, {
    fill: "#efc7b4",
    ink: "#cb927f",
    opacity: 0.3,
    hatch: false,
  });
  c.add(
    polygon(
      [
        [830, 310],
        [900, 330],
        [935, 410],
        [1010, 440],
        [940, 650],
        [885, 790],
        [850, 600],
      ],
      "#c28f7f",
      0.12,
    ),
  );
  c.add(
    polygon(
      [
        [750, 380],
        [810, 350],
        [830, 310],
        [800, 560],
        [750, 710],
        [710, 590],
      ],
      "#dfa58e",
      0.14,
    ),
  );
  rockEtching(c, edge, { color: "#b78679", opacity: 0.18 });
  for (let j = 0; j < 16; j++)
    c.add(
      line(
        [
          [770 + j * 8, 420 + j * 2],
          [750 + j * 7, 510],
          [800 + j * 5, 600],
          [765 + j * 8, 750],
        ],
        "#be8573",
        0.65,
        0.18,
      ),
    );
  for (let j = 0; j < 21; j++)
    c.add(
      line(
        edge.map(([x, y]) => [900 + (x - 900) * (1 + j * 0.013), y + j * 7]),
        "#c38679",
        0.8,
        0.25,
      ),
    );
  for (let j = 0; j < 22; j++)
    c.add(
      line(
        samples(
          (y) => [870 + j * 9 + 10 * Math.sin(y / 80 + p + j * 0.14), y],
          410,
          880,
          8,
        ),
        "#bd8b83",
        0.8,
        0.28,
      ),
    );
  for (let y = 20; y < 880; y += 14)
    for (let x = 1190; x < 1400; x += 14)
      c.add(
        ellipse(x + 3 * Math.sin(y / 40 + p), y, 1.1, 1.1, "#bd968f", 0.23),
      );
}
