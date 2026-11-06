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
function drawHillsideOutline(c) {
  c.add(c.path("M0 780Q400 670 760 770T1400 720", "#8d9f7a", 2, 0.25));
}

function drawStateHouseTrim(c) {
  c.add(
    c.path("M809 805H1071 M809 810H1071 M850 686H1030", "#8c9c76", 1, 0.35),
  );
}

function drawDomeDrum(c) {
  c.add(c.path("M846 673H1034V688H846Z M846 680H1034", "#8c9c76", 0.8, 0.3));
}

function drawCupolaTrim(c) {
  c.add(
    c.path("M928 508H952 M933 501H947 M940 496V481", "#8c9c76", 0.85, 0.35),
  );
}

function drawGroundLine(c) {
  c.add(c.path("M802 822Q938 837 1078 823", "#8c9c76", 0.75, 0.23));
}

export default function (c, phase) {
  paper(c, "#dceadb", "#d5dfb4");
  ridge(
    c,
    [
      [0, 650],
      [240, 570],
      [480, 620],
      [780, 410],
      [1050, 530],
      [1210, 470],
      [1400, 570],
    ],
    { fill: "#9caf8a", ink: "#779474", opacity: 0.24 },
  );
  waves(c, { phase, color: "#70956e", opacity: 0.15, amplitude: 48 });
  leaf(c, 1140, 310, 1.7, "#7a9b66");
  for (let j = 0; j < 10; j++)
    pine(c, 900 + j * 50, 880, 100 + c.random() * 80, "#77956e", 0.15);
  drawHillsideOutline(c);
  leaf(c, 1230, 650, 0.7, "#a2a06c");
  dome(c, 940, 800, 0.75, "#8c9c76");
  drawStateHouseTrim(c);
  drawDomeDrum(c);
  drawCupolaTrim(c);
  drawGroundLine(c);
}
