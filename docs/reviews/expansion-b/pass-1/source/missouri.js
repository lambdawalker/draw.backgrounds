import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#f1e9df','#e9eee8','#e4e7e9']);rosette(c,940,450,160,'#8ba0a7',{rings:24,lobes:17,amplitude:35,opacity:.23});waves(c,{from:70,to:150,spacing:10,amplitude:14,color:'#b09991',phase:p,opacity:.3}); waves(c,{from:730,to:880,spacing:11,amplitude:15,color:'#8b97aa',phase:p,opacity:.28});
}
