import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+2.16,'#e8edce','#dceae7','#8ea898');shore(c,'#80a7ac',660,22);for(let j=0;j<12;j++)c.add(ellipse(760+j*53,725+Math.sin(j)*26,55,10,'#95b7ae',.17));grasses(c,1070,870,1.4,'#b4a36f');for(let j=0;j<3;j++)lily(c,890+j*110,560+j*43,.55,'#b6a7ba');
}
