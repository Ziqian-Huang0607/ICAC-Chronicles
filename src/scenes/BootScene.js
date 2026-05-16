// Shared state initializer — called by BootScene on first load and by MenuScene on New Game
ICAC.initState = function() {
  ICAC.state = {
    player: {
      name: '', rankIdx: 0,
      rank: ICAC.ranks[0],
      district: 'north_point',
      xp: 0,
      coverNetwork: null
    },
    money: 100, // Real money system — starts with $100
    lifestyle: 'modest', // Housing: modest/comfortable/luxury/extravagant
    day: { current: 1, ap: 3, actionsTaken: [], weekDay: 1 },
    cover: { active: false, credibility: 0, networkId: null },
    progress: {
      phase: 1,
      completed: [],
      available: ['tutorial'],
      debriefPending: false
    },
    flags: {},
    relations: {},
    // New gameplay systems
    schemes: [],
    completedSchemes: [],
    intel: {},
    opportunities: [],
    caseFiles: {},
    trainingProgress: 0,
    ownedAssets: [],
    assets: {
      north_point: { controlLevel: 10, businesses: [] }
    },
    bribes: [],
    patrolLog: {},
    networkLog: {},
    completedSubMissions: [],
    activeSubMissions: [],
    exposure: 0,
    activeShortcuts: [],
    completedShortcuts: [],
    stats: { integrity: 60, trust: 50, credibility: 50, psych: 70, actionsTotal: 0 },
    network: {
      icac: [
        { name: '黄Sir', nameEn: 'Sir Wong', role: 'ICAC导师', roleEn: 'ICAC Mentor', rel: 45 },
        { name: '陈调查员', nameEn: 'Investigator Chan', role: '案件搭档', roleEn: 'Case Partner', rel: 30 }
      ],
      triad: [
        { name: '蛇哥', nameEn: 'Brother Snake', role: '和胜和坐馆', roleEn: 'Wo Shing Wo Boss', rel: 25 },
        { name: '阿坤', nameEn: 'Ah Kwan', role: '马仔', roleEn: 'Foot Soldier', rel: 15 }
      ],
      police: [
        { name: '刘警司', nameEn: 'Superintendent Lau', role: '直属上司', roleEn: 'Direct Superior', rel: 40 },
        { name: '张督察', nameEn: 'Inspector Cheung', role: '同僚', roleEn: 'Colleague', rel: 20 }
      ]
    },
    history: []
  };
};

var BootScene = new Phaser.Class({
  Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'BootScene' }); },

  create: function() {
    // Initialize ICAC.state on first boot only
    if (!ICAC.state) {
      ICAC.initState();
    }
    // Ensure tutorial is available for first-time players
    var completed = ICAC.state.progress.completed || [];
    if (completed.indexOf('tutorial') === -1 && completed.indexOf('first_tea_money') === -1) {
      ICAC.state.progress.available = ['tutorial'];
    }

    this.scene.start('PreloadScene');
  }
});
