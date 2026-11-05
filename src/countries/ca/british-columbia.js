import {
  base,
  fireweed,
  trillium,
  iris,
  samples,
  waves,
  ridge,
  snowOnRidge,
  pine,
  flower,
  shore,
  branch,
  lily,
  grasses,
  iceberg,
} from "./helpers.js";
export default function (c, p) {
  base(c, p + 4.32, "#e3eff6", "#dfebdf", "#719aab");
  ridge(
    c,
    [
      [0, 690],
      [330, 670],
      [570, 540],
      [710, 390],
      [850, 530],
      [1010, 350],
      [1160, 530],
      [1400, 490],
    ],
    { fill: "#abc8c8", ink: "#7a9caa", opacity: 0.28 },
  );
  shore(c, "#689eaf", 720, 30);
  for (let j = 0; j < 12; j++)
    pine(c, 900 + j * 46, 900, 180 + c.random() * 180, "#7fa296", 0.22);
  for (let j = 0; j < 3; j++)
    lily(c, 1120 + j * 90, 300 + j * 60, 0.45, "#bbaac0");
}
