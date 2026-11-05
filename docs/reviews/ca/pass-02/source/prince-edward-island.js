import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+5.40,'#e2ede2','#e9e4d4','#85aaa8');shore(c,'#76a6b6',610,16);ridge(c,[[0,840],[440,800],[690,720],[860,700],[1110,790],[1400,750]],{fill:'#d1af9d',ink:'#ac9b8f',opacity:.26});grasses(c,1040,870,1.3,'#a8ab83');for(let j=0;j<3;j++)flower(c,1190+j*80,540+j*55,26,'#c5a4b4',.32);
}
