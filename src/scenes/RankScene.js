import { SCENES } from '../config/constants.js';

export default class RankScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.RANK });
  }

  create(data) {
    const { width, height } = this.scale;
    const settings = this.registry.get('settings') || { language: 'zh' };
    const lang = settings.language;
    const t = (zh, en) => lang === 'zh' ? zh : en;

    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a0f);

    this.add.text(width / 2, height * 0.3, t('晋升仪式', 'Promotion Ceremony'), {
      fontSize: '24px',
      color: '#c9a84c',
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    }).setOrigin(0.5, 0.5);

    this.add.text(width / 2, height * 0.5, t('晋升系统开发中...', 'Rank system in development...'), {
      fontSize: '14px',
      color: '#555',
      fontFamily: 'system-ui, sans-serif'
    }).setOrigin(0.5, 0.5);

    const backBtn = this.add.rectangle(width / 2, height * 0.7, 120, 36, 0x1a1a2e);
    backBtn.setStrokeStyle(1, 0x444);
    backBtn.setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height * 0.7, t('继续', 'Continue'), {
      fontSize: '14px',
      color: '#888',
      fontFamily: 'system-ui, sans-serif'
    }).setOrigin(0.5, 0.5);

    backBtn.on('pointerdown', () => {
      this.scene.start(SCENES.GAME);
    });
  }
}
