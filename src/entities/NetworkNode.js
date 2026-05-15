export default class NetworkNode {
  constructor(scene, data) {
    this.scene = scene;
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.nameZh = data.nameZh || data.name;
    this.role = data.role;
    this.influence = data.influence || 50;
    this.suspicion = data.suspicion || 0;
    this.corruption = data.corruption || 0;
    this.status = data.status || 'active';
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.discovered = data.discovered || false;
    
    this.visual = null;
  }

  createVisual(container) {
    if (!this.discovered) return;
    
    const color = this.getTypeColor();
    const size = 6 + (this.influence / 100) * 8;
    
    this.visual = this.scene.add.container(this.x, this.y);
    
    const circle = this.scene.add.circle(0, 0, size, color);
    circle.setStrokeStyle(1, 0xffffff, 0.6);
    
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const name = settings.language === 'zh' ? this.nameZh : this.name;
    
    const label = this.scene.add.text(0, size + 4, name, {
      fontSize: '9px',
      color: '#aaa',
      fontFamily: 'system-ui, sans-serif'
    }).setOrigin(0.5, 0);
    
    this.visual.add([circle, label]);
    
    if (this.status !== 'active') {
      // Gray out inactive nodes
      circle.setFillStyle(0x555);
      circle.setAlpha(0.5);
    }
    
    if (container) {
      container.add(this.visual);
    }
  }

  getTypeColor() {
    const colors = {
      officer: 0x48a,
      triad: 0xc44,
      business: 0xca4,
      official: 0xa4a,
      icac: 0x4a4,
      informant: 0x8a8
    };
    return colors[this.type] || 0x888;
  }

  updateVisual() {
    if (this.visual) {
      this.visual.x = this.x;
      this.visual.y = this.y;
      
      if (this.status !== 'active') {
        this.visual.setAlpha(0.4);
      }
    }
  }

  destroy() {
    if (this.visual) {
      this.visual.destroy();
      this.visual = null;
    }
  }
}
