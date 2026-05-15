// RandomEventScene — Modal event popup (Reigns/Tropico style)
// Displays fragmented power-play events over the GameScene map

var RandomEventScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'RandomEventScene' }); },

  init: function(data) {
    this.eventData = data.event;
    this.fromScene = data.fromScene || 'GameScene';
  },

  create: function() {
    var W = this.W = this.scale.width;
    var H = this.H = this.scale.height;
    var self = this;
    var UI = ICAC.UI;
    var C = UI.colors;
    var isZh = ICAC.settings.lang === 'zh';
    var ev = this.eventData;

    // ── Overlay (semi-transparent, map still visible behind) ──
    this.overlay = this.add.rectangle(W/2, H/2, W, H, 0x0a0806, 0.72).setDepth(300).setInteractive();

    // ── Event card ──
    var cw = Math.min(580, W - 40);
    var ch = Math.min(520, H - 60);
    var cx = W/2, cy = H/2;

    // Card shadow
    this.add.rectangle(cx + 4, cy + 4, cw, ch, 0x000000, 0.4).setDepth(301);

    // Card body
    var cardBg = this.add.rectangle(cx, cy, cw, ch, C.bgPanel, 0.97).setDepth(302);
    cardBg.setStrokeStyle(1.5, C.gold, 0.25);

    // Phase color bar (top)
    var phaseColors = ['', 0x4a7a9a, 0x8a6a4a, 0x6a4a8a, 0xb84444];
    var pColor = phaseColors[ev.phase] || C.gold;
    var phaseBar = this.add.rectangle(cx, cy - ch/2 + 3, cw - 2, 5, pColor, 0.9).setDepth(303);

    // ── Header ──
    var title = isZh ? ev.title.zh : ev.title.en;
    this.add.text(cx, cy - ch/2 + 28, title, {
      fontSize: '20px', color: C.gold, fontFamily: 'Georgia,"PingFang SC",serif', fontStyle: 'bold',
      wordWrap: { width: cw - 60 }
    }).setOrigin(0.5).setDepth(304);

    // Location tag
    var loc = isZh ? (ev.location ? ev.location.zh : '') : (ev.location ? ev.location.en : '');
    if(loc) {
      var locBg = this.add.rectangle(cx, cy - ch/2 + 52, loc.length * 8 + 24, 18, C.bgHeader, 0.8).setDepth(303);
      this.add.text(cx, cy - ch/2 + 52, '\ud83d\udccd ' + loc, {
        fontSize: '10px', color: '#777', fontFamily: '"PingFang SC",sans-serif', letterSpacing: 1
      }).setOrigin(0.5).setDepth(304);
    }

    // Divider
    UI.divider(this, cx, cy - ch/2 + 68, cw - 60, { depth: 304 });

    // ── Event text (masked to card) ──
    var textBoxH = ch - 185;
    var textY = cy - ch/2 + 82;

    // Create mask
    var maskG = this.add.graphics().setVisible(false);
    maskG.fillStyle(0xffffff, 1);
    maskG.fillRoundedRect(cx - cw/2 + 15, textY, cw - 30, textBoxH, 2);
    var textMask = new Phaser.Display.Masks.GeometryMask(this, maskG);

    var text = isZh ? ev.text.zh : ev.text.en;
    this.eventText = this.add.text(cx - cw/2 + 25, textY + 6, text, {
      fontSize: '13px', color: C.text, fontFamily: '"PingFang SC","Microsoft YaHei",sans-serif',
      lineSpacing: 7, wordWrap: { width: cw - 50, useAdvancedWrap: true }
    }).setDepth(304).setMask(textMask);

    // Auto-scroll text to bottom if overflow
    var textH = this.eventText.height;
    if(textH > textBoxH - 12) {
      this.eventText.setY(textY + 6 - (textH - textBoxH + 12));
    }

    // ── Choices ──
    var choiceH = 44;
    var choiceGap = 6;
    var choices = ev.choices || [];
    var totalChoicesH = choices.length * choiceH + (choices.length - 1) * choiceGap;
    var choiceStartY = cy + ch/2 - 30 - totalChoicesH;

    this.choiceElements = [];

    for(var i = 0; i < choices.length; i++) {
      (function(choice, idx) {
        var cy_pos = choiceStartY + idx * (choiceH + choiceGap);

        // Choice button background
        var btnBg = self.add.rectangle(cx, cy_pos, cw - 40, choiceH, C.bgHeader, 0.7).setDepth(304);
        btnBg.setStrokeStyle(1, C.borderInner, 0.4);
        self.choiceElements.push(btnBg);

        // Choice text
        var ct = isZh ? choice.text.zh : choice.text.en;
        var btnTxt = self.add.text(cx - cw/2 + 35, cy_pos, ct, {
          fontSize: '13px', color: C.text, fontFamily: '"PingFang SC",sans-serif',
          wordWrap: { width: cw - 70 }
        }).setOrigin(0, 0.5).setDepth(305);
        self.choiceElements.push(btnTxt);

        // Hit area
        var hit = self.add.rectangle(cx, cy_pos, cw - 40, choiceH, 0, 0)
          .setInteractive({ useHandCursor: true }).setDepth(306);
        self.choiceElements.push(hit);

        hit.on('pointerover', function() {
          btnBg.setFillStyle(0x2a2520, 0.9);
          btnBg.setStrokeStyle(1, C.gold, 0.5);
          btnTxt.setColor('#fff');
        });
        hit.on('pointerout', function() {
          btnBg.setFillStyle(C.bgHeader, 0.7);
          btnBg.setStrokeStyle(1, C.borderInner, 0.4);
          btnTxt.setColor(C.text);
        });
        hit.on('pointerdown', function() {
          ICAC.AudioSystem.play('click');
          self.selectChoice(choice);
        });
      })(choices[i], i);
    }

    // ── Bottom label ──
    var phaseLabels = ['', '\u7b2c\u4e00\u9636\u6bb5 \u00b7 \u5e95\u5c42\u8b66\u5458', '\u7b2c\u4e8c\u9636\u6bb5 \u00b7 \u53cc\u91cd\u8eab\u4efd', '\u7b2c\u4e09\u9636\u6bb5 \u00b7 \u529e\u516c\u5ba4\u653f\u6cbb', '\u7b2c\u56db\u9636\u6bb5 \u00b7 \u7f51\u7edc\u6218'];
    this.add.text(cx, cy + ch/2 - 12, phaseLabels[ev.phase], {
      fontSize: '9px', color: '#444', fontFamily: 'monospace', letterSpacing: 2
    }).setOrigin(0.5).setDepth(304);

    // Track this event as triggered (session-level dedup)
    if(!ICAC._triggeredEvents) ICAC._triggeredEvents = {};
    ICAC._triggeredEvents[ev.id] = true;

    // Update last event time
    ICAC.state._lastEventTime = Date.now();
  },

  selectChoice: function(choice) {
    var self = this;
    var isZh = ICAC.settings.lang === 'zh';

    // Apply consequences
    if(choice.consequences) {
      for(var i = 0; i < choice.consequences.length; i++) {
        this.applyConsequence(choice.consequences[i]);
      }
    }

    // Show feedback
    var feedback = isZh ? (choice.feedback ? choice.feedback.zh : '') : (choice.feedback ? choice.feedback.en : '');
    if(feedback) {
      // Fade out choices
      for(var j = 0; j < this.choiceElements.length; j++) {
        if(this.choiceElements[j]) this.choiceElements[j].destroy();
      }
      this.choiceElements = [];

      // Show feedback text in place of choices
      var W = this.W, H = this.H;
      var fbText = this.add.text(W/2, H * 0.82, feedback, {
        fontSize: '12px', color: '#aaa', fontFamily: '"PingFang SC","Microsoft YaHei",sans-serif',
        lineSpacing: 6, wordWrap: { width: 500, useAdvancedWrap: true }, align: 'center'
      }).setOrigin(0.5).setDepth(305);

      // Continue button
      var contBtn = this.add.text(W/2, H * 0.92, isZh ? '\u3010 \u7ee7\u7eed \u3011' : '[ Continue ]', {
        fontSize: '14px', color: ICAC.UI.colors.gold, fontFamily: 'monospace'
      }).setOrigin(0.5).setDepth(305).setInteractive({ useHandCursor: true });

      contBtn.on('pointerover', function() { contBtn.setColor('#fff'); });
      contBtn.on('pointerout', function() { contBtn.setColor(ICAC.UI.colors.gold); });
      contBtn.on('pointerdown', function() {
        ICAC.AudioSystem.play('click');
        self.closeEvent();
      });

      // Auto-close after 8 seconds
      self.time.delayedCall(8000, function() { self.closeEvent(); });
    } else {
      this.closeEvent();
    }
  },

  applyConsequence: function(c) {
    var s = ICAC.state;
    switch(c.type) {
      case 'stat_change':
        if(s.stats[c.stat] !== undefined) {
          s.stats[c.stat] = Math.max(0, Math.min(100, s.stats[c.stat] + c.value));
        }
        break;
      case 'relationship':
        if(!s.relations[c.npc]) s.relations[c.npc] = 0;
        s.relations[c.npc] += c.value;
        break;
      case 'flag':
        s.flags[c.flag] = c.value;
        break;
      case 'money':
        s.stats.money = Math.max(0, Math.min(100, s.stats.money + c.value));
        break;
      case 'game_over':
        this.scene.stop();
        this.scene.start('GameOverScene', { reason: c.reason || 'default', fromScene: this.fromScene });
        return; // stop processing further consequences
    }
  },

  closeEvent: function() {
    // Save state
    try { localStorage.setItem('icac_autosave', JSON.stringify({ state: ICAC.state, time: Date.now() })); } catch(e){}
    // Stop this scene, resume GameScene
    this.scene.stop();
    var gs = this.scene.get(this.fromScene);
    if(gs) {
      gs.scene.resume();
      // Refresh HUD if it exists
      if(gs.refreshStatsBar) gs.refreshStatsBar();
      // Refresh mission markers
      if(gs.drawMap) gs.drawMap();
    }
  }
});
