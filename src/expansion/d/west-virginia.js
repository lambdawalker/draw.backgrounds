import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#e2ebee','#ece9cf'); fan(c,1010,600,'#a2a7a0'); dome(c,960,820,1.3,'#a4a37b'); waves(c,{phase,color:'#9bafba',opacity:.12,from:400,amplitude:22});
c.add(path("M690 820Q960 790 1240 820","#8a9b99",1,.4));
for(let j=0;j<20;j++)c.add(path(`M${735+j*23} 840v20`,"#8c987f",.8,.3));
}
