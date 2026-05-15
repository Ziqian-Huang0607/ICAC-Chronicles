const GAME_CONFIG = {
  // Game metadata
  title: 'ICAC Chronicles',
  titleZh: '廉政行动',
  version: '1.0.0',
  
  // Phaser config
  width: 1280,
  height: 720,
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#0a0a0f',
  
  // Scale settings
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: { width: 320, height: 480 },
    max: { width: 1920, height: 1080 }
  },
  
  // Physics
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  
  // Rendering
  render: {
    pixelArt: false,
    antialias: true
  },
  
  // Audio
  audio: {
    disableWebAudio: false
  },
  
  // Mobile detection
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  
  // Game settings
  playerSpeed: 200,
  playerSpeedMobile: 160,
  
  // Save settings
  autoSaveInterval: 30000, // 30 seconds
  maxSaveSlots: 3,
  
  // Cover system
  coverDecayRate: 0.5, // per mission
  coverRiskThreshold: 75,
  
  // Network
  networkUpdateInterval: 5000,
  
  // Colors
  colors: {
    primary: '#c9a84c',
    primaryDark: '#8b7355',
    secondary: '#1a1a2e',
    background: '#0a0a0f',
    surface: '#12121f',
    text: '#e8e6e1',
    textMuted: '#888',
    danger: '#c44',
    success: '#4a4',
    warning: '#ca4',
    info: '#48a',
    corrupt: '#8b4049',
    icac: '#2a5a4a'
  },
  
  // Difficulty presets
  difficulties: {
    easy: { coverDecay: 0.3, riskThreshold: 85, saveSlots: 5 },
    normal: { coverDecay: 0.5, riskThreshold: 75, saveSlots: 3 },
    hard: { coverDecay: 0.8, riskThreshold: 65, saveSlots: 2 },
    ironman: { coverDecay: 1.0, riskThreshold: 60, saveSlots: 1 }
  }
};

export default GAME_CONFIG;
