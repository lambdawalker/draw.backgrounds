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
  samples,
} from "./helpers.js";
export default function (c, phase) {
  paper(c, "#e2ebee", "#ece9cf");
  fan(c, 1010, 600, "#a2a7a0");
  dome(c, 990, 820, 1.25, "#a4a37b");
  waves(c, {
    phase,
    color: "#9bafba",
    opacity: 0.12,
    from: 400,
    amplitude: 22,
  });
  c.add(c.path("M690 820Q960 790 1240 820", "#8a9b99", 1, 0.4));
  for (let j = 0; j < 20; j++)
    c.add(c.path(`M${735 + j * 23} 840v20`, "#8c987f", 0.8, 0.3));
  c.add(
    c.path(
      "M748 815V650H775 M1190 815V650H1218 M748 650H1218",
      "#a4a37b",
      1.1,
      0.3,
    ),
  );
  c.add(c.path("M990 282v-27 M975 315h30 M980 306h20", "#9a9b71", 1.3, 0.45));
  c.add(
    c.path(
      "M775 634H1205 M775 642H1205 M967 401H1013 M967 407H1013",
      "#9a9b71",
      1,
      0.35,
    ),
  );
  c.add(c.path("M834 608H1146V632H834Z M834 619H1146", "#9a9b71", 1, 0.35));
  for (let j = 0; j < 6; j++)
    c.add(c.path(`M${799 + j * 67} 852v18h42`, "#9a9b71", 0.7, 0.3));
  c.add(c.path("M780 863Q993 884 1210 862", "#9a9b71", 0.7, 0.22));
}
