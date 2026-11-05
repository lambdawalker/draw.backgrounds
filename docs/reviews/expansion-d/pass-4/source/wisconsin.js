import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#eeeecf','#dce4e6'); waves(c,{phase,color:'#8193a5',opacity:.22,amplitude:120,period:190}); dome(c,440,750,.8,'#95a09a'); leaf(c,1170,210,1.1,'#7b9456'); leaf(c,1200,730,1.4,'#929e79');
grid(c,{phase,color:"#a2a67a",opacity:.1,spacing:17,amplitude:42});
for(let j=0;j<12;j++)c.add(path(`M${150+j*18} 800q400 -55 700 10`,"#96a491",.65,.16));
}
