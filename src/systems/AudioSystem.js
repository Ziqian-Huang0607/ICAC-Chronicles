ICAC.AudioSystem = {
  ctx: null,
  init: function() {
    try { var A = window.AudioContext || window.webkitAudioContext; this.ctx = new A(); } catch(e) {}
  },
  play: function(type) {
    if(!this.ctx || !ICAC.settings.sound) return;
    var ctx = this.ctx, now = ctx.currentTime;
    var osc = ctx.createOscillator(), gain = ctx.createGain();
    if(type === 'click') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    } else if(type === 'typewriter') {
      osc.type = 'square'; osc.frequency.setValueAtTime(600 + Math.random()*400, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    } else if(type === 'hover') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    } else if(type === 'siren') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(500, now + 0.2);
      osc.frequency.linearRampToValueAtTime(300, now + 0.4);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    } else { osc.frequency.setValueAtTime(440, now); gain.gain.setValueAtTime(0.05, now); }
    osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.5);
  }
};
