import { RANKS, SCENES } from '../config/constants.js';

export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.elements = {};
    this.visible = true;
  }

  create() {
    const { width, height } = this.scene.scale;
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const lang = settings.language;
    const t = (zh, en) => lang === 'zh' ? zh : en;

    // Top bar background
    this.elements.topBar = this.scene.add.rectangle(width / 2, 20, width, 40, 0x0a0a0f, 0.9);
    this.container.add(this.elements.topBar);

    // Rank display
    const gameState = this.scene.registry.get('gameState');
    const rank = gameState?.player?.rank || RANKS[0];
    
    this.elements.rankText = this.scene.add.text(15, 8, rank.code, {
      fontSize: '16px',
      color: '#c9a84c',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    });
    this.container.add(this.elements.rankText);

    // Stats
    const stats = gameState?.stats || {};
    
    this.elements.integrityLabel = this.scene.add.text(80, 6, t('正直', 'Integrity'), {
      fontSize: '10px', color: '#888', fontFamily: 'system-ui'
    });
    this.elements.integrityValue = this.scene.add.text(80, 17, `${stats.integrity || 50}`, {
      fontSize: '12px', color: '#4a4', fontFamily: 'monospace'
    });
    this.container.add([this.elements.integrityLabel, this.elements.integrityValue]);

    this.elements.trustLabel = this.scene.add.text(160, 6, t('信任', 'Trust'), {
      fontSize: '10px', color: '#888', fontFamily: 'system-ui'
    });
    this.elements.trustValue = this.scene.add.text(160, 17, `${stats.publicTrust || 50}`, {
      fontSize: '12px', color: '#48a', fontFamily: 'monospace'
    });
    this.container.add([this.elements.trustLabel, this.elements.trustValue]);

    // Cover indicator (if active)
    if (gameState?.cover?.active) {
      this.elements.coverLabel = this.scene.add.text(220, 6, t('掩护', 'Cover'), {
        fontSize: '10px', color: '#888', fontFamily: 'system-ui'
      });
      const coverColor = gameState.cover.credibility > 60 ? '#4a4' : (gameState.cover.credibility > 30 ? '#ca4' : '#c44');
      this.elements.coverValue = this.scene.add.text(220, 17, `${gameState.cover.credibility}%`, {
        fontSize: '12px', color: coverColor, fontFamily: 'monospace'
      });
      this.container.add([this.elements.coverLabel, this.elements.coverValue]);
    }

    // Current location
    const district = gameState?.player?.currentDistrict || 'north_point';
    this.elements.locationText = this.scene.add.text(width - 15, 15, district.toUpperCase(), {
      fontSize: '12px',
      color: '#555',
      fontFamily: 'monospace'
    }).setOrigin(1, 0);
    this.container.add(this.elements.locationText);

    // Menu button
    this.elements.menuBtn = this.scene.add.rectangle(width - 50, height - 30, 60, 28, 0x1a1a2e);
    this.elements.menuBtn.setStrokeStyle(1, 0x444);
    this.elements.menuBtn.setInteractive({ useHandCursor: true });
    this.elements.menuText = this.scene.add.text(width - 50, height - 30, t('菜单', 'Menu'), {
      fontSize: '11px', color: '#888', fontFamily: 'system-ui'
    }).setOrigin(0.5, 0.5);
    this.container.add([this.elements.menuBtn, this.elements.menuText]);

    this.elements.menuBtn.on('pointerdown', () => {
      this.scene.scene.pause();
      this.scene.scene.launch(SCENES.SETTINGS);
    });

    // Pause handler
    this.scene.input.keyboard?.on('keydown-ESC', () => {
      this.scene.scene.pause();
      this.scene.scene.launch(SCENES.SETTINGS);
    });

    this.container.setDepth(1000);
  }

  update() {
    const gameState = this.scene.registry.get('gameState');
    if (!gameState) return;

    // Update rank
    const rank = gameState.player.rank;
    this.elements.rankText.setText(rank.code);

    // Update stats
    this.elements.integrityValue.setText(`${gameState.stats.integrity}`);
    this.elements.trustValue.setText(`${gameState.stats.publicTrust}`);

    // Update cover
    if (gameState.cover.active && this.elements.coverValue) {
      this.elements.coverValue.setText(`${gameState.cover.credibility}%`);
      const color = gameState.cover.credibility > 60 ? '#4a4' : 
                     (gameState.cover.credibility > 30 ? '#ca4' : '#c44');
      this.elements.coverValue.setColor(color);
    }

    // Update location
    this.elements.locationText.setText((gameState.player.currentDistrict || '').toUpperCase());
  }

  show() {
    this.container.setVisible(true);
    this.visible = true;
  }

  hide() {
    this.container.setVisible(false);
    this.visible = false;
  }

  addObjective(text) {
    if (this.elements.objective) {
      this.elements.objective.destroy();
    }
    this.elements.objective = this.scene.add.text(15, 50, `> ${text}`, {
      fontSize: '11px',
      color: '#c9a84c',
      fontFamily: 'monospace'
    });
    this.container.add(this.elements.objective);
  }

  clearObjective() {
    if (this.elements.objective) {
      this.elements.objective.destroy();
      this.elements.objective = null;
    }
  }

  destroy() {
    this.container.destroy();
  }
}
