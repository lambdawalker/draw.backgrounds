import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#e1eff2','#dce7b9'); grid(c,{phase,opacity:.16,color:'#668e98'}); ridge(c,[[0,650],[340,530],[620,590],[900,280],[1170,520],[1400,460]],{fill:'#abc0bd',ink:'#6b9090',opacity:.4}); for(let j=0;j<12;j++)pine(c,850+j*49,870,150+c.random()*160,'#6e946e',.25);
}
