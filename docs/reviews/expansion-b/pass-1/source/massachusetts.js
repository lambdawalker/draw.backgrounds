import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e4eef0','#f2efdc','#e2e9e7']); contours(c,'#91b2c0',p,'vertical'); dome(c,940,770,1.5,'#7699ad');
}
