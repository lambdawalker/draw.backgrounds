import { rect, grid, ridge, path, line, ellipse } from "../geometry.js";
export default function (c, p) {
  c.add(rect(0, 0, 1400, 880, "#f5f7f2"));
  c.glow(300, 500, 700, 700, "#bee2e6", 0.45);
  grid(c, {
    phase: p,
    spacing: 9,
    amplitude: 23,
    color: "#65a4b9",
    opacity: 0.16,
  });
  ridge(
    c,
    [
      [470, 350],
      [585, 245],
      [650, 190],
      [735, 290],
      [830, 340],
      [990, 460],
      [1450, 580],
    ],
    { fill: "#d8dde5", ink: "#929fb4", opacity: 0.26 },
  );
  // Wings spread in different planes. Every feather starts at its wing shoulder.
  const feather = (x, y, tx, ty, w) => {
    const dx = tx - x,
      dy = ty - y,
      len = Math.hypot(dx, dy),
      nx = (-dy / len) * w,
      ny = (dx / len) * w;
    c.add(
      path(
        `M${x} ${y} Q${tx + nx} ${ty + ny} ${tx} ${ty} Q${tx - nx * 0.35} ${ty - ny * 0.35} ${x} ${y}Z`,
        "#7498b6",
        0.8,
        0.54,
        "#d0dce6",
      ),
    );
    c.add(
      line(
        [
          [x, y],
          [tx, ty],
        ],
        "#7498b6",
        0.6,
        0.42,
      ),
    );
    for (let j = 3; j < 8; j++) {
      const t = j / 9;
      c.add(
        line(
          [
            [x + dx * t, y + dy * t],
            [x + dx * (t + 0.05) + nx * 0.22, y + dy * (t + 0.05) + ny * 0.22],
          ],
          "#7391ac",
          0.5,
          0.4,
        ),
      );
    }
  };
  for (let j = 0; j < 21; j++) {
    const a = -2.9 + j * 0.066,
      len = 195 + 40 * Math.sin((j / 21) * Math.PI);
    feather(900, 430, 900 + Math.cos(a) * len, 430 + Math.sin(a) * len, 12);
  }
  for (let j = 0; j < 20; j++) {
    const a = -0.93 + j * 0.061,
      len = 175 + 50 * Math.sin((j / 20) * Math.PI);
    feather(934, 438, 934 + Math.cos(a) * len, 438 + Math.sin(a) * len, 12);
  }
  // Three rows of overlapping covert feathers cover the radial quill roots.
  for (let row = 0; row < 3; row++)
    for (let j = 0; j < 13; j++) {
      const a = -2.85 + j * 0.1,
        len = 48 + row * 24;
      const x = 902 + Math.cos(a) * len,
        y = 432 + Math.sin(a) * len;
      feather(x, y, x + Math.cos(a) * 42, y + Math.sin(a) * 42, 10);
      const b = -0.9 + j * 0.1,
        xx = 934 + Math.cos(b) * len,
        yy = 438 + Math.sin(b) * len;
      feather(xx, yy, xx + Math.cos(b) * 38, yy + Math.sin(b) * 38, 9);
    }
  for (let j = 0; j < 6; j++) feather(885, 520, 810 + j * 10, 642 - j * 3, 11);
  c.add(
    path(
      "M883 425 C877 390 902 365 934 371 C962 376 979 409 959 438 C943 472 930 523 886 564 C852 555 858 512 870 480Z",
      "#7494ac",
      1,
      0.7,
      "#c3d4df",
    ),
  );
  c.add(
    path(
      "M897 446 Q913 425 939 443 Q943 488 887 546 Q872 520 897 446Z",
      "none",
      0,
      0.45,
      "#eff1e6",
    ),
  );
  c.add(path("M963 402 L990 412 L962 420Z", "#668a9e", 0.8, 0.7, "#a7becb"));
  c.add(ellipse(947, 397, 4, 4, "#55758a", 0.9));
  for (let j = 0; j < 22; j++)
    c.add(
      path(
        `M${878 + j * 2} ${448 + j * 0.7} Q${904 + j} 480 ${877 + j * 0.5} ${536 - j * 0.5}`,
        "#6687a2",
        0.65,
        0.32,
      ),
    );
}
