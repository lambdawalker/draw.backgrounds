import { base, contours, dome } from "./motifs.js";
export default function (c, p) {
  base(c, ["#e4eef0", "#f2efdc", "#e2e9e7"]);
  c.glow(
    200 + 1000 * c.random(),
    140 + 600 * c.random(),
    700,
    600,
    "#90b7c4",
    0.18,
  );
  c.add(c.openGroup(`translate(${28 * Math.sin(p)} ${15 * Math.cos(p)})`));
  contours(c, "#91b2c0", p, "vertical");
  dome(c, 940, 770, 1.5, "#7699ad");
  c.add(c.path("M790 440 Q940 200 1090 440Z", "#c9b780", 0.7, 0.16, "#d6c78e"));
  for (let j = 0; j < 7; j++)
    c.add(
      c.path(
        `M${610 - j * 7} ${775 + j * 6} H${1270 + j * 7}`,
        "#88a1b1",
        0.8,
        0.4,
      ),
    );
  for (let j = 0; j < 11; j++)
    c.add(
      c.path(
        `M${685 + j * 50} 675 V600 Q${695 + j * 50} 585 ${705 + j * 50} 600 V675Z`,
        "#819faf",
        0.8,
        0.2,
        "#b3c5cb",
      ),
    );
  c.add(c.path("M600 770 V660 H625 M1270 770 V660 H1300", "#88a1b1", 1, 0.4));
  for (let j = 0; j < 25; j++)
    c.add(
      c.path(
        `M${-30 + j * 8} 0 Q${350 + j * 10} 450 ${220 + j * 10} 880`,
        "#8cabb8",
        0.75,
        0.18,
      ),
    );
  for (let j = -2; j <= 2; j++)
    c.add(
      c.path(
        `M${940 + j * 42 - 8} 525 V482 Q${940 + j * 42} 470 ${940 + j * 42 + 8} 482 V525Z`,
        "#829eac",
        0.75,
        0.35,
      ),
    );
  for (const x of [625, 1255]) {
    c.add(c.path(`M${x} 770 V584 h12 V770`, "#7899a9", 1, 0.28));
  }
  c.add(
    c.path(
      "M925 320 V289 H955 V320 M920 289 L940 276 L960 289Z",
      "#7899a9",
      1,
      0.38,
    ),
  );
  for (let j = 0; j < 7; j++)
    c.add(c.path(`M625 ${577 + j * 3} H1255`, "#7c9cac", 0.55, 0.18));
  c.add(c.path("M919 321 H961", "#7899a9", 0.8, 0.3));
  c.add(c.closeGroup());
}
