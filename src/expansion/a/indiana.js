import {
  paper,
  field,
  border,
  quality,
  dome,
  path,
  flourish,
  ellipse,
} from "./helpers.js";
export default function (c, p) {
  paper(c, ["#e8ede4", "#e9e5d6", "#dce6e3"]);
  field(c, "#91aba4", p);
  dome(c, 1020, 690, 1.4, "#6d9185", "indiana");
  flourish(c, 790, 770, 760, "#aaa58c");
  if (quality.pass >= 5) {
    c.add(
      path(
        "M750 790 l40 -30 h135 l40 20 h70 l25 30 H730Z",
        "#728f84",
        1,
        0.4,
        "#c2cdc4",
      ),
    );
    c.add(ellipse(795, 813, 28, 18, "#879d94", 0.3));
    c.add(ellipse(1000, 813, 28, 18, "#879d94", 0.3));
    for (let j = 0; j < 11; j++)
      c.add(path(`M${770 + j * 20} 785 l20 -18`, "#728f84", 0.7, 0.35));
  }
  c.add(path("M831 777 l20 -18 h51 l22 18Z M788 804 h15 M992 804 h16 M750 793 H1042","#718e83",.8,.48));
  for(const x of [795,1000])for(let j=0;j<9;j++)c.add(path(`M${x-18+j*4} 808 v10`,"#718e83",.6,.4));
  border(c, "#a1ad95");
}
