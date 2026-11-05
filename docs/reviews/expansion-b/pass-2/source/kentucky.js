import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e8edf0','#eee8dc','#dce8e2']); orbit(c,825,445,180,150,'#7a9298',p); dome(c,850,740,1.1,'#829391');
for(let j=0;j<6;j++)c.add(path(`M${580-j*8} ${746+j*7} H${1120+j*8}`,'#829391',1,.4)); for(let j=0;j<22;j++)c.add(path(`M${430+j*8} 870 Q${180+j*22} 300 ${900+j*9} 30`,'#829ba1',.8,.13));
}
