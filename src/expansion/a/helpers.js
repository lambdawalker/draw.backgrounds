import {
  path,
  line,
  rect,
  ellipse,
  polygon,
  samples,
  grid,
  waves,
} from "../../geometry.js";
export { path, line, rect, ellipse, polygon, samples, grid, waves };
export const quality = { pass: 11 };
export function paper(c, colors) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient(colors.map((v, i) => [(i * 100) / (colors.length - 1), v])),
    ),
  );
}
export function etch(c, shape, color, spacing = 7) {
  let a = "";
  for (let y = 0; y < 1000; y += spacing)
    a += line(
      samples((x) => [x, y + 8 * Math.sin(x / 130 + y / 150)], -20, 1420, 9),
      color,
      0.65,
      0.19,
    );
  c.clip(shape, a);
}
export function leaf(c, x, y, s, angle, color) {
  let a = quality.pass >= 3 ? path(`M0 0 L${s} 0`, color, 0.9, 0.55) : "";
  for (let k = -6; k <= 6; k++)
    a += path(`M0 0 Q${s * 0.5} ${k * s * 0.065} ${s} 0`, color, 0.65, 0.38);
  for(let j=1;j<9;j++){let t=j/10;for(const side of [-1,1])a+=path(`M${s*t} 0 Q${s*(t+.08)} ${side*s*.06} ${s*(t+.12)} ${side*s*.19*Math.sin(t*Math.PI)}`,color,.65,.42);}
  c.add(
    `<g transform="translate(${x} ${y}) rotate(${angle})">${path(`M0 0 Q${s * 0.45} ${-s * 0.45} ${s} 0 Q${s * 0.45} ${s * 0.45} 0 0Z`, color, 0.9, 0.28, color)}${a}</g>`,
  );
}
export function dome(c, x, y, s, color, kind = "round") {
  let a = "";
  const P = (d, w = 0.9, o = 0.6, f = "none") => (a += path(d, color, w, o, f));
  const R = (x, y, w, h, o = 0.1) => (a += rect(x, y, w, h, color, o));
  R(-240, -140, 480, 140);
  R(-235,-120,45,115,.055);R(190,-120,45,115,.055);
  for(let j=-7;j<=7;j++)R(j*30+5,-115,3,107,.12);
  P("M-255 -145 H255 M-245 -135 H245 M-240 -128 H240");
  P("M-17 -4 V-60 Q0 -83 17 -60 V-4Z",.9,.6,"#c4d3c9");P("M0 -5 V-72 M-17 -48 H17",.7,.6);
  for(let row=0;row<12;row++)for(let col=0;col<12;col++)P(`M${-230+col*39+(row%2)*18} ${-118+row*9} v8`,.4,.16);
  for (let j = -7; j <= 7; j++) {
    let xx = j * 30;
    P(`M${xx - 7} -8 V-116 H${xx + 7} V-8`, 1, 0.65);
    for (let k = -2; k <= 2; k++) P(`M${xx + k * 2} -10 V-114`, 0.5, 0.35);
  }
  for (let i = 0; i < 5; i++)
    P(`M${-250 - i * 4} ${i * 5} H${250 + i * 4}`, 0.8, 0.5);
  P("M-110 -148 V-205 H110 V-148", 1, 0.6);
  for (let j = -4; j <= 4; j++)
    P(
      `M${j * 22 - 6} -158 V-191 Q${j * 22} -203 ${j * 22 + 6} -191 V-158`,
      0.8,
      0.5,
    );
  if (kind !== "tower") {
    a += `<g transform="${kind === "indiana" ? "translate(0 50) scale(.72 1.25)" : kind === "iowa" ? "translate(0 35) scale(.9 1.17)" : "translate(0 0)"}">`;
    P("M-125 -207 Q-105 -307 0 -318 Q105 -307 125 -207Z", 1, 0.65, "#dbe2d7");
    for (let j = -5; j <= 5; j++)
      P(`M${j * 23} -209 Q${j * 18} -285 0 -318`, 0.7, 0.5);
    for (let j = 0; j < 9; j++)
      P(
        `M${-121 + j * 3.9} ${-211 - j * 9} Q0 ${-228 - j * 11} ${121 - j * 3.9} ${-211 - j * 9}`,
        0.6,
        0.4,
      );
    P("M-20 -320 V-352 Q0 -378 20 -352 V-320 M-27 -319 H27 M0 -368 V-388");
    a += "</g>";
  } else {
    P(
      "M-58 -207 V-280 H58 V-207 M-66 -280 H66 L0 -325Z M-24 -310 V-350 H24 V-310 M0 -350 V-385",
    );
    for (let j = -2; j <= 2; j++) P(`M${j * 19} -216 V-270`, 0.7, 0.5);
  }
  if (quality.pass >= 3) {
    for (let yy = -125; yy < 0; yy += 9) P(`M-239 ${yy} H239`, 0.45, 0.25);
    for (let j = -6; j <= 6; j++)
      P(
        `M${j * 33 + 10} -20 V-76 Q${j * 33 + 17} -88 ${j * 33 + 24} -76 V-20`,
        0.65,
        0.45,
      );
  }
  if (quality.pass >= 6 && kind === "round") {
    P("M-125 -142 L0 -203 L125 -142Z", 1, 0.6, "#e0e7df");
    for (let j = 0; j < 12; j++)
      P(`M${-115 + j * 9} ${-146 - j * 4.4} H${115 - j * 9}`, 0.6, 0.4);
  }
  if (quality.pass >= 6 && kind === "tower") {
    P("M-240 -146 L-175 -202 L-110 -146 M110 -146 L175 -202 L240 -146", 1, 0.6);
    for (let j = 0; j < 11; j++) {
      P(`M${-238 + j * 5.5} ${-148 - j * 4.7} H${-112 - j * 5.5}`, 0.6, 0.4);
      P(`M${112 + j * 5.5} ${-148 - j * 4.7} H${238 - j * 5.5}`, 0.6, 0.4);
    }
  }
  c.add(`<g transform="translate(${x} ${y}) scale(${s})">${a}</g>`);
}
export function border(c,color,kind=0){
  for(let j=0;j<24;j++) for(const direction of [-1,1]) c.add(line(samples(x=>[x,844+direction*14*Math.sin(x/(kind?34:47)+j*.11)+j*.72+8*Math.sin(x/180+j*.12)],0,1400,4),color,.62,.19));
}
export function field(c, color, phase = 0) {
  grid(c, {
    color,
    opacity: quality.pass >= 4 ? 0.1 : 0.075,
    spacing: quality.pass >= 4 ? 13 : 19,
    amplitude: 20,
    phase,
  });
}
export function flourish(c, x, y, s, color) {
  for (let j = 0; j < 14; j++)
    c.add(
      path(
        `M${x - s} ${y + j * 3} C${x - s * 0.5} ${y - s * 0.6 + j * 3} ${x + s * 0.7} ${y + s * 0.5 - j * 4} ${x + s} ${y - s * 0.25 + j * 3}`,
        color,
        0.8,
        0.2,
      ),
    );
}
