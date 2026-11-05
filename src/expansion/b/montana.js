import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#e7ecee','#efe9d9','#e7e3d7']);
c.glow(200+1000*c.random(),140+600*c.random(),700,600,'#8aa5ac',.18);c.add(`<g transform="translate(${28*Math.sin(p)} ${15*Math.cos(p)})">`);
ridge(c,[[-40,380],[150,230],[340,360],[510,420],[690,440],[880,330],[1100,100],[1260,200],[1450,100]],{fill:'#a5b5b7',ink:'#6e8c97',opacity:.4});waves(c,{from:570,to:900,spacing:14,amplitude:20,period:220,color:'#9aa98a',phase:p,opacity:.25});
ridge(c,[[-40,720],[180,620],[420,680],[640,630],[920,520],[1140,580],[1450,450]],{fill:'#b4b89c',ink:'#8f9c81',opacity:.35});
for(let j=0;j<18;j++)c.add(path(`M1100 100 L${950+j*13} ${300+j*9} L${900+j*10} ${480+j*5}`,'#708d97',.8,.16));
for(let j=0;j<14;j++)pine(c,900+j*40,870,45+(j%4)*15,'#8f9c82',.2);c.add(path('M-20 800 Q450 680 690 760 T1440 660','#7c958a',1,.25));
c.add('</g>');
for(let j=0;j<12;j++)c.add(path(`M${1140+j*9} ${260+j*15} l40 24 l38 -7 l35 30`,'#728d94',.65,.2));
}
