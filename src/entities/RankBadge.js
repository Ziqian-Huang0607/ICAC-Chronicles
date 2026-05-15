import { RANKS } from '../config/constants.js';

export default class RankBadge {
  constructor(scene, x, y, rankIndex, size = 'medium') {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.rankIndex = rankIndex;
    this.size = size;
    this.rank = RANKS[rankIndex] || RANKS[0];
    
    this.graphics = scene.add.graphics();
    this.draw();
  }

  draw() {
    this.graphics.clear();
    
    const scale = this.size === 'large' ? 2 : (this.size === 'small' ? 0.6 : 1);
    const cx = this.x;
    const cy = this.y;
    const color = 0xc9a84c;
    
    // Badge background
    this.graphics.fillStyle(0x1a1a2e, 0.9);
    this.graphics.fillCircle(cx, cy, 20 * scale);
    this.graphics.lineStyle(2 * scale, color, 0.8);
    this.graphics.strokeCircle(cx, cy, 20 * scale);
    
    // Draw rank insignia based on rank
    this.drawInsignia(cx, cy, this.rankIndex, scale, color);
    
    // Rank label
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const code = this.rank.code;
    
    this.label = this.scene.add.text(cx, cy + 28 * scale, code, {
      fontSize: `${10 * scale}px`,
      color: '#c9a84c',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0.5);
  }

  drawInsignia(cx, cy, rankIndex, scale, color) {
    // Procedural insignia based on rank
    const chevronCount = Math.min(3, Math.floor(rankIndex / 2) + 1);
    const hasPip = rankIndex >= 4;
    const hasCrown = rankIndex >= 7;
    const hasBaton = rankIndex >= 11;
    
    let yOffset = cy - (chevronCount - 1) * 4 * scale;
    
    // Chevrons (pointing up)
    this.graphics.fillStyle(color, 0.9);
    for (let i = 0; i < chevronCount; i++) {
      const y = yOffset + i * 8 * scale;
      const w = 8 * scale;
      const h = 4 * scale;
      
      this.graphics.fillTriangle(
        cx, y - h,
        cx - w, y + h,
        cx + w, y + h
      );
    }
    
    // Pip (dot above chevrons)
    if (hasPip) {
      this.graphics.fillStyle(0xffffff, 0.9);
      const pipY = cy - 14 * scale;
      this.graphics.fillCircle(cx, pipY, 2.5 * scale);
    }
    
    // Crown (for senior officers)
    if (hasCrown) {
      this.graphics.fillStyle(color, 0.9);
      const crownY = cy - 10 * scale;
      // Simple crown shape
      this.graphics.fillTriangle(cx - 6 * scale, crownY, cx, crownY - 6 * scale, cx + 6 * scale, crownY);
      this.graphics.fillRect(cx - 6 * scale, crownY, 12 * scale, 3 * scale);
    }
    
    // Baton (for very senior)
    if (hasBaton) {
      this.graphics.fillStyle(color, 0.9);
      this.graphics.fillRect(cx - 10 * scale, cy + 2 * scale, 20 * scale, 3 * scale);
    }
  }

  setRank(rankIndex) {
    this.rankIndex = rankIndex;
    this.rank = RANKS[rankIndex] || RANKS[0];
    if (this.label) this.label.destroy();
    this.draw();
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    if (this.label) this.label.destroy();
    this.draw();
  }

  destroy() {
    this.graphics.clear();
    if (this.label) this.label.destroy();
  }
}
