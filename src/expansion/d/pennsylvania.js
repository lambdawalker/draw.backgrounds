import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#ccece7','#f7dfb9'); fan(c,720,500,'#879baf'); waves(c,{phase,color:'#b3828c',opacity:.2,amplitude:95,period:310}); rosette(c,980,480,155,'#90b3ad',{rings:24,lobes:12,opacity:.22});
grid(c,{phase,vertical:false,amplitude:28,color:"#7aafb0",opacity:.12,spacing:6});
c.glow(1000,380,440,340,"#f5df9e",.28);
for(let j=0;j<40;j++)c.add(path(`M0 ${40+j*18}Q650 ${200+j*12} 1400 ${-30+j*22}`,"#ba9aaa",.7,.16));
}
