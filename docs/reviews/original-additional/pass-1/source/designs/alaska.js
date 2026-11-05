import {
  rect,
  grid,
  ridge,
  flower,
  pine,
  line,
  snowOnRidge,
  path,
  waves,
  rockEtching,
} from "../geometry.js";
export default function (c, p) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, "#f5ede8"],
        [45, "#e6f1e5"],
        [100, "#d7e6e9"],
      ]),
    ),
  );
  grid(c, {
    phase: p,
    spacing: 12,
    amplitude: 12,
    color: "#8aaa9f",
    opacity: 0.24,
  });
  c.glow(1000, 70, 650, 210, "#e0a1b9", 0.32);
  const mountain = ridge(
    c,
    [
      [-80, 680],
      [120, 600],
      [280, 570],
      [400, 500],
      [580, 310],
      [670, 390],
      [820, 235],
      [960, 430],
      [1090, 370],
      [1250, 540],
      [1480, 610],
    ],
    { fill: "#b2cddc", ink: "#6698ac", opacity: 0.6 },
  );
  snowOnRidge(c, mountain, { lineY: 405 });
  rockEtching(
    c,
    [
      [400, 500],
      [580, 310],
      [670, 390],
      [820, 235],
      [960, 430],
      [1090, 370],
      [1250, 540],
    ],
    { opacity: 0.15 },
  );
  ridge(
    c,
    [
      [-20, 760],
      [200, 695],
      [420, 740],
      [630, 650],
      [870, 700],
      [1120, 620],
      [1430, 675],
    ],
    { fill: "#96c3af", ink: "#719e93", opacity: 0.35 },
  );
  c.add(path("M30 900 Q100 690 55 520 T70 340", "#829e83", 1.2, 0.4));
  for (let j = 0; j < 12; j++) {
    let y = 370 + j * 41,
      x = 53 + 35 * Math.sin(j * 2.2);
    flower(c, x, y, 16 + (j % 3) * 5 + Math.sin(j * 1.7) * 2, "#bd7c99", 0.43);
  }
  waves(c, {
    color: "#7faca4",
    opacity: 0.22,
    from: -50,
    to: 145,
    spacing: 6,
    amplitude: 18,
    period: 31,
    phase: p + 1.6,
  });
  waves(c, {
    color: "#bf8ea5",
    opacity: 0.27,
    from: -30,
    to: 125,
    spacing: 6,
    amplitude: 12,
    period: 35,
    phase: p,
  });
  for (let j = 0; j < 7; j++)
    pine(c, 1080 + j * 45, 850, 75 + (j % 3) * 20, "#69958b", 0.25);
}
