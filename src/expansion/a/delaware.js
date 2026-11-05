import {
  paper,
  field,
  border,
  quality,
  dome,
  path,
  flourish,
} from "./helpers.js";
export default function (c, p) {
  paper(c, ["#e7e8dc", "#e6e4d7", "#d5e5dc"]);
  field(c, "#9aa989", p);
  dome(c, 990, 650, 1.45, "#6d896e", "tower");
  for (let j = 0; j < 18; j++)
    c.add(
      path(
        `M${-240 + j * 8} 0 L${440 + j * 8} 880 M${1100 + j * 8} 0 L${1780 + j * 8} 880`,
        "#b3a37d",
        0.8,
        0.18,
      ),
    );
  flourish(c, 900, 770, 620, "#93a6a1");
  if (quality.pass >= 5)
    for (let j = 0; j < 8; j++)
      c.add(
        path(`M${980 + j * 9} 830 l95 -44 95 44 -95 44Z`, "#a39f7b", 0.8, 0.3),
      );
  border(c, "#96a890");
}
