import {
  rect,
  path,
  line,
  polygon,
  ellipse,
  grid,
  waves,
  ridge,
  samples,
  flower,
} from "../../../geometry.js";
export { path, line, polygon, ellipse, waves, ridge, samples, flower };
export function base(c, p, colors, ink) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, colors[0]],
        [55, "#f8f7ef"],
        [100, colors[1]],
      ]),
    ),
  );
  grid(c, { color: ink, opacity: 0.21, spacing: 16, amplitude: 33, phase: p });
  c.glow(420, 340, 520, 400, "#fff", 0.8);
}
export function leaf(c, x, y, s, a, ink) {
  let g = path(
    `M0 0 Q${s * 0.65} ${-s * 0.6} ${s} 0 Q${s * 0.55} ${s * 0.43} 0 0Z`,
    ink,
    0.9,
    0.4,
    ink,
  );
  for (let j = 1; j < 10; j++)
    g += path(
      `M${(s * j) / 11} 0 l${s * 0.12} ${-s * 0.16} M${(s * j) / 11} 0 l${s * 0.1} ${s * 0.12}`,
      "#fff",
      0.7,
      0.5,
    );
  c.add(`<g transform="translate(${x} ${y}) rotate(${a})">${g}</g>`);
}
export function frond(c, x, y, s, ink) {
  c.add(
    path(`M${x} ${y} Q${x - 35} ${y - s * 0.5} ${x} ${y - s}`, ink, 3, 0.4),
  );
  for (let k = 0; k < 7; k++) {
    const a = -Math.PI + (k * Math.PI) / 6,
      dx = Math.cos(a) * s * 0.46,
      dy = Math.sin(a) * s * 0.29;
    for (let j = 0; j < 11; j++) {
      const t = j / 11;
      c.add(
        path(
          `M${x + dx * t} ${y - s + dy * t + 35 * t * t} q${dx * 0.2} ${-s * 0.07} ${dx * 0.25} ${s * 0.12}`,
          ink,
          0.9,
          0.42,
        ),
      );
    }
    c.add(
      path(
        `M${x} ${y - s} Q${x + dx * 0.65} ${y - s + dy} ${x + dx} ${y - s + dy + 35}`,
        ink,
        1.4,
        0.45,
      ),
    );
  }
}
export function fret(c, y, ink, scale = 1) {
  for (let x = -40; x < 1450; x += 110 * scale)
    c.add(
      path(
        `M${x} ${y} h${80 * scale} v${-32 * scale} h${-52 * scale} v${18 * scale} h${30 * scale} M${x} ${y + 9 * scale} h${90 * scale} v${-52 * scale} h${-72 * scale}`,
        ink,
        1,
        0.3,
      ),
    );
}
export function arch(c, x, y, s, ink) {
  let g = path(
    "M-190 0 V-110 H190 V0 M-205 5 H205 M-205 12 H205",
    ink,
    1.4,
    0.7,
  );
  for (let k = -3; k <= 3; k++) {
    let a = k * 50;
    g += path(`M${a - 18} 0 V-60 Q${a} -108 ${a + 18} -60 V0`, ink, 1.4, 0.7);
    for (let j = 0; j < 4; j++)
      g += path(
        `M${a - 21 - j} 0 V-62 Q${a} ${-112 - j * 3} ${a + 21 + j} -62 V0`,
        ink,
        0.7,
        0.32,
      );
  }
  c.add(`<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`);
}
export function tide(c, p, ink, from = 650) {
  waves(c, {
    color: ink,
    from,
    to: 920,
    spacing: 9,
    amplitude: 18,
    phase: p,
    opacity: 0.32,
  });
}
