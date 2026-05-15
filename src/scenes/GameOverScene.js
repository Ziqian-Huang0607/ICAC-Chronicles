// GameOverScene — Dramatic career-ending moments
// Triggered by catastrophic choices: killed, arrested, fired, or exiled

var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },

  init: function(data) {
    this.reason = data.reason || 'default';
    this.fromScene = data.fromScene || 'GameScene';
  },

  create: function() {
    var W = this.W = this.scale.width, H = this.H = this.scale.height;
    var self = this, UI = ICAC.UI, C = UI.colors;
    var isZh = ICAC.settings.lang === 'zh';

    // Fade from black
    this.cameras.main.fadeIn(600);

    // Dark overlay
    this.add.rectangle(W/2, H/2, W, H, 0x0a0806, 1).setDepth(0);
    this.add.tileSprite(W/2, H/2, W, H, 'bg_grid').setAlpha(0.15).setDepth(1);
    this.add.tileSprite(W/2, H/2, W, H, 'tex_noise').setAlpha(0.03).setDepth(2);

    // Game over configurations by reason
    var configs = {
      killed: {
        title: isZh ? '殉职' : 'KILLED IN ACTION',
        subtitle: isZh ? '你选择了正义，正义选择了你' : 'You chose justice. Justice chose you back.',
        line1: isZh ? '三天后，你的葬礼在跑马地香港坟场举行。' : 'Three days later, your funeral at Happy Valley Cemetery.',
        line2: isZh ? '没有高官出席。没有媒体报道。' : 'No officials attended. No media reported.',
        line3: isZh ? '只有阿May在你墓碑前放了一束白菊——和一本《孙子兵法》。' : 'Only May left white chrysanthemums and a copy of The Art of War.',
        lesson: isZh ? '在权力的游戏中，正义不是盾牌，是靶子。' : 'In the game of power, justice is not a shield — it is a target.',
        color: '#8b4444'
      },
      arrested: {
        title: isZh ? '入狱' : 'ARRESTED',
        subtitle: isZh ? '你被自己保护的系统吞噬了' : 'The system you protected consumed you.',
        line1: isZh ? '赤柱监狱。十年。' : 'Stanley Prison. Ten years.',
        line2: isZh ? '没有人记得你曾经是一个想改变世界的警察。' : 'No one remembers you wanted to change the world.',
        line3: isZh ? '但他们记得你收过的每一笔钱——因为账本永远不会说谎。' : 'But they remember every dollar — ledgers never lie.',
        lesson: isZh ? '权力没有记忆，但档案有。' : 'Power has no memory. But files do.',
        color: '#666688'
      },
      exiled: {
        title: isZh ? '流放' : 'EXILED',
        subtitle: isZh ? '你活了下来，但这座城市不再需要你了' : 'You survived. But the city no longer needs you.',
        line1: isZh ? '新界边境。一个只有风和牛的地方。' : 'The New Territories border. Only wind and cattle.',
        line2: isZh ? '你每天开着巡逻车在荒芜的山路上转圈，数着退休的天数。' : 'You drive patrol loops on desolate mountain roads, counting days to retirement.',
        line3: isZh ? '北角的故事还在继续——只是不再属于你。' : 'North Point\'s story continues — without you.',
        lesson: isZh ? '中立不是安全，是慢性死亡。' : 'Neutrality is not safety. It is slow death.',
        color: '#4a6a4a'
      },
      fired: {
        title: isZh ? '革职' : 'DISMISSED',
        subtitle: isZh ? '你的警号被永久注销了' : 'Your badge number is permanently retired.',
        line1: isZh ? '投诉及内部调查科的报告只有一页，但足够了。' : 'The IAB report was one page. That was enough.',
        line2: isZh ? '你试图改变系统，但系统先改变了你。' : 'You tried to change the system. The system changed you first.',
        line3: isZh ? '警队年鉴上不会有你的名字。' : 'Your name will not appear in the Force yearbook.',
        lesson: isZh ? '权力场里没有烈士，只有被遗忘的人。' : 'There are no martyrs in the power game. Only the forgotten.',
        color: '#8a6a4a'
      },
      betrayed: {
        title: isZh ? '众叛亲离' : 'BETRAYED',
        subtitle: isZh ? '你出卖了最后一个朋友，也出卖了自己' : 'You sold your last friend. And yourself.',
        line1: isZh ? '小光入狱三个月后，在牢房里用床单结束了自己的生命。' : 'Three months after Siu Kwong entered prison, he used a bedsheet.',
        line2: isZh ? '你没有参加葬礼。你不敢。' : 'You did not attend the funeral. You dared not.',
        line3: isZh ? '你赢了权力，但每天早上照镜子的时候，你看到的只有小光的脸。' : 'You won power. But every morning in the mirror, you see only Siu Kwong.',
        lesson: isZh ? '权力可以买到一切，除了睡眠。' : 'Power can buy everything — except sleep.',
        color: '#6a4a6a'
      },
      default: {
        title: isZh ? '故事终结' : 'THE END',
        subtitle: isZh ? '你的香港故事到此为止' : 'Your Hong Kong story ends here.',
        line1: isZh ? '有些路，一旦开始走，就再也回不了头。' : 'Some roads, once started, cannot be turned back.',
        line2: isZh ? '你做了一个选择。那个选择做了你。' : 'You made a choice. That choice made you.',
        line3: isZh ? '1974年的香港继续运转。只是不再有你的位置。' : '1974 Hong Kong continues. Without a place for you.',
        lesson: isZh ? '权力游戏的唯一规则：要么赢，要么消失。' : 'The only rule of the power game: win, or disappear.',
        color: '#8b7355'
      }
    };

    var cfg = configs[this.reason] || configs.default;

    // Red line at top
    this.add.rectangle(W/2, H * 0.22, 60, 3, cfg.color, 1).setDepth(3);

    // Title
    this.add.text(W/2, H * 0.28, cfg.title, {
      fontSize: '36px', color: cfg.color, fontFamily: 'Georgia,"PingFang SC",serif', fontStyle: 'bold',
      letterSpacing: 8
    }).setOrigin(0.5).setDepth(3);

    // Subtitle
    this.add.text(W/2, H * 0.35, cfg.subtitle, {
      fontSize: '14px', color: '#888', fontFamily: '"PingFang SC",sans-serif', letterSpacing: 2
    }).setOrigin(0.5).setDepth(3);

    // Divider
    UI.divider(this, W/2, H * 0.40, 200, { depth: 3 });

    // Story lines
    var startY = H * 0.45;
    var lines = [cfg.line1, cfg.line2, cfg.line3];
    lines.forEach(function(line, i) {
      self.add.text(W/2, startY + i * 30, line, {
        fontSize: '13px', color: '#aaa', fontFamily: '"PingFang SC",sans-serif',
        wordWrap: { width: 500, useAdvancedWrap: true }, align: 'center'
      }).setOrigin(0.5).setDepth(3);
    });

    // Lesson box
    var lessonY = startY + 3 * 30 + 20;
    var lessonBox = UI.drawPanel(this, W/2, lessonY, 480, 50, { depth: 3 });
    this.add.text(W/2, lessonY, cfg.lesson, {
      fontSize: '12px', color: cfg.color, fontFamily: '"PingFang SC",sans-serif', fontStyle: 'italic',
      wordWrap: { width: 440, useAdvancedWrap: true }, align: 'center'
    }).setOrigin(0.5).setDepth(4);

    // Stats summary
    var s = ICAC.state;
    var statsY = lessonY + 60;
    var statsTxt = isZh 
      ? '最终状态 \u00b7 正直:' + s.stats.integrity + ' \u00b7 信任:' + s.stats.trust + ' \u00b7 警衔:' + (s.player.rank ? s.player.rank.code : 'PC')
      : 'Final \u00b7 INT:' + s.stats.integrity + ' \u00b7 TRU:' + s.stats.trust + ' \u00b7 Rank:' + (s.player.rank ? s.player.rank.code : 'PC');
    this.add.text(W/2, statsY, statsTxt, {
      fontSize: '10px', color: '#555', fontFamily: 'monospace', letterSpacing: 1
    }).setOrigin(0.5).setDepth(3);

    // Buttons
    var btnY = statsY + 50;

    // Retry button
    var retryBg = this.add.rectangle(W/2 - 100, btnY, 160, 40, C.bgHeader, 0.8)
      .setStrokeStyle(1, C.gold, 0.4).setInteractive({ useHandCursor: true }).setDepth(3);
    var retryTxt = this.add.text(W/2 - 100, btnY, isZh ? '\u91cd\u65b0\u5f00\u59cb' : 'RESTART', {
      fontSize: '13px', color: C.gold, fontFamily: 'monospace', letterSpacing: 2
    }).setOrigin(0.5).setDepth(4);

    retryBg.on('pointerover', function() { retryBg.setFillStyle(0x2a2520, 0.95); retryTxt.setColor('#fff'); });
    retryBg.on('pointerout', function() { retryBg.setFillStyle(C.bgHeader, 0.8); retryTxt.setColor(C.gold); });
    retryBg.on('pointerdown', function() {
      ICAC.AudioSystem.play('click');
      ICAC.initState();
      self.scene.start('GameScene');
    });

    // Menu button
    var menuBg = this.add.rectangle(W/2 + 100, btnY, 160, 40, C.bgHeader, 0.8)
      .setStrokeStyle(1, C.borderInner, 0.4).setInteractive({ useHandCursor: true }).setDepth(3);
    var menuTxt = this.add.text(W/2 + 100, btnY, isZh ? '\u4e3b\u83dc\u5355' : 'MAIN MENU', {
      fontSize: '13px', color: C.text, fontFamily: 'monospace', letterSpacing: 2
    }).setOrigin(0.5).setDepth(4);

    menuBg.on('pointerover', function() { menuBg.setFillStyle(0x2a2520, 0.95); menuTxt.setColor('#fff'); });
    menuBg.on('pointerout', function() { menuBg.setFillStyle(C.bgHeader, 0.8); menuTxt.setColor(C.text); });
    menuBg.on('pointerdown', function() {
      ICAC.AudioSystem.play('click');
      self.scene.start('MenuScene');
    });

    // Bottom hint
    this.add.text(W/2, H - 20, isZh ? '\u4efb\u4f55\u9009\u62e9\u90fd\u6709\u4ee3\u4ef7\u3002\u8fd9\u4e00\u6b21\uff0c\u4f60\u4ed8\u4e86\u6700\u9ad8\u7684\u90a3\u79cd\u3002' : 'Every choice has a price. This time, you paid the highest kind.', {
      fontSize: '9px', color: '#444', fontFamily: '"PingFang SC",sans-serif', letterSpacing: 1
    }).setOrigin(0.5).setDepth(3);
  }
});
