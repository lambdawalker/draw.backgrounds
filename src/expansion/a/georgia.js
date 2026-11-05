import { paper, field, border, quality, leaf } from "./helpers.js";
export default function (c, p) {
  paper(c, ["#e3eceb", "#eee2d4", "#e2e5cc"]);
  field(c, "#88a7b1", p);
  for (let j = 0; j < 50; j++)
    c.add(
      c.path(
        `M-60 ${240 + j * 13} Q360 ${180 + j * 7} 650 ${350 + j * 7} T1460 ${220 + j * 13}`,
        j < 23 ? "#85a3b6" : "#a7ad7c",
        0.8,
        0.25,
      ),
    );
  c.add(
    c.path(
      "M790 700 C660 530 880 430 1000 540 C1120 415 1300 560 1160 750 C1090 870 895 865 790 700Z",
      "#b6a077",
      1,
      0.23,
      "#e2c5a0",
    ),
  );
  if (quality.pass >= 3)
    for (let j = 0; j < 21; j++)
      c.add(
        c.path(
          `M${905 + j * 5} 540 Q${780 + j * 13} 690 ${950 + j * 3} 820`,
          "#a38371",
          0.7,
          0.22,
        ),
      );
  leaf(c, 1000, 540, 175, -160, "#8eaa8b");
  if (quality.pass >= 5) leaf(c, 1000, 540, 135, -40, "#92ad90");
  c.add(
    c.path(
      "M1000 548 Q980 680 1002 790 M1000 542 q-5 -45 25 -65",
      "#997c65",
      1.3,
      0.35,
    ),
  );
  const dots = [];
  for (let j = 0; j < 520; j++) {
    let x = 720 + c.random() * 520,
      y = 480 + c.random() * 380;
    dots.push(c.ellipse(x, y, 0.9, 0.9, "#ab9e83", 0.3));
  }
  c.clip(
    c.path(
      "M790 700 C660 530 880 430 1000 540 C1120 415 1300 560 1160 750 C1090 870 895 865 790 700Z",
      "none",
      0,
      1,
      "white",
    ),
    dots,
  );
  c.add(
    c.path(
      "M995 548 Q1008 493 1050 472 Q1078 458 1100 460 M1023 488 l-14 -23",
      "#8c997a",
      1.5,
      0.35,
    ),
  );
  for (let j = 0; j < 14; j++)
    c.add(
      c.path(
        `M${1030 + j * 6} 550 Q${1195 + j * 2} 665 ${1030 + j * 3} 804`,
        "#aa9078",
        0.65,
        0.14,
      ),
    );
  border(c, "#95a9ae");
}
