import {
  seaArch,
  paper,
  contours,
  leaf,
  agave,
  cactus,
  palm,
  arch,
  vine,
  quality,
  samples,
  grid,
  ridge,
  pine,
  flower,
  rosette,
} from "./helpers.js";
function drawAguascalientesArcade(c) {
  for (let i = 0; i < 7; i++) {
    arch(c, 650 + i * 95, 650, 48, 150, "#ad928d");
    c.add(c.rect(600 + i * 95, 495, 100, 10, "#ad928d", 0.24));
    for (let k = 0; k < 4; k++)
      c.add(
        c.line(
          [
            [610 + i * 95, 505 + k * 7],
            [690 + i * 95, 505 + k * 7],
          ],
          "#a38b89",
          0.7,
          0.27,
        ),
      );
  }
}

function aguascalientes(c, p) {
  paper(c, p, ["#f7f9fc", "#eef7f8", "#f8edf4"], "#aa9c8a");
  contours(c, "#729c9f", 60, 32);
  drawAguascalientesArcade(c);
  vine(c, 1080, 760, "#92858d");
  rosette(c, 260, 680, 110, "#ad9d8f", { rings: 16, lobes: 12, opacity: 0.16 });
}
function bajaCalifornia(c, p) {
  paper(c, p, ["#edf8f7", "#fff6e7", "#eaf1ef"], "#6f9c9d");
  ridge(
    c,
    [
      [0, 690],
      [300, 640],
      [580, 700],
      [820, 510],
      [1030, 390],
      [1160, 490],
      [1400, 420],
    ],
    { fill: "#c4b49a", ink: "#9d8d7d", opacity: 0.2 },
  );
  contours(c, "#719ea9", 20, 30);
  vine(c, 920, 660, "#819583");
  vine(c, 1110, 570, "#819583");
  rosette(c, 70, 850, 230, "#8a9ca1", { lobes: 18, rings: 14, opacity: 0.15 });
}
function bajaCaliforniaSur(c, p) {
  paper(c, p, ["#e9f8f9", "#fff8e9", "#f3e4d1"], "#79a6a5");
  c.glow(1030, 280, 240, 230, "#edc68c", 0.3);
  seaArch(c);
  contours(c, "#6c9fac", 75, 22);
  cactus(c, 1250, 700, 0.75, "#839b8b");
}
function chihuahua(c, p) {
  paper(c, p, ["#fff7ec", "#f7ece5", "#eef4ed"], "#ae9a8a");
  ridge(
    c,
    [
      [-100, 490],
      [250, 410],
      [440, 560],
      [650, 410],
      [860, 460],
      [1040, 310],
      [1250, 510],
      [1500, 380],
    ],
    { fill: "#c5aa99", ink: "#a28c80", opacity: 0.23 },
  );
  ridge(
    c,
    [
      [-50, 690],
      [160, 540],
      [390, 720],
      [640, 550],
      [900, 690],
      [1180, 520],
      [1450, 650],
    ],
    { fill: "#b3a599", ink: "#93897d", opacity: 0.25 },
  );
  rosette(c, 210, 440, 76, "#b790b0", { rings: 13, lobes: 18, opacity: 0.16 });
  rosette(c, 1240, 180, 100, "#77a6b2", {
    rings: 11,
    lobes: 15,
    opacity: 0.13,
  });
  contours(c, "#aa8e7d", 100, 45);
  agave(c, 1150, 800, 170, "#81938e");
}
function drawCoahuilaEngravedRings(c) {
  for (let i = 0; i < 28; i++)
    c.add(
      c.line(
        samples(
          (t) => [
            970 + (180 + i * 5) * (1 + 0.1 * Math.sin(t * 3)) * Math.cos(t),
            690 + (45 + i * 2) * (1 + 0.13 * Math.cos(t * 4)) * Math.sin(t),
          ],
          0,
          Math.PI * 2,
          0.04,
        ),
        "#6fa4a7",
        0.8,
        0.4,
      ),
    );
}

function coahuila(c, p) {
  paper(c, p, ["#fff8e9", "#f2f7f0", "#eef8f8"], "#9aa38e");
  ridge(
    c,
    [
      [0, 700],
      [480, 650],
      [710, 490],
      [900, 520],
      [1110, 410],
      [1390, 580],
    ],
    { fill: "#c0b99c", ink: "#9d9b86", opacity: 0.22 },
  );
  drawCoahuilaEngravedRings(c);
  agave(c, 230, 770, 170, "#889d91");
  rosette(c, 1240, 220, 105, "#b4a78a", {
    lobes: 14,
    rings: 15,
    opacity: 0.17,
  });
}
function drawColimaLowerContours(c) {
  for (let j = 0; j < 19; j++)
    c.add(
      c.line(
        samples(
          (x) => [
            x,
            760 + j * 6 + 22 * Math.sin(x / 78) + 4 * Math.sin(x / 13),
          ],
          -20,
          1420,
          6,
        ),
        "#929b9d",
        0.65,
        0.22,
      ),
    );
}

