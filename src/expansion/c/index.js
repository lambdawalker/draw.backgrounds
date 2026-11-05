import {
  rect,
  path,
  line,
  polygon,
  ellipse,
  samples,
  grid,
  waves,
  rosette,
  ridge,
  pine,
  tower,
  engravedPavilion,
} from "../../geometry.js";
export const revision = 10;
function paper(c, a, b, phase) {
  c.add(
    rect(
      0,
      0,
      1400,
      880,
      c.gradient([
        [0, a],
        [55, "#f8f7ee"],
        [100, b],
      ]),
    ),
  );
  grid(c, { color: b, opacity: 0.2, spacing: 14, amplitude: 20, phase });
}
function curve(c, color, y, amp = 45, opacity = 0.3) {
  for (let i = 0; i < 42; i++)
    c.add(
      line(
        samples(
          (x) => [x, y + i * 6 + amp * Math.sin(x / 245 + i * 0.035)],
          -20,
          1420,
          9,
        ),
        color,
        0.7,
        opacity,
      ),
    );
}
function leaves(c, x, y, col) {
  for (let i = 0; i < 10; i++) {
    let a = i * 0.53;
    c.add(
      path(
        `M${x} ${y} Q${x + Math.cos(a) * 80} ${y - 70 - i * 15} ${x + Math.sin(a) * 120} ${y - 130 - i * 14}`,
        col,
        0.8,
        0.3,
      ),
    );
  }
}
function nebraska(c, p) {
  paper(c, "#ede8db", "#c4d39f", p);
  c.glow(1050, 185, 390, 230, "#e8b560", 0.45);
  ridge(
    c,
    [
      [0, 520],
      [530, 460],
      [780, 410],
      [850, 355],
      [905, 350],
      [922, 220],
      [930, 172],
      [955, 162],
      [978, 345],
      [1070, 370],
      [1170, 430],
      [1400, 450],
    ],
    { fill: "#d8c0a0", ink: "#a68777", opacity: 0.55 },
  );
  curve(c, "#98a379", 590, 50, 0.28);
  tower(c, 1120, 840, 0.95, "#8e9e7d");
  for (let i = 0; i < 12; i++) {
    let x = 70 + i * 18 + c.random() * 8;
    c.add(path(`M${x} 880 Q${x + 35} 760 ${x + 24} 650`, "#ae9a61", 0.8, 0.3));
  }
}
function nevada(c, p) {
  paper(c, "#e6f0f1", "#b9d1c9", p);
  ridge(
    c,
    [
      [0, 310],
      [260, 260],
      [430, 350],
      [690, 230],
      [850, 280],
      [1050, 170],
      [1220, 245],
      [1400, 220],
    ],
    { fill: "#b9cbd4", ink: "#7994a3", opacity: 0.28 },
  );
  rosette(c, 1080, 425, 175, "#719a9d", {
    rings: 24,
    lobes: 30,
    amplitude: 10,
    opacity: 0.26,
  });
  curve(c, "#9da889", 660, 55, 0.23);
  leaves(c, 1120, 780, "#7f9f86");
  leaves(c, 1190, 830, "#7f9f86");
}
function newHampshire(c, p) {
  paper(c, "#e8eef5", "#cfbfd3", p);
  for (let i = 0; i < 60; i++)
    c.add(
      line(
        samples(
          (t) => [
            700 + Math.cos(t) * (300 + i * 5),
            430 + Math.sin(t) * (160 + i * 3),
          ],
          0,
          Math.PI * 2,
          0.025,
        ),
        "#8aa7c1",
        0.65,
        0.15,
      ),
    );
  ridge(
    c,
    [
      [0, 680],
      [300, 615],
      [550, 660],
      [790, 520],
      [890, 560],
      [1010, 405],
      [1120, 455],
      [1400, 620],
    ],
    { fill: "#b8c7ce", ink: "#98a7b8", opacity: 0.25 },
  );
  for (let i = 0; i < 11; i++)
    pine(c, 1030 + i * 34, 870, 70 + c.random() * 125, "#819e9e", 0.17);
}
function newJersey(c, p) {
  paper(c, "#f2dbe3", "#c5ddcd", p);
  curve(c, "#c48d9c", -40, 45, 0.26);
  c.add(
    path(
      "M845 0 C700 190 1100 300 915 460 S740 750 960 900",
      "#a5c4c7",
      50,
      0.24,
    ),
  );
  engravedPavilion(c, 1080, 835, 0.86, "#899b92");
  for (let j = 0; j < 45; j++)
    c.add(
      path(
        `M${15 + j * 5} 900 C${-80 + j * 9} 650 ${370 + j * 4} 420 ${290 + j * 5} 150`,
        "#b788a0",
        0.6,
        0.23,
      ),
    );
}
function newMexico(c, p) {
  paper(c, "#dbeef0", "#ddcaa2", p);
  c.glow(550, 270, 650, 240, "#fffdf0", 0.9);
  ridge(
    c,
    [
      [0, 610],
      [400, 580],
      [630, 610],
      [770, 570],
      [830, 540],
      [850, 460],
      [875, 450],
      [890, 390],
      [1090, 365],
      [1200, 330],
      [1400, 350],
    ],
    { fill: "#dcb3a2", ink: "#bc927e", opacity: 0.52 },
  );
  for (let i = 0; i < 32; i++)
    c.add(
      path(
        `M890 ${410 + i * 8} Q1130 ${360 + i * 10} 1420 ${380 + i * 10}`,
        "#ac8874",
        0.7,
        0.22,
      ),
    );
  curve(c, "#adbb9e", 710, 35, 0.24);
  for (let j = 0; j < 9; j++) {
    let x = 1240 + j * 12;
    c.add(
      path(
        `M1280 900 Q${x - 30} 770 ${x - 85} 710 M1280 900 Q${x + 30} 770 ${x + 30} 700`,
        "#8ba594",
        1,
        0.36,
      ),
    );
  }
}
function newYork(c, p) {
  paper(c, "#e4eeee", "#d2c9c5", p);
  rosette(c, 820, 505, 265, "#9aa8a4", {
    rings: 24,
    lobes: 40,
    amplitude: 8,
    opacity: 0.33,
  });
  rosette(c, 820, 505, 185, "#c09ca4", {
    rings: 17,
    lobes: 28,
    amplitude: 13,
    opacity: 0.25,
  });
  for (let i = 0; i < 65; i++)
    c.add(
      path(
        `M${i * 22} 880 Q${300 + i * 15} 420 ${1100 + i * 6} -80`,
        "#789a9d",
        0.65,
        0.17,
      ),
    );
  curve(c, "#8aa6ae", 780, 12, 0.22);
}
function northCarolina(c, p) {
  paper(c, "#efdfe5", "#b9d4c8", p);
  curve(c, "#9dbacf", 155, 32, 0.22);
  ridge(
    c,
    [
      [0, 490],
      [180, 430],
      [320, 470],
      [480, 380],
      [630, 450],
      [800, 410],
      [940, 490],
      [1400, 510],
    ],
    { fill: "#b8cbb8", ink: "#92a7a9", opacity: 0.23 },
  );
  engravedPavilion(c, 1015, 810, 0.78, "#8f9e81");
  c.add(
    path(
      "M50 205 Q165 175 290 205 L170 214Z M170 195 V228 M90 215 H240",
      "#789ba8",
      1,
      0.35,
    ),
  );
  curve(c, "#b3a1bd", 730, 30, 0.22);
}
function northDakota(c, p) {
  paper(c, "#e9e5d7", "#ced8b7", p);
  ridge(
    c,
    [
      [0, 510],
      [160, 480],
      [260, 525],
      [430, 470],
      [610, 510],
      [730, 430],
      [910, 465],
      [1030, 410],
      [1200, 490],
      [1400, 460],
    ],
    { fill: "#c9b89d", ink: "#b3987c", opacity: 0.34 },
  );
  curve(c, "#b09e7f", 620, 46, 0.24);
  for (let i = 0; i < 19; i++) {
    let x = 1025 + i * 18 + c.random() * 14;
    c.add(path(`M${x} 900 Q${x - 35} 750 ${x - 20} 560`, "#9f9e69", 1, 0.36));
    for (let j = 0; j < 6; j++)
      c.add(
        path(
          `M${x - 20} ${570 + j * 15} l-14 -13 M${x - 20} ${570 + j * 15} l14 -13`,
          "#9f9e69",
          1,
          0.33,
        ),
      );
  }
}
function ohio(c, p) {
  paper(c, "#dcefed", "#d0dfa8", p);
  rosette(c, 930, 400, 220, "#9caec2", {
    rings: 24,
    lobes: 42,
    amplitude: 7,
    opacity: 0.3,
  });
  for (let i = 0; i < 55; i++)
    c.add(
      path(
        `M-20 ${650 + i * 5} C420 ${480 + i * 5} 800 ${970 + i * 3} 1450 ${600 + i * 5}`,
        "#84aaa1",
        0.8,
        0.23,
      ),
    );
  for (let i = 0; i < 30; i++)
    c.add(
      path(
        `M${120 + i * 7} 0 Q${530 + i * 8} 300 ${500 + i * 11} 880`,
        "#adc58b",
        0.7,
        0.2,
      ),
    );
}
function oklahoma(c, p) {
  paper(c, "#e0edf0", "#d1d1bd", p);
  dome(c, 1030, 850);
  curve(c, "#b1b59e", 740, 17, 0.14);
  for (let i = 0; i < 17; i++)
    c.add(
      path(
        `M${160 + i * 12} 880 L${240 + i * 7} ${470 + i * 3} L${380 + i * 8} 880`,
        "#bfa585",
        0.7,
        0.18,
      ),
    );
}
const designs = {
  nebraska: nebraska,
  nevada: nevada,
  "new-hampshire": newHampshire,
  "new-jersey": newJersey,
  "new-mexico": newMexico,
  "new-york": newYork,
  "north-carolina": northCarolina,
  "north-dakota": northDakota,
  ohio: ohio,
  oklahoma: oklahoma,
};

