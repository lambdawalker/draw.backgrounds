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
function drawPrairieContours(c) {
  for (let j = 0; j < 32; j++)
    c.add(
      c.line(
        samples(
          (x) => [x, 650 + j * 7 + 35 * Math.sin(x / 370 + j * 0.08)],
          -50,
          1450,
          10,
        ),
        "#aaa970",
        0.8,
        0.3,
      ),
    );
}

export default function (c, p) {
  base(c, p + 3.24, "#e4ebd4", "#eee8cf", "#9cab86");
  drawPrairieContours(c);
  grasses(c, 1080, 870, 1.8, "#b29e65");
  lily(c, 1090, 390, 1, "#cfb09c");
  lily(c, 1260, 520, 0.6, "#cfb09c");
}
