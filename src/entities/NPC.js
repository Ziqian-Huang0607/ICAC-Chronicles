export default class NPC {
  constructor(scene, data) {
    this.scene = scene;
    this.id = data.id;
    this.name = data.name;
    this.nameZh = data.nameZh;
    this.role = data.role;
    this.roleZh = data.roleZh;
    this.x = data.x;
    this.y = data.y;
    this.faction = data.faction || 'neutral';
    this.relationship = data.relationship || 0;
    this.dialogue = data.dialogue || {};
    
    this.createVisual();
  }

  createVisual() {
    const color = this.getFactionColor();
    
    this.sprite = this.scene.add.circle(this.x, this.y, 8, color);
    this.sprite.setStrokeStyle(1, 0xffffff, 0.5);
    
    // Name label
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const label = settings.language === 'zh' ? this.nameZh : this.name;
    
    this.label = this.scene.add.text(this.x, this.y - 16, label, {
      fontSize: '10px',
      color: '#aaa',
      fontFamily: 'system-ui, sans-serif'
    }).setOrigin(0.5, 0.5);

    this.sprite.setInteractive({ useHandCursor: true });
    this.sprite.on('pointerdown', () => this.onInteract());
  }

  getFactionColor() {
    const colors = {
      neutral: 0x888,
      police: 0x48a,
      icac: 0x4a4,
      triad: 0xc44,
      corrupt: 0xca4,
      politician: 0xa4a
    };
    return colors[this.faction] || 0x888;
  }

  onInteract() {
    this.scene.events.emit('npc-interact', { npc: this });
  }

  getDialogue(key) {
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const lang = settings.language;
    
    if (this.dialogue[key]) {
      return this.dialogue[key][lang] || this.dialogue[key].en || this.dialogue[key];
    }
    return lang === 'zh' ? '...' : '...';
  }

  updateRelationship(delta) {
    this.relationship = Math.max(-100, Math.min(100, this.relationship + delta));
    this.updateVisual();
  }

  updateVisual() {
    if (this.relationship < -50) {
      this.sprite.setStrokeStyle(2, 0xc44);
    } else if (this.relationship > 50) {
      this.sprite.setStrokeStyle(2, 0x4a4);
    } else {
      this.sprite.setStrokeStyle(1, 0xffffff, 0.5);
    }
  }

  destroy() {
    this.sprite.destroy();
    this.label.destroy();
  }
}
