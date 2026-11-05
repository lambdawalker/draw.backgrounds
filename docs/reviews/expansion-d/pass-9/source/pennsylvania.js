import {
  paper,
  grid,
  waves,
  rosette,
  pine,
  ridge,
  flower,
  dome,
  leaf,
  fan,
  palm,
  rect,
  path,
  line,
  polygon,
  ellipse,
  samples,
} from "./helpers.js";
export default function (c, phase) {
  paper(c, "#ccece7", "#f7dfb9");
  fan(c, 720, 500, "#879baf");
  waves(c, {
    phase,
    color: "#b3828c",
    opacity: 0.2,
    amplitude: 95,
    period: 310,
  });
  rosette(c, 980, 480, 155, "#82a6a3", { rings: 24, lobes: 12, opacity: 0.22 });
  grid(c, {
    phase,
    vertical: false,
    amplitude: 28,
    color: "#7aafb0",
    opacity: 0.12,
    spacing: 6,
  });
  c.glow(1000, 380, 440, 340, "#f5df9e", 0.28);
  for (let j = 0; j < 40; j++)
    c.add(
      path(
        `M0 ${40 + j * 18}Q650 ${200 + j * 12} 1400 ${-30 + j * 22}`,
        "#ba9aaa",
        0.7,
        0.16,
      ),
    );
  rosette(c, 980, 480, 132, "#b1ab8d", {
    rings: 9,
    lobes: 12,
    amplitude: 10,
    opacity: 0.14,
  });
for(let j=0;j<15;j++)c.add(path(`M0 ${690+j*6}Q430 ${610+j*8} 760 ${730+j*3}T1400 ${650+j*9}`,'#9c9cba',.65,.16));
}
