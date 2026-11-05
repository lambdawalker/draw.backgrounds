import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e4eef0','#f2efdc','#e2e9e7']); contours(c,'#91b2c0',p,'vertical'); dome(c,940,770,1.5,'#7699ad');
c.add(path('M790 440 Q940 200 1090 440Z','#c9b780',.7,.16,'#d6c78e'));for(let j=0;j<7;j++)c.add(path(`M${610-j*7} ${775+j*6} H${1270+j*7}`,'#88a1b1',.8,.4));
}
