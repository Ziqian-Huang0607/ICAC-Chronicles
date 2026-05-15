ICAC.ReputationSystem = {
  addXP: function(v) { ICAC.state.player.xp += v; this.checkPromo(); },
  checkPromo: function() {
    var s = ICAC.state, idx = s.player.rankIdx + 1;
    if(idx >= ICAC.ranks.length) return false;
    var r = ICAC.ranks[idx];
    if(s.player.xp >= idx * 150 && s.stats.integrity >= (r.minIntegrity || 0)) {
      s.player.rankIdx = idx; s.player.rank = r; return true;
    }
    return false;
  }
};
