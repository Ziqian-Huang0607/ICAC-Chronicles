ICAC.NetworkSystem = {
  nodes: [
    { id:'sgt_lam', name:'Sgt. Lam', nameZh:'林警长', type:'police', x:300, y:200, corruption:80, influence:60 },
    { id:'insp_wong', name:'Insp. Wong', nameZh:'黄督察', type:'police', x:400, y:150, corruption:90, influence:80 },
    { id:'ah_kwong', name:'Ah Kwong', nameZh:'阿光', type:'triad', x:250, y:350, corruption:95, influence:50 },
    { id:'teahouse', name:'Teahouse Owner', nameZh:'茶餐厅老板', type:'business', x:350, y:250, corruption:60, influence:20 }
  ],
  edges: [
    { from:'sgt_lam', to:'teahouse', type:'bribe' },
    { from:'sgt_lam', to:'insp_wong', type:'alliance' },
    { from:'sgt_lam', to:'ah_kwong', type:'protection' },
    { from:'ah_kwong', to:'teahouse', type:'extortion' }
  ]
};
