var SettingsScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'SettingsScene' }); },

  create: function() {
    var W = this.scale.width, H = this.scale.height, self = this, UI = ICAC.UI, C = UI.colors, s = ICAC.settings;

    // Overlay
    var o = this.add.rectangle(W/2, H/2, W, H, 0, 0.7).setDepth(500).setInteractive();
    o.on('pointerdown', function() {});
    this.overlay = o;

    // Main panel with header
    var pw = Math.min(500, W-40), ph = Math.min(480, H-60);
    var px = W/2, py = H/2;

    var panel = UI.drawPanelWithHeader(this, px, py, pw, ph,
      ICAC.lang('\u8bbe\u7f6e', 'SETTINGS'), { depth: 501, headerH: 42 });

    // Close button (X) in header
    var closeX = this.add.text(px + pw/2 - 20, py - ph/2 + 18, '\u2715', {
      fontSize: '16px', color: '#555'
    }).setOrigin(0.5).setDepth(505).setInteractive({ useHandCursor: true });
    closeX.on('pointerover', function() { closeX.setColor('#c9a84c'); });
    closeX.on('pointerout', function() { closeX.setColor('#555'); });
    closeX.on('pointerdown', function() { self.close(); });

    // Settings items
    var items = [
      { label: ICAC.lang('\u8bed\u8a00', 'Language'),
        value: s.lang === 'zh' ? '\u4e2d\u6587' : 'English',
        color: '#c9a84c',
        cb: function() { s.lang = s.lang==='zh'?'en':'zh'; self.save(); self.scene.restart(); } },
      { label: ICAC.lang('\u97f3\u6548', 'Sound FX'),
        value: s.sound ? ICAC.lang('\u5f00','ON') : ICAC.lang('\u5173','OFF'),
        color: s.sound ? '#4a8a5a' : '#b84444',
        cb: function() { s.sound = !s.sound; self.save(); self.scene.restart(); } },
      { label: ICAC.lang('\u80cc\u666f\u97f3\u4e50', 'Music'),
        value: s.music ? ICAC.lang('\u5f00','ON') : ICAC.lang('\u5173','OFF'),
        color: s.music ? '#4a8a5a' : '#b84444',
        cb: function() { s.music = !s.music; self.save(); self.scene.restart(); } },
      { label: ICAC.lang('\u96be\u5ea6', 'Difficulty'),
        value: s.difficulty.toUpperCase(),
        color: '#c9a84c',
        cb: function() { var d = ['easy','normal','hard','ironman']; s.difficulty = d[(d.indexOf(s.difficulty)+1)%4]; self.save(); self.scene.restart(); } },
      { label: ICAC.lang('\u8272\u76f2\u6a21\u5f0f', 'Colorblind'),
        value: s.colorblind ? ICAC.lang('\u5f00','ON') : ICAC.lang('\u5173','OFF'),
        color: s.colorblind ? '#4a8a5a' : '#b84444',
        cb: function() { s.colorblind = !s.colorblind; self.save(); self.scene.restart(); } }
    ];

    var startY = py - ph/2 + 85, gap = 56;
    for(var i = 0; i < items.length; i++) {
      (function(item, idx) {
        var iy = startY + idx * gap;

        // Row background
        var rowBg = self.add.rectangle(px, iy, pw - 30, 44, C.bgDeep, 0.5).setDepth(502);
        rowBg.setStrokeStyle(1, C.borderInner, 0.3);

        // Label
        self.add.text(px - pw/2 + 25, iy, item.label, {
          fontSize: '15px', color: '#ccc', fontFamily: '"PingFang SC",sans-serif'
        }).setDepth(503);

        // Value button
        var btn = UI.createButton(self, px + pw/2 - 90, iy, item.value, {
          width: 140, height: 32, fontSize: '13px', depth: 502, cb: item.cb
        });
        // Override text color
        btn.text.setColor(item.color || '#e0ded8');

      })(items[i], i);
    }

    // Divider above export/import
    UI.divider(this, px, py + ph/2 - 105, pw - 60, { depth: 502 });

    // Export / Import buttons
    var exBtn = UI.createButton(this, px - 90, py + ph/2 - 70, ICAC.lang('\u5bfc\u51fa\u5b58\u6863', 'Export Save'), {
      width: 160, height: 34, fontSize: '12px', depth: 502, cb: function() { self.exportSave(); }
    });

    var imBtn = UI.createButton(this, px + 90, py + ph/2 - 70, ICAC.lang('\u5bfc\u5165\u5b58\u6863', 'Import Save'), {
      width: 160, height: 34, fontSize: '12px', depth: 502, cb: function() { self.importSave(); }
    });

    // Close button at bottom
    var closeBtn = UI.createButton(this, px, py + ph/2 - 28, ICAC.lang('\u5173\u95ed', 'CLOSE'), {
      width: pw - 60, height: 32, fontSize: '13px', depth: 502, cb: function() { self.close(); }
    });

    this.input.keyboard.on('keydown-ESC', function() { self.close(); });
  },

  close: function() {
    this.scene.stop();
    this.scene.resume('GameScene');
  },

  save: function() {
    try { localStorage.setItem('icac_settings', JSON.stringify(ICAC.settings)); } catch(e){}
  },

  exportSave: function() {
    var data = JSON.stringify({ state: ICAC.state, settings: ICAC.settings, time: Date.now() });
    var blob = new Blob([btoa(unescape(encodeURIComponent(data)))], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'icac_save_' + Date.now() + '.txt';
    a.click();
    URL.revokeObjectURL(url);
  },

  importSave: function() {
    var self = this, inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.txt';
    inp.onchange = function(e) {
      var f = e.target.files[0]; if(!f) return;
      var r = new FileReader();
      r.onload = function(ev) {
        try {
          var data = JSON.parse(decodeURIComponent(escape(atob(ev.target.result))));
          if(data.state) {
            ICAC.state = data.state;
            if(data.settings) Object.assign(ICAC.settings, data.settings);
            alert(ICAC.lang('\u5bfc\u5165\u6210\u529f','Imported'));
          }
        } catch(err) { alert(ICAC.lang('\u5bfc\u5165\u5931\u8d25','Import failed')); }
      };
      r.readAsText(f);
    };
    inp.click();
  }
});
