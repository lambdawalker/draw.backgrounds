import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e6eff2','#f4f3d5','#e7e6c8']);
c.glow(200+1000*c.random(),140+600*c.random(),700,600,'#ccb96c',.18);c.add(`<g transform="translate(${28*Math.sin(p)} ${15*Math.cos(p)})">`);
 contours(c,'#aab1a2',p); for(let j=0;j<10;j++) c.add(path(`M-40 ${650+j*16} Q470 ${500+j*12} 1450 ${730+j*9}`,'#a6aa78',1,.23)); for(let j=0;j<6;j++)wheat(c,1020+j*50,890,.65+(j%3)*.19,'#919761');
c.add(path('M-20 770 Q280 640 580 710 T1450 755 L1450 900 H-20Z','#a6b28a',.8,.11,'#a6b28a'));wheat(c,880,885,.62,'#8f986c');
for(let j=0;j<35;j++)c.add(line(samples(a=>[250+Math.cos(a)* (400+j*4),190+Math.sin(a)*(150+j*4)],0,Math.PI*2,.025),'#b3a770',.7,.16));
for(let j=0;j<6;j++)c.add(path(`M${1020+j*50} 830 Q${1000+j*50} 750 ${1040+j*50} 690`,'#7e8c60',.65,.25));
c.add('</g>');
}
