import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+1.89,'#e7ecde','#dfeaec','#8caaa3');shore(c,'#80a4b3',660,26);ridge(c,[[0,880],[500,830],[730,760],[950,780],[1110,740],[1400,820]],{fill:'#bbc9ae',ink:'#8da18b',opacity:.24});for(let j=0;j<6;j++)pine(c,1000+j*60,795,130+c.random()*120,'#7fa08e',.22);for(let j=0;j<3;j++)trillium(c,870+j*140,500+j*70,.65,'#a5b1a1');
}
