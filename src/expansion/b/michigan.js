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
  base(c, ["#f0e9ed", "#f5f2e8", "#e5eaed"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#b798b5",
    0.18,
  );
  c.add(`<g transform="translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})">`);
  orbit(c, 850, 450, 100, 95, "#aa8d9a", p);
  contours(c, "#9c99a6", p, "horizontal", 0.13);
  orbit(c, 990, 390, 170, 110, "#9d91a5", p + 0.5);
  grid(c, {
    color: "#9c9aaa",
    opacity: 0.13,
    spacing: 15,
    amplitude: 40,
    phase: p,
  });
  for (let j = 0; j < 14; j++)
    c.add(
      line(
        samples(
          (a) => [
            930 + (245 + j * 9) * Math.cos(a),
            440 + (180 + j * 6) * Math.sin(a),
          ],
          0,
          Math.PI * 2,
          0.02,
        ),
        "#a18d9d",
        0.75,
        0.25,
      ),
    );
  for (let j = 0; j < 20; j++)
    c.add(
      path(
        `M0 ${300 + j * 8} C450 ${100 + j * 7} 820 ${760 - j * 3} 1400 ${530 + j * 6}`,
        "#afa28c",
        0.75,
        0.17,
      ),
    );
  for (let j = 0; j < 45; j++)
    c.add(
      line(
        samples(
          (a) => [j * 34 + 18 * Math.cos(a), 835 + 8 * Math.sin(a)],
          0,
          Math.PI * 2,
          0.15,
        ),
        "#9e93a7",
        0.6,
        0.15,
      ),
    );
for(let j=0;j<12;j++)c.add(path(`M-20 ${50+j*6} Q690 ${200+j*5} 1430 ${35+j*6}`,'#b0a5b2',.65,.16));
for(let j=0;j<5;j++)c.add(line(samples(a=>[930+(320+j*4)*Math.cos(a),440+(230+j*3)*Math.sin(a)],0,Math.PI*2,.02),'#b59f8d',.7,.17));
  c.add("</g>");
}
