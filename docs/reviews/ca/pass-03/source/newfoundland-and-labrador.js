import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+6.75,'#e0edf4','#dbeae6','#759cba');shore(c,'#7fa9ba',630,24);iceberg(c,1010,640,1.5,'#7c9fb5');for(let j=0;j<9;j++)c.add(path(`M${925+j*13} ${610-j*7}l${20+j*2} ${30+j*5}`,'#94b2c4',.8,.3));ridge(c,[[0,880],[430,840],[620,790],[780,820],[1000,850],[1400,800]],{fill:'#b8c6b4',ink:'#8a9d9e',opacity:.27});branch(c,1270,880,.6,'#b497aa');
}
