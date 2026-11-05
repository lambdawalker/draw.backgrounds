import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#dbe8f4','#e4d8ca'); ridge(c,[[0,720],[440,630],[660,500],[740,520],[800,350],[920,400],[1010,300],[1120,400],[1220,450],[1400,410]],{fill:'#b5b9ba',ink:'#81919b',opacity:.48}); waves(c,{phase,color:'#a58c9c',opacity:.18,from:100,to:880,amplitude:15});
for(let j=0;j<22;j++)c.add(path(`M${660+j*30} 810L${690+j*30} ${490+50*Math.sin(j*.8)}`,"#8796a4",1,.25));
}
