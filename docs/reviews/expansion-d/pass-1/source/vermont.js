import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#dceadb','#d5dfb4'); ridge(c,[[0,650],[240,570],[480,620],[780,410],[1050,530],[1210,470],[1400,570]],{fill:'#9caf8a',ink:'#779474',opacity:.28}); waves(c,{phase,color:'#70956e',opacity:.15,amplitude:48}); leaf(c,1100,300,2.2,'#7a9b66');
}
