import {
  paper,
  field,
  border,
  quality,
  dome,
  path,
  leaf,
  flourish,
} from "./helpers.js";
export default function (c, p) {
  paper(c, ["#ece8dc", "#eee6d7", "#dfe6d9"]);
  field(c, "#a79e86", p);
  dome(c, 1085, 790, 1.65, "#8f8969", "iowa");
  for (let j = 0; j < 24; j++)
    c.add(
      path(
        `M${270 + j * 4} 880 Q${400 + j * 5} 410 ${1110 + j * 4} 95`,
        "#a7ad94",
        0.8,
        0.18,
      ),
    );
  if (quality.pass >= 5) {
    c.add(path("M780 880 Q760 680 740 500", "#8c9466", 1.1, 0.4));
    for (let j = 0; j < 9; j++) {
      leaf(c, 755, 600 + j * 25, 80, 205, "#a5ad86");
      leaf(c, 755, 610 + j * 25, 75, -35, "#a5ad86");
    }
  }
  flourish(c, 700, 830, 690, "#aaa58a");
  border(c, "#a6a186", 1);
}
