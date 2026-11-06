import { waves, ridge, pine } from "../../../../geometry.js";
import { base } from "./motifs.js";
function drawMountainStrata(c) {
  for (let j = 0; j < 18; j++)
    c.add(
      c.path(
        `M1100 100 L${950 + j * 13} ${300 + j * 9} L${900 + j * 10} ${480 + j * 5}`,
        "#708d97",
        0.8,
        0.16,
      ),
    );
}

function drawFoothillOutline(c) {
  c.add(c.path("M-20 800 Q450 680 690 760 T1440 660", "#7c958a", 1, 0.25));
}

function drawRockFissures(c) {
  for (let j = 0; j < 12; j++)
    c.add(
      c.path(
        `M${1140 + j * 9} ${260 + j * 15} l40 24 l38 -7 l35 30`,
        "#728d94",
        0.65,
        0.2,
      ),
    );
}

function drawMountainFace(c) {
  c.add(
    c.polygon(
      [
        [1100, 100],
        [1260, 200],
        [1330, 370],
        [1210, 310],
      ],
      "#7d9ba5",
      0.08,
    ),
  );
}

function drawFoothillContours(c) {
  for (let j = 0; j < 12; j++)
    c.add(
      c.path(
        `M-20 ${850 + j * 4} Q420 ${760 + j * 4} 680 ${810 + j * 4} T1450 ${750 + j * 4}`,
        "#aab393",
        0.65,
        0.23,
      ),
    );
}

function drawValleyContours(c) {
  for (let j = 0; j < 8; j++)
    c.add(
      c.path(
        `M${680 + j * 4} 500 Q${600 + j * 7} 630 ${730 + j * 8} 740 T${680 + j * 10} 950`,
        "#8ca5a4",
        0.65,
        0.21,
      ),
    );
}

export default function (c, p) {
  base(c, ["#e7ecee", "#efe9d9", "#e7e3d7"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#8aa5ac",
    0.18,
  );
  c.add(c.openGroup(`translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})`));
  ridge(
    c,
    [
      [-40, 380],
      [150, 230],
      [340, 360],
      [510, 420],
      [690, 440],
      [880, 330],
      [1100, 100],
      [1260, 200],
      [1450, 100],
    ],
    { fill: "#a5b5b7", ink: "#6e8c97", opacity: 0.4 },
  );
  waves(c, {
    from: 570,
    to: 900,
    spacing: 14,
    amplitude: 20,
    period: 220,
    color: "#9aa98a",
    phase: p,
    opacity: 0.25,
  });
  ridge(
    c,
    [
      [-40, 720],
      [180, 620],
      [420, 680],
      [640, 630],
      [920, 520],
      [1140, 580],
      [1450, 450],
    ],
    { fill: "#b4b89c", ink: "#8f9c81", opacity: 0.35 },
  );
  drawMountainStrata(c);
  for (let j = 0; j < 14; j++)
    pine(c, 900 + j * 40, 890, 35 + c.random() * 65, "#8f9c82", 0.2);
  drawFoothillOutline(c);
  drawRockFissures(c);
  drawMountainFace(c);
  drawFoothillContours(c);
  drawValleyContours(c);
  c.add(c.closeGroup());
}
