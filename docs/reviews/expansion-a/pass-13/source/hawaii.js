import { paper, field, border, quality, path, leaf } from "./helpers.js";
import { flower, waves } from "../../geometry.js";
export default function (c, p) {
  paper(c, ["#dcebea", "#e8e8df", "#f0e1d8"]);
  field(c, "#8fadae", p);
  const colors = ["#cd9b9d", "#cbb39a", "#b7bf96", "#9bb7ae", "#9eaec3"];
  for (let j = 0; j < 5; j++)
    for (let k = 0; k < 8; k++)
      c.add(
        path(
          `M-170 ${770 + j * 19 + k * 2} Q650 ${-300 + j * 30 + k * 2} 1490 ${650 + j * 13 + k * 2}`,
          colors[j],
          1.2,
          0.28,
        ),
      );
  waves(c, {
    color: "#88b5b6",
    from: 690,
    to: 900,
    spacing: 9,
    amplitude: 17,
    period: 190,
    opacity: 0.26,
    phase: p,
  });
  for (let j = 0; j < 4; j++) {
    leaf(c, 1260, 760 - j * 85, 155, 190 + j * 15, "#79a593");
    flower(
      c,
      1300 - j * 54 + Math.sin(j * 2) * 14,
      700 - j * 95,
      quality.pass >= 3 ? 51 + j * 5 : 43,
      "#ba8f9c",
      0.33,
    );
  }
  if (quality.pass >= 5)
    for (let j = 0; j < 5; j++)
      c.add(
        path(
          `M${560 + j * 82 + Math.sin(j * 3) * 18} ${685 - j * 21 + Math.cos(j * 2) * 14} q${9 + j * 2} ${-12 - j * 3} ${21 + j * 5} -6 l-5 15Z`,
          "#a1b69c",
          0.7,
          0.38,
          "#b8c5a4",
        ),
      );
  for (let j = 0; j < 12; j++)
    c.add(
      path(
        `M500 ${790 + j * 4} Q680 ${710 + j * 4} 770 ${780 + j * 4} T1100 ${790 + j * 3}`,
        "#85aeb5",
        0.7,
        0.24,
      ),
    );
  for (let j = 0; j < 5; j++) {
    let x = 560 + j * 82 + Math.sin(j * 3) * 18,
      y = 685 - j * 21 + Math.cos(j * 2) * 14;
    c.add(
      path(
        `M${x - 7} ${y + 12} q${13 + j * 4} -4 ${35 + j * 4} 0`,
        "#8daaa4",
        0.8,
        0.4,
      ),
    );
  }
  border(c, "#9ebabb", 1);
}
