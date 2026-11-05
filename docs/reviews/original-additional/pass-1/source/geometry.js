/** Geometry uses one 1400 x 880 coordinate system. No external artwork. */
export const W = 1400,
  H = 880,
  TAU = Math.PI * 2;
export const n = (v) => Number(v.toFixed(2));
export const points = (a) => a.map((p) => p.map(n).join(",")).join(" ");
export const path = (d, color, width = 1, opacity = 1, fill = "none") =>
  `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" opacity="${opacity}" stroke-linejoin="round" stroke-linecap="round"/>`;
export const line = (a, color, width = 1, opacity = 1) =>
  `<polyline points="${points(a)}" fill="none" stroke="${color}" stroke-width="${width}" opacity="${opacity}" stroke-linejoin="round"/>`;
export const polygon = (a, fill, opacity = 1) =>
  `<polygon points="${points(a)}" fill="${fill}" opacity="${opacity}"/>`;
export const rect = (x, y, w, h, fill, opacity = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" opacity="${opacity}"/>`;
export const ellipse = (x, y, rx, ry, color, opacity = 1) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${color}" opacity="${opacity}"/>`;
/** Avalanche adjacent seeds before rendering; selection keeps its original LCG. */
export function mixSeed(seed) {
  let x = seed >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}
export function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}
export function samples(fn, start, end, step = 8) {
  const a = [];
  for (let t = start; t <= end; t += step) a.push(fn(t));
  return a;
}
export class Canvas {
  constructor(random, prefix = "g") {
    this.prefix = prefix;
    this.random = random;
    this.defs = [];
    this.body = [];
    this.serial = 0;
  }
  add(s) {
    this.body.push(s);
  }
  id() {
    return `${this.prefix}${this.serial++}`;
  }
  gradient(stops, x1 = "0%", y1 = "0%", x2 = "100%", y2 = "100%") {
    const id = this.id();
    this.defs.push(
      `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([offset, color]) => `<stop offset="${offset}%" stop-color="${color}"/>`).join("")}</linearGradient>`,
    );
    return `url(#${id})`;
  }
  glow(x, y, rx, ry, color, opacity = 0.3) {
    const id = this.id();
    this.defs.push(
      `<radialGradient id="${id}"><stop stop-color="${color}" stop-opacity="${opacity}"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>`,
    );
    this.add(ellipse(x, y, rx, ry, `url(#${id})`));
  }
  clip(shape, content) {
    const id = this.id();
    this.defs.push(`<clipPath id="${id}">${shape}</clipPath>`);
    this.add(`<g clip-path="url(#${id})">${content}</g>`);
  }
}
/** Shared smooth coordinate warp: spacing changes within and between curves. */
export function grid(
  c,
  {
    color = "#639eb4",
    opacity = 0.2,
    spacing = 12,
    amplitude = 24,
    phase = 0,
    vertical = true,
    horizontal = true,
  } = {},
) {
  const warp = (u, v) => [
    u +
      amplitude *
        (Math.sin(v / 140 + phase) + 0.6 * Math.sin(u / 210 + v / 190)),
    v +
      amplitude *
        (Math.sin(u / 185 + phase) + 0.6 * Math.sin(v / 150 + u / 260)),
  ];
  if (horizontal)
    for (let y = -100; y < 1000; y += spacing)
      c.add(
        line(
          samples((x) => warp(x, y), -100, 1500, 12),
          color,
          0.8,
          opacity,
        ),
      );
  if (vertical)
    for (let x = -100; x < 1500; x += spacing)
      c.add(
        line(
          samples((y) => warp(x, y), -100, 1000, 12),
          color,
          0.8,
          opacity,
        ),
      );
}
export function waves(
  c,
  {
    color = "#639eb4",
    opacity = 0.25,
    from = 0,
    to = 900,
    spacing = 8,
    amplitude = 35,
    period = 240,
    phase = 0,
    slope = 0,
  } = {},
) {
  for (let y = from; y <= to; y += spacing)
    c.add(
      line(
        samples(
          (x) => [
            x,
            y +
              amplitude * Math.sin(x / period + phase + y / 520) +
              12 * Math.sin(x / 95 + y / 180) +
              slope * x,
          ],
          -40,
          1440,
          9,
        ),
        color,
        0.8,
        opacity,
      ),
    );
}
export function rosette(
  c,
  x,
  y,
  r,
  color,
  { rings = 22, lobes = 24, amplitude = 12, opacity = 0.3, width = 0.8 } = {},
) {
  for (let j = 0; j < rings; j++)
    for (const direction of [-1, 1]) {
      const rr = r + j * 1.6;
      c.add(
        line(
          samples(
            (t) => {
              const a = (t / 180) * Math.PI,
                rad =
                  rr + amplitude * Math.cos(lobes * a + direction * j * 0.06);
              return [x + rad * Math.cos(a), y + rad * Math.sin(a)];
            },
            0,
            360,
            0.75,
          ),
          color,
          width,
          opacity * 0.72,
        ),
      );
    }
  for (const rr of [
    r - amplitude - 4,
    r - amplitude - 7,
    r + (rings - 1) * 1.6 + amplitude + 4,
  ])
    c.add(
      line(
        samples(
          (t) => [
            x + rr * Math.cos((t / 180) * Math.PI),
            y + rr * Math.sin((t / 180) * Math.PI),
          ],
          0,
          360,
          1,
        ),
        color,
        0.7,
        opacity,
      ),
    );
}
export function ridge(
  c,
  verts,
  { fill = "#b1c6cf", ink = "#7b9eae", opacity = 0.4, hatch = true } = {},
) {
  // Subdivide slopes into irregular rock edges while retaining shared peak vertices.
  const detailed = [];
  for (let i = 0; i < verts.length - 1; i++) {
    const [x, y] = verts[i],
      [xx, yy] = verts[i + 1];
    const steps = Math.max(2, Math.ceil(Math.abs(xx - x) / 15));
    for (let j = 0; j < steps; j++) {
      const t = j / steps;
      detailed.push([
        x + (xx - x) * t,
        y + (yy - y) * t + Math.sin(t * Math.PI) * (c.random() - 0.5) * 14,
      ]);
    }
  }
  detailed.push(verts.at(-1));
  const bottom = 1000,
    shape = polygon([...detailed, [1600, bottom], [-200, bottom]], fill);
  c.add(`<g opacity="${opacity}">${shape}</g>`);
  if (hatch) {
    let lines = "";
    for (let y = -100; y < 1000; y += 7)
      lines += line(
        samples(
          (x) => [x, y + 20 * Math.sin(x / 120 + y / 140)],
          -100,
          1500,
          12,
        ),
        ink,
        0.75,
        0.25,
      );
    c.clip(shape, lines);
  }
  c.add(line(detailed, ink, 0.8, opacity * 0.7));
  return { vertices: detailed, silhouette: shape };
}
export function pine(c, x, y, size, color, opacity = 0.4) {
  const a = [[x, y - size]];
  for (let j = 1; j <= 8; j++) {
    const yy = y - size + (j * size) / 9,
      ww = (size * 0.25 * j) / 8;
    a.push([x - ww * 0.65, yy - size * 0.09], [x - ww, yy]);
  }
  a.push([x - size * 0.025, y], [x + size * 0.025, y]);
  for (let j = 8; j >= 1; j--) {
    const yy = y - size + (j * size) / 9,
      ww = (size * 0.25 * j) / 8;
    a.push([x + ww, yy], [x + ww * 0.65, yy - size * 0.09]);
  }
  c.add(polygon(a, color, opacity));
}
export function flower(c, x, y, r, color, opacity = 0.35) {
  for (let j = 0; j < 5; j++) {
    const a = (j * TAU) / 5;
    const p = (u, v) => [
      x + Math.cos(a) * u - Math.sin(a) * v,
      y + Math.sin(a) * u + Math.cos(a) * v,
    ];
    const a1 = p(r * 0.15, 0),
      a2 = p(r * 0.55, -r * 0.55),
      a3 = p(r * 1.15, -r * 0.25),
      a4 = p(r, 0),
      a5 = p(r * 1.15, r * 0.25),
      a6 = p(r * 0.55, r * 0.55);
    c.add(
      path(
        `M${points([a1])} C${points([a2, a3, a4])} C${points([a5, a6, a1])}Z`,
        color,
        0.8,
        opacity,
        color,
      ),
    );
    for (let k = -2; k <= 2; k++)
      c.add(
        line([p(r * 0.2, 0), p(r * 0.8, k * r * 0.065)], "#fffaf5", 0.8, 0.45),
      );
  }
  c.add(ellipse(x, y, r * 0.14, r * 0.14, "#d7b46a", 0.7));
}
/** Etched rock faces and snow patches share their peak vertex. */
export function snow(c, x, y, w, h, color = "#f8faf6", opacity = 0.7) {
  const left = [
    [x, y],
    [x - w * 0.48, y + h * 0.62],
    [x - w * 0.34, y + h * 0.55],
    [x - w * 0.25, y + h * 0.65],
    [x - w * 0.18, y + h * 0.45],
    [x - w * 0.08, y + h * 0.6],
    [x + w * 0.04, y + h * 0.3],
    [x + w * 0.14, y + h * 0.47],
    [x + w * 0.3, y + h * 0.52],
    [x + w * 0.18, y + h * 0.27],
  ];
  c.add(polygon(left, color, opacity));
  for (let j = 0; j < 14; j++)
    c.add(
      line(
        [
          [x + j * 0.8, y + 12 + j * 3],
          [x + w * (0.4 + j * 0.035), y + h * (0.8 + j * 0.03)],
          [x + w * (0.22 + j * 0.05), y + h * 1.5],
        ],
        "#6f91aa",
        0.7,
        0.18,
      ),
    );
}
export function tower(c, x, y, s, color) {
  let g = "";
  for (let j = 0; j < 7; j++) {
    const w = (74 - j * 7) * s,
      top = y - (75 + j * 29) * s;
    g += rect(x - w / 2, top, w, (75 + j * 29) * s, color, 0.035);
    g += path(
      `M${x - w / 2} ${y} V${top} H${x + w / 2} V${y}`,
      color,
      0.8,
      0.5,
    );
  }
  for (let j = -4; j <= 4; j++)
    g += line(
      [
        [x + j * 6 * s, y - 12 * s],
        [x + j * 6 * s, y - 200 * s],
      ],
      color,
      0.7,
      0.5,
    );
  for (let j = 0; j < 32; j++)
    g += line(
      [
        [x - 25 * s, y - j * 6 * s],
        [x + 25 * s, y - j * 6 * s],
      ],
      color,
      0.6,
      0.25,
    );
  g += path(
    `M${x - 110 * s} ${y} V${y - 45 * s} H${x + 110 * s} V${y} M${x - 120 * s} ${y + 6 * s} H${x + 120 * s}`,
    color,
    1.3,
    0.5,
  );
  for (let j = -8; j <= 8; j++)
    g += line(
      [
        [x + j * 12 * s, y],
        [x + j * 12 * s, y - 40 * s],
      ],
      color,
      1,
      0.4,
    );
  c.add(g);
}
export function rockEtching(
  c,
  verts,
  { color = "#7895aa", opacity = 0.18 } = {},
) {
  const shape = polygon([...verts, [1600, 950], [-100, 950]], "#fff");
  let g = "";
  for (let j = 0; j < 65; j++) {
    const x = 300 + j * 14;
    g += line(
      samples(
        (t) => [
          x + 95 * t + 10 * Math.sin(t * 9 + j * 0.4),
          240 + t * 550 + 22 * Math.sin(j * 0.8),
        ],
        0,
        1,
        0.025,
      ),
      color,
      0.65,
      opacity,
    );
  }
  c.clip(shape, g);
}
/** Original neoclassical pavilion elevation; outlines and shading share dimensions. */
export function engravedPavilion(c, x, y, s, color) {
  let g = "";
  const P = (d, w = 1, o = 0.6, fill = "none") => {
    g += path(d, color, w, o, fill);
  };
  const R = (a, b, w, h, o = 0.07) => {
    g += rect(a, b, w, h, color, o);
  };
  // Coordinates are local to the pavilion baseline.
  R(-175, -145, 350, 145, 0.07);
  P("M-185 -150 L0 -225 L185 -150Z", 1.1, 0.5, "#d6e2e7");
  for (let j = 0; j < 14; j++) {
    const yy = -153 - j * 4.6,
      ww = 180 - j * 11.3;
    P(`M${-ww} ${yy} H${ww}`, 0.6, 0.4);
  }
  P("M-192 -148 H192 M-185 -140 H185 M-181 -136 H181", 1, 0.6);
  // Pediment relief, original circular ornament.
  g += ellipse(0, -176, 18, 12, "#95b0be", 0.15);
  for (let j = 0; j < 4; j++)
    P(
      `M${-20 - j * 2} -175 Q0 ${-200 - j} ${20 + j * 2} -175 Q0 ${-153 + j} ${-20 - j * 2} -175`,
      0.55,
      0.35,
    );
  // Masonry bed joints and alternating vertical joints.
  for (let yy = -128, row = 0; yy < 0; yy += 7, row++) {
    P(`M-172 ${yy} H172`, 0.55, 0.25);
    for (let xx = -170 + (row % 2) * 18; xx < 170; xx += 36)
      P(`M${xx} ${yy} v7`, 0.45, 0.2);
  }
  for (let i = -4; i <= 4; i++) {
    const xx = i * 35;
    P(`M${xx - 7} -8 V-126 H${xx + 7} V-8Z`, 0.8, 0.7, "#eef2ed");
    for (let k = -2; k <= 2; k++) P(`M${xx + k * 2} -13 V-121`, 0.6, 0.45);
    P(
      `M${xx - 11} -128 H${xx + 11} M${xx - 10} -123 H${xx + 10} M${xx - 10} -9 H${xx + 10} M${xx - 12} -4 H${xx + 12}`,
      1,
      0.6,
    );
    if (i < 4)
      P(
        `M${xx + 14} -22 V-84 Q${xx + 17.5} -94 ${xx + 21} -84 V-22Z`,
        0.75,
        0.4,
        "#b7c9d1",
      );
  }
  for (let j = 0; j < 6; j++)
    P(`M${-180 - j * 3} ${j * 4} H${180 + j * 3}`, 0.8, 0.65);
  // Layered tower: base, window arcade, cornices, small lantern and roof.
  R(-41, -335, 82, 128, 0.09);
  P(
    "M-42 -209 V-335 H42 V-209 M-50 -335 H50 M-48 -328 H48 M-43 -320 H43",
    1,
    0.6,
  );
  for (let i = -1; i <= 1; i++) {
    const xx = i * 25;
    P(
      `M${xx - 7} -236 V-297 Q${xx} -313 ${xx + 7} -297 V-236Z`,
      0.8,
      0.65,
      "#d1dfe4",
    );
    P(`M${xx} -300 V-238 M${xx - 7} -272 H${xx + 7}`, 0.7, 0.5);
  }
  for (let j = 0; j < 4; j++) P(`M-46 ${-224 + j * 4} H46`, 0.7, 0.6);
  P("M-52 -340 L0 -363 L52 -340Z", 1, 0.6, "#cedde4");
  for (let j = 0; j < 5; j++)
    P(`M${-47 + j * 8} ${-342 - j * 3.7} H${47 - j * 8}`, 0.7, 0.45);
  P(
    "M-16 -356 V-391 H16 V-356 M-22 -392 H22 L0 -412 L-22 -392 M0 -412 V-430",
    0.9,
    0.65,
  );
  P("M-8 -361 V-386 M0 -361 V-386 M8 -361 V-386", 0.8, 0.55);
  c.add(`<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`);
}

/** Snow shares the exact jagged outline drawn by ridge(), including seeded detail. */
export function snowOnRidge(
  c,
  mountain,
  { lineY = 410, color = "#f8faf6", opacity = 0.7 } = {},
) {
  if (!mountain?.silhouette)
    throw new TypeError("snowOnRidge requires geometry returned by ridge");
  const boundary = samples(
    (x) => [x, lineY + 16 * Math.sin(x / 22) + 9 * Math.sin(x / 9)],
    -200,
    1600,
    8,
  );
  c.clip(
    mountain.silhouette,
    polygon(
      [[-200, -100], [1600, -100], ...boundary.reverse()],
      color,
      opacity,
    ),
  );
}
