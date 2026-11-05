import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e5eaf1','#edf1e8','#e3e9e7']);
c.glow(200+1000*c.random(),140+600*c.random(),700,600,'#83a9b8',.18);c.add(`<g transform="translate(${28*Math.sin(p)} ${15*Math.cos(p)})">`);
 for(let j=0;j<12;j++)pine(c,580+j*65,590,100+(j%4)*50,'#7d9b8f',.22);waves(c,{from:610,to:900,color:'#83a6b6',amplitude:12,spacing:13,opacity:.24,phase:p});
c.add(path('M-20 630 Q360 660 640 570 Q920 530 1430 590 L1430 630 Q900 565 640 600 Q300 700 -20 650Z','#9dad99',1,.25,'#a7b89c'));
for(let j=0;j<21;j++)pine(c,360+j*48,570,60+c.random()*100,'#829b99',.13);
for(let j=0;j<18;j++)c.add(path(`M${650+j%3*40} ${645+j*8} h${280-j*7}`,'#7e9da4',.8,.19));
c.add('</g>');
for(let j=0;j<28;j++)c.add(path(`M-30 ${100+j*8} Q650 ${-60+j*12} 1430 ${240+j*5}`,'#9baebc',.6,.16));
}
