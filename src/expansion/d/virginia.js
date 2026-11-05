import {
  paper,
  grid,
  waves,
  rosette,
  pine,
  ridge,
  flower,
  dome,
  leaf,
  fan,
  palm,
  rect,
  path,
  line,
  polygon,
  ellipse,
  samples,
} from "./helpers.js";
export default function (c, phase) {
  paper(c, "#dfe9f0", "#ebe0dc");
  fan(c, 930, 390, "#9b8caa");
  for (let j = 0; j < 4; j++)
    flower(c, 1080 + j * 52, 630 + Math.sin(j) * 100, 55, "#baa6b6", 0.2);
  rosette(c, 1110, 650, 180, "#ab9c74", {
    rings: 16,
    lobes: 14,
    amplitude: 18,
    opacity: 0.24,
  });
  c.glow(940, 390, 350, 350, "#fffaf0", 0.55);
  for (let j = 0; j < 24; j++) {
    const a = (j * Math.PI) / 12,
      b = a + 0.075;
    c.add(
      polygon(
        [
          [930, 390],
          [930 + 1450 * Math.cos(a), 390 + 1450 * Math.sin(a)],
          [930 + 1450 * Math.cos(b), 390 + 1450 * Math.sin(b)],
        ],
        j % 2 ? "#a7aa90" : "#9a9ab5",
        0.085,
      ),
    );
  }
  for (let j = 0; j < 18; j++) {
    const a = (j * Math.PI) / 9;
    c.add(
      path(
        `M${930 + 300 * Math.cos(a)} ${390 + 300 * Math.sin(a)}L${930 + 340 * Math.cos(a)} ${390 + 340 * Math.sin(a)}`,
        "#a9a27f",
        2,
        0.3,
      ),
    );
  }
for(let j=0;j<18;j++){const a=j*Math.PI/9; c.add(path(`M${930+360*Math.cos(a)} ${390+360*Math.sin(a)}Q${930+380*Math.cos(a+.04)} ${390+380*Math.sin(a+.04)} ${930+360*Math.cos(a+.08)} ${390+360*Math.sin(a+.08)}`,'#b4a684',1,.35));}
for(let j=0;j<20;j++){const a=j*Math.PI/10;c.add(path(`M${930+260*Math.cos(a)} ${390+260*Math.sin(a)}Q${930+270*Math.cos(a+.07)} ${390+270*Math.sin(a+.07)} ${930+260*Math.cos(a+.14)} ${390+260*Math.sin(a+.14)}`,'#b4a684',.7,.22));}
c.add(path('M1075 742Q1110 665 1175 595 M1110 690q-30 -25 -48 -9 M1141 645q28 -14 43 -6','#a3a68f',.9,.24));
for(let j=0;j<8;j++)c.add(path(`M${1040+j*23} ${740-Math.sin(j/7*Math.PI)*35}q8 -16 17 -9`,'#a3a68f',.65,.2));
}
