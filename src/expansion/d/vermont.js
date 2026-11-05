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
  c.add(path("M0 780Q400 670 760 770T1400 720", "#8d9f7a", 2, 0.25));
  leaf(c, 1230, 650, 0.7, "#a2a06c");
  dome(c, 940, 800, 0.75, "#8c9c76");
c.add(path('M809 805H1071 M809 810H1071 M850 686H1030','#8c9c76',1,.35));
c.add(path('M846 673H1034V688H846Z M846 680H1034','#8c9c76',.8,.3));
}
