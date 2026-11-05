import {
  samples,
  grid,
  waves,
  rosette,
  pine,
  ridge,
  flower,
} from "../../geometry.js";
export { samples, grid, waves, rosette, pine, ridge, flower };
export function paper(c, a, b) {
  const tint = (h) => {
    const v = [1, 3, 5].map((i) =>
      Math.max(
        0,
        Math.min(
          255,
          parseInt(h.slice(i, i + 2), 16) + Math.floor(c.random() * 15) - 7,
        ),
      ),
    );
    return `rgb(${v.join(",")})`;
  };
  c.add(
    c.rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, tint(a)],
        [50, "#faf9ef"],
        [100, tint(b)],
      ]),
    ),
  );
}
export function dome(c, x, y, s, ink) {
  const g = [
    c.path(
      "M-160 0V-150H160V0 M-175 -150H175 M-125 -170Q-115 -330 0 -340Q115 -330 125 -170Z M-20 -340V-390H20V-340 M0 -390V-430",
      ink,
      1.5,
      0.55,
      "#e5e5ce",
    ),
  ];
  for (let j = -6; j <= 6; j++)
    g.push(
      c.path(
        `M${j * 23 - 5} -10V-140h10V-10 M${j * 18} -175Q${j * 12} -280 ${j * 3} -332`,
        ink,
        0.9,
        0.45,
      ),
    );
  for (let j = -5; j <= 5; j++) {
    const xx = j * 26;
    g.push(
      c.path(
        `M${xx - 5} -35V-91Q${xx} -105 ${xx + 5} -91V-35Z`,
        ink,
        0.65,
        0.27,
      ),
    );
  }
  for (let j = 0; j < 5; j++) g.push(c.path(`M-175 ${j * 7}H175`, ink, 1, 0.5));
  c.add([c.openGroup(`translate(${x} ${y}) scale(${s})`), g, c.closeGroup()]);
}
export function leaf(c, x, y, s, ink) {
  const pts = [
    [0, 50],
    [-12, 24],
    [-52, 22],
    [-37, 2],
    [-65, -22],
    [-34, -24],
    [-30, -57],
    [-9, -40],
    [0, -79],
    [14, -42],
    [39, -60],
    [34, -25],
    [65, -20],
    [42, 3],
    [53, 24],
    [14, 26],
  ];
  c.add([
    c.openGroup(`translate(${x} ${y}) scale(${s})`),
    c.polygon(pts, ink, 0.22),
    c.path(
      "M0 62V-64 M0 0L-40 -17 M0 0L41 -17 M0 -14L-23 -39 M0 -14L24 -41",
      ink,
      1.4,
      0.5,
    ),
    c.closeGroup(),
  ]);
}
export function fan(c, x, y, ink) {
  for (let j = 0; j < 100; j++) {
    const a = (j * Math.PI * 2) / 100;
    let pts = samples(
      (t) => [
        x + Math.cos(a + t * 0.00016) * t,
        y + Math.sin(a + t * 0.00016) * t,
      ],
      40,
      1650,
      12,
    );
    c.add(c.line(pts, ink, 0.65, 0.16));
  }
}
export function palm(c, x, y, s, ink) {
  c.add(
    c.path(
      `M${x} ${y}Q${x - 30 * s} ${y - 130 * s} ${x} ${y - 240 * s}`,
      ink,
      9 * s,
      0.3,
    ),
  );
  for (let j = 0; j < 9; j++) {
    const a = Math.PI + (j * Math.PI) / 8,
      ex = x + Math.cos(a) * 145 * s,
      ey = y - 240 * s + Math.sin(a) * 85 * s;
    c.add(
      c.path(
        `M${x} ${y - 240 * s}Q${(x + ex) / 2} ${ey - 65 * s} ${ex} ${ey}`,
        ink,
        5 * s,
        0.35,
      ),
    );
  }
}
