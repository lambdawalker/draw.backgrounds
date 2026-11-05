import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#ccece7','#f7dfb9'); fan(c,720,500,'#879baf'); waves(c,{phase,color:'#b3828c',opacity:.2,amplitude:95,period:310}); rosette(c,980,480,155,'#90b3ad',{rings:18,lobes:8,opacity:.16});
grid(c,{phase,vertical:false,amplitude:28,color:"#7aafb0",opacity:.12,spacing:6});
c.glow(1000,380,440,340,"#f5df9e",.28);
}
