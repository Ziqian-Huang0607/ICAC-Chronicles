// ============================================================
// ICAC Chronicles - HOI4-Style UI Toolkit (Brightened)
// ============================================================

ICAC.UI = {
  colors: {
    bgDeep: 0x2a2520,
    bgPanel: 0x3a3530,
    bgHeader: 0x454038,
    bgRow: 0x322e28,
    gold: 0xe0c060,
    goldBright: 0xf0d878,
    goldDim: 0xa89048,
    text: 0xf0ece4,
    textMuted: 0xb0a898,
    textDark: 0x2a2520,
    danger: 0xe06060,
    success: 0x68c078,
    info: 0x68a8c8,
    warning: 0xe8c050,
    corrupt: 0x9a4858,
    borderOuter: 0x1a1814,
    borderInner: 0x5a5548,
    borderHighlight: 0x6a6558,
    shadow: 0x0a0908
  },

  makeLeather: function(scene, key, w, h, baseColor, grainOpacity) {
    var g = scene.make.graphics({ add: false });
    g.fillStyle(baseColor || 0x24201c, 1);
    g.fillRect(0, 0, w, h);
    g.fillStyle(0x141210, grainOpacity || 0.12);
    for (var i = 0; i < w * h * 0.3; i++) {
      var x = Math.random() * w, y = Math.random() * h;
      g.fillRect(x, y, 1 + Math.random() * 2, 1);
    }
    g.fillStyle(0x2a2520, 0.06);
    for (var i = 0; i < 20; i++) {
      var x = Math.random() * w;
      g.fillRect(x, 0, 1 + Math.random() * 3, h);
    }
    g.generateTexture(key, w, h);
  },

  makeMetal: function(scene, key, w, h) {
    var g = scene.make.graphics({ add: false });
    g.fillStyle(0x242220, 1);
    g.fillRect(0, 0, w, h);
    for (var y = 0; y < h; y += 2) {
      var alpha = 0.02 + Math.random() * 0.04;
      g.fillStyle(0x3a3834, alpha);
      g.fillRect(0, y, w, 1);
    }
    g.fillStyle(0x4a4640, 0.12);
    g.fillRect(0, 0, w, 1);
    g.fillRect(0, h - 1, w, 1);
    g.generateTexture(key, w, h);
  },

  makeNoise: function(scene, key, w, h) {
    var g = scene.make.graphics({ add: false });
    g.fillStyle(0x000000, 0);
    g.fillRect(0, 0, w, h);
    for (var i = 0; i < w * h * 0.5; i++) {
      var v = Math.random();
      var c = v > 0.5 ? 0xffffff : 0x000000;
      g.fillStyle(c, 0.03);
      g.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }
    g.generateTexture(key, w, h);
  },

  makeButtonTextures: function(scene) {
    var C = this.colors, w = 280, h = 52;
    var g;
    g = scene.make.graphics({ add: false });
    g.fillStyle(0x2e2924, 1); g.fillRoundedRect(0, 0, w, h, 2);
    g.lineStyle(1, 0x0a0908, 0.8); g.strokeRoundedRect(0, 0, w, h, 2);
    g.lineStyle(1, 0x3a3530, 0.6); g.strokeRoundedRect(1, 1, w - 2, h - 2, 2);
    g.fillStyle(C.gold, 0.15); g.fillRect(4, h - 3, w - 8, 1);
    g.generateTexture('btn_normal', w, h);

    g = scene.make.graphics({ add: false });
    g.fillStyle(0x363028, 1); g.fillRoundedRect(0, 0, w, h, 2);
    g.lineStyle(1, 0x0a0908, 0.8); g.strokeRoundedRect(0, 0, w, h, 2);
    g.lineStyle(1, 0x4a4538, 0.8); g.strokeRoundedRect(1, 1, w - 2, h - 2, 2);
    g.fillStyle(C.gold, 0.4); g.fillRect(4, h - 3, w - 8, 1);
    g.generateTexture('btn_hover', w, h);

    g = scene.make.graphics({ add: false });
    g.fillStyle(0xd4b050, 1); g.fillRoundedRect(0, 0, w, h, 2);
    g.fillStyle(0xe0c060, 1); g.fillRoundedRect(1, 1, w - 2, (h - 2) * 0.4, 2);
    g.lineStyle(1, 0xa88030, 0.8); g.strokeRoundedRect(0, 0, w, h, 2);
    g.generateTexture('btn_primary', w, h);
  },

  drawPanel: function(scene, x, y, w, h, opts) {
    opts = opts || {};
    var depth = opts.depth || 1;
    var C = this.colors;
    var shadow = scene.add.rectangle(x, y + 3, w + 6, h + 6, C.shadow, 0.45).setDepth(depth);
    var body = scene.add.rectangle(x, y, w, h, opts.color || C.bgPanel, 0.97).setDepth(depth + 1);
    var outerBorder = scene.add.graphics().setDepth(depth + 2);
    outerBorder.lineStyle(1, C.borderOuter, 1);
    outerBorder.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 2);
    var innerBorder = scene.add.graphics().setDepth(depth + 2);
    innerBorder.lineStyle(1, C.borderHighlight, 0.55);
    innerBorder.strokeRoundedRect(x - w / 2 + 1, y - h / 2 + 1, w - 2, h - 2, 1);
    var corners = this.drawCorners(scene, x, y, w, h, depth + 3, opts.cornerSize || 12);
    return { shadow: shadow, body: body, outer: outerBorder, inner: innerBorder, corners: corners };
  },

  drawCorners: function(scene, x, y, w, h, depth, size) {
    var C = this.colors, g = scene.add.graphics().setDepth(depth);
    var halfW = w / 2, halfH = h / 2, s = size || 12, color = C.gold, alpha = 0.7;
    g.lineStyle(2, color, alpha);
    g.lineBetween(x - halfW + 2, y - halfH + s, x - halfW + 2, y - halfH + 2);
    g.lineBetween(x - halfW + 2, y - halfH + 2, x - halfW + s, y - halfH + 2);
    g.lineBetween(x + halfW - s, y - halfH + 2, x + halfW - 2, y - halfH + 2);
    g.lineBetween(x + halfW - 2, y - halfH + 2, x + halfW - 2, y - halfH + s);
    g.lineBetween(x - halfW + 2, y + halfH - s, x - halfW + 2, y + halfH - 2);
    g.lineBetween(x - halfW + 2, y + halfH - 2, x - halfW + s, y + halfH - 2);
    g.lineBetween(x + halfW - s, y + halfH - 2, x + halfW - 2, y + halfH - 2);
    g.lineBetween(x + halfW - 2, y + halfH - 2, x + halfW - 2, y + halfH - s);
    return g;
  },

  drawPanelWithHeader: function(scene, x, y, w, h, title, opts) {
    opts = opts || {};
    var depth = opts.depth || 1, C = this.colors;
    var panel = this.drawPanel(scene, x, y, w, h, opts);
    var headerH = opts.headerH || 38;
    var header = scene.add.graphics().setDepth(depth + 2);
    header.fillStyle(C.bgHeader, 0.96);
    header.fillRoundedRect(x - w / 2 + 1, y - h / 2 + 1, w - 2, headerH, 1);
    header.fillStyle(C.gold, 0.35);
    header.fillRect(x - w / 2 + 8, y - h / 2 + headerH, w - 16, 1);
    var titleText = scene.add.text(x, y - h / 2 + headerH / 2 + 1, title || '', {
      fontSize: opts.titleSize || '17px',
      color: opts.titleColor || '#d4b050',
      fontFamily: 'Georgia,"Times New Roman",serif',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(depth + 4);
    var decor = scene.add.graphics().setDepth(depth + 3);
    decor.fillStyle(C.gold, 0.22);
    decor.fillRect(x - w / 2 + 20, y - h / 2 + headerH + 3, w - 40, 1);
    return { panel: panel, header: header, title: titleText, decor: decor };
  },

  createButton: function(scene, x, y, text, opts) {
    opts = opts || {};
    var C = this.colors, w = opts.width || 280, h = opts.height || 52, depth = opts.depth || 10, primary = opts.primary || false;
    var container = scene.add.container(x, y).setDepth(depth);
    var shadow = scene.add.rectangle(0, 2, w + 2, h + 2, 0x000000, 0.35).setDepth(0);
    container.add(shadow);
    var body = scene.add.rectangle(0, 0, w, h, primary ? C.gold : C.bgHeader, 0.96).setDepth(1);
    body.setStrokeStyle(1, primary ? 0xa88030 : C.borderInner, 0.85);
    container.add(body);
    var innerLine = scene.add.graphics().setDepth(2);
    innerLine.lineStyle(1, primary ? 0xe0c060 : C.borderHighlight, 0.5);
    innerLine.strokeRoundedRect(-w / 2 + 1, -h / 2 + 1, w - 2, h - 2, 1);
    container.add(innerLine);
    var accent = scene.add.graphics().setDepth(2);
    accent.fillStyle(primary ? 0xa08030 : C.gold, primary ? 0.35 : 0.18);
    accent.fillRect(-w / 2 + 4, h / 2 - 2, w - 8, 1);
    container.add(accent);
    var txt = scene.add.text(0, -1, text, {
      fontSize: opts.fontSize || '15px',
      color: primary ? '#1a1714' : '#e8e4dc',
      fontFamily: '"Segoe UI","PingFang SC",sans-serif',
      fontStyle: primary ? 'bold' : 'normal'
    }).setOrigin(0.5).setDepth(3);
    container.add(txt);
    if (opts.disabled) {
      body.setFillStyle(0x1a1714, 0.5);
      txt.setColor('#555');
      return { container: container, body: body, text: txt };
    }
    var hitArea = scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true }).setDepth(4);
    container.add(hitArea);
    hitArea.on('pointerover', function () {
      body.setFillStyle(primary ? 0xe0c060 : 0x363028, 0.98);
      body.setStrokeStyle(1, primary ? 0xe8c860 : C.gold, 0.65);
      accent.clear();
      accent.fillStyle(primary ? 0x908030 : C.gold, 0.55);
      accent.fillRect(-w / 2 + 4, h / 2 - 2, w - 8, 1);
      if (opts.onHover) opts.onHover();
    });
    hitArea.on('pointerout', function () {
      body.setFillStyle(primary ? C.gold : C.bgHeader, 0.96);
      body.setStrokeStyle(1, primary ? 0xa88030 : C.borderInner, 0.85);
      accent.clear();
      accent.fillStyle(primary ? 0xa08030 : C.gold, primary ? 0.35 : 0.18);
      accent.fillRect(-w / 2 + 4, h / 2 - 2, w - 8, 1);
    });
    hitArea.on('pointerdown', function () {
      scene.tweens.add({ targets: container, scaleX: 0.97, scaleY: 0.97, duration: 60, yoyo: true });
      if (opts.cb) opts.cb();
    });
    return { container: container, body: body, text: txt, hit: hitArea };
  },

  createStatBar: function(scene, x, y, label, value, max, color, opts) {
    opts = opts || {};
    var C = this.colors, w = opts.width || 140, h = opts.height || 26, depth = opts.depth || 5, maxVal = max || 100;
    var container = scene.add.container(x, y).setDepth(depth);
    var bg = scene.add.rectangle(0, 0, w, h, C.bgDeep, 0.92).setDepth(0);
    bg.setStrokeStyle(1, C.borderInner, 0.55);
    container.add(bg);
    var lbl = scene.add.text(-w / 2 + 6, -7, label, { fontSize: '11px', color: '#8a8578', fontFamily: 'monospace' }).setDepth(1);
    container.add(lbl);
    var barBg = scene.add.rectangle(2, 6, w - 16, 7, 0x0e0c0a, 0.85).setDepth(1);
    container.add(barBg);
    var pct = Math.max(0, Math.min(1, value / maxVal));
    var barColor = typeof color === 'string' ? parseInt(color.replace('#', '0x')) : (color || C.success);
    if (pct > 0) {
      var bar = scene.add.rectangle(-(w - 16) / 2 + (w - 16) * pct / 2, 6, (w - 16) * pct, 7, barColor, 0.88).setDepth(2);
      container.add(bar);
    }
    var val = scene.add.text(w / 2 - 6, -7, String(Math.round(value)), { fontSize: '12px', color: color || '#58a868', fontFamily: 'monospace', fontStyle: 'bold' }).setOrigin(1, 0).setDepth(1);
    container.add(val);

    var barColor = typeof color === 'string' ? parseInt(color.replace('#', '0x')) : (color || C.success);
    var barW = w - 16;
    var result = {
      container: container, bg: bg, bar: pct > 0 ? bar : null,
      valText: val, lblText: lbl, _barColor: barColor, _barW: barW, _scene: scene
    };

    // Add refresh method so GameScene can update stat bars live
    result.refresh = function(newValue, maxVal) {
      var pct2 = Math.max(0, Math.min(1, newValue / (maxVal || 100)));
      this.valText.setText(String(Math.round(newValue)));
      if(this.bar) { this.bar.destroy(); this.bar = null; }
      if(pct2 > 0) {
        this.bar = this._scene.add.rectangle(-this._barW / 2 + this._barW * pct2 / 2, 6, this._barW * pct2, 7, this._barColor, 0.88).setDepth(2);
        this.container.add(this.bar);
      }
    };

    return result;
  },

  createTooltip: function(scene, x, y, title, lines, opts) {
    opts = opts || {};
    var C = this.colors, lineH = 19, pad = 12, w = opts.width || 230, h = 32 + lines.length * lineH + pad * 2, depth = opts.depth || 100;
    var W = scene.scale.width;
    x = Math.min(x, W - w / 2 - 10);
    y = Math.max(y, h / 2 + 10);
    var container = scene.add.container(x, y).setDepth(depth);
    var shadow = scene.add.rectangle(2, 3, w + 4, h + 4, 0x000000, 0.45).setDepth(0);
    container.add(shadow);
    var body = scene.add.rectangle(0, 0, w, h, C.bgPanel, 0.97).setDepth(1);
    body.setStrokeStyle(1, C.borderInner, 0.85);
    container.add(body);
    var g = scene.add.graphics().setDepth(2);
    g.lineStyle(1, C.gold, 0.45);
    g.lineBetween(-w / 2 + 2, -h / 2 + 8, -w / 2 + 2, -h / 2 + 2);
    g.lineBetween(-w / 2 + 2, -h / 2 + 2, -w / 2 + 8, -h / 2 + 2);
    g.lineBetween(w / 2 - 8, -h / 2 + 2, w / 2 - 2, -h / 2 + 2);
    g.lineBetween(w / 2 - 2, -h / 2 + 2, w / 2 - 2, -h / 2 + 8);
    container.add(g);
    var ty = -h / 2 + pad + 9;
    var titleText = scene.add.text(-w / 2 + pad, ty, title || '', { fontSize: '14px', color: '#d4b050', fontFamily: 'Georgia,serif', fontStyle: 'bold' }).setDepth(3);
    container.add(titleText);
    var div = scene.add.graphics().setDepth(3);
    div.fillStyle(C.gold, 0.18);
    div.fillRect(-w / 2 + pad, ty + 18, w - pad * 2, 1);
    container.add(div);
    var ly = ty + 26;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var text = typeof line === 'string' ? line : (line.text || '');
      var color = typeof line === 'object' ? (line.color || '#999') : '#999';
      var t = scene.add.text(-w / 2 + pad, ly, text, { fontSize: '12px', color: color, fontFamily: '"PingFang SC",sans-serif' }).setDepth(3);
      container.add(t);
      ly += lineH;
    }
    return container;
  },

  divider: function(scene, x, y, width, opts) {
    opts = opts || {};
    var C = this.colors, g = scene.add.graphics().setDepth(opts.depth || 5);
    var half = width / 2, cy = y;
    g.lineStyle(1, C.gold, 0.25);
    g.lineBetween(x - half, cy, x - 6, cy);
    g.lineBetween(x + 6, cy, x + half, cy);
    g.fillStyle(C.gold, 0.35);
    var s = 3;
    g.fillPoints([{ x: x, y: cy - s }, { x: x + s, y: cy }, { x: x, y: cy + s }, { x: x - s, y: cy }], true, true);
    return g;
  },

  drawDialogueBg: function(scene, x, y, w, h, depth) {
    var C = this.colors, g = scene.add.graphics().setDepth(depth);
    g.fillStyle(0x1a1714, 0.96);
    g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 3);
    g.lineStyle(1, C.borderOuter, 0.92);
    g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 3);
    g.lineStyle(1, 0x322e28, 0.45);
    g.strokeRoundedRect(x - w / 2 + 1, y - h / 2 + 1, w - 2, h - 2, 2);
    g.fillStyle(C.gold, 0.28);
    g.fillRect(x - w / 2 + 20, y - h / 2 + 2, w - 40, 1);
    g.fillStyle(C.gold, 0.10);
    g.fillRect(x - w / 2 + 2, y - h / 2 + 22, 2, h - 44);
    return g;
  },

  transitionTo: function(scene, key, data) {
    scene.time.delayedCall(60, function() { scene.scene.start(key, data || {}); });
  }
};
