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
  samples,
} from "./helpers.js";
function drawCrescentMoon(c) {
  c.add(
    c.path(
      "M1100 160A75 75 0 1 0 1142 295A63 63 0 0 1 1100 160",
      "#9c9cc2",
      0,
      0.28,
      "#9c9cc2",
    ),
  );
}

function drawPalmTrunkRibs(c) {
  for (let j = 0; j < 16; j++)
    c.add(
      c.path(`M${980 + j * 0.8} ${780 - j * 13}l27 -6`, "#8d8ba0", 1, 0.25),
    );
}

function drawLeftPalmFronds(c) {
  for (let j = 0; j < 7; j++)
    c.add(
      c.path(
        `M${1020 - j * 20} ${464 - j * 6}q-40 -35 -90 -10`,
        "#9294ac",
        1,
        0.3,
      ),
    );
}

function drawGroundLine(c) {
  c.add(c.path("M830 810Q1050 775 1260 820", "#9faaa0", 1, 0.25));
}

function drawGroundStrokes(c) {
  for (let j = 0; j < 18; j++)
    c.add(c.path(`M${850 + j * 20} 832q15 -14 30 -8`, "#91a19f", 0.7, 0.2));
}

function drawPalmCrown(c) {
  c.add(
    c.path(
      "M1020 464q-80 -58 -150 -12 M1020 464q90 -45 162 12",
      "#9294ac",
      1.3,
      0.3,
    ),
  );
}

function drawPalmLeaflets(c) {
  for (let j = 0; j < 10; j++)
    c.add(
      c.path(
        `M${905 + j * 23} ${434 - Math.sin((j / 9) * Math.PI) * 56}l-12 26`,
        "#9294ac",
        0.9,
        0.2,
      ),
    );
}

function drawPalmTrunkOutline(c) {
  c.add(c.path("M1001 786Q985 630 1018 476", "#9294ac", 1, 0.35));
}

function drawPalmBaseContours(c) {
  c.add(
    c.path("M990 803q26 12 48 -3 M999 811q20 8 39 -2", "#91a19f", 0.75, 0.2),
  );
}

export default function (c, phase) {
  paper(c, "#f5e9e4", "#e4e9e5");
  grid(c, { phase, color: "#9b9a97", amplitude: 6, opacity: 0.16 });
  palm(c, 1020, 800, 1.4, "#9294ac");
  drawCrescentMoon(c);
  waves(c, {
    phase,
    color: "#a98694",
    opacity: 0.2,
    amplitude: 110,
    period: 250,
    from: 560,
    to: 850,
  });
  drawPalmTrunkRibs(c);
  drawLeftPalmFronds(c);
  drawGroundLine(c);
  drawGroundStrokes(c);
  drawPalmCrown(c);
  drawPalmLeaflets(c);
  drawPalmTrunkOutline(c);
  drawPalmBaseContours(c);
}
