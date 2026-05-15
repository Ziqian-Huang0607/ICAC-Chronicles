ICAC.CoverSystem = {
  states: { clear:'清晰', strained:'紧张', fractured:'破裂', paranoid:'偏执', exposed:'暴露' },
  update: function() {
    var c = ICAC.state.cover;
    if(!c.active) return;
    c.days++;
    var stats = ICAC.state.stats;
    if(stats.integrity > 80) c.credibility -= 2;
    else if(stats.integrity < 20) c.credibility -= 1;
    else c.credibility += 1;
    c.credibility = Math.max(0, Math.min(100, c.credibility));
    if(c.credibility <= 0) c.state = 'exposed';
    else if(c.credibility < 20) c.state = 'paranoid';
    else if(c.credibility < 40) c.state = 'fractured';
    else if(c.credibility < 60) c.state = 'strained';
    else c.state = 'clear';
  },
  stateName: function() { return this.states[ICAC.state.cover.state] || '清晰'; }
};
