import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e8eddc','#f3f0d8','#e5e9dc']);
c.glow(200+1000*c.random(),140+600*c.random(),700,600,'#8da575',.18);c.add(`<g transform="translate(${28*Math.sin(p)} ${15*Math.cos(p)})">`);
 contours(c,'#a3b295',p,'vertical'); for(let j=0;j<8;j++)pine(c,900+j*70,880,160+(j%3)*60,'#859d79',.22); c.add(path('M970 880 Q1120 600 1240 430','#8c9d76',1.5,.3));for(let j=0;j<6;j++)leaves(c,1040+j*30,760-j*48,40,'#9baa87');
for(let j=0;j<20;j++)c.add(path(`M-20 ${700+j*10} Q420 ${590+j*12} 850 ${760+j*5} T1450 ${750+j*7}`,'#9eaa86',.7,.22));
c.add('</g>');
orbit(c,250,80,190,90,'#b0b48b',p);
}
