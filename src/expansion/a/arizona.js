import { paper, field, border, quality, path, ellipse } from "./helpers.js";
import { ridge, rockEtching, waves } from "../../geometry.js";
export default function (c, p) {
  paper(c, ["#f2e9da", "#ecd9d2", "#d9e8e2"]);
  field(c, "#bd967c", p);
  c.add(ellipse(1080, 220, 170, 170, "#edd6a0", 0.25));
  const v = [
    [-100, 590],
    [180, 520],
    [360, 550],
    [530, 470],
    [620, 500],
    [710, 360],
    [850, 350],
    [900, 410],
    [1100, 390],
    [1250, 520],
    [1500, 470],
  ];
  ridge(c, v, { fill: "#b98b81", ink: "#a06d69", opacity: 0.25 });
  rockEtching(c, v, {
    color: "#8c5f59",
    opacity: quality.pass >= 3 ? 0.25 : 0.15,
  });
  for (let j = 0; j < 24; j++)
    c.add(
      path(
        `M-30 ${640 + j * 9} Q430 ${460 + j * 11} 720 ${620 + j * 7} T1450 ${520 + j * 15}`,
        "#b78f7c",
        0.8,
        0.3,
      ),
    );
  if (quality.pass >= 5) {
    c.add(
      path(
        "M1160 840 V550 Q1145 510 1134 552 V650 H1110 V588 Q1098 568 1090 588 V665 Q1090 685 1134 685 V840 M1158 710 H1198 Q1213 710 1213 690 V625 Q1200 602 1190 625 V682 H1158",
        "#71978d",
        2,
        0.45,
        "#9cb5a2",
      ),
    );
  }
  for (let j = 0; j < 5; j++)
    c.add(path(`M${1138 + j * 4} 830 V565`, "#54796c", 0.7, 0.4));
  for (let j = 0; j < 25; j++)
    c.add(
      path(
        `M-20 ${790 + j * 6} Q450 ${610 + j * 7} 690 ${820 + j * 4} T1420 ${750 + j * 7}`,
        "#9d8e77",
        0.8,
        0.23,
      ),
    );
  for(let j=0;j<32;j++){let x=640+c.random()*510,y=440+c.random()*210;c.add(path(`M${x} ${y} q35 -10 73 1 l28 -3`,"#a77e70",.7,.23));}
  for(let j=0;j<20;j++){let x=710+j*20;c.add(path(`M${x} ${430+Math.sin(j)*24} q-10 24 8 50 t-12 65`,"#947868",.8,.24));}
  for(let j=0;j<3;j++){c.add(path(`M${1095+j*4} 600 V663 Q1110 674 1135 675`,"#618675",.65,.35));c.add(path(`M${1193+j*4} 638 V691 Q1180 701 1160 701`,"#618675",.65,.35));}
  border(c, "#bd9c7d", 1);
}
