import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#e8f1f1','#e6ded0'); waves(c,{phase,color:'#83abb6',opacity:.26,amplitude:28,from:440}); c.add(path('M1090 650L1125 250L1165 250L1210 650Z M1110 480H1184 M1120 415H1172 M1128 345H1160', '#8b9ba2',1.5,.45,'#d4e0e0')); c.add(path('M1125 250V220H1165V250 M1118 219H1172L1145 195Z','#758d99',1.3,.5));
c.add(path("M0 710 Q400 640 800 750T1400 720","#8ba5ac",2,.3));
}
