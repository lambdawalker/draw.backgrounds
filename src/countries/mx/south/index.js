import {
  base,
  path,
  line,
  polygon,
  ellipse,
  waves,
  ridge,
  samples,
  flower,
  leaf,
  frond,
  fret,
  arch,
  tide,
} from "./helpers.js";
function campeche(c, p) {
  base(c, p + 0.47, ["#f2f3eb", "#e0ecdc"], "#95b49d");
  // The small public SEAFI specimen has a white field and green loop ornament.
  for (let j = 0; j < 18; j++)
    c.add(
      line(
        samples(
          (t) => {
            const a = (t * Math.PI) / 180,
              r = 150 + j * 2 + 13 * Math.sin(10 * a + j * 0.08);
            return [1110 + r * Math.cos(a), 330 + r * 0.55 * Math.sin(a)];
          },
          0,
          360,
          2,
        ),
        "#94b8a3",
        0.75,
        0.23,
      ),
    );
  tide(c, p, "#70a6ad");
  arch(c, 1040, 680, 1.25, "#859d9e");
  for (let i = 0; i < 9; i++) {
    const x = 800 + i * 61;
    c.add(path(`M${x} 545 v-43 h26 v43 M${x - 7} 502 h40`, "#859d9e", 1, 0.44));
  }
  for (let j = 0; j < 11; j++) {
    let y = 550 + j * 11;
    c.add(path(`M805 ${y} H1274`, "#859d9e", 0.65, 0.25));
  }
  fret(c, 825, "#9cae9b", 0.7);
}
function chiapas(c, p) {
  base(c, p + 0.94, ["#e4eee2", "#d5e4d7"], "#86aa94");
  ridge(
    c,
    [
      [-100, 790],
      [600, 725],
      [750, 350],
      [840, 420],
      [870, 680],
      [1010, 720],
      [1090, 390],
      [1210, 320],
      [1500, 450],
    ],
    { fill: "#a7c3ae", ink: "#729984", opacity: 0.23 },
  );
  for (let j = 0; j < 20; j++)
    c.add(
      path(
        `M${860 + j * 6} 800 Q${920 + j * 9} 720 ${930 + j * 8} 600`,
        "#75a5b0",
        0.9,
        0.4,
      ),
    );
  frond(c, 1300, 850, 210, "#749e88");
}
function guerrero(c, p) {
  base(c, p + 1.41, ["#ece6d6", "#d8e8df"], "#b8ab83");
  ridge(
    c,
    [
      [-100, 850],
      [730, 755],
      [940, 535],
      [1040, 620],
      [1200, 450],
      [1500, 730],
    ],
    { fill: "#b8b99d", ink: "#9aa68c", opacity: 0.27 },
  );
  tide(c, p, "#84b5b8", 730);
  frond(c, 1190, 770, 280, "#89a68c");
  frond(c, 1300, 810, 200, "#89a68c");
}
function oaxaca(c, p) {
  base(c, p + 1.88, ["#eee4db", "#e5e7db"], "#b5a096");
  for (let j = 0; j < 5; j++)
    fret(
      c,
      590 + j * 49,
      ["#c29394", "#b6aa78", "#86aca6"][j % 3],
      0.8 + j * 0.05,
    );
  for (let i = 0; i < 5; i++) {
    leaf(c, 1180, 630, 145, 195 + i * 31, "#a5b9ac");
    flower(
      c,
      1140 + i * 40,
      430 + (i % 2) * 67,
      38,
      ["#c59ca4", "#c2b27d", "#90b5b4"][i % 3],
      0.32,
    );
  }
}
function quintanaRoo(c, p) {
  base(c, p + 2.35, ["#efe6d1", "#d9e9df"], "#a9b5a0");
  c.glow(1180, 320, 430, 330, "#d5b46b", 0.24);
  fret(c, 815, "#b7b279", 0.9);
  tide(c, p, "#69aab4", 520);
  for (let i = 0; i < 16; i++) {
    const x = 980 + i * 24,
      y = 810 - Math.sin(i * 0.7) * 30;
    c.add(
      path(
        `M${x} 920 Q${x - 30} ${y - 60} ${x} ${y - 140} M${x - 7} ${y} l-28 -45 M${x - 8} ${y - 30} l30 -35`,
        "#9baeb0",
        1.2,
        0.38,
      ),
    );
  }
  for (let i = 0; i < 12; i++) {
    let x = 990 + i * 29;
    c.add(
      path(
        `M${x} 880 q-18 -65 0 -100 m-7 34 q-40 -12 -27 -48 m28 28 q35 -15 26 -45`,
        "#91adb0",
        1.6,
        0.48,
      ),
    );
  }
  for (let j = 0; j < 12; j++)
    c.add(
      path(
        `M${850 + j * 2} ${520 + j * 5} Q${1050 + j * 3} ${370 + j * 5} ${1380 + j * 2} ${520 + j * 6}`,
        "#85b8ba",
        0.9,
        0.4,
      ),
    );
}
function tabasco(c, p) {
  base(c, p + 2.82, ["#e9ecde", "#d8e8d7"], "#9caf8b");
  tide(c, p, "#89aaa0", 670);
  for (let i = 0; i < 4; i++) {
    leaf(c, 1120, 790, 210, 200 + i * 26, "#a0b29b");
    leaf(c, 1120, 790, 170, 320 + i * 20, "#a6b58f");
  }
  for (let j = 0; j < 7; j++) {
    const x = 760 + j * 80,
      y = 710 + (j % 3) * 37;
    c.add(ellipse(x, y, 36, 9, "#9cb6a0", 0.3));
    flower(c, x, y - 5, 15, "#d4b0ac", 0.4);
  }
}
function tamaulipas(c, p) {
  base(c, p + 3.29, ["#ede4e3", "#dbe6df"], "#b5a0a7");
  ridge(
    c,
    [
      [-100, 870],
      [590, 790],
      [840, 560],
      [940, 590],
      [1110, 410],
      [1250, 590],
      [1500, 660],
    ],
    { fill: "#bdb2b3", ink: "#a3929d", opacity: 0.27 },
  );
  for (let i = 0; i < 8; i++) {
    let x = 1050 + i * 44;
    c.add(
      path(
        `M${x} 880 Q${x - 25} 760 ${x + 10} ${650 - (i % 3) * 35}`,
        "#98a98b",
        1.3,
        0.5,
      ),
    );
    for (let j = 0; j < 5; j++)
      leaf(c, x, 760 - j * 17, 30, 210 + j * 8, "#98a98b");
  }
  fret(c, 820, "#ad9da4", 0.55);
  // Original corner ribbons echo the launch photograph's restrained burgundy accent.
  for (let j = 0; j < 26; j++)
    c.add(
      path(
        `M${820 + j * 4} 930 Q${1100 + j * 3} ${720 + j * 4} 1460 ${690 + j * 5}`,
        "#ae8496",
        0.9,
        0.3,
      ),
    );
}
function veracruz(c, p) {
  base(c, p + 3.76, ["#eeeeeb", "#e0e4e5"], "#9daeb1");
  tide(c, p, "#86aebc", 650);
  arch(c, 1080, 720, 0.9, "#8b9eae");
  c.add(
    path(
      "M1040 620 L1060 290 H1110 L1130 620Z M1052 400 H1118 M1047 510 H1125 M1050 286 H1120 V255 H1050Z M1040 252 L1085 225 L1130 252Z",
      "#8b9eae",
      1,
      0.5,
      "#dce4e6",
    ),
  );
  for (let i = 0; i < 3; i++)
    c.add(path(`M${1070 + i * 12} 282 V260`, "#8b9eae", 1, 0.5));
  for (let j = 0; j < 30; j++)
    c.add(
      line(
        [
          [1062, 310 + j * 10],
          [1109, 310 + j * 10],
        ],
        "#8b9eae",
        0.7,
        0.25,
      ),
    );
}
function yucatan(c, p) {
  base(c, p + 4.23, ["#ede9da", "#dfe8d5"], "#adaf8e");
  for (let i = 0; i < 7; i++) {
    let w = 400 - i * 43,
      y = 760 - i * 38;
    c.add(
      path(
        `M${1110 - w / 2} ${y} v-36 h${w} v36`,
        "#9ca88c",
        1,
        0.5,
        "#e1e4d4",
      ),
    );
  }
  for (let j = 0; j < 40; j++)
    c.add(
      line(
        [
          [1088, 760 - j * 6],
          [1132, 760 - j * 6],
        ],
        "#9ca88c",
        0.7,
        0.55,
      ),
    );
  for (let j = 0; j < 7; j++) {
    let y = 742 - j * 38,
      w = 400 - j * 43;
    for (let k = 0; k < Math.floor(w / 29); k++)
      c.add(path(`M${1110 - w / 2 + k * 29} ${y} v16`, "#9ca88c", 0.7, 0.38));
  }
  fret(c, 825, "#9da88c", 0.7);
  for (let j = 0; j < 6; j++) leaf(c, 820, 820, 130, 200 + j * 24, "#a6b895");
}
function zacatecas(c, p) {
  base(c, p + 4.7, ["#eee2de", "#e6dddc"], "#b6a2ae");
  ridge(
    c,
    [
      [-100, 880],
      [620, 815],
      [860, 640],
      [1060, 550],
      [1230, 650],
      [1450, 520],
    ],
    { fill: "#c7b4b9", ink: "#ae959f", opacity: 0.26 },
  );
  arch(c, 1020, 770, 1.2, "#b195a0");
  for (let i = 0; i < 2; i++) {
    let x = 900 + i * 245;
    c.add(
      path(
        `M${x - 27} 635 V400 H${x + 27} V635 M${x - 35} 400 H${x + 35} M${x - 27} 390 L${x} 340 L${x + 27} 390Z M${x - 13} 450 Q${x} 420 ${x + 13} 450 V490 H${x - 13}Z`,
        "#ad939f",
        1,
        0.52,
        "#e6d9dc",
      ),
    );
  }
  c.add(
    path(
      "M977 625 V570 Q1022 510 1067 570 V625 M987 625 V575 Q1022 530 1057 575 V625 M1022 548 V622",
      "#ad939f",
      1,
      0.5,
    ),
  );
  for (let j = 0; j < 11; j++)
    c.add(path(`M760 ${785 + j * 4} H1280`, "#ad939f", 0.8, 0.36));
}
export default {
  campeche,
  chiapas,
  guerrero,
  oaxaca,
  "quintana-roo": quintanaRoo,
  tabasco,
  tamaulipas,
  veracruz,
  yucatan,
  zacatecas,
};
