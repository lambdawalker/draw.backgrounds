import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+1.89,'#e4ebf4','#e7e7ed','#859cb9');shore(c,'#92aec5',730,16);ridge(c,[[0,850],[470,820],[720,790],[850,660],[915,655],[920,610],[1020,605],[1065,710],[1200,740],[1400,720]],{fill:'#b9c0cf',ink:'#94a6bd',opacity:.22});for(let j=0;j<6;j++)flower(c,780+j*100,840+Math.sin(j)*18,25,'#baa1bd',.33);c.glow(1000,260,270,230,'#e4c9af',.3);
}
