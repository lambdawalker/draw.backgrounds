import { waves, pine } from "../../geometry.js";
import { base } from "./motifs.js";
function drawShoreSilhouette(c) {
  c.add(
    c.path(
      "M-20 630 Q360 660 640 570 Q920 530 1430 590 L1430 630 Q900 565 640 600 Q300 700 -20 650Z",
      "#9dad99",
      1,
      0.17,
      "#a7b89c",
    ),
  );
}

function drawLakeReflections(c) {
  for (let j = 0; j < 18; j++)
    c.add(
      c.path(
        `M${650 + (j % 3) * 40} ${670 + j * 8} h${280 - j * 7}`,
        "#7e9da4",
        0.8,
        0.19,
      ),
    );
}

function drawSkyContours(c) {
  for (let j = 0; j < 28; j++)
    c.add(
      c.path(
        `M-30 ${100 + j * 8} Q650 ${-60 + j * 12} 1430 ${240 + j * 5}`,
        "#9baebc",
        0.6,
        0.16,
      ),
    );
}

function drawCurvedReflections(c) {
  for (let j = 0; j < 14; j++)
    c.add(
      c.path(
        `M${760 + j * 5} ${690 + j * 8} Q900 ${684 + j * 8} ${1110 - j * 8} ${692 + j * 8}`,
        "#90abb0",
        0.75,
        0.2,
      ),
    );
}

export default function (c, p) {
  base(c, ["#e5eaf1", "#edf1e8", "#e3e9e7"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#83a9b8",
    0.18,
  );
  c.add(c.openGroup(`translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})`));
  for (let j = 0; j < 12; j++)
    pine(c, 580 + j * 65, 590, 105 + c.random() * 145, "#7d9b8f", 0.22);
  waves(c, {
    from: 610,
    to: 900,
    color: "#83a6b6",
    amplitude: 12,
    spacing: 13,
    opacity: 0.24,
    phase: p,
  });
  drawShoreSilhouette(c);
  for (let j = 0; j < 21; j++)
    pine(
      c,
      360 + j * 48 + (c.random() - 0.5) * 22,
      570,
      60 + c.random() * 100,
      "#829b99",
      0.1,
    );
  drawLakeReflections(c);
  drawSkyContours(c);
  drawCurvedReflections(c);
  c.add(c.closeGroup());
}
