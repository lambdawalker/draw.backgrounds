import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#eeeecf','#dce4e6'); waves(c,{phase,color:'#8193a5',opacity:.22,amplitude:120,period:190}); dome(c,510,750,.65,'#95a09a'); leaf(c,1170,210,1.1,'#7b9456'); leaf(c,1200,730,1.4,'#929e79');
}
