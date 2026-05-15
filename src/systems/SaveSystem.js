ICAC.SaveSystem = {
  save: function(key, state) { try { localStorage.setItem('icac_' + key, JSON.stringify({ state: state, time: Date.now() })); } catch(e){} },
  load: function(key) { try { var d = localStorage.getItem('icac_' + key); return d ? JSON.parse(d) : null; } catch(e) { return null; } }
};
