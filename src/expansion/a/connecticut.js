import { paper, field, border, quality, leaf, flourish } from "./helpers.js";
function drawRollingContours(c) {
  for (let j = 0; j < 30; j++)
    c.add(
      c.path(
        `M-50 ${680 + j * 7} Q350 ${470 + j * 8} 690 ${650 + j * 5} T1460 ${600 + j * 9}`,
        "#82a799",
        0.8,
        0.22,
      ),
    );
}

function drawVineStems(c) {
  for (let j = 0; j < 8; j++) {
    let x = 960 + j * 53,
      y = 680 - Math.sin(j * 0.6) * 180;
    c.add(
      c.path(`M${x} 820 Q${x - 30} 630 ${x} ${y - 180}`, "#748d8a", 1.1, 0.3),
    );
    for (let k = 0; k < 6; k++)
      leaf(
        c,
        x,
        y - k * 25,
        64 + (k % 2) * 20 + c.random() * 16,
        (k % 2 ? 205 : -20) + c.random() * 14 - 7,
        "#7c9a81",
      );
  }
}

function drawGrapeCluster(c) {
  if (quality.pass >= 5) {
    for (let j = 0; j < 32; j++)
      c.add(
        c.ellipse(
          1055 + Math.cos(j * 2.4) * (45 - j),
          550 + j * 3.5,
          8,
          9,
          "#9292a8",
          0.22,
        ),
      );
  }
}

function drawVineScrolls(c) {
  for (let j = 0; j < 7; j++)
    c.add(
      c.path(
        `M990 ${770 + j * 4} C820 500 1200 420 1080 320 C990 250 915 390 1020 400`,
        "#87a193",
        0.7,
        0.2,
      ),
    );
}

function drawGrapeHighlights(c) {
  for (let j = 0; j < 26; j++) {
    let x = 1055 + Math.cos(j * 2.4) * (45 - j),
      y = 550 + j * 3.5;
    c.add(c.path(`M${x - 3} ${y - 5} q3 -3 6 0`, "#faf8eb", 0.9, 0.65));
  }
}

function drawGrapeStem(c) {
  c.add(
    c.path(
      "M1055 553 Q1048 528 1062 512 M1050 535 l-18 -9",
      "#7b9985",
      0.8,
      0.4,
    ),
  );
}

export default function (c, p) {
  paper(c, ["#e5eee7", "#eee5dd", "#dbe9e6"]);
  field(c, "#7d9d9a", p);
  drawRollingContours(c);
  drawVineStems(c);
  flourish(c, 1050, 240, 410, "#b6a790");
  drawGrapeCluster(c);
  drawVineScrolls(c);
  drawGrapeHighlights(c);
  drawGrapeStem(c);
  border(c, "#8daca6", 1);
}
