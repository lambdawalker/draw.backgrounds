import {ellipse} from "../../geometry.js";
import {
  paper,
  field,
  border,
  quality,
  path,
  leaf,
  flourish,
} from "./helpers.js";
export default function (c, p) {
  paper(c, ["#e9eeee", "#eee3d6", "#d6e4e5"]);
  field(c, "#92a6b0", p);
  for (let j = 0; j < 42; j++)
    c.add(
      path(`M${-500 + j * 36} 0 L${850 + j * 36} 880`, "#9cb8b4", 0.7, 0.19),
    );
  const shape =
    "M690 240 Q880 220 1010 250 Q1000 305 1080 335 Q1070 405 1145 470 Q1160 570 1180 590 Q1190 630 1220 665 Q1210 690 1190 710 Q1160 690 1150 665 Q1110 610 1095 570 Q1075 530 1050 520 Q1010 470 1000 420 Q970 390 960 350 L690 340Z";
  c.add(path(shape, "#7a9e9a", 1, 0.27, "#abc3b7"));
  if (quality.pass >= 3) {
    let g = "";
    for (let j = 0; j < 75; j++)
      g += path(`M650 ${220 + j * 7} l700 200`, "#6e9f9e", 0.6, 0.23);
    c.clip(path(shape, "none", 0, 1, "white"), g);
  }
  flourish(c, 1040, 720, 600, "#8faebd");
  if (quality.pass >= 5) {
    c.add(path("M1265 870 Q1232 690 1258 560 L1263 560 Q1245 690 1277 870Z", "#90a5a0", .8, .3,"#aec3b6"));for(let j=0;j<28;j++){let t=j/28;c.add(path(`M${1256-12*Math.sin(t*3)} ${570+t*290} l${5+t*6} -3`,"#759a86",.65,.35));}
    for (let j = 0; j < 9; j++) {
      let a = j * 0.7;
      let dx = Math.cos(a) * 190,
        dy = Math.sin(a) * 110;
      c.add(
        path(
          `M1260 560 Q${1260 + dx * 0.6} ${500 + dy * 0.5} ${1260 + dx} ${560 + dy}`,
          "#668d7d",
          1.2,
          0.5,
        ),
      );
      for (let k = 1; k < 14; k++) {
        let t = k / 14;
        c.add(
          path(
            `M${1260 + dx * t} ${560 + dy * t - 60 * Math.sin(t * Math.PI)} l${-20 + 40 * t} ${30 + 15 * t}`,
            "#668d7d",
            0.9,
            0.4,
          ),
        );
      }
    }
  }
  for (let j = 0; j < 22; j++)
    c.add(
      path(
        `M500 ${740 + j * 5} Q800 ${700 + j * 6} 1030 ${760 + j * 4} T1430 ${730 + j * 7}`,
        "#8baeb6",
        0.7,
        0.22,
      ),
    );
  for(let j=0;j<3;j++)c.add(ellipse(1255+j*7,568+Math.sin(j)*8,7,9,"#8aa28b",.35));
  border(c, "#93b2b5", 1);
}
