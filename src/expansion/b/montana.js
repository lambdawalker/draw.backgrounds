import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e7ecee','#efe9d9','#e7e3d7']);ridge(c,[[-40,380],[150,230],[340,360],[510,420],[690,440],[880,330],[1100,100],[1260,200],[1450,100]],{fill:'#a5b5b7',ink:'#6e8c97',opacity:.4});waves(c,{from:570,to:900,spacing:14,amplitude:20,period:220,color:'#9aa98a',phase:p,opacity:.25});
}
