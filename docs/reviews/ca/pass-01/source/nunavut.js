import {base,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p,'#e4ebf4','#e7e7ed','#859cb9');shore(c,'#92aec5',730,16);iceberg(c,1100,730,1.4,'#94aac0');for(let j=0;j<6;j++)flower(c,780+j*100,840+Math.sin(j)*18,25,'#baa1bd',.33);c.glow(1000,260,270,230,'#e4c9af',.3);
}
