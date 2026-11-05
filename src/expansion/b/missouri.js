import {rect,path,line,ellipse,polygon,samples,waves,grid,rosette,ridge,pine,flower,engravedPavilion} from '../../geometry.js';
import {base,contours,wheat,dome,leaves,orbit} from './motifs.js';
export default function(c,p){
base(c,['#f1e9df','#e9eee8','#e4e7e9']);rosette(c,940,450,160,'#8ba0a7',{rings:24,lobes:17,amplitude:35,opacity:.23});waves(c,{from:70,to:150,spacing:10,amplitude:14,color:'#b09991',phase:p,opacity:.3}); waves(c,{from:730,to:880,spacing:11,amplitude:15,color:'#8b97aa',phase:p,opacity:.28});
grid(c,{color:'#8ba5a6',opacity:.15,spacing:19,amplitude:45,phase:p});
for(let j=0;j<16;j++)c.add(line(samples(x=>[x,35+j*4+14*Math.sin(x/22+j*.4)],-20,1420,4),'#ad8e81',.65,.22));
rosette(c,720,410,230,'#a0aaa1',{rings:10,lobes:11,amplitude:18,opacity:.12});
}
