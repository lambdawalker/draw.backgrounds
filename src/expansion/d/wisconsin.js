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
export default function (c, phase) {
  paper(c, "#eeeecf", "#dce4e6");
  waves(c, {
    phase,
    color: "#8193a5",
    opacity: 0.22,
    amplitude: 120,
    period: 190,
  });
  dome(c, 440, 750, 0.8, "#95a09a");
  leaf(c, 1170, 210, 1.1, "#7b9456");
  leaf(c, 1200, 730, 1.4, "#929e79");
  grid(c, {
    phase,
    color: "#a2a67a",
    opacity: 0.1,
    spacing: 17,
    amplitude: 42,
  });
  for (let j = 0; j < 12; j++)
    c.add(c.path(`M${150 + j * 18} 800q400 -55 700 10`, "#96a491", 0.65, 0.16));
  leaf(c, 70, 180, 0.9, "#a1ab7d");
  for (let j = 0; j < 6; j++)
    leaf(c, 1180 + j * 17, 400 + j * 35, 0.28, "#9aa77b");
  c.add(c.path("M299 754H581 M299 761H581 M340 614H540", "#95a09a", 1, 0.3));
  c.add(c.path("M340 614H540V630H340Z M340 622H540", "#95a09a", 0.8, 0.3));
  c.add(c.path("M426 437H454 M431 430H449 M440 425V407", "#95a09a", 0.8, 0.35));
  c.add(c.path("M300 776Q440 787 580 776", "#95a09a", 0.75, 0.23));
}
