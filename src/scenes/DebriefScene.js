var DebriefScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'DebriefScene' }); },

  create: function() {
    var W = this.scale.width, H = this.scale.height, UI = ICAC.UI, isZh = ICAC.settings.lang === 'zh';
    this.W = W; this.H = H;
    ICAC.state.progress.debriefPending = false;

    // Background
    this.add.tileSprite(W/2, H/2, W, H, 'bg_grid');
    this.add.tileSprite(W/2, H/2, W, H, 'tex_noise').setAlpha(0.05);
    this.add.rectangle(W/2, H/2, W, H, UI.colors.bgDeep, 0.9);

    // Top decorative bar
    var topBar = this.add.graphics();
    topBar.fillStyle(UI.colors.gold, 0.15); topBar.fillRect(0, 0, W, 2);

    // Title
    var panel = UI.drawPanelWithHeader(this, W/2, H*0.08, W-40, 52,
      ICAC.lang('\u4efb\u52a1\u5b8c\u6210\u00b7\u53cd\u601d', 'Mission Complete \u00b7 Reflection'), { depth: 10, titleSize: '18px' });

    // Analyze history
    var history = ICAC.state.history;
    var pCount = {}, lCount = {};
    for(var i=0; i<history.length; i++) {
      var h = history[i];
      if(h.principle) { pCount[h.principle] = (pCount[h.principle]||0)+1; }
      if(h.leader) { lCount[h.leader] = (lCount[h.leader]||0)+1; }
    }

    // Find dominant principle
    var maxP = 0, domP = null;
    for(var k in pCount) { if(pCount[k] > maxP) { maxP = pCount[k]; domP = k; } }
    var sz = domP ? ICAC.sunziData.find(function(s) { return s.chapter === domP; }) || ICAC.sunziData[0] : ICAC.sunziData[0];

    // Find dominant leader
    var maxL = 0, domL = null;
    for(var k in lCount) { if(lCount[k] > maxL) { maxL = lCount[k]; domL = k; } }
    var ld = domL ? ICAC.leadersData.find(function(l) { return l.id === domL; }) || ICAC.leadersData[0] : ICAC.leadersData[0];

    // Sun Tzu quote panel (left side)
    var szPanel = UI.drawPanelWithHeader(this, W*0.25, H*0.38, W*0.44, 240,
      ICAC.lang('\u300a\u5b59\u5b50\u5175\u6cd5\u300b\u00b7\u7b2c' + (sz?sz.chapter:'?') + '\u7ae0', 'Art of War \u00b7 Ch. ' + (sz?sz.chapter:'?')), { depth: 10 });

    var szTitle = isZh ? (sz?sz.chapterTitle:'') : (sz?sz.chapterTitleEn:'The Art of War');
    var szQuote = isZh ? (sz?sz.quoteZh:'') : (sz?sz.quoteEn:'Warfare is the art of deception.');
    var szApp = isZh ? (sz?sz.appZh:'') : (sz?sz.appEn:'');

    this.add.text(W*0.05, H*0.28, szTitle, {
      fontSize: '15px', color: '#c9a84c', fontFamily: 'Georgia,"PingFang SC",serif', fontStyle: 'bold'
    }).setDepth(12);

    this.add.text(W*0.05, H*0.33, '\u201c' + szQuote + '\u201d', {
      fontSize: '13px', color: '#d8d4cc', fontStyle: 'italic', wordWrap: { width: W*0.38 }, lineSpacing: 6
    }).setDepth(12);

    UI.divider(this, W*0.25, H*0.42, W*0.32, { depth: 12 });

    this.add.text(W*0.05, H*0.45, szApp, {
      fontSize: '12px', color: '#888', wordWrap: { width: W*0.38 }, lineSpacing: 6
    }).setDepth(12);

    // Leader parallel panel (right side)
    var ldPanel = UI.drawPanelWithHeader(this, W*0.75, H*0.38, W*0.44, 240,
      ICAC.lang('\u5386\u53f2\u5bf9\u7167', 'Historical Parallel'), { depth: 10 });

    var ldName = isZh ? (ld?ld.name:'') : (ld?ld.nameEn:'');
    var ldTech = isZh ? (ld?ld.techniqueZh:'') : (ld?ld.techniqueEn:'');
    var ldAmbig = isZh ? (ld?ld.ambigZh:'') : (ld?ld.ambigEn:'');

    this.add.text(W*0.53, H*0.28, ldName, {
      fontSize: '16px', color: '#c9a84c', fontFamily: 'Georgia,"PingFang SC",serif', fontStyle: 'bold'
    }).setDepth(12);

    UI.divider(this, W*0.75, H*0.33, W*0.32, { depth: 12 });

    this.add.text(W*0.53, H*0.36, ldTech, {
      fontSize: '12px', color: '#aaa', wordWrap: { width: W*0.38 }, lineSpacing: 6
    }).setDepth(12);

    this.add.text(W*0.53, H*0.47, ldAmbig, {
      fontSize: '11px', color: '#8b7340', fontStyle: 'italic', wordWrap: { width: W*0.38 }, lineSpacing: 6
    }).setDepth(12);

    // Reflection prompt (bottom)
    var refPanel = UI.drawPanel(this, W/2, H*0.74, W*0.88, 110, { depth: 10 });

    var reflection = ICAC.lang(
      '\u4f60\u7684\u884c\u52a8\u4f53\u73b0\u4e86\u4ec0\u4e48\u539f\u5219\uff1f\u5728\u4e0d\u540c\u65f6\u4ee3\u548c\u5236\u5ea6\u73af\u5883\u4e0b\uff0c\u4f60\u7684\u9009\u62e9\u8fd8\u6703\u4e00\u6837\u5417\uff1f',
      'What principle guided your actions? Would your choices be the same in a different era or system?'
    );
    this.add.text(W*0.08, H*0.68, reflection, {
      fontSize: '13px', color: '#ccc', wordWrap: { width: W*0.78 }, lineSpacing: 8
    }).setDepth(12);

    // Continue button
    var debriefScene = this;
    var contBtn = UI.createButton(this, W/2, H*0.9, ICAC.lang('\u7ee7\u7eed', 'CONTINUE'), {
      primary: true, width: 280, depth: 15, cb: function() { debriefScene.scene.start('GameScene'); }
    });

    this.input.keyboard.on('keydown-SPACE', function() { debriefScene.scene.start('GameScene'); });
    this.input.keyboard.on('keydown-ENTER', function() { debriefScene.scene.start('GameScene'); });
  }
});
