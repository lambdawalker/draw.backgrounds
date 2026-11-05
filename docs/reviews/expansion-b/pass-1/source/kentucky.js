import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e8edf0','#eee8dc','#dce8e2']); orbit(c,825,445,180,150,'#7a9298',p); dome(c,850,740,1.1,'#829391');
}
