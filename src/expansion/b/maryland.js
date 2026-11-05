import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#f7efcc','#eee7e6','#ece1cf']); for(let j=0;j<5;j++){c.add(polygon([[j*280,0],[j*280+130,0],[j*280+130,440],[j*280+280,440]],'#b6a895',.15));c.add(polygon([[j*280,440],[j*280+140,440],[j*280+140,880],[j*280+280,880]],'#d49b9c',.2));} contours(c,'#a99aa0',p,'vertical',.15);
}
