import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#f5e9e4','#e4e9e5'); grid(c,{phase,color:'#9b9a97',amplitude:6,opacity:.16}); palm(c,930,800,1.55,'#9294ac'); c.add(path('M1100 160A75 75 0 1 0 1142 295A63 63 0 0 1 1100 160','#9c9cc2',0,.35,'#9c9cc2'));
}