function colima(c, p) {
  paper(c, p, ["#fbf1ef", "#f4f8ed", "#eaf7f7"], "#a58e9d");
  ridge(
    c,
    [
      [0, 780],
      [550, 730],
      [720, 660],
      [980, 340],
      [1100, 515],
      [1200, 450],
      [1400, 720],
    ],
    { fill: "#b9b2bc", ink: "#918994", opacity: 0.26 },
  );
  contours(c, "#85aaa8", 100, 23);
  drawColimaLowerContours(c);
  palm(c, 340, 810, 0.8, "#8fa592");
  palm(c, 210, 820, 0.58, "#8fa592");
  for (let i = 0; i < 4; i++)
    flower(c, 1160 + i * 40, 800 - i * 20, 23, "#ba9e9e", 0.28);
}
function durango(c, p) {
  paper(c, p, ["#faf9f5", "#f3f7f7", "#f2f2f5"], "#8fa09e");
  ridge(
    c,
    [
      [0, 730],
      [260, 680],
      [550, 520],
      [720, 580],
      [900, 390],
      [1050, 530],
      [1200, 440],
      [1400, 590],
    ],
    { fill: "#aebdc0", ink: "#80969c", opacity: 0.25 },
  );
  contours(c, "#899fac", 105, 25);
  for (let j = 0; j < 19; j++)
    pine(
      c,
      670 + j * 38 + c.random() * 18,
      730 + Math.sin(j * 0.9) * 33,
      38 + c.random() * 70,
      "#829f96",
      0.19 + c.random() * 0.13,
    );
}
function drawNayaritCoast(c) {
  c.add(
    c.polygon(
      [
        [0, 880],
        [0, 825],
        [280, 852],
        [440, 820],
        [650, 880],
      ],
      "#bba16b",
      0.13,
    ),
  );
  c.add(
    c.polygon(
      [
        [650, 880],
        [870, 825],
        [1030, 847],
        [1220, 808],
        [1400, 835],
        [1400, 880],
      ],
      "#6ea7ae",
      0.14,
    ),
  );
}

function nayarit(c, p) {
  paper(c, p, ["#f8f3e7", "#edf8f4", "#eff3f9"], "#96a793");
  ridge(
    c,
    [
      [0, 740],
      [370, 720],
      [660, 560],
      [850, 620],
      [1080, 480],
      [1400, 680],
    ],
    { fill: "#acc3b2", ink: "#829f8d", opacity: 0.2 },
  );
  contours(c, "#76a6ac", 50, 38);
  palm(c, 1150, 760, 0.9, "#7d9d8d");
  palm(c, 1270, 780, 0.63, "#7d9d8d");
  drawNayaritCoast(c);
  rosette(c, 400, 650, 125, "#a59f81", { lobes: 8, rings: 17, opacity: 0.19 });
}
function nuevoLeon(c, p) {
  paper(c, p, ["#f8f5fb", "#f5edf8", "#eef2f8"], "#9b8fac");
  ridge(
    c,
    [
      [0, 780],
      [530, 730],
      [710, 600],
      [900, 350],
      [970, 440],
      [1040, 430],
      [1140, 290],
      [1220, 500],
      [1400, 660],
    ],
    { fill: "#9fb2c3", ink: "#758fa6", opacity: 0.3 },
  );
  contours(c, "#90a5b0", 95, 28);
  agave(c, 1250, 800, 130, "#869b9c");
}
function drawSinaloaFieldContours(c) {
  for (let j = 0; j < 18; j++)
    c.add(
      c.path(
        `M${400 + j * 13} 880 Q${560 + j * 5} 770 ${700 + j * 4} 715`,
        "#99a77b",
        0.85,
        0.28,
      ),
    );
}

function drawSinaloaStems(c) {
  for (let j = 0; j < 4; j++) {
    let x = 870 + j * 110,
      y = 790 - (j % 2) * 40;
    c.add(
      c.path(
        `M${x} ${y} Q${x - 20} ${y - 120} ${x} ${y - 240}`,
        "#909d77",
        1.2,
        0.45,
      ),
    );
    for (let k = 0; k < 5; k++) {
      leaf(c, x, y - k * 35, 115 - k * 6, 220 - k * 4, "#939f79");
      leaf(c, x, y - k * 35, 110 - k * 6, 305 + k * 4, "#939f79");
    }
  }
}

function sinaloa(c, p) {
  paper(c, p, ["#fcf5e8", "#f3f8ed", "#eaf6f7"], "#a6a884");
  ridge(
    c,
    [
      [0, 780],
      [700, 730],
      [900, 640],
      [1120, 580],
      [1400, 690],
    ],
    { fill: "#bac3a5", ink: "#96a17f", opacity: 0.2 },
  );
  contours(c, "#82aaa0", 80, 23);
  rosette(c, 1450, 290, 120, "#9a9e91", {
    rings: 13,
    lobes: 22,
    opacity: 0.15,
  });
  drawSinaloaFieldContours(c);
  drawSinaloaStems(c);
}
function sonora(c, p) {
  paper(c, p, ["#fff7e7", "#f8eddd", "#eef6ef"], "#b4a18b");
  c.glow(1000, 260, 250, 230, "#f0c694", 0.38);
  ridge(
    c,
    [
      [0, 780],
      [460, 720],
      [650, 610],
      [780, 650],
      [930, 510],
      [1160, 600],
      [1400, 530],
    ],
    { fill: "#c5af94", ink: "#aa9278", opacity: 0.23 },
  );
  contours(c, "#b29f81", 80, 30);
  cactus(c, 1070, 760, 1.45, "#8c9c82");
  cactus(c, 1250, 780, 0.9, "#8c9c82");
  agave(c, 700, 820, 100, "#9aa286");
}
export default {
  aguascalientes: aguascalientes,
  "baja-california": bajaCalifornia,
  "baja-california-sur": bajaCaliforniaSur,
  chihuahua: chihuahua,
  coahuila: coahuila,
  colima: colima,
  durango: durango,
  nayarit: nayarit,
  "nuevo-leon": nuevoLeon,
  sinaloa: sinaloa,
  sonora: sonora,
};
