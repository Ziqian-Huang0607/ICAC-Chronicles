export default class StatPanel {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.visible = false;
    this.container.setDepth(1500);
    this.container.setVisible(false);
  }

  show() {
    const { width, height } = this.scene.scale;
    const settings = this.scene.registry.get('settings') || { language: 'zh' };
    const lang = settings.language;
    const t = (zh, en) => lang === 'zh' ? zh : en;
    const gameState = this.scene.registry.get('gameState');

    this.clear();

    // Background
    const panelW = 300;
    const panelH = 380;
    const panelX = width - panelW / 2 - 10;
    const panelY = height / 2;

    const bg = this.scene.add.rectangle(panelX, panelY, panelW, panelH, 0x0a0a0f, 0.95);
    bg.setStrokeStyle(1, 0x333);
    this.container.add(bg);

    // Title
    const title = this.scene.add.text(panelX, panelY - panelH / 2 + 25, t('状态', 'Status'), {
      fontSize: '18px',
      color: '#c9a84c',
      fontFamily: '"PingFang SC", sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0.5);
    this.container.add(title);

    // Stats
    const stats = gameState?.stats || {};
    const statList = [
      { key: 'integrity', label: t('正直', 'Integrity'), value: stats.integrity || 0, color: '#4a4' },
      { key: 'publicTrust', label: t('公众信任', 'Public Trust'), value: stats.publicTrust || 0, color: '#48a' },
      { key: 'credibility', label: t('可信度', 'Credibility'), value: stats.credibility || 0, color: '#8a8' },
      { key: 'money', label: t('金钱', 'Money'), value: (window.gameState?.money || 0), color: '#ca4' },
      { key: 'risk', label: t('风险', 'Risk'), value: stats.risk || 0, color: '#c44' },
      { key: 'psychological', label: t('心理状态', 'Mental State'), value: stats.psychological || 100, color: '#a4a' }
    ];

    const barW = 200;
    const startY = panelY - panelH / 2 + 65;
    const gap = 45;

    statList.forEach((stat, i) => {
      const y = startY + i * gap;
      
      // Label
      const label = this.scene.add.text(panelX - panelW / 2 + 20, y, stat.label, {
        fontSize: '12px',
        color: '#888',
        fontFamily: 'system-ui'
      });
      this.container.add(label);

      // Value
      const valueText = this.scene.add.text(panelX + panelW / 2 - 20, y, `${stat.value}`, {
        fontSize: '12px',
        color: stat.color,
        fontFamily: 'monospace'
      }).setOrigin(1, 0);
      this.container.add(valueText);

      // Bar background
      const barBg = this.scene.add.rectangle(panelX, y + 18, barW, 6, 0x1a1a2e);
      this.container.add(barBg);

      // Bar fill
      const fillW = (stat.value / 100) * barW;
      const colorVal = parseInt(stat.color.replace('#', '0x'));
      const barFill = this.scene.add.rectangle(panelX - barW / 2 + fillW / 2, y + 18, fillW, 6, colorVal);
      this.container.add(barFill);
    });

    // Cover status (if active)
    if (gameState?.cover?.active) {
      const coverY = startY + statList.length * gap + 10;
      const coverState = gameState.cover.psychologicalState;
      const stateColors = {
        steady: '#4a4', tense: '#ca4', stressed: '#c44', traumatized: '#a4a'
      };
      
      const coverLabel = this.scene.add.text(panelX, coverY, t('掩护状态', 'Cover Status'), {
        fontSize: '12px',
        color: '#888',
        fontFamily: 'system-ui'
      }).setOrigin(0.5, 0.5);
      this.container.add(coverLabel);

      const coverStateText = this.scene.add.text(panelX, coverY + 20, 
        t(coverState, coverState), {
        fontSize: '14px',
        color: stateColors[coverState] || '#888',
        fontFamily: '"PingFang SC", sans-serif',
        fontStyle: 'bold'
      }).setOrigin(0.5, 0.5);
      this.container.add(coverStateText);
    }

    // Close on click outside
    bg.setInteractive();
    bg.on('pointerdown', () => this.hide());

    this.container.setVisible(true);
    this.visible = true;
  }

  hide() {
    this.container.setVisible(false);
    this.visible = false;
    this.clear();
  }

  clear() {
    this.container.removeAll(true);
  }

  toggle() {
    if (this.visible) this.hide();
    else this.show();
  }

  destroy() {
    this.clear();
    this.container.destroy();
  }
}
