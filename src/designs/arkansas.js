import { rect, grid, polygon, line, path, rosette } from "../geometry.js";
export default function (c, p) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, "#e8f2f5"],
        [45, "#faf7ed"],
        [100, "#f3e5c4"],
      ]),
    ),
  );
  grid(c, {
    phase: p,
    spacing: 13,
    amplitude: 28,
    color: "#6198b4",
    opacity: 0.18,
  });
  let panels = "";
  for (let j = 0; j < 5; j++) {
    let x = 850 + j * 112;
    panels += rect(x, 50, 100, 800, "#f2ddb5", 0.18);
    panels += path(
      `M${x} 900 V65 H${x + 100} V900 M${x + 9} 900 V76 H${x + 91} V900`,
      "#b39352",
      1.2,
      0.5,
    );
    for (let y = 120; y < 880; y += 130)
      panels += path(
        `M${x + 22} ${y} h56 v90 h-56Z M${x + 30} ${y + 8} h40 v74 h-40Z`,
        "#b39352",
        0.8,
        0.4,
      );
  }
  c.add(panels);
  for (let j = 0; j < 4; j++) {
    const x = 890 + j * 135;
    c.add(
      path(
        `M${x - 45} 840 V345 Q${x} 265 ${x + 45} 345 V840 M${x - 37} 840 V350 Q${x} 282 ${x + 37} 350 V840`,
        "#b39352",
        0.8,
        0.43,
      ),
    );
    for (let k = 0; k < 18; k++)
      c.add(
        line(
          [
            [x - 32, 400 + k * 22],
            [x + 32, 400 + k * 22],
          ],
          "#bd9e60",
          0.6,
          0.25,
        ),
      );
  }
  for (let j = 0; j < 3; j++)
    rosette(c, 940 + j * 165, 725, 18, "#b39352", {
      rings: 5,
      lobes: 8,
      amplitude: 3,
      opacity: 0.3,
    });
  for (let j = 0; j < 10; j++) {
    const x = 80 + j * 125,
      y = 115 + 40 * Math.sin(j * 0.8 + p),
      r = 22 + (j % 3) * 5;
    const a = [
      [x - r, y - r * 0.45],
      [x + r, y - r * 0.45],
      [x + r * 1.3, y],
      [x, y + r],
      [x - r * 1.3, y],
    ];
    c.add(polygon(a, "#e8d6b5", 0.12));
    c.add(line([...a, a[0]], "#ad8653", 1, 0.5));
    c.add(line([a[4], a[1], a[3], a[0], a[2], a[3]], "#ad8653", 0.7, 0.45));
  }
}
