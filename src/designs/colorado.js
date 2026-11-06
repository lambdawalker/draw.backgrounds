import { waves, ridge, pine, snowOnRidge, rockEtching } from "../geometry.js";
function drawPaper(c) {
  c.add(
    c.rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, "#f2e9dc"],
        [35, "#e3dfef"],
        [65, "#e7eddc"],
        [100, "#e6dcb8"],
      ]),
    ),
  );
}

function drawMountainShadow(c) {
  c.add(
    c.polygon(
      [
        [650, 280],
        [800, 410],
        [900, 450],
        [1030, 630],
        [820, 560],
      ],
      "#738da8",
      0.09,
    ),
  );
}

export default function (c, p) {
  drawPaper(c);
  waves(c, {
    color: "#a799bd",
    opacity: 0.23,
    spacing: 9,
    amplitude: 32,
    period: 95,
    phase: p,
  });
  const mountain = ridge(
    c,
    [
      [-40, 650],
      [120, 575],
      [280, 600],
      [410, 450],
      [520, 490],
      [650, 280],
      [740, 330],
      [800, 410],
      [900, 450],
      [980, 530],
      [1110, 495],
      [1220, 585],
      [1440, 610],
    ],
    { fill: "#9fb5ce", ink: "#718da5", opacity: 0.72 },
  );
  snowOnRidge(c, mountain, { lineY: 410 });
  rockEtching(
    c,
    [
      [410, 450],
      [520, 490],
      [650, 280],
      [740, 330],
      [800, 410],
      [900, 450],
      [980, 530],
      [1110, 495],
    ],
    { opacity: 0.2 },
  );
  drawMountainShadow(c);
  ridge(
    c,
    [
      [-40, 750],
      [150, 710],
      [350, 740],
      [540, 670],
      [690, 685],
      [850, 610],
      [1030, 640],
      [1220, 560],
      [1450, 610],
    ],
    { fill: "#afc099", ink: "#7c9e79", opacity: 0.65 },
  );
  ridge(
    c,
    [
      [-40, 840],
      [150, 800],
      [300, 840],
      [510, 765],
      [720, 810],
      [920, 740],
      [1180, 795],
      [1440, 740],
    ],
    { fill: "#d5c18e", ink: "#b3a773", opacity: 0.59 },
  );
  for (let j = 0; j < 18; j++)
    pine(
      c,
      60 + j * 75,
      870,
      33 + (j % 4) * 9 + 5 * Math.sin(j * 1.8),
      "#6f8b76",
      0.3,
    );
}
