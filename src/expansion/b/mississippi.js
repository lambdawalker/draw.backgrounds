import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#eeebde','#e7eadb','#e7e7d9']); orbit(c,1030,490,125,100,'#9ea88c',p); dome(c,1110,800,.8,'#8e9c88'); leaves(c,600,260,120,'#acb692');
flower(c,620,265,80,'#b7b89d',.22);flower(c,490,385,62,'#bfc0a8',.22);contours(c,'#a3af9c',p,'vertical',.13);
}
