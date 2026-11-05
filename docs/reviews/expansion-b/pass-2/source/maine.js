import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e8eddc','#f3f0d8','#e5e9dc']); contours(c,'#a3b295',p,'vertical'); for(let j=0;j<8;j++)pine(c,900+j*70,880,160+(j%3)*60,'#859d79',.22); leaves(c,1100,680,170,'#a5b488');
for(let j=0;j<20;j++)c.add(path(`M-20 ${700+j*10} Q420 ${590+j*12} 850 ${760+j*5} T1450 ${750+j*7}`,'#9eaa86',.7,.22));
}
