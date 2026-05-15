export default class MapOverlay {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.visible = false;
    this.container.setDepth(1400);
    this.container.setVisible(false);
  }

  create(districts) {
    const { width, height } = this.scene.scale;
    const miniMapSize = 150;
    const padding = 15;
    const x = width - miniMapSize - padding;
    const y = height - miniMapSize - padding - 50;

    this.container.removeAll(true);

    // Background
    const bg = this.scene.add.rectangle(x + miniMapSize / 2, y + miniMapSize / 2, miniMapSize, miniMapSize, 0x0a0a0f, 0.85);
    bg.setStrokeStyle(1, 0x333);
    this.container.add(bg);

    // District dots
    if (districts) {
      districts.forEach(d => {
        if (!d.unlocked) return;
        
        const mx = x + (d.x / 1280) * miniMapSize;
        const my = y + (d.y / 720) * miniMapSize;
        const corruptionColor = d.corruptionLevel > 70 ? 0xc44 : (d.corruptionLevel > 40 ? 0xca4 : 0x4a4);
        
        const dot = this.scene.add.circle(mx, my, 4, corruptionColor);
        this.container.add(dot);
      });
    }

    // Player dot
    const gameState = this.scene.registry.get('gameState');
    if (gameState?.player) {
      // Find current district position or use player position
      const currentDist = districts?.find(d => d.id === gameState.player.currentDistrict);
      if (currentDist) {
        const px = x + (currentDist.x / 1280) * miniMapSize;
        const py = y + (currentDist.y / 720) * miniMapSize;
        const playerDot = this.scene.add.circle(px, py, 4, 0xc9a84c);
        playerDot.setStrokeStyle(1, 0xffffff);
        this.container.add(playerDot);
        
        // Pulse animation
        this.scene.tweens.add({
          targets: playerDot,
          scaleX: 1.5,
          scaleY: 1.5,
          alpha: 0.5,
          duration: 1000,
          yoyo: true,
          repeat: -1
        });
      }
    }

    // Label
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const label = this.scene.add.text(x + miniMapSize / 2, y - 8, 
      settings.language === 'zh' ? '地图' : 'MAP', {
      fontSize: '9px',
      color: '#555',
      fontFamily: 'monospace'
    }).setOrigin(0.5, 0.5);
    this.container.add(label);
  }

  show() {
    this.container.setVisible(true);
    this.visible = true;
  }

  hide() {
    this.container.setVisible(false);
    this.visible = false;
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  destroy() {
    this.container.destroy();
  }
}
