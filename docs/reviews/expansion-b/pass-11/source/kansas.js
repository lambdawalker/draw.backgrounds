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
  base(c, ["#e6eff2", "#f4f3d5", "#e7e6c8"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#ccb96c",
    0.18,
  );
  c.add(`<g transform="translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})">`);
  contours(c, "#aab1a2", p);
  for (let j = 0; j < 10; j++)
    c.add(
      path(
        `M-40 ${650 + j * 16} Q470 ${500 + j * 12} 1450 ${730 + j * 9}`,
        "#a6aa78",
        1,
        0.23,
      ),
    );
  for (let j = 0; j < 6; j++)
    wheat(c, 975 + j * 50, 890, 0.62 + c.random() * 0.46, "#919761");
  c.add(
    path(
      "M-20 770 Q280 640 580 710 T1450 755 L1450 900 H-20Z",
      "#a6b28a",
      0.8,
      0.11,
      "#a6b28a",
    ),
  );
  wheat(c, 880, 885, 0.62, "#8f986c");
  for (let j = 0; j < 35; j++)
    c.add(
      line(
        samples(
          (a) => [
            250 + Math.cos(a) * (400 + j * 4),
            190 + Math.sin(a) * (150 + j * 4),
          ],
          0,
          Math.PI * 2,
          0.025,
        ),
        "#b3a770",
        0.7,
        0.16,
      ),
    );
  for (let j = 0; j < 6; j++)
    c.add(
      path(
        `M${975 + j * 50} 830 Q${955 + j * 50} 750 ${995 + j * 50} 690`,
        "#7e8c60",
        0.65,
        0.25,
      ),
    );
  for (let j = 0; j < 15; j++)
    c.add(
      path(
        `M-30 ${820 + j * 4} Q400 ${720 + j * 5} 750 ${795 + j * 4}`,
        "#a4a676",
        0.6,
        0.24,
      ),
    );
  for (let j = 0; j < 15; j++)
    c.add(
      path(
        `M-40 ${70 + j * 7} Q650 ${220 + j * 5} 1440 ${85 + j * 8}`,
        "#b9b07d",
        0.65,
        0.15,
      ),
    );
for(let j=0;j<6;j++){const x=975+j*50;c.add(path(`M${x} 855 Q${x-35} 820 ${x-48} 780 Q${x-9} 800 ${x} 855`,'#8e986b',.7,.2,'#a5ad84'));}
  c.add("</g>");
}
