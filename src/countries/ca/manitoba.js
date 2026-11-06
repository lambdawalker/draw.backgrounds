import {
  base,
  drawCoastalArcEngraving,
  fireweed,
  trillium,
  iris,
  samples,
  waves,
  ridge,
  snowOnRidge,
  pine,
  flower,
  shore,
  branch,
  lily,
  grasses,
  iceberg,
} from "./helpers.js";
function drawWaterReflections(c) {
  for (let j = 0; j < 12; j++)
    c.add(
      c.ellipse(760 + j * 53, 725 + Math.sin(j) * 26, 55, 10, "#95b7ae", 0.17),
    );
}

function drawWetlandReeds(c) {
  for (let j = 0; j < 5; j++) {
    let x = 880 + j * 80,
      y = 635 + Math.sin(j) * 25;
    c.add(
      c.path(
        `M${x} ${y + 130}Q${x - 35} ${y + 20} ${x} ${y}`,
        "#93a397",
        1,
        0.45,
      ),
    );
    c.add(c.ellipse(x, y, 22, 9, "#b3a3bd", 0.4));
    c.add(
      c.path(
        `M${x} ${y + 80}q-70 -40 -55 -75q45 15 55 75 M${x} ${y + 90}q55 -35 65 -65q-40 12 -65 65`,
        "#8fa79c",
        1,
        0.35,
      ),
    );
  }
}

export default function (c, p) {
  base(c, p + 2.16, "#e8edce", "#dceae7", "#8ea898");
  shore(c, "#80a7ac", 660, 22);
  drawWaterReflections(c);
  grasses(c, 1070, 870, 1.4, "#b4a36f");
  drawWetlandReeds(c);
  drawCoastalArcEngraving(c, "#a4ad96");
}