function detail(c, name) {
  const colors = {
    nebraska: "#a18b66",
    nevada: "#75959b",
    "new-hampshire": "#8a9ab1",
    "new-jersey": "#ad8f9e",
    "new-mexico": "#b18b76",
    "new-york": "#90a1a2",
    "north-carolina": "#92a698",
    "north-dakota": "#aa997d",
    ohio: "#90ada7",
    oklahoma: "#9b9d8c",
  };
  const col = colors[name];
  if (name === "nebraska")
    for (let i = 0; i < 24; i++)
      c.add(
        path(
          `M${920 + i * 2} ${180 + i * 2} L${900 + i * 4} 365 L${1000 + i * 5} 470`,
          col,
          0.65,
          0.22,
        ),
      );
  if (name === "nevada")
    for (let i = 0; i < 18; i++)
      c.add(
        path(
          `M${820 + i * 12} 880 Q${950 + i * 7} 640 ${1280 + i * 6} 700`,
          col,
          0.7,
          0.19,
        ),
      );
  if (name === "new-hampshire") curve(c, col, 70, 26, 0.11);
  if (name === "new-jersey")
    for (let i = 0; i < 15; i++)
      c.add(
        path(
          `M${835 + i * 3} 0 C${690 + i * 3} 190 ${1090 + i * 3} 300 ${905 + i * 3} 460 S${730 + i * 3} 750 ${950 + i * 3} 900`,
          col,
          0.7,
          0.15,
        ),
      );
  if (name === "new-mexico")
    for (let i = 0; i < 21; i++)
      c.add(
        path(
          `M${900 + i * 22} ${390 - i * 1.8} l-9 90 l19 70 l-8 120`,
          col,
          0.6,
          0.19,
        ),
      );
  if (name === "new-york")
    for (let i = 0; i < 26; i++)
      c.add(
        line(
          samples(
            (t) => [
              820 + Math.cos(t) * (110 + i * 3),
              505 + Math.sin(t) * (75 + i * 3),
            ],
            0,
            Math.PI * 2,
            0.025,
          ),
          col,
          0.6,
          0.16,
        ),
      );
  if (name === "north-carolina")
    for (let i = 0; i < 8; i++)
      pine(c, 1160 + i * 26, 850, 70 + i * 9 + c.random() * 30, col, 0.16);
  if (name === "north-dakota")
    for (let i = 0; i < 27; i++)
      c.add(
        path(
          `M0 ${550 + i * 5} Q500 ${490 + i * 5} 1000 ${590 + i * 4} T1450 ${560 + i * 4}`,
          col,
          0.6,
          0.15,
        ),
      );
  if (name === "ohio")
    for (let i = 0; i < 27; i++)
      c.add(
        path(
          `M${730 + i * 5} 0 Q${580 + i * 9} 420 ${1000 + i * 7} 880`,
          col,
          0.6,
          0.12,
        ),
      );
  if (name === "oklahoma")
    for (let i = 0; i < 19; i++)
      c.add(path(`M690 ${690 + i * 7} H1310`, col, 0.6, 0.17));

  for (let i = 0; i < 20; i++)
    c.add(
      path(
        `M-20 ${810 + i * 4} Q430 ${730 + i * 4} 720 ${820 + i * 3} T1420 ${780 + i * 4}`,
        col,
        0.6,
        0.17,
      ),
    );
}
export default Object.fromEntries(
  Object.entries(designs).map(([name, fn]) => [
    name,
    (c, p) => {
      fn(c, p);
      detail(c, name);
    },
  ]),
);

