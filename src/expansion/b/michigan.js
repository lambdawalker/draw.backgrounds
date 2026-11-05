import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#f0e9ed','#f5f2e8','#e5eaed']); orbit(c,850,450,100,95,'#aa8d9a',p); contours(c,'#9c99a6',p,'horizontal',.13);
orbit(c,990,390,170,110,'#9d91a5',p+.5);grid(c,{color:'#9c9aaa',opacity:.13,spacing:15,amplitude:40,phase:p});
}
