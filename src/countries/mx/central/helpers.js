import {
  rect,
  path,
  line,
  ellipse,
  polygon,
  samples,
  grid,
  waves,
  ridge,
  snowOnRidge,
  flower,
} from "../../../geometry.js";
export {
  rect,
  path,
  line,
  ellipse,
  polygon,
  samples,
  waves,
  ridge,
  snowOnRidge,
  flower,
};
export const revision = 3;
export function paper(c, phase, colors, ink, variant = 0) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient(colors.map((v, i) => [(i * 100) / (colors.length - 1), v])),
    ),
  );
  c.glow(400, 320, 720, 500, "#ffffff", 0.7);
  grid(c, {
    color: ink,
    opacity: 0.16,
    spacing: 12 + (variant % 4),
    amplitude: 29 + variant * 7,
    phase,
    vertical: true,
  });
}
export function ribbon(c, ink, phase = 0, y = 840) {
  for (let j = 0; j < 20; j++)
    c.add(
      line(
        samples(
          (x) => [
            x,
            y +
              j * 1.6 +
              13 * Math.sin(x / 54 + j * 0.14 + phase) +
              7 * Math.sin(x / 180 + j * 0.1),
          ],
          -20,
          1420,
          5,
        ),
        ink,
        0.65,
        0.24,
      ),
    );
}
export function etch(c, shape, ink, spacing = 8) {
  let s = "";
  for (let y = 50; y < 940; y += spacing)
    s += line(
      samples((x) => [x, y + 7 * Math.sin(x / 150 + y / 160)], -20, 1420, 12),
      ink,
      0.65,
      0.22,
    );
  c.clip(shape, s);
}
export function agave(c, x, y, s, ink) {
  for (let k = -5; k <= 5; k++) {
    const xx = x + k * 28 * s,
      yy = y - (150 - Math.abs(k) * 17) * s;
    c.add(
      path(
        `M${x} ${y} Q${x + k * 10 * s} ${y - 80 * s} ${xx} ${yy} Q${x + k * 21 * s} ${y - 30 * s} ${x} ${y}Z`,
        ink,
        0.8,
        0.3,
        ink,
      ),
    );
    c.add(
      path(
        `M${x} ${y} Q${x + k * 15 * s} ${y - 75 * s} ${xx} ${yy}`,
        "#f8faf4",
        0.7,
        0.7,
      ),
    );
  }
}
export function arcade(c, x, y, count, s, ink) {
  let g = "";
  const w = count * 50;
  g += rect(0, -145, w, 145, ink, 0.1);
  for (let i = 0; i < count; i++) {
    const xx = i * 50;
    g += path(
      `M${xx + 7} 0 V-83 Q${xx + 25} -122 ${xx + 43} -83 V0`,
      ink,
      1,
      0.6,
      "#f5f6ed",
    );
    for (let j = 0; j < 5; j++)
      g += path(`M${xx + 3} ${-132 + j * 6} H${xx + 47}`, ink, 0.65, 0.3);
    g += path(`M${xx} 0 V-145`, ink, 0.7, 0.4);
    for (let j = 0; j < 9; j++)
      g += path(`M${xx} ${-j * 13}h6 M${xx + 44} ${-j * 13}h6`, ink, 0.65, 0.3);
  }
  for (let row = 0; row < 4; row++)
    for (let i = 0; i < count; i++)
      g += path(
        `M${i * 50 + (row % 2) * 20} ${-142 + row * 7}v6`,
        ink,
        0.6,
        0.3,
      );
  g += path(
    `M-5 -150 H${w + 5} M-5 -145 H${w + 5} M-5 3 H${w + 5}`,
    ink,
    1.2,
    0.5,
  );
  c.add(`<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`);
}
export function butterfly(c, x, y, s, ink, tilt = 0) {
  let g = "";
  for (const side of [-1, 1]) {
    g += path(
      `M0 0 C${side * 20} -42 ${side * 62} -76 ${side * 82} -69 Q${side * 85} -24 ${side * 52} -5 L0 4 M0 4 C${side * 80} -5 ${side * 58} 72 ${side * 14} 44Z`,
      ink,
      1,
      0.42,
      ink,
    );
    for (let j = 0; j < 6; j++)
      g += path(
        `M0 3 Q${side * (22 + j * 6)} ${-15 - j * 6} ${side * (27 + j * 6)} ${-43 + j * 3}`,
        "#f8f6ed",
        0.9,
        0.8,
      );
    for (let j = 0; j < 4; j++)
      g += path(
        `M0 4 Q${side * (20 + j * 6)} 20 ${side * (17 + j * 8)} ${32 - j * 4}`,
        "#f8f6ed",
        0.9,
        0.8,
      );
  }
  g += path(
    "M0 -14 V42 M0 -10 Q-4 -27 -12 -28 M0 -10 Q4 -27 12 -28",
    ink,
    1.8,
    0.7,
  );
  c.add(
    `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${s})">${g}</g>`,
  );
}
export function tiles(c, x, y, cols, rows, s, ink) {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      let xx = x + i * s,
        yy = y + j * s;
      c.add(path(`M${xx} ${yy}h${s}v${s}h-${s}Z`, ink, 0.7, 0.3));
      c.add(
        path(
          `M${xx + s / 2} ${yy + 3} Q${xx + s * 0.78} ${yy + s * 0.22} ${xx + s - 3} ${yy + s / 2} Q${xx + s * 0.78} ${yy + s * 0.78} ${xx + s / 2} ${yy + s - 3} Q${xx + s * 0.22} ${yy + s * 0.78} ${xx + 3} ${yy + s / 2} Q${xx + s * 0.22} ${yy + s * 0.22} ${xx + s / 2} ${yy + 3}Z`,
          ink,
          0.8,
          0.35,
        ),
      );
      c.add(ellipse(xx + s / 2, yy + s / 2, 3, 3, ink, 0.25));
    }
}