function dome(c, x, y) {
  let g = "";
  const add = (d, w = 1, o = 0.45, fill = "none") =>
    (g += path(d, "#89988e", w, o, fill));
  add("M-310 0 V-165 H310 V0 Z", 1, 0.35, "#e8e9df");
  for (let j = -11; j <= 11; j++) {
    let xx = j * 25;
    add(`M${xx - 7} 0 V-145 H${xx + 7} V0`, 0.9, 0.5);
    for (let k = -1; k <= 1; k++) add(`M${xx + k * 3} -8 V-138`, 0.6, 0.3);
  }
  add("M-325 -168 H325 M-320 -177 H320 M-310 -185 H310");
  add("M-130 -188 V-300 H130 V-188Z", 0.9, 0.4, "#e1e5dd");
  for (let i = -5; i <= 5; i++)
    add(
      `M${i * 22 - 6} -196 V-285 Q${i * 22} -299 ${i * 22 + 6} -285 V-196`,
      0.8,
      0.45,
    );
  add("M-145 -305 Q-128 -430 0 -451 Q128 -430 145 -305Z", 1, 0.5, "#e2e8e1");
  for (let i = -5; i <= 5; i++)
    add(`M${i * 27} -305 Q${i * 22} -408 0 -451`, 0.8, 0.4);
  for (let i = 0; i < 13; i++) {
    let yy = -310 - i * 10,
      ww = Math.sqrt(Math.max(0, 1 - ((yy + 305) / 150) ** 2)) * 140;
    add(`M${-ww} ${yy} H${ww}`, 0.6, 0.32);
  }
  add("M-22 -449 V-490 H22 V-449 M-28 -490 L0 -520 L28 -490Z M0 -520 V-540");
  for (let i = 0; i < 6; i++)
    add(`M${-325 - i * 3} ${i * 5} H${325 + i * 3}`, 0.8, 0.4);
  c.add(`<g transform="translate(${x} ${y})">${g}</g>`);
}
