import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e5eaf1','#edf1e8','#e3e9e7']); for(let j=0;j<12;j++)pine(c,580+j*65,590,100+(j%4)*50,'#7d9b8f',.22);waves(c,{from:610,to:900,color:'#83a6b6',amplitude:12,spacing:13,opacity:.24,phase:p});
}
