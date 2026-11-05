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
    path(
      "M740 730V570H1160V730 M880 570V470H1020V570 M860 470H1040 M950 470V410",
      "#739e9f",
      1.6,
      0.45,
    ),
  );
  for (let j = 0; j < 17; j++)
    c.add(path(`M${760 + j * 23} 720V590`, "#739e9f", 1, 0.4));
  for (let j = 0; j < 9; j++) flower(c, 450 + j * 95, 810, 28, "#d7bda1", 0.35);
  for (let j = 0; j < 18; j++)
    c.add(path(`M${820 + j * 11} 560V490`, "#739e9f", 0.7, 0.3));
  c.glow(1120, 270, 320, 400, "#d7b8ba", 0.32);
  for (let j = 0; j < 8; j++)
    flower(c, 600 + j * 88, 760 + (j % 3) * 32, 18, "#d6b994", 0.3);
}
