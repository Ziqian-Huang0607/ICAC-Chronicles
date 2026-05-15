ICAC.lang = function(zh, en) { return (ICAC.settings && ICAC.settings.lang === 'en') ? (en || zh) : zh; };
ICAC.settings = { lang: 'zh', difficulty: 'normal', sound: true, music: true, colorblind: false };
ICAC.state = null;
ICAC.firebase = null;

document.addEventListener('DOMContentLoaded', function() {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isTouch = 'ontouchstart' in window;
  ICAC.isMobile = isMobile || (isTouch && window.innerWidth < 768);

  // Load settings
  try { var s = JSON.parse(localStorage.getItem('icac_settings')); if(s) Object.assign(ICAC.settings, s); } catch(e){}

  // Define all scene constructors
  var scenes = [BootScene, PreloadScene, MenuScene, GameScene, MissionScene, GameOverScene, DebriefScene, SettingsScene];

  ICAC.game = new Phaser.Game({
    type: Phaser.AUTO, width: 1280, height: 720, parent: 'game-container',
    backgroundColor: '#0a0a0f',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, min: { width: 360, height: 640 } },
    scene: scenes,
    callbacks: {
      postBoot: function() {
        var el = document.getElementById('loading');
        if(el) { el.classList.add('hidden'); setTimeout(function(){ el.style.display='none'; }, 600); }
      }
    }
  });
});
