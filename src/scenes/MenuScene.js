var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'MenuScene' }); },

  create: function() {
    var W = this.scale.width, H = this.scale.height, self = this;
    var UI = ICAC.UI, C = UI.colors;

    // Background - light warm
    this.add.tileSprite(W/2, H/2, W, H, 'bg_grid');
    this.add.tileSprite(W/2, H/2, W, H, 'tex_noise').setAlpha(0.02);

    // Floating particles
    for(var i=0;i<25;i++) this.spawnParticle(W, H);
    this.time.addEvent({ delay: 350, callback: function() { self.spawnParticle(W, H); }, loop: true });

    // Decorative top bar
    var topBar = this.add.graphics();
    topBar.fillStyle(C.gold, 0.15); topBar.fillRect(0, 0, W, 2);
    topBar.fillStyle(C.gold, 0.08); topBar.fillRect(0, 2, W, 1);

    // Main title area - decorative frame
    var titleY = H * 0.20;
    var frameW = 500, frameH = 160;

    // Outer frame
    var titleFrame = UI.drawPanel(this, W/2, titleY, frameW, frameH, { depth: 5 });
    this.titleElements = [titleFrame.shadow, titleFrame.body, titleFrame.outer, titleFrame.inner, titleFrame.corners];

    // Decorative divider above title
    UI.divider(this, W/2, titleY - frameH/2 - 15, 200, { depth: 6 });
    UI.divider(this, W/2, titleY + frameH/2 + 15, 200, { depth: 6 });

    // Title text
    var t = this.add.text(W/2, titleY - 25, 'ICAC CHRONICLES', {
      fontSize: '48px', color: '#c9a84c', fontFamily: 'Georgia,"Times New Roman",serif',
      letterSpacing: 10
    }).setOrigin(0.5).setAlpha(0).setDepth(10);

    var st = this.add.text(W/2, titleY + 25, ICAC.lang('廉政行动', 'ICAC OPERATIONS'), {
      fontSize: '22px', color: '#b89850', fontFamily: '"PingFang SC","Microsoft YaHei",sans-serif',
      letterSpacing: 14
    }).setOrigin(0.5).setAlpha(0).setDepth(10);

    var tag = this.add.text(W/2, titleY + 55, ICAC.lang('策略叙事游戏 · 以史为鉴', 'NARRATIVE STRATEGY · LEARN THROUGH HISTORY'), {
      fontSize: '11px', color: '#777', letterSpacing: 3
    }).setOrigin(0.5).setAlpha(0).setDepth(10);

    // Entrance animations
    this.tweens.add({ targets: t, alpha: 1, duration: 1000, delay: 200, ease: 'Power2' });
    this.tweens.add({ targets: st, alpha: 1, duration: 800, delay: 500, ease: 'Power2' });
    this.tweens.add({ targets: tag, alpha: 1, duration: 600, delay: 800, ease: 'Power2' });

    // Button panel
    var hasSave = this.hasSave();
    var btnPanelY = H * 0.55;
    var btnPanel = UI.drawPanel(this, W/2, btnPanelY, 360, hasSave ? 260 : 200, { depth: 5 });
    this.btnPanelElements = [btnPanel.shadow, btnPanel.body, btnPanel.outer, btnPanel.inner, btnPanel.corners];

    // Buttons
    var sy = btnPanelY - (hasSave ? 70 : 35), gap = 70;
    var bw = 300;

    var menuScene = this;
    this.makeBtn(W/2, sy, ICAC.lang('新游戏', 'NEW GAME'), ICAC.lang('开始你的旅程', 'Begin your journey'), true, function() { menuScene.startNew(); }, bw);
    this.makeBtn(W/2, sy + gap, ICAC.lang('继续游戏', 'CONTINUE'), ICAC.lang('载入自动存档', 'Load autosave'), false, function() { menuScene.continueGame(); }, bw, !hasSave);
    this.makeBtn(W/2, sy + gap * 2, ICAC.lang('设置', 'SETTINGS'), ICAC.lang('语言 · 难度 · 音频', 'Language · Difficulty · Audio'), false, function() { menuScene.scene.launch('SettingsScene'); menuScene.scene.pause(); }, bw);

    // Version + copyright
    this.add.text(W - 20, H - 15, 'v1.0.0', {
      fontSize: '11px', color: '#444', fontFamily: 'monospace'
    }).setOrigin(1, 1).setDepth(5);

    this.add.text(20, H - 15, ICAC.lang('© 2025 ICAC Chronicles · 零成本 · 纯浏览器', '© 2025 ICAC Chronicles · Zero Install · Browser Only'), {
      fontSize: '10px', color: '#444'
    }).setOrigin(0, 1).setDepth(5);

    // Bottom decorative bar
    var botBar = this.add.graphics().setDepth(5);
    botBar.fillStyle(C.gold, 0.1); botBar.fillRect(0, H - 2, W, 2);

    // Fade in camera
    this.cameras.main.fadeIn(500);
  },

  spawnParticle: function(W, H) {
    var size = Phaser.Math.FloatBetween(1, 3);
    var p = this.add.circle(Phaser.Math.Between(0, W), H + 10, size, 0xc9a84c, Phaser.Math.FloatBetween(0.1, 0.3)).setDepth(0);
    this.tweens.add({
      targets: p, y: -20, alpha: 0,
      duration: Phaser.Math.Between(6000, 12000),
      onComplete: function() { p.destroy(); }
    });
  },

  makeBtn: function(x, y, label, sub, primary, cb, width, disabled) {
    var UI = ICAC.UI;
    var btn = UI.createButton(this, x, y, label, { primary: primary, width: width || 300, cb: cb, disabled: disabled, depth: 10 });

    // Subtitle text below button
    if (!disabled) {
      var subClr = primary ? '#6a5a2a' : '#555';
      var st = this.add.text(x, y + 32, sub, { fontSize: '10px', color: subClr, letterSpacing: 1 }).setOrigin(0.5).setDepth(11);
    }
  },

  hasSave: function() {
    try { for(var i=0;i<3;i++) if(localStorage.getItem('icac_save_'+i)) return true; if(localStorage.getItem('icac_autosave')) return true; } catch(e){}
    return false;
  },

  startNew: function() {
    ICAC.AudioSystem.play('click');
    // Reset state for fresh game and go directly to GameScene
    // (BootScene → PreloadScene is the initial boot flow; skip it after assets are loaded)
    ICAC.initState();
    ICAC.UI.transitionTo(this, 'GameScene');
  },

  continueGame: function() {
    ICAC.AudioSystem.play('click');
    try { var d = JSON.parse(localStorage.getItem('icac_autosave')); if(d && d.state) ICAC.state = d.state; } catch(e){}
    ICAC.UI.transitionTo(this, 'GameScene');
  }
});
