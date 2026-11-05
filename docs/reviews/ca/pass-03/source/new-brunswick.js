import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+3.51,'#e3ecd9','#e4e8ee','#85a6a0');ridge(c,[[0,760],[470,730],[640,590],[700,565],[770,600],[800,750],[890,760],[980,610],[1080,585],[1140,710],[1400,740]],{fill:'#b4b5a1',ink:'#8b9f93',opacity:.24});shore(c,'#78a7b1',770,19);branch(c,1230,740,.9,'#a7a1b9');
for(let j=0;j<15;j++)c.add(line(samples(t=>[1350-160*Math.sin(t)+j*4,240+180*Math.cos(t)+j*2],0,6.3,.04),'#a6a39b',.7,.19));
}
