import { paper, field, border, quality, dome, flourish } from "./helpers.js";
function drawRaceCarSilhouette(c) {
  if (quality.pass >= 5) {
    c.add(
      c.path(
        "M750 790 l40 -30 h135 l40 20 h70 l25 30 H730Z",
        "#728f84",
        1,
        0.3,
        "#c2cdc4",
      ),
    );
    c.add(c.ellipse(795, 813, 28, 18, "#879d94", 0.3));
    c.add(c.ellipse(1000, 813, 28, 18, "#879d94", 0.3));
    for (let j = 0; j < 11; j++)
      c.add(c.path(`M${770 + j * 20} 785 l20 -18`, "#728f84", 0.7, 0.35));
  }
}

function drawRaceCarBodyDetails(c) {
  c.add(
    c.path(
      "M831 777 l20 -18 h51 l22 18Z M788 804 h15 M992 804 h16 M750 793 H1042",
      "#718e83",
      0.8,
      0.48,
    ),
  );
}

function drawTireTreads(c) {
  for (const x of [795, 1000])
    for (let j = 0; j < 9; j++)
      c.add(c.path(`M${x - 18 + j * 4} 808 v10`, "#718e83", 0.6, 0.4));
}

function drawTireOutlines(c) {
  for (const x of [795, 1000]) {
    c.add(c.outlinedEllipse(x, 813, 22, 12, "#728e83", ".8", ".4"));
  }
}

function drawDomeTrim(c) {
  c.add(c.path("M690 494 H1354 M695 500 H1349", "#7e9d8e", 0.7, 0.4));
}

export default function (c, p) {
  paper(c, ["#e8ede4", "#e9e5d6", "#dce6e3"]);
  field(c, "#91aba4", p);
  dome(c, 1020, 690, 1.4, "#6d9185", "indiana");
  flourish(c, 790, 770, 760, "#aaa58c");
  drawRaceCarSilhouette(c);
  drawRaceCarBodyDetails(c);
  drawTireTreads(c);
  drawTireOutlines(c);
  drawDomeTrim(c);
  border(c, "#a1ad95");
}
