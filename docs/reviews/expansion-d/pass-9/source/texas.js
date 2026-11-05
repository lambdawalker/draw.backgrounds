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
  paper(c, "#d2e6ec", "#efdbbf");
  waves(c, {
    phase,
    color: "#ba8f8c",
    opacity: 0.23,
    amplitude: 65,
    period: 350,
  });
  c.add(
    polygon(
      [
        [750, 270],
        [990, 270],
        [990, 460],
        [1230, 460],
        [1230, 590],
        [1130, 640],
        [1040, 820],
        [930, 735],
        [820, 600],
        [690, 550],
        [610, 420],
        [750, 420],
      ],
      "#92b7bd",
      0.11,
    ),
  );
  dome(c, 1050, 710, 0.8, "#84a6b4");
  for (let j = 0; j < 22; j++)
    c.add(
      path(
        `M${720 + j * 22} 765V${695 + Math.sin(j) * 10}`,
        "#8aadb7",
        0.8,
        0.24,
      ),
    );
  grid(c, {
    phase,
    color: "#72a2b5",
    opacity: 0.16,
    spacing: 9,
    amplitude: 20,
  });
  c.add(
    path(
      "M970 690v-80h22v80 M1038 690v-80h22v80 M1106 690v-80h22v80",
      "#7c9caa",
      1,
      0.25,
    ),
  );
c.add(path('M908 720H1192 M908 727H1192 M970 586H1130 M970 590H1130','#7c9caa',1,.35));
}
