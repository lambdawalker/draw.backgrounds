import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+2.97,'#dfeef3','#ebe4d6','#789faf');shore(c,'#7ba4b3',640,28);ridge(c,[[0,890],[550,850],[770,780],[960,750],[1110,790],[1400,765]],{fill:'#b9bdad',ink:'#8c9da1',opacity:.25});c.add(path('M1025 750L1045 510H1115L1138 750Z M1035 510H1125V480H1035Z M1028 480L1080 446L1133 480Z M1080 446V425 M1060 510V480 M1100 510V480 M1067 749V705H1096V749','#819ba6',1.4,.45,'#f5f3e7'));branch(c,1300,875,.7,'#bfa0ac');
}
