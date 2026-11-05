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
  paper(c, "#f5e9e4", "#e4e9e5");
  grid(c, { phase, color: "#9b9a97", amplitude: 6, opacity: 0.16 });
  palm(c, 1020, 800, 1.4, "#9294ac");
  c.add(
    path(
      "M1100 160A75 75 0 1 0 1142 295A63 63 0 0 1 1100 160",
      "#9c9cc2",
      0,
      0.28,
      "#9c9cc2",
    ),
  );
  waves(c, {
    phase,
    color: "#a98694",
    opacity: 0.2,
    amplitude: 110,
    period: 250,
    from: 560,
    to: 850,
  });
  for (let j = 0; j < 16; j++)
    c.add(path(`M${980 + j * 0.8} ${780 - j * 13}l27 -6`, "#8d8ba0", 1, 0.25));
  for (let j = 0; j < 7; j++)
    c.add(
      path(
        `M${1020 - j * 20} ${464 - j * 6}q-40 -35 -90 -10`,
        "#9294ac",
        1,
        0.3,
      ),
    );
  c.add(path("M830 810Q1050 775 1260 820", "#9faaa0", 1, 0.25));
for(let j=0;j<18;j++)c.add(path(`M${850+j*20} 832q15 -14 30 -8`,'#91a19f',.7,.2));
c.add(path('M1020 464q-80 -58 -150 -12 M1020 464q90 -45 162 12','#9294ac',1.3,.3));
for(let j=0;j<10;j++)c.add(path(`M${905+j*23} ${434-Math.sin(j/9*Math.PI)*56}l-12 26`,'#9294ac',.9,.2));
c.add(path('M1001 786Q985 630 1018 476','#9294ac',1,.35));
}
