import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e4eef0','#f2efdc','#e2e9e7']); contours(c,'#91b2c0',p,'vertical'); dome(c,940,770,1.5,'#7699ad');
c.add(path('M790 440 Q940 200 1090 440Z','#c9b780',.7,.16,'#d6c78e'));for(let j=0;j<7;j++)c.add(path(`M${610-j*7} ${775+j*6} H${1270+j*7}`,'#88a1b1',.8,.4));
for(let j=0;j<11;j++)c.add(path(`M${685+j*50} 675 V600 Q${695+j*50} 585 ${705+j*50} 600 V675Z`,'#819faf',.8,.28,'#b3c5cb'));c.add(path('M600 770 V660 H625 M1270 770 V660 H1300','#88a1b1',1,.4));
for(let j=0;j<25;j++)c.add(path(`M${-30+j*8} 0 Q${350+j*10} 450 ${220+j*10} 880`,'#8cabb8',.75,.18));
}
