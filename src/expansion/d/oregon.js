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
  paper(c, "#e1eff2", "#dce7b9");
  grid(c, { phase, opacity: 0.16, color: "#668e98" });
  ridge(
    c,
    [
      [0, 650],
      [340, 530],
      [620, 590],
      [900, 280],
      [1170, 520],
      [1400, 460],
    ],
    { fill: "#abc0bd", ink: "#6b9090", opacity: 0.24 },
  );
  for (let j = 0; j < 12; j++)
    pine(c, 880 + j * 49, 890, 130 + c.random() * 130, "#6e946e", 0.25);
  c.add(
    c.path(
      "M740 730V570H1160V730 M880 570V470H1020V570 M860 470H1040 M950 470V410",
      "#739e9f",
      1.6,
      0.45,
    ),
  );
  for (let j = 0; j < 17; j++)
    c.add(c.path(`M${760 + j * 23} 720V590`, "#739e9f", 1, 0.4));
  for (let j = 0; j < 9; j++) flower(c, 450 + j * 95, 810, 28, "#d7bda1", 0.35);
  for (let j = 0; j < 18; j++)
    c.add(c.path(`M${820 + j * 11} 560V490`, "#739e9f", 0.7, 0.3));
  c.glow(1120, 270, 320, 400, "#d7b8ba", 0.32);
  for (let j = 0; j < 8; j++)
    flower(c, 600 + j * 88, 760 + (j % 3) * 32, 18, "#d6b994", 0.3);
  c.add(
    c.path(
      "M742 733H1160 M870 573H1030 M870 579H1030 M884 467H1016",
      "#71949b",
      1.2,
      0.4,
    ),
  );
  for (let j = 0; j < 6; j++)
    c.add(
      c.path(
        `M${680 + j * 67} 845q-12 -42 7 -64 M${680 + j * 67} 825q-24 -18 -32 -8`,
        "#a8ad85",
        0.8,
        0.25,
      ),
    );
  for (let j = 0; j < 8; j++)
    c.add(
      c.path(`M${772 + j * 45} 698V640q9 -12 18 0V698Z`, "#71949b", 0.7, 0.25),
    );
  c.add(
    c.path(
      "M740 738Q950 755 1170 738 M800 748Q980 765 1130 752",
      "#98a995",
      0.75,
      0.25,
    ),
  );
  c.add(c.path("M805 729V716H1118V729 M871 575H1028", "#71949b", 0.65, 0.25));
}
