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
      c.path(
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
  for (let j = 0; j < 15; j++)
    c.add(
      c.path(
        `M0 ${690 + j * 6}Q430 ${610 + j * 8} 760 ${730 + j * 3}T1400 ${650 + j * 9}`,
        "#9c9cba",
        0.65,
        0.16,
      ),
    );
  c.glow(340, 620, 600, 300, "#c2d5dd", 0.16);
  for (let j = 0; j < 20; j++)
    c.add(c.path(`M${910 + j * 7} 585q35 30 70 0`, "#b1ab8d", 0.6, 0.15));
  for (let j = 0; j < 9; j++)
    c.add(c.path(`M${715 + j * 10} 443q-22 38 0 75`, "#82a6a3", 0.65, 0.12));
  c.add(
    c.path(
      "M775 615Q980 670 1180 600 M790 622Q980 675 1162 613",
      "#a7aaa3",
      0.65,
      0.14,
    ),
  );
}
