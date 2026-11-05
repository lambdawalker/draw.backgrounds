import { flower, engravedPavilion } from "../../geometry.js";
import { base, contours, orbit } from "./motifs.js";
export default function (c, p) {
  base(c, ["#eeebde", "#e7eadb", "#e7e7d9"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#9bab7d",
    0.18,
  );
  c.add(c.openGroup(`translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})`));
  orbit(c, 1030, 490, 125, 100, "#9ea88c", p);
  engravedPavilion(c, 1100, 800, 0.65, "#8e9c88");
  c.add(
    c.path(
      "M660 350 Q500 290 550 185 Q680 220 660 350 M680 340 Q800 310 850 215 Q715 210 680 340",
      "#a0ae85",
      1,
      0.18,
      "#b0b99a",
    ),
  );
  flower(c, 700, 285, 110, "#b7b89d", 0.22);
  flower(c, 530, 420, 77, "#bfc0a8", 0.22);
  contours(c, "#a3af9c", p, "vertical", 0.13);
  c.add(
    c.path("M490 500 Q610 410 700 285 Q740 220 815 180", "#8f9e7b", 1, 0.3),
  );
  c.add(
    c.path(
      "M660 350 Q610 260 550 185 M680 340 Q760 270 850 215",
      "#8e9c79",
      0.8,
      0.25,
    ),
  );
  for (let j = 0; j < 6; j++)
    c.add(
      c.path(
        `M${590 + j * 10} ${240 + j * 14} l${-16 + j} -4 m${16 - j} 4 l14 -13`,
        "#8e9c79",
        0.65,
        0.18,
      ),
    );
  c.add(c.path("M530 420 Q590 430 645 365", "#8e9c79", 0.8, 0.23));
  c.add(c.path("M905 825 Q1110 800 1300 825", "#9daa8b", 0.7, 0.22));
  c.add(c.closeGroup());
}
