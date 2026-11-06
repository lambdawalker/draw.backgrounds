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
  base(c, p + 1.35, "#e2eaf0", "#e8e4dd", "#8b9db4");
  const m = ridge(
    c,
    [
      [0, 720],
      [370, 690],
      [580, 510],
      [690, 570],
      [830, 320],
      [930, 470],
      [1020, 280],
      [1140, 510],
      [1260, 380],
      [1400, 600],
    ],
    { fill: "#b1bccb", ink: "#879bae", opacity: 0.29 },
  );
  snowOnRidge(c, m, { lineY: 395, opacity: 0.65 });
  fireweed(c, 1240, 860, 1.1, "#b692ad");
  shore(c, "#91a9b9", 840, 20);
}
