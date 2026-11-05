import {paper,grid,waves,rosette,pine,ridge,flower,dome,leaf,fan,palm,rect,path,line,polygon,ellipse,samples} from './helpers.js';
export default function(c,phase){
paper(c,'#dfe9f0','#ebe0dc'); fan(c,930,390,'#9b8caa'); for(let j=0;j<4;j++)flower(c,1080+j*52,630+Math.sin(j)*100,55,'#baa6b6',.2);
rosette(c,1110,650,180,"#ab9c74",{rings:16,lobes:14,amplitude:18,opacity:.24});
c.glow(940,390,350,350,"#fffaf0",.55);
for(let j=0;j<24;j++){const a=j*Math.PI/12,b=a+.075; c.add(polygon([[930,390],[930+1450*Math.cos(a),390+1450*Math.sin(a)],[930+1450*Math.cos(b),390+1450*Math.sin(b)]],j%2?"#a7aa90":"#9a9ab5",.09));}
for(let j=0;j<18;j++){const a=j*Math.PI/9; c.add(path(`M${930+300*Math.cos(a)} ${390+300*Math.sin(a)}L${930+340*Math.cos(a)} ${390+340*Math.sin(a)}`,"#a9a27f",2,.3));}
}
