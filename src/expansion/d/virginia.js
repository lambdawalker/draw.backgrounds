import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#dfe9f0','#ebe0dc'); fan(c,930,390,'#9b8caa'); for(let j=0;j<4;j++)flower(c,1080+j*52,630+Math.sin(j)*100,55,'#baa6b6',.2);
rosette(c,1110,650,180,"#ab9c74",{rings:16,lobes:14,amplitude:18,opacity:.24});
c.glow(940,390,350,350,"#fffaf0",.55);
}
