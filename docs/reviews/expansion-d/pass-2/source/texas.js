import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#d2e6ec','#efdbbf'); waves(c,{phase,color:'#ba8f8c',opacity:.23,amplitude:65,period:350}); c.add(polygon([[750,270],[990,270],[990,460],[1230,460],[1230,590],[1130,640],[1040,820],[930,735],[820,600],[690,550],[610,420],[750,420]],'#92b7bd',.22));
dome(c,1050,710,.8,"#84a6b4");
}
