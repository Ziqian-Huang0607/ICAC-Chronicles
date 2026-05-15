var PreloadScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'PreloadScene' }); },

  create: function() {
    var W = 1280, H = 720;
    var pf = document.getElementById('pfill');
    var pt = document.getElementById('ptext');
    function progress(pct, label) { if(pf) pf.style.width = pct+'%'; if(pt) pt.textContent = label; }

    var UI = ICAC.UI;

    // Leather texture for panels
    UI.makeLeather(this, 'tex_leather', 256, 256, 0x141210, 0.12);
    progress(10, 'TEXTURES...');

    // Metal texture
    UI.makeMetal(this, 'tex_metal', 256, 128);
    progress(20, 'METAL...');

    // Noise overlay
    UI.makeNoise(this, 'tex_noise', 256, 256);
    progress(30, 'NOISE...');

    // Player pawn
    var g = this.make.graphics({ add: false });
    g.fillStyle(0x2a5a4a); g.fillCircle(20, 20, 16);
    g.lineStyle(2, 0x5aaa7a); g.strokeCircle(20, 20, 16);
    g.fillStyle(0xc9a84c); g.fillTriangle(20, 6, 16, 14, 24, 14);
    g.fillStyle(0x1a4a3a, 0.5); g.fillCircle(20, 20, 6);
    g.generateTexture('player', 40, 40); progress(40, 'PLAYER...');

    // District shapes
    var dmap = [
      { id: 'd_central', c: 0x1a1e2a, pts: [0,10, 80,0, 120,20, 130,70, 100,100, 20,90, 0,50] },
      { id: 'd_wanchai', c: 0x1e1a24, pts: [10,0, 90,5, 100,60, 70,90, 0,80, 5,30] },
      { id: 'd_mongkok', c: 0x241a1a, pts: [5,5, 95,0, 100,90, 60,110, 0,100, 10,40] },
      { id: 'd_yaumatei', c: 0x1a1a16, pts: [0,0, 80,10, 90,80, 40,90, 0,70] },
      { id: 'd_tst', c: 0x1a1e1e, pts: [10,0, 100,5, 110,70, 60,80, 0,60] },
      { id: 'd_walled', c: 0x0e0c0a, pts: [5,5, 75,0, 80,75, 0,80, 10,40] },
      { id: 'd_nt', c: 0x1a2218, pts: [0,20, 40,0, 180,10, 200,80, 160,130, 20,120] },
      { id: 'd_northpt', c: 0x1a221e, pts: [0,5, 100,0, 110,70, 60,80, 0,60] },
      { id: 'd_arsenal', c: 0x18181e, pts: [5,0, 105,5, 110,80, 50,85, 0,60] }
    ];
    for (var i = 0; i < dmap.length; i++) {
      var d = dmap[i];
      g = this.make.graphics({ add: false });
      var path = new Phaser.Curves.Path(d.pts[0], d.pts[1]);
      for (var j = 2; j < d.pts.length; j += 2) path.lineTo(d.pts[j], d.pts[j+1]);
      path.closePath();
      g.fillStyle(d.c, 0.7); path.draw(g); g.fillPath();
      g.lineStyle(1, 0x3a3630, 0.5); path.draw(g); g.strokePath();
      // Inner grid pattern
      g.lineStyle(0.5, 0xffffff, 0.03);
      for (var gx = 10; gx < 120; gx += 18) g.lineBetween(gx, 5, gx, 110);
      for (var gy = 10; gy < 120; gy += 18) g.lineBetween(5, gy, 190, gy);
      g.generateTexture(d.id, 200, 140);
    }
    progress(60, 'DISTRICTS...');

    // Mission diamond icon
    g = this.make.graphics({ add: false });
    g.fillStyle(0xc9a84c); var rr = 10;
    g.fillTriangle(16, 16-rr, 16+rr, 16, 16, 16+rr);
    g.fillTriangle(16, 16-rr, 16-rr, 16, 16, 16+rr);
    g.lineStyle(1, 0xffffff, 0.3);
    g.strokeTriangle(16, 16-rr, 16+rr, 16, 16, 16+rr);
    g.generateTexture('icon_mission', 32, 32);

    // NPC icon
    g = this.make.graphics({ add: false });
    g.fillStyle(0x4a8a6a); g.fillCircle(16, 16, 10);
    g.lineStyle(1, 0x5aaa7a, 0.5); g.strokeCircle(16, 16, 10);
    g.generateTexture('icon_npc', 32, 32);

    // Danger icon
    g = this.make.graphics({ add: false });
    g.fillStyle(0xb84444); g.fillTriangle(16, 4, 26, 28, 6, 28);
    g.generateTexture('icon_danger', 32, 32);

    // Info icon
    g = this.make.graphics({ add: false });
    g.fillStyle(0x4a7a9a); g.fillCircle(16, 16, 8);
    g.generateTexture('icon_info', 32, 32);
    progress(75, 'ICONS...');

    // Button textures via toolkit
    UI.makeButtonTextures(this);
    progress(85, 'BUTTONS...');

    // Grid background - light warm tan
    g = this.make.graphics({ add: false });
    g.fillStyle(0x8a8270); g.fillRect(0, 0, 64, 64);
    g.lineStyle(1, 0xa8a08c, 0.6);
    for (i = 0; i <= 64; i += 16) { g.lineBetween(i, 0, i, 64); g.lineBetween(0, i, 64, i); }
    g.generateTexture('bg_grid', 64, 64);

    // Particles
    g = this.make.graphics({ add: false });
    g.fillStyle(0xc9a84c, 0.5); g.fillCircle(2, 2, 2);
    g.generateTexture('particle', 4, 4);
    progress(100, 'READY');

    this.time.delayedCall(500, function() { this.scene.start('MenuScene'); }, [], this);
  }
});
