import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#dceadb','#d5dfb4'); ridge(c,[[0,650],[240,570],[480,620],[780,410],[1050,530],[1210,470],[1400,570]],{fill:'#9caf8a',ink:'#779474',opacity:.24}); waves(c,{phase,color:'#70956e',opacity:.15,amplitude:48}); leaf(c,1140,310,1.7,'#7a9b66');
for(let j=0;j<10;j++)pine(c,900+j*50,880,100+c.random()*80,"#77956e",.15);
c.add(path("M0 780Q400 670 760 770T1400 720","#8d9f7a",2,.25));
leaf(c,1230,650,.7,"#a2a06c");
}
