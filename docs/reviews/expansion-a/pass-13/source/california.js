import {
  paper,
  field,
  border,
  quality,
  leaf,
  flourish,
  path,
} from "./helpers.js";
import { flower, waves } from "../../geometry.js";
export default function (c, p) {
  paper(c, ["#e9eeee", "#e8e2d8", "#f0e8df"]);
  field(c, "#99a1ac", p);
  waves(c, {
    color: "#b59ca7",
    from: 130,
    to: 880,
    spacing: 12,
    amplitude: 55,
    period: 340,
    phase: p,
    opacity: 0.19,
  });
  for (let j = 0; j < 5; j++) {
    let x = 1120 + j * 57 + Math.sin(j * 2) * 17,
      y = 830 - j * 112 + Math.cos(j * 1.8) * 13;
    c.add(
      path(
        `M${x - 90} 920 Q${x + 30} ${y + 50} ${x} ${y - 130}`,
        "#789a94",
        1,
        0.4,
      ),
    );
    leaf(c, x, y, 140, 205, "#789c91");
    leaf(c, x, y - 75, 120, -45, "#789c91");
    flower(c, x, y - 135, quality.pass >= 3 ? 50 : 40, "#cba978", 0.3);
  }
  flourish(c, 1000, 450, 380, "#7b949f");
  if (quality.pass >= 5)
    for (let j = 0; j < 5; j++)
      flower(c, 100 + j * 95, 850 - j * 16, 29 + (j % 3) * 5, "#c4a486", 0.23);
  for (let j = 0; j < 16; j++)
    c.add(
      path(
        `M${1050 + j * 8} 820 Q${1100 + j * 7} 620 ${1190 + j * 9} 400`,
        "#b3a18c",
        0.6,
        0.18,
      ),
    );
  for (let j = 0; j < 12; j++)
    c.add(
      path(
        `M1350 ${860 - j * 3} C850 550 1380 300 1210 ${240 - j * 4} S820 420 1100 ${520 + j * 3}`,
        "#7c9b8f",
        0.7,
        0.2,
      ),
    );
  for (let j = 0; j < 5; j++) {
    let x = 1120 + j * 57 + Math.sin(j * 2) * 17,
      y = 695 - j * 112 + Math.cos(j * 1.8) * 13;
    for (let k = 0; k < 9; k++) {
      let a = (k * Math.PI * 2) / 9;
      c.add(
        path(
          `M${x} ${y} l${Math.cos(a) * 13} ${Math.sin(a) * 13}`,
          "#b89767",
          0.8,
          0.4,
        ),
      );
    }
  }
  border(c, "#9b9db5");
}
