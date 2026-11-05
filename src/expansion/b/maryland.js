import {
  rect,
  path,
  line,
  ellipse,
  polygon,
  samples,
  waves,
  grid,
  rosette,
  ridge,
  pine,
  flower,
  engravedPavilion,
} from "../../geometry.js";
import { base, contours, wheat, dome, leaves, orbit } from "./motifs.js";
export default function (c, p) {
  base(c, ["#f7efcc", "#eee7e6", "#ece1cf"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#c39790",
    0.18,
  );
  c.add(`<g transform="translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})">`);
  for (let j = -1; j < 6; j++) {
    c.add(
      polygon(
        [
          [j * 280, 0],
          [j * 280 + 130, 0],
          [j * 280 + 130, 440],
          [j * 280 + 280, 440],
        ],
        "#b6a895",
        0.15,
      ),
    );
    c.add(
      polygon(
        [
          [j * 280, 440],
          [j * 280 + 140, 440],
          [j * 280 + 140, 880],
          [j * 280 + 280, 880],
        ],
        "#d49b9c",
        0.16,
      ),
    );
  }
  contours(c, "#a99aa0", p, "vertical", 0.15);
  c.add(
    path(
      "M-100 400 L1500 810 L1500 950 L-100 540Z",
      "#eee8de",
      0.5,
      0.55,
      "#eee8de",
    ),
  );
  waves(c, {
    from: 440,
    to: 640,
    slope: 0.12,
    spacing: 7,
    amplitude: 8,
    color: "#b6a49a",
    opacity: 0.26,
    phase: p,
  });
  for (let j = 0; j < 100; j++)
    c.add(path(`M${j * 15 - 90} 0 l90 95`, "#b3a185", 0.8, 0.2));
  c.add("</g>");
  for (let j = 0; j < 12; j++)
    c.add(
      path(`M-50 ${270 + j * 5} L1450 ${600 + j * 5}`, "#c6b896", 0.65, 0.17),
    );
}
