var MissionScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'MissionScene' }); },

  init: function(data) {
    this.missionId = data.missionId;
    this.nodeId = 'start';
    this.typing = false;
    this.typeEvent = null;
    this.choiceElements = [];
    this.scrollOffset = 0;
    this.maxScroll = 0;
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragStartOffset = 0;
  },

  create: function() {
    var W = this.scale.width, H = this.scale.height, self = this, UI = ICAC.UI;
    this.W = W; this.H = H;

    this.cameras.main.fadeIn(300);

    this.mission = ICAC.missionById(this.missionId);
    if(!this.mission) { this.scene.start('GameScene'); return; }

    // Background layers
    this.add.tileSprite(W/2, H/2, W, H, 'bg_grid');
    this.add.tileSprite(W/2, H/2, W, H, 'tex_noise').setAlpha(0.02);

    // Top decorative bar
    var topBar = this.add.graphics();
    topBar.fillStyle(UI.colors.gold, 0.15); topBar.fillRect(0, 0, W, 2);
    topBar.fillStyle(UI.colors.gold, 0.08); topBar.fillRect(0, 2, W, 1);

    // Mission title bar with panel
    var titlePanel = UI.drawPanel(this, W/2, 28, W - 20, 54, { depth: 10 });

    var title = ICAC.settings.lang === 'zh' ? this.mission.title.zh : this.mission.title.en;
    this.add.text(W/2, 22, title, {
      fontSize: '18px', color: '#c9a84c', fontStyle: 'bold', fontFamily: 'Georgia,"PingFang SC",serif'
    }).setOrigin(0.5).setDepth(12);

    var loc = this.mission.setup || {};
    var locText = (ICAC.settings.lang === 'zh' ? (loc.locationZh||loc.location||'') : (loc.location||''));
    if(locText) {
      this.add.text(W/2, 44, locText + (loc.time ? '  \u00b7  ' + loc.time : ''), {
        fontSize: '10px', color: '#555', letterSpacing: 2
      }).setOrigin(0.5).setDepth(12);
    }

    // Speaker name plate
    this.speakerBg = this.add.rectangle(75, 78, 120, 26, 0x1a1714, 0.95).setDepth(11);
    this.speakerBg.setStrokeStyle(1, 0x2a2520, 0.8);
    this.speakerText = this.add.text(75, 78, '', {
      fontSize: '12px', color: '#c9a84c', fontStyle: 'bold', fontFamily: '"PingFang SC",sans-serif'
    }).setOrigin(0.5).setDepth(12);

    // ---- Dialogue text box ----
    var boxX = 50, boxY = 96, boxW = W - 140, boxH = Math.round(H * 0.40);
    this.dialogueBox = { x: boxX, y: boxY, w: boxW, h: boxH };

    // Dialogue box background
    UI.drawDialogueBg(this, W/2 - 20, boxY + boxH/2, boxW + 60, boxH + 16, 10);

    // Create mask geometry — a rectangle matching the inner dialogue area
    var maskShape = this.add.graphics().setVisible(false);
    maskShape.fillStyle(0xffffff, 1);
    maskShape.fillRoundedRect(boxX, boxY, boxW, boxH, 2);
    var mask = new Phaser.Display.Masks.GeometryMask(this, maskShape);

    // Dialogue text — fixed 14px, masked to stay inside the box
    this.dialogueText = this.add.text(boxX, boxY + 8, '', {
      fontSize: '14px', color: '#e8e4dc', fontFamily: '"PingFang SC","Microsoft YaHei",sans-serif',
      lineSpacing: 8, wordWrap: { width: boxW, useAdvancedWrap: true }
    }).setDepth(12).setMask(mask);

    // Store mask for cleanup
    this.dialogueMask = mask;
    this.dialogueMaskShape = maskShape;

    // Scrollbar track
    var scrollX = boxX + boxW + 10;
    this.scrollTrack = this.add.rectangle(scrollX, boxY + boxH/2, 8, boxH, 0x1a1816, 0.8).setDepth(12);
    this.scrollTrack.setStrokeStyle(1, 0x2a2520, 0.5);

    // Scrollbar thumb
    this.scrollThumb = this.add.rectangle(scrollX, boxY + 8, 8, 30, 0x8b7355, 0.7).setDepth(13);
    this.scrollThumb.setInteractive({ draggable: true, useHandCursor: true });

    // Scroll up button
    this.scrollUpBtn = this.add.text(scrollX, boxY - 12, '\u25b2', {
      fontSize: '12px', color: '#8b7355'
    }).setOrigin(0.5).setDepth(13).setInteractive({ useHandCursor: true });

    // Scroll down button
    this.scrollDownBtn = this.add.text(scrollX, boxY + boxH + 12, '\u25bc', {
      fontSize: '12px', color: '#8b7355'
    }).setOrigin(0.5).setDepth(13).setInteractive({ useHandCursor: true });

    // Scroll indicators (shown only when content overflows)
    this.scrollIndicatorUp = this.add.text(boxX + boxW/2, boxY + 4, '\u25b2 \u25b2', {
      fontSize: '10px', color: '#c9a84c', fontFamily: 'monospace'
    }).setOrigin(0.5).setDepth(14).setAlpha(0);
    this.scrollIndicatorDown = this.add.text(boxX + boxW/2, boxY + boxH - 4, '\u25bc \u25bc', {
      fontSize: '10px', color: '#c9a84c', fontFamily: 'monospace'
    }).setOrigin(0.5).setDepth(14).setAlpha(0);

    // Continue arrow (animated, shown when typing done and not scrolled)
    this.arrow = this.add.text(W - 130, boxY + boxH - 12, '\u25bc', {
      fontSize: '14px', color: '#c9a84c'
    }).setOrigin(0.5).setDepth(14).setAlpha(0);
    this.tweens.add({ targets: this.arrow, alpha: { from: 0.2, to: 0.7 }, duration: 800, yoyo: true, repeat: -1 });

    // Click to advance/skip (only if clicking inside dialogue area, NOT on scrollbar)
    var clickArea = this.add.rectangle(boxX + boxW/2, boxY + boxH/2, boxW, boxH, 0, 0).setInteractive({ useHandCursor: true }).setDepth(13);
    clickArea.on('pointerdown', function() { self.onClick(); });

    // Scroll events
    this.scrollUpBtn.on('pointerdown', function() { self.scrollBy(-40); });
    this.scrollDownBtn.on('pointerdown', function() { self.scrollBy(40); });

    // Mouse wheel
    this.input.on('wheel', function(p, gameObjects, deltaX, deltaY, deltaZ) {
      if (!self.dialogueText) return;
      // Only scroll if mouse is over dialogue area
      var mx = p.x, my = p.y;
      if (mx >= boxX && mx <= boxX + boxW + 30 && my >= boxY && my <= boxY + boxH) {
        self.scrollBy(deltaY * 0.5);
      }
    });

    // Drag on dialogue text to scroll (when not typing)
    clickArea.on('pointerdown', function(p) {
      if (!self.typing && self.maxScroll > 0) {
        self.isDragging = true;
        self.dragStartY = p.y;
        self.dragStartOffset = self.scrollOffset;
      }
    });
    this.input.on('pointermove', function(p) {
      if (self.isDragging && self.maxScroll > 0) {
        var delta = self.dragStartY - p.y;
        self.scrollTo(self.dragStartOffset + delta);
      }
    });
    this.input.on('pointerup', function() {
      self.isDragging = false;
    });

    // ESC to go back
    this.input.keyboard.on('keydown-ESC', function() { ICAC.UI.transitionTo(self, 'GameScene'); });

    // Stats bar at bottom
    this.createStatsBar();

    // Show first node
    var firstNode = this.mission.nodes['start'] ? 'start' : Object.keys(this.mission.nodes)[0];
    this.showNode(firstNode || 'start');
  },

  scrollBy: function(delta) {
    this.scrollTo(this.scrollOffset + delta);
  },

  scrollTo: function(y) {
    if (this.maxScroll <= 0) return;
    this.scrollOffset = Phaser.Math.Clamp(y, 0, this.maxScroll);
    this.dialogueText.setY(this.dialogueBox.y + 8 - this.scrollOffset);
    this.updateScrollThumb();
    this.updateScrollIndicators();
  },

  updateScrollThumb: function() {
    if (this.maxScroll <= 0) {
      this.scrollThumb.setAlpha(0);
      return;
    }
    this.scrollThumb.setAlpha(0.7);
    var boxH = this.dialogueBox.h;
    var trackH = boxH - 16;
    // Thumb height proportional to visible ratio
    var visibleRatio = boxH / (boxH + this.maxScroll);
    var thumbH = Math.max(20, Math.min(trackH * visibleRatio, trackH));
    this.scrollThumb.height = thumbH;
    // Thumb position
    var scrollRatio = this.scrollOffset / this.maxScroll;
    var minY = this.dialogueBox.y + 8 + thumbH/2;
    var maxY = this.dialogueBox.y + boxH - 8 - thumbH/2;
    this.scrollThumb.y = Phaser.Math.Linear(minY, maxY, scrollRatio);
  },

  updateScrollIndicators: function() {
    // Show up indicator if scrolled down
    this.scrollIndicatorUp.setAlpha(this.scrollOffset > 5 ? 0.6 : 0);
    // Show down indicator if not at bottom
    var nearBottom = this.scrollOffset >= this.maxScroll - 5;
    this.scrollIndicatorDown.setAlpha((this.maxScroll > 0 && !nearBottom) ? 0.6 : 0);
    // Hide continue arrow if scrolled away from bottom
    this.arrow.setAlpha((nearBottom || this.maxScroll <= 0) ? this.arrow.alpha : 0);
  },

  showNode: function(id) {
    var node = this.mission.nodes[id];
    if(!node) { this.endMission(); return; }
    this.nodeId = id;
    var isZh = ICAC.settings.lang === 'zh';

    // Speaker
    var sp = isZh ? (node.speakerZh||node.speaker||'') : (node.speaker||'');
    this.speakerText.setText(sp || '');
    this.speakerBg.setVisible(!!sp);

    // Dialogue text
    var txt = '';
    if(typeof node.text === 'string') txt = node.text;
    else if(node.text) txt = isZh ? (node.text.zh||node.text.en||'') : (node.text.en||node.text.zh||'');
    else if(node.textZh) txt = isZh ? node.textZh : node.textEn;
    this.startTypewriter(txt);
  },

  startTypewriter: function(text) {
    var self = this;
    this.currentText = text;
    this.displayed = '';
    this.charIdx = 0;
    this.typing = true;
    this.arrow.setAlpha(0);
    this.scrollOffset = 0;
    this.dialogueText.setY(this.dialogueBox.y + 8);
    this.scrollIndicatorUp.setAlpha(0);
    this.scrollIndicatorDown.setAlpha(0);
    this.clearChoices();
    if(this.typeEvent) this.typeEvent.destroy();

    // Fixed 14px font
    this.dialogueText.setFontSize('14px');

    this.typeEvent = this.time.addEvent({
      delay: 10, loop: true, callback: function() {
        if(self.charIdx < self.currentText.length) {
          self.displayed += self.currentText[self.charIdx];
          self.dialogueText.setText(self.displayed);
          self.charIdx++;
          if(self.charIdx % 3 === 0) ICAC.AudioSystem.play('typewriter');
          // Auto-scroll: keep the bottom of the text visible
          self.updateMaxScroll();
          if (self.maxScroll > 0) {
            self.scrollOffset = self.maxScroll;
            self.dialogueText.setY(self.dialogueBox.y + 8 - self.scrollOffset);
            self.updateScrollThumb();
          }
        } else {
          self.typing = false;
          self.updateMaxScroll();
          if (self.maxScroll <= 0) {
            self.arrow.setAlpha(1);
          }
          self.updateScrollThumb();
          self.updateScrollIndicators();
          if(self.typeEvent) { self.typeEvent.destroy(); self.typeEvent = null; }
          self.showChoices();
        }
      }
    });
  },

  updateMaxScroll: function() {
    var textH = this.dialogueText.height;
    var boxH = this.dialogueBox.h - 16;
    this.maxScroll = Math.max(0, textH - boxH);
  },

  onClick: function() {
    if(this.typing) {
      this.typing = false;
      if(this.typeEvent) { this.typeEvent.destroy(); this.typeEvent = null; }
      this.displayed = this.currentText;
      this.dialogueText.setText(this.displayed);
      this.updateMaxScroll();
      // Jump to bottom after skip
      if (this.maxScroll > 0) {
        this.scrollOffset = this.maxScroll;
        this.dialogueText.setY(this.dialogueBox.y + 8 - this.scrollOffset);
      }
      this.updateScrollThumb();
      this.updateScrollIndicators();
      this.showChoices();
    }
  },

  clearChoices: function() {
    for(var i = 0; i < this.choiceElements.length; i++) {
      if(this.choiceElements[i]) this.choiceElements[i].destroy();
    }
    this.choiceElements = [];
  },

  showChoices: function() {
    var node = this.mission.nodes[this.nodeId];
    if(!node || !node.choices || node.choices.length === 0) return;
    var self = this, W = this.W, H = this.H, UI = ICAC.UI, C = UI.colors, isZh = ICAC.settings.lang === 'zh';
    this.clearChoices();

    var choices = [];
    for(var i=0; i<node.choices.length; i++) {
      var c = node.choices[i];
      if(c.visibleIf && !this.checkCondition(c.visibleIf)) continue;
      choices.push(c);
    }

    var bw = Math.min(540, W-100), bh = 50, startY = H*0.60, gap = 58;

    for(var i=0; i<choices.length; i++) {
      (function(choice, idx) {
        var cy = startY + idx * gap;

        // Choice card panel
        var card = UI.drawPanel(self, W/2, cy, bw, bh, { depth: 20, cornerSize: 8 });
        self.choiceElements.push(card.shadow, card.body, card.outer, card.inner, card.corners);

        // Number badge
        var numBg = self.add.rectangle(W/2 - bw/2 + 24, cy, 28, 28, C.bgHeader, 0.9).setDepth(22);
        numBg.setStrokeStyle(1, C.gold, 0.3);
        self.choiceElements.push(numBg);

        var num = self.add.text(W/2 - bw/2 + 24, cy, String(idx+1), {
          fontSize: '14px', color: C.gold, fontFamily: 'monospace', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(23);
        self.choiceElements.push(num);

        // Choice text
        var ct = choice.text;
        if(!ct && choice.textZh) ct = isZh ? choice.textZh : choice.textEn;
        if(typeof ct === 'object') ct = isZh ? (ct.zh||ct.en) : (ct.en||ct.zh);

        var txt = self.add.text(W/2 - bw/2 + 50, cy, ct, {
          fontSize: '14px', color: '#e8e4dc', fontFamily: '"PingFang SC",sans-serif', wordWrap: { width: bw-80 }
        }).setDepth(22);
        self.choiceElements.push(txt);

        // Hit area for interaction
        var hit = self.add.rectangle(W/2, cy, bw, bh, 0, 0).setInteractive({ useHandCursor: true }).setDepth(24);
        hit.on('pointerover', function() {
          card.body.setFillStyle(0x1a1816, 0.98);
          card.body.setStrokeStyle(1, C.gold, 0.5);
          numBg.setFillStyle(0x2a2520, 0.95);
          txt.setColor('#fff');
        });
        hit.on('pointerout', function() {
          card.body.setFillStyle(C.bgPanel, 0.97);
          card.body.setStrokeStyle(1, C.borderInner, 0.5);
          numBg.setFillStyle(C.bgHeader, 0.9);
          txt.setColor(C.text);
        });
        hit.on('pointerdown', function() {
          ICAC.AudioSystem.play('click');
          self.tweens.add({ targets: card.body, scaleX: 0.98, scaleY: 0.98, duration: 60, yoyo: true });
          self.choose(choice);
        });
        self.choiceElements.push(hit);
      })(choices[i], i);
    }
  },

  checkCondition: function(cond) {
    if(!cond) return true;
    if(typeof cond === 'string') return !!ICAC.state.flags[cond];
    if(cond.flag) return ICAC.state.flags[cond.flag] === cond.equals;
    return true;
  },

  choose: function(choice) {
    var isZh = ICAC.settings.lang === 'zh';

    // Apply consequences
    if(choice.consequences) {
      for(var i=0; i<choice.consequences.length; i++) this.applyConsequence(choice.consequences[i]);
    }

    // Record history with Sun Tzu principle and leader parallel
    if(choice.sunziPrinciple || choice.leaderParallel) {
      ICAC.state.history.push({
        mission: this.missionId, node: this.nodeId, choice: choice.id,
        principle: choice.sunziPrinciple, leader: choice.leaderParallel, time: Date.now()
      });
    }

    // Refresh stats bar
    this.refreshStatsBar();

    // Advance
    if(choice.nextNode && this.mission.nodes[choice.nextNode]) {
      this.clearChoices();
      this.showNode(choice.nextNode);
    } else {
      this.completeMission();
    }
  },

  applyConsequence: function(c) {
    var s = ICAC.state;
    switch(c.type) {
      case 'stat_change':
        if(s.stats[c.stat] !== undefined) s.stats[c.stat] = Math.max(0, Math.min(100, s.stats[c.stat] + c.value));
        break;
      case 'relationship':
        if(!s.relations[c.npc]) s.relations[c.npc] = 0;
        s.relations[c.npc] += c.value;
        break;
      case 'cover':
        s.cover.active = c.active;
        if(c.networkId) s.cover.networkId = c.networkId;
        break;
      case 'flag':
        s.flags[c.flag] = c.value;
        break;
      case 'next_mission':
        if(s.progress.available.indexOf(c.missionId) === -1) s.progress.available.push(c.missionId);
        break;
      case 'advance_phase':
        if(c.phase > s.progress.phase) s.progress.phase = c.phase;
        break;
      case 'rank_xp':
        s.player.xp += c.value;
        this.checkPromo();
        break;
    }
  },

  checkPromo: function() {
    var s = ICAC.state, idx = s.player.rankIdx + 1;
    if(idx >= ICAC.ranks.length) return;
    var r = ICAC.ranks[idx];
    if(s.player.xp >= idx * 150 && s.stats.integrity >= (r.minIntegrity || 0)) {
      s.player.rankIdx = idx; s.player.rank = r;
      var toastPanel = ICAC.UI.drawPanel(this, this.W/2, 80, 260, 40, { depth: 100 });
      var t = this.add.text(this.W/2, 80, ICAC.lang('\u664b\u5347: ','Promoted: ') + r.code, {
        fontSize: '15px', color: '#4a8a5a'
      }).setOrigin(0.5).setDepth(101);
      this.tweens.add({
        targets: [toastPanel.body, t], alpha: 0, duration: 500, delay: 2500,
        onComplete: function() { toastPanel.body.destroy(); t.destroy(); }
      });
    }
  },

  completeMission: function() {
    var p = ICAC.state.progress;
    var idx = p.available.indexOf(this.missionId);
    if(idx !== -1) p.available.splice(idx, 1);
    if(p.completed.indexOf(this.missionId) === -1) p.completed.push(this.missionId);
    if(this.mission.debriefTrigger) p.debriefPending = true;

    try { localStorage.setItem('icac_autosave', JSON.stringify({ state: ICAC.state, time: Date.now() })); } catch(e){}

    var missionScene = this;
    missionScene.time.delayedCall(60, function() {
      if(p.debriefPending) { missionScene.scene.start('DebriefScene'); }
      else { missionScene.scene.start('GameScene'); }
    });
  },

  endMission: function() {
    var s = this;
    s.time.delayedCall(60, function() { s.scene.start('GameScene'); });
  },

  createStatsBar: function() {
    var W = this.W, H = this.H, UI = ICAC.UI, s = ICAC.state;

    UI.drawPanel(this, W/2, H - 24, W - 20, 44, { depth: 10 });

    this.statTexts = {};
    var stats = [
      { k: 'integrity', l: ICAC.lang('\u6b63\u76f4','INT'), c: '#4a8a5a', x: 55 },
      { k: 'trust', l: ICAC.lang('\u4fe1\u4efb','TRU'), c: '#4a7a9a', x: 200 },
      { k: 'money', l: '$', c: '#c9a84c', x: 345 },
      { k: 'credibility', l: ICAC.lang('\u4fe1\u7528','CRD'), c: '#6a8a6a', x: 490 },
      { k: 'psych', l: ICAC.lang('\u5fc3\u7406','PSY'), c: '#8a6a8a', x: 635 }
    ];
    for(var i=0; i<stats.length; i++) {
      var st = stats[i];
      this.add.text(st.x, H - 38, st.l, {
        fontSize: '9px', color: '#555', fontFamily: 'monospace'
      }).setDepth(11);
      this.statTexts[st.k] = this.add.text(st.x, H - 26, String(s.stats[st.k] || 0), {
        fontSize: '13px', color: st.c, fontFamily: 'monospace', fontStyle: 'bold'
      }).setDepth(11);
    }
  },

  refreshStatsBar: function() {
    var s = ICAC.state;
    for(var k in this.statTexts) {
      if(this.statTexts[k]) this.statTexts[k].setText(String(s.stats[k] || 0));
    }
  },

  shutdown: function() {
    if(this.typeEvent) this.typeEvent.destroy();
    this.clearChoices();
    if(this.dialogueMask) { this.dialogueMask.destroy(); this.dialogueMask = null; }
    if(this.dialogueMaskShape) { this.dialogueMaskShape.destroy(); this.dialogueMaskShape = null; }
  }
});
