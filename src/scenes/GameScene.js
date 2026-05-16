var GameScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  create: function() {
    var W = this.scale.width, H = this.scale.height, self = this, C = ICAC.UI.colors;
    this.W = W; this.H = H;

    // Camera fade in
    this.cameras.main.fadeIn(400);

    // Background - light warm
    this.add.tileSprite(W/2, H/2, W, H, 'bg_grid');
    this.add.tileSprite(W/2, H/2, W, H, 'tex_noise').setAlpha(0.02);

    // Draw map
    this.drawMap();

    // Player
    var startDist = this.findDist(ICAC.state.player.district);
    this.player = this.add.image(startDist ? startDist.x : W*0.55, startDist ? startDist.y : H*0.35, 'player').setDepth(50).setScale(0.8);

    // Input
    this.keys = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,S,A,D');
    this.speed = ICAC.isMobile ? 160 : 220;

    // HUD
    this.createHUD();

    // Touch joystick
    if(ICAC.isMobile) this.createJoystick();

    // Auto-save
    this.time.addEvent({ delay: 30000, callback: this.autoSave, callbackScope: this, loop: true });

  },

  drawMap: function() {
    var scene = this, C = ICAC.UI.colors, W = this.W, H = this.H;
    var g = this.add.graphics();
    // Pre-bind methods for closures
    var showTip = this.showDistTooltip.bind(this);
    var hideTip = this.hideDistTooltip.bind(this);
    var clickDist = this.onDistClick.bind(this);
    // Store district hit areas so we can disable them when panels are open
    this.distHits = [];

    // Victoria Harbour - stylized water
    var waterX = W*0.42, waterY = H*0.45;
    g.fillStyle(0x0d1518, 0.7); g.fillEllipse(waterX, waterY, 300, 200);
    g.lineStyle(1, 0x1a2a3a, 0.3); g.strokeEllipse(waterX, waterY, 300, 200);
    // Water shimmer lines
    g.lineStyle(0.5, 0x1a3a4a, 0.15);
    for(var wy=waterY-60; wy<waterY+60; wy+=12) {
      var ww = Math.sqrt(Math.max(0, 1 - Math.pow((wy-waterY)/100, 2))) * 280;
      if(ww > 10) g.lineBetween(waterX-ww/2 + Math.sin(wy*0.1)*10, wy, waterX+ww/2 + Math.sin(wy*0.1)*10, wy);
    }

    // District data
    this.distData = [
      { id: 'central', x: W*0.32, y: H*0.42, w: 110, h: 90, c: 65, d: 40, nameZh: '中环', name: 'Central', desc: 'HK financial center' },
      { id: 'wan_chai', x: W*0.42, y: H*0.28, w: 100, h: 80, c: 75, d: 50, nameZh: '湾仔', name: 'Wan Chai' },
      { id: 'north_point', x: W*0.55, y: H*0.25, w: 100, h: 75, c: 45, d: 25, nameZh: '北角', name: 'North Point' },
      { id: 'arsenal_street', x: W*0.43, y: H*0.52, w: 105, h: 85, c: 25, d: 15, nameZh: '军器厂街', name: 'Arsenal St' },
      { id: 'mong_kok', x: W*0.22, y: H*0.58, w: 100, h: 95, c: 80, d: 70, nameZh: '旺角', name: 'Mong Kok' },
      { id: 'yau_ma_tei', x: W*0.12, y: H*0.55, w: 90, h: 80, c: 55, d: 45, nameZh: '油麻地', name: 'Yau Ma Tei' },
      { id: 'tsim_sha_tsui', x: W*0.08, y: H*0.70, w: 105, h: 70, c: 60, d: 35, nameZh: '尖沙咀', name: 'Tsim Sha Tsui' },
      { id: 'walled_city', x: W*0.35, y: H*0.68, w: 80, h: 75, c: 95, d: 95, nameZh: '九龙城寨', name: 'Walled City' },
      { id: 'new_territories', x: W*0.78, y: H*0.20, w: 200, h: 140, c: 30, d: 20, nameZh: '新界', name: 'New Territories' }
    ];

    for(var i=0; i<this.distData.length; i++) {
      var d = this.distData[i];
      // District color - bright warm tones
      var sat = d.c / 100;
      var rr = 80 + sat*60;
      var gg = 70 + (1-sat)*50;
      var bb = 50 + sat*30;
      var color = (Math.round(rr)<<16) | (Math.round(gg)<<8) | Math.round(bb);

      // District body
      g.fillStyle(color, 1.0);
      g.fillRoundedRect(d.x - d.w/2, d.y - d.h/2, d.w, d.h, 3);
      // Border
      g.lineStyle(2, d.c > 70 ? 0xc08080 : 0xb8b090, 1.0);
      g.strokeRoundedRect(d.x - d.w/2, d.y - d.h/2, d.w, d.h, 3);
      // Inner highlight
      g.lineStyle(1.5, 0xd0c8a0, 0.80);
      g.strokeRoundedRect(d.x - d.w/2 + 1, d.y - d.h/2 + 1, d.w - 2, d.h - 2, 2);

      // Label
      var lbl = ICAC.settings.lang === 'zh' ? d.nameZh : d.name;
      this.add.text(d.x, d.y, lbl, {
        fontSize: d.w > 150 ? '16px' : '14px', color: '#fff8e8', fontFamily: '"PingFang SC",sans-serif',
        stroke: '#2a2520', strokeThickness: 3
      }).setOrigin(0.5).setDepth(5);

      // Corruption bar at bottom
      var barY = d.y + d.h/2 - 10;
      g.fillStyle(0x0a0908, 0.8); g.fillRect(d.x - d.w/2 + 6, barY, d.w - 12, 4);
      var barColor = d.c > 70 ? 0xb84444 : d.c > 40 ? 0xc8a040 : 0x4a8a5a;
      g.fillStyle(barColor, 0.85); g.fillRect(d.x - d.w/2 + 6, barY, (d.c/100) * (d.w - 12), 4);

      // Mission marker with pulse
      if(this.hasMission(d.id)) {
        var mIcon = this.add.image(d.x + d.w/2 - 14, d.y - d.h/2 + 14, 'icon_mission').setDepth(10).setScale(0.7);
        this.tweens.add({ targets: mIcon, scale: 0.9, alpha: 0.5, duration: 1000, yoyo: true, repeat: -1 });
      }

      // Hit area
      var hit = this.add.rectangle(d.x, d.y, d.w, d.h, 0, 0).setInteractive({ useHandCursor: true }).setDepth(20);
      this.distHits.push(hit);
      (function(dist, hitArea) {
        hitArea.on('pointerover', function() { showTip(dist); });
        hitArea.on('pointerout', function() { hideTip(); });
        hitArea.on('pointerdown', function() { clickDist(dist); });
      })(d, hit);
    }

    // Connection roads
    g.lineStyle(1, 0x1a1816, 0.4);
    var roads = [['north_point','wan_chai'],['wan_chai','central'],['central','arsenal_street'],['arsenal_street','mong_kok'],['mong_kok','yau_ma_tei'],['yau_ma_tei','tsim_sha_tsui'],['mong_kok','walled_city'],['north_point','new_territories']];
    for(var r=0; r<roads.length; r++) {
      var a = this.findDist(roads[r][0]), b = this.findDist(roads[r][1]);
      if(a && b) {
        g.lineBetween(a.x, a.y, b.x, b.y);
        // Road highlight
        g.lineStyle(0.5, 0x2a2824, 0.2);
        g.lineBetween(a.x, a.y+1, b.x, b.y+1);
      }
    }
  },

  findDist: function(id) { for(var i=0; i<this.distData.length; i++) if(this.distData[i].id === id) return this.distData[i]; return null; },
  hasMission: function(id) { var av = ICAC.state.progress.available; for(var i=0;i<av.length;i++) { var m=ICAC.missionById(av[i]); if(m && m.district===id) return true; } return false; },

  onDistHover: function(d) { this.showDistTooltip(d); },
  onDistOut: function() { this.hideDistTooltip(); },
  onDistClick: function(d) { if(this.hasMission(d.id)) this.showMissionPanel(d); else this.showDistDesc(d); },

  showDistTooltip: function(d) {
    this.hideDistTooltip();
    var UI = ICAC.UI;
    var name = ICAC.settings.lang === 'zh' ? d.nameZh : d.name;
    var lines = [
      { text: ICAC.lang('腐败度: ', 'Corrupt: ') + d.c + '%', color: d.c > 60 ? '#b84444' : '#888' },
      { text: ICAC.lang('危险度: ', 'Danger: ') + d.d + '%', color: d.d > 60 ? '#c8a040' : '#888' },
      { text: ICAC.lang('任务: ', 'Missions: ') + (this.hasMission(d.id) ? ICAC.lang('有', 'Yes') : ICAC.lang('无', 'None')), color: this.hasMission(d.id) ? '#c9a84c' : '#555' }
    ];
    this.tooltip = UI.createTooltip(this, d.x + d.w/2 + 20, d.y, name, lines, { width: 200, depth: 100 });
  },

  hideDistTooltip: function() {
    if(this.tooltip) { this.tooltip.destroy(); this.tooltip = null; }
  },

  showDistDesc: function(d) {
    var W = this.W, H = this.H, UI = ICAC.UI;
    var scene = this;
    this.closePanels();
    this._disableDistHits();

    // Overlay
    var o = this.add.rectangle(W/2, H/2, W, H, 0, 0.65).setDepth(200).setInteractive();
    o.on('pointerdown', function() { scene.closePanels(); });
    this.overlay = o;

    // Panel
    var panel = UI.drawPanelWithHeader(this, W/2, H/2, 460, 320,
      ICAC.settings.lang === 'zh' ? d.nameZh : d.name,
      { depth: 201, titleSize: '22px' });
    this.panels = [o, panel.panel.shadow, panel.panel.body, panel.panel.outer, panel.panel.inner, panel.panel.corners, panel.header, panel.decor, panel.title];

    var dd = ICAC.districtData.find(function(x){return x.id===d.id;}) || {};
    var desc = (ICAC.settings.lang === 'zh' ? (dd.descZh||'') : (dd.descEn||'')) || '';
    var hist = (ICAC.settings.lang === 'zh' ? (dd.histZh||'') : (dd.histEn||'')) || '';

    var tDesc = this.add.text(W/2, H/2 - 40, desc, {
      fontSize: '14px', color: '#aaa', lineSpacing: 8, wordWrap: { width: 380 }, align: 'center'
    }).setOrigin(0.5).setDepth(202);

    // Divider
    var div = UI.divider(this, W/2, H/2 + 30, 200, { depth: 202 });

    var tHist = this.add.text(W/2, H/2 + 55, hist, {
      fontSize: '12px', color: '#666', lineSpacing: 6, wordWrap: { width: 380 }, align: 'center', fontStyle: 'italic'
    }).setOrigin(0.5).setDepth(202);

    // Corruption bar display
    var barColor = d.c > 70 ? '#b84444' : d.c > 40 ? '#c8a040' : '#4a8a5a';
    var tCorrupt = this.add.text(W/2, H/2 + 110, ICAC.lang('腐败度: ', 'Corruption: ') + d.c + '%', {
      fontSize: '13px', color: barColor, fontFamily: 'monospace'
    }).setOrigin(0.5).setDepth(202);

    this.panels.push(tDesc, div, tHist, tCorrupt);
  },

  showMissionPanel: function(d) {
    var scene = this, W = this.W, H = this.H, UI = ICAC.UI;
    this.closePanels();
    this._disableDistHits();

    // Overlay - NOT interactive in mission panel (clicking outside doesn't close,
    // preventing interference with mission card hit areas at higher depth)
    var o = this.add.rectangle(W/2, H/2, W, H, 0, 0.65).setDepth(200);
    this.overlay = o;

    var panel = UI.drawPanelWithHeader(this, W/2, H/2, 520, 400,
      ICAC.lang('可用任务', 'Available Missions'),
      { depth: 201, headerH: 42 });

    // District subtitle
    var sub = this.add.text(W/2, H/2 - 165, ICAC.settings.lang === 'zh' ? d.nameZh : d.name, {
      fontSize: '13px', color: '#666'
    }).setOrigin(0.5).setDepth(202);

    this.panels = [o, panel.panel.shadow, panel.panel.body, panel.panel.outer, panel.panel.inner, panel.panel.corners, panel.header, panel.decor, panel.title, sub];

    var yOff = -110, count = 0;
    var av = ICAC.state.progress.available;
    for(var i=0; i<av.length; i++) {
      var m = ICAC.missionById(av[i]);
      if(!m || m.district !== d.id) continue;
      (function(mission, idx) {
        var by = H/2 + yOff + idx * 90;
        // Mission card background
        var card = UI.drawPanel(scene, W/2, by, 460, 72, { depth: 202, cornerSize: 8 });
        scene.panels.push(card.shadow, card.body, card.outer, card.inner, card.corners);

        var title = ICAC.settings.lang === 'zh' ? mission.title.zh : mission.title.en;
        var tTitle = scene.add.text(W/2 - 200, by - 12, title, {
          fontSize: '16px', color: '#e0ded8', fontFamily: '"PingFang SC",sans-serif', fontStyle: 'bold'
        }).setDepth(203);

        var setup = mission.setup || {};
        var st = (ICAC.settings.lang === 'zh' ? (setup.textZh||'') : (setup.textEn||''));
        if(st.length > 60) st = st.substring(0, 60) + '...';
        var tSetup = scene.add.text(W/2 - 200, by + 12, st, {
          fontSize: '11px', color: '#666', wordWrap: { width: 420 }
        }).setDepth(203);

        // Phase badge
        var badge = scene.add.text(W/2 + 195, by - 18, 'P' + mission.phase, {
          fontSize: '10px', color: '#c9a84c', fontFamily: 'monospace'
        }).setOrigin(1, 0).setDepth(203);

        // Speaker
        var sp = ICAC.settings.lang === 'zh' ? (setup.speakerZh||setup.speaker||'') : (setup.speaker||'');
        if(sp) {
          var tSp = scene.add.text(W/2 + 195, by + 8, sp, {
            fontSize: '10px', color: '#8b7340', fontFamily: '"PingFang SC",sans-serif'
          }).setOrigin(1, 0).setDepth(203);
          scene.panels.push(tSp);
        }

        scene.panels.push(tTitle, tSetup, badge);

        // Click to start mission
        var hit = scene.add.rectangle(W/2, by, 460, 72, 0, 0).setInteractive({ useHandCursor: true }).setDepth(204);
        hit.on('pointerover', function() { card.body.setFillStyle(0x1a1816, 0.98); card.body.setStrokeStyle(1, 0xc9a84c, 0.4); });
        hit.on('pointerout', function() { card.body.setFillStyle(0x141210, 0.97); card.body.setStrokeStyle(1, 0x2a2520, 0.5); });
        hit.on('pointerdown', function() {
          ICAC.AudioSystem.play('click');
          scene.closePanels();
          scene.time.delayedCall(60, function() { scene.scene.start('MissionScene', { missionId: mission.id }); });
        });
        scene.panels.push(hit);
      })(m, count++);
    }

    // Close button
    var close = UI.createButton(this, W/2, H/2 + 170, ICAC.lang('关闭', 'Close'), {
      width: 120, depth: 202, cb: function() { scene.closePanels(); }
    });
    this.panels.push(close.container);
  },

  showNetworkPanel: function() {
    var scene = this, W = this.W, H = this.H, UI = ICAC.UI;
    this.closePanels();
    this._disableDistHits();

    // Overlay - not interactive (use close button)
    var o = this.add.rectangle(W/2, H/2, W, H, 0, 0.65).setDepth(200);
    this.overlay = o;

    var panel = UI.drawPanelWithHeader(this, W/2, H/2, 560, 440,
      ICAC.lang('关系网络', 'Network'),
      { depth: 201, headerH: 42 });

    this.panels = [o, panel.panel.shadow, panel.panel.body, panel.panel.outer, panel.panel.inner, panel.panel.corners, panel.header, panel.decor, panel.title];

    // Build network data from state
    var networks = ICAC.state.network || {};
    var icacContacts = networks.icac || [
      { name: '黄Sir', nameEn: 'Sir Wong', role: 'ICAC导师', rel: 45 },
      { name: '陈调查员', nameEn: 'Investigator Chan', role: '案件搭档', rel: 30 }
    ];
    var triadContacts = networks.triad || [
      { name: '蛇哥', nameEn: 'Brother Snake', role: '和胜和坐馆', rel: 25 },
      { name: '阿坤', nameEn: 'Ah Kwan', role: '马仔', rel: 15 }
    ];
    var policeContacts = networks.police || [
      { name: '刘警司', nameEn: 'Superintendent Lau', role: '直属上司', rel: 40 },
      { name: '张督察', nameEn: 'Inspector Cheung', role: '同僚', rel: 20 }
    ];

    var categories = [
      { title: ICAC.lang('ICAC 联系人', 'ICAC Contacts'), color: '#4a8a6a', contacts: icacContacts },
      { title: ICAC.lang('三合会关系', 'Triad Connections'), color: '#8a4a4a', contacts: triadContacts },
      { title: ICAC.lang('警队网络', 'Police Network'), color: '#4a6a8a', contacts: policeContacts }
    ];

    var yOff = -170;
    for(var ci = 0; ci < categories.length; ci++) {
      var cat = categories[ci];
      // Category header
      var catTitle = this.add.text(W/2 - 240, H/2 + yOff, cat.title, {
        fontSize: '13px', color: cat.color, fontFamily: '"PingFang SC",sans-serif', fontStyle: 'bold'
      }).setDepth(202);
      this.panels.push(catTitle);
      yOff += 28;

      for(var ni = 0; ni < cat.contacts.length; ni++) {
        var nc = cat.contacts[ni];
        var name = ICAC.settings.lang === 'zh' ? nc.name : (nc.nameEn || nc.name);
        var role = ICAC.settings.lang === 'zh' ? nc.role : (nc.roleEn || nc.role);
        var rel = nc.rel || 0;

        // Name
        var tName = this.add.text(W/2 - 240, H/2 + yOff, name, {
          fontSize: '12px', color: '#c0b8a8', fontFamily: '"PingFang SC",sans-serif'
        }).setDepth(202);
        // Role
        var tRole = this.add.text(W/2 - 80, H/2 + yOff, role, {
          fontSize: '11px', color: '#666'
        }).setDepth(202);
        // Relation bar background
        var barBg = this.add.rectangle(W/2 + 130, H/2 + yOff + 6, 100, 6, 0x1a1816).setDepth(202);
        // Relation bar fill
        var relColor = rel > 60 ? '#4a8a5a' : rel > 30 ? '#c8a040' : '#8a4a4a';
        var barFill = this.add.rectangle(W/2 + 130 - (100 - rel)/2, H/2 + yOff + 6, rel, 6, Phaser.Display.Color.HexStringToColor(relColor).color).setDepth(203);
        // Relation value
        var tRel = this.add.text(W/2 + 195, H/2 + yOff, rel + '%', {
          fontSize: '10px', color: relColor, fontFamily: 'monospace'
        }).setDepth(202);

        this.panels.push(tName, tRole, barBg, barFill, tRel);
        yOff += 26;
      }
      yOff += 10; // gap between categories
    }

    // Close button
    var close = UI.createButton(this, W/2, H/2 + 200, ICAC.lang('关闭', 'Close'), {
      width: 120, depth: 202, cb: function() { scene.closePanels(); }
    });
    this.panels.push(close.container);
  },

  _disableDistHits: function() {
    if(this.distHits) for(var i=0; i<this.distHits.length; i++) if(this.distHits[i]) this.distHits[i].disableInteractive();
  },
  _enableDistHits: function() {
    if(this.distHits) for(var i=0; i<this.distHits.length; i++) if(this.distHits[i]) this.distHits[i].setInteractive({ useHandCursor: true });
  },

  closePanels: function() {
    if(this.overlay) { this.overlay.destroy(); this.overlay = null; }
    if(this.panels) {
      for(var i=0; i<this.panels.length; i++) if(this.panels[i]) this.panels[i].destroy();
      this.panels = null;
    }
    this.hideDistTooltip();
    this._enableDistHits();
  },

  createHUD: function() {
    var W = this.W, H = this.H, UI = ICAC.UI, s = ICAC.state;

    // Top bar panel
    var barH = 48;
    var topPanel = UI.drawPanel(this, W/2, barH/2, W - 20, barH, { depth: 60 });

    // Rank display with background panel for readability
    var rankBg = this.add.rectangle(50, barH/2, 96, barH - 6, 0x0a0908, 0.85).setDepth(61).setStrokeStyle(1, 0x1a1816, 0.6);
    this.rankCodeText = this.add.text(50, 6, s.player.rank.code, {
      fontSize: '18px', color: '#c9a84c', fontFamily: 'monospace', fontStyle: 'bold'
    }).setOrigin(0.5, 0).setDepth(62);
    this.rankNameText = this.add.text(50, 27, s.player.rank.nameZh, {
      fontSize: '11px', color: '#8b7340', fontFamily: '"PingFang SC",sans-serif'
    }).setOrigin(0.5, 0).setDepth(62);

    // Divider (moved right to accommodate rank panel)
    UI.divider(this, 102, barH/2, 24, { depth: 61 });

    // Stat bars using UI toolkit (shifted right)
    this.statBars = {};
    var stats = [
      { k: 'integrity', l: ICAC.lang('正直','INT'), c: '#4a8a5a', x: 128 },
      { k: 'trust', l: ICAC.lang('信任','TRU'), c: '#4a7a9a', x: 278 },
      { k: 'credibility', l: ICAC.lang('信用','CRD'), c: '#6a8a6a', x: 428 },
      { k: 'psych', l: ICAC.lang('心理','PSY'), c: '#8a6a8a', x: 578 }
    ];
    for(var i=0; i<stats.length; i++) {
      var st = stats[i];
      var bar = UI.createStatBar(this, st.x, 12, st.l, s.stats[st.k], 100, st.c, { width: 130, depth: 61 });
      this.statBars[st.k] = bar;
    }

    // Money
    this.moneyText = this.add.text(720, 8, '$' + (s.money || 0), {
      fontSize: '16px', color: '#c9a84c', fontFamily: 'monospace'
    }).setDepth(61);

    // Cover indicator
    if(s.cover.active) {
      var cc = s.cover.credibility > 60 ? '#4a8a5a' : s.cover.credibility > 30 ? '#c8a040' : '#b84444';
      this.add.text(810, 6, ICAC.lang('掩护','CV'), { fontSize: '10px', color: '#555' }).setDepth(61);
      this.add.text(810, 22, s.cover.credibility + '%', {
        fontSize: '13px', color: cc, fontFamily: 'monospace'
      }).setDepth(61);
    }

    // Divider
    UI.divider(this, 870, barH/2, 24, { depth: 61 });

    // Phase indicator
    this.add.text(900, 8, ICAC.lang('阶段','PH') + ' ' + s.progress.phase, {
      fontSize: '12px', color: '#7a7568', fontFamily: 'monospace'
    }).setDepth(61);

    // Location
    this.locText = this.add.text(W - 25, 10, '', {
      fontSize: '14px', color: '#8b7340', fontFamily: 'monospace'
    }).setOrigin(1, 0).setDepth(61);
    this.updateLoc();

    // Mission counter
    this.missionText = this.add.text(W - 25, 28, '', {
      fontSize: '11px', color: '#555', fontFamily: 'monospace'
    }).setOrigin(1, 0).setDepth(61);
    this.updateMissionCount();

    // Bottom bar
    var botPanel = UI.drawPanel(this, W/2, H - 22, W - 20, 40, { depth: 60 });

    // Menu button - use GameScene's scene manager directly
    var gameScene = this;
    var menuBtn = UI.createButton(this, 70, H - 20, ICAC.lang('菜单','MENU'), {
      width: 90, height: 28, fontSize: '11px', depth: 61,
      cb: function() { gameScene.scene.launch('SettingsScene'); gameScene.scene.pause(); }
    });
    this.menuBtn = menuBtn;

    // Network button
    var netBtn = UI.createButton(this, 180, H - 20, ICAC.lang('网络','NET'), {
      width: 90, height: 28, fontSize: '11px', depth: 61,
      cb: function() { gameScene.showNetworkPanel(); }
    });
  },

  updateLoc: function() {
    var d = this.findDist(ICAC.state.player.district);
    var name = d ? (ICAC.settings.lang === 'zh' ? d.nameZh : d.name) : ICAC.state.player.district;
    this.locText.setText(name.toUpperCase());
  },

  updateMissionCount: function() {
    if(this.missionText) {
      this.missionText.setText(ICAC.lang('任务: ','M: ') + ICAC.state.progress.available.length);
    }
  },

  refreshStatsBar: function() {
    var s = ICAC.state;
    if(this.moneyText) {
      this.moneyText.setText('$' + (s.money || 0));
    }
    // Refresh stat bars if they exist and have refresh method
    if(this.statBars) {
      var statMap = ['integrity','trust','credibility','psych'];
      for(var i=0; i<statMap.length; i++) {
        var key = statMap[i];
        if(this.statBars[key] && typeof this.statBars[key].refresh === 'function' && s.stats[key] !== undefined) {
          this.statBars[key].refresh(s.stats[key], 100);
        }
      }
    }
  },

  createJoystick: function() {
    var scene = this, H = this.H;
    var jx = 80, jy = H - 120, jr = 55;
    var base = this.add.circle(jx, jy, jr, 0xffffff, 0.05).setDepth(100);
    base.setStrokeStyle(2, 0xffffff, 0.1);
    var thumb = this.add.circle(jx, jy, 22, 0xc9a84c, 0.35).setDepth(101);
    this.input.on('pointerdown', function(p) { if(p.x < scene.W/2) { scene.joyActive = true; scene.joyOX = p.x; scene.joyOY = p.y; } });
    this.input.on('pointermove', function(p) {
      if(!scene.joyActive) return;
      var dx = p.x - scene.joyOX, dy = p.y - scene.joyOY;
      var dist = Math.sqrt(dx*dx+dy*dy), max = jr;
      if(dist > max) { dx = dx/dist*max; dy = dy/dist*max; }
      thumb.x = jx + dx; thumb.y = jy + dy;
      scene.joyDir = dist > 10 ? { x: dx/max, y: dy/max } : null;
    });
    this.input.on('pointerup', function() { scene.joyActive = false; scene.joyDir = null; thumb.x = jx; thumb.y = jy; });
  },

  update: function(time, delta) {
    if(!this.player) return;
    var dt = delta/1000, dx = 0, dy = 0;
    if(this.keys.up.isDown || this.wasd.W.isDown) dy = -1;
    if(this.keys.down.isDown || this.wasd.S.isDown) dy = 1;
    if(this.keys.left.isDown || this.wasd.A.isDown) dx = -1;
    if(this.keys.right.isDown || this.wasd.D.isDown) dx = 1;
    if(this.joyDir) { dx = this.joyDir.x; dy = this.joyDir.y; }
    if(dx !== 0 && dy !== 0) { var l = Math.sqrt(dx*dx+dy*dy); dx/=l; dy/=l; }
    if(dx !== 0 || dy !== 0) {
      this.player.x += dx * this.speed * dt;
      this.player.y += dy * this.speed * dt;
      this.player.x = Phaser.Math.Clamp(this.player.x, 15, this.W-15);
      this.player.y = Phaser.Math.Clamp(this.player.y, 48, this.H-44);
      this.checkDistrict();
    }
  },

  checkDistrict: function() {
    var px = this.player.x, py = this.player.y;
    for(var i=0; i<this.distData.length; i++) {
      var d = this.distData[i];
      if(px > d.x-d.w/2 && px < d.x+d.w/2 && py > d.y-d.h/2 && py < d.y+d.h/2) {
        if(ICAC.state.player.district !== d.id) { ICAC.state.player.district = d.id; this.updateLoc(); }
        return;
      }
    }
  },

  autoSave: function() {
    try { localStorage.setItem('icac_autosave', JSON.stringify({ state: ICAC.state, time: Date.now() })); } catch(e){}
  },

});
