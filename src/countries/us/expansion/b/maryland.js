import { waves } from "../../../../geometry.js";
import { base, contours } from "./motifs.js";
function drawCheckerPanels(c) {
  for (let j = -1; j < 6; j++) {
    c.add(
      c.polygon(
        [
          [j * 280, 0],
          [j * 280 + 130, 0],
          [j * 280 + 130, 440],
          [j * 280 + 280, 440],
        ],
        "#b6a895",
        0.15,
      ),
    );
    c.add(
      c.polygon(
        [
          [j * 280, 440],
          [j * 280 + 140, 440],
          [j * 280 + 140, 880],
          [j * 280 + 280, 880],
        ],
        "#d49b9c",
        0.16,
      ),
    );
  }
}

function drawDiagonalRibbon(c) {
  c.add(
    c.path(
      "M-100 400 L1500 810 L1500 950 L-100 540Z",
      "#eee8de",
      0.5,
      0.55,
      "#eee8de",
    ),
  );
}

function drawUpperHatching(c) {
  for (let j = 0; j < 100; j++)
    c.add(c.path(`M${j * 15 - 90} 0 l90 95`, "#b3a185", 0.8, 0.2));
}

function drawRibbonEngraving(c) {
  for (let j = 0; j < 12; j++)
    c.add(
      c.path(`M-50 ${270 + j * 5} L1450 ${600 + j * 5}`, "#c6b896", 0.65, 0.17),
    );
}

function drawLowerHatching(c) {
  for (let j = 0; j < 18; j++)
    c.add(c.path(`M${j * 85 - 100} 880 l370 -430`, "#bfa2a2", 0.65, 0.1));
}

function drawCornerContours(c) {
  for (let j = 0; j < 16; j++)
    c.add(
      c.path(
        `M${1120 + j * 10} -30 Q${1000 + j * 12} 150 ${1530 + j * 6} ${270 + j * 8}`,
        "#c39d9e",
        0.7,
        0.2,
      ),
    );
}

export default function (c, p) {
  base(c, ["#f7efcc", "#eee7e6", "#ece1cf"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#c39790",
    0.18,
  );
  c.add(c.openGroup(`translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})`));
  drawCheckerPanels(c);
  contours(c, "#a99aa0", p, "vertical", 0.15);
  drawDiagonalRibbon(c);
  waves(c, {
    from: 440,
    to: 640,
    slope: 0.12,
    spacing: 7,
    amplitude: 8,
    color: "#b6a49a",
    opacity: 0.26,
    phase: p,
  });
  drawUpperHatching(c);
  drawRibbonEngraving(c);
  drawLowerHatching(c);
  drawCornerContours(c);
  c.add(c.closeGroup());
}
