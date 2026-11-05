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
  base(c, ["#e8edf0", "#eee8dc", "#dce8e2"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#8facab",
    0.18,
  );
  c.add(`<g transform="translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})">`);
  orbit(c, 825, 445, 180, 150, "#7a9298", p);
  engravedPavilion(c, 850, 740, 0.94, "#829391");
  for (let j = 0; j < 5; j++)
    c.add(
      path(
        `M${580 - j * 8} ${746 + j * 7} H${1120 + j * 8}`,
        "#829391",
        1,
        0.4,
      ),
    );
  for (let j = 0; j < 22; j++)
    c.add(
      path(
        `M${430 + j * 8} 870 Q${180 + j * 22} 300 ${900 + j * 9} 30`,
        "#829ba1",
        0.8,
        0.13,
      ),
    );
  for (let j = 0; j < 18; j++)
    c.add(
      path(
        `M${380 + j * 9} 0 Q${1170 - j * 14} 360 ${600 + j * 10} 880`,
        "#9cae9b",
        0.65,
        0.09,
      ),
    );
  c.add(path("M430 810 Q850 760 1280 810", "#92a797", 0.8, 0.24));
for(let j=0;j<10;j++)c.add(path(`M${600-j*5} ${640+j*5} Q520 ${570+j*5} ${580-j*3} ${500+j*8}`,'#95a7a4',.65,.18));
for(let j=0;j<7;j++)c.add(path(`M${1110+j*5} ${675+j*4} Q1190 ${620+j*3} ${1140+j*3} ${570+j*6}`,'#95a7a4',.65,.15));
  c.add("</g>");
}
