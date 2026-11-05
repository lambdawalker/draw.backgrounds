import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e7ecee','#efe9d9','#e7e3d7']);ridge(c,[[-40,380],[150,230],[340,360],[510,420],[690,440],[880,330],[1100,100],[1260,200],[1450,100]],{fill:'#a5b5b7',ink:'#6e8c97',opacity:.4});waves(c,{from:570,to:900,spacing:14,amplitude:20,period:220,color:'#9aa98a',phase:p,opacity:.25});
ridge(c,[[-40,720],[180,620],[420,680],[640,630],[920,520],[1140,580],[1450,450]],{fill:'#b4b89c',ink:'#8f9c81',opacity:.35});
for(let j=0;j<18;j++)c.add(path(`M1100 100 L${950+j*13} ${300+j*9} L${900+j*10} ${480+j*5}`,'#708d97',.8,.16));
}
