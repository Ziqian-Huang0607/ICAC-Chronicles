// CorruptionSystem — Special promotion shortcuts for corrupted officers
// Normal path: grind days, training, assets. Corrupt path: do dirty work, bypass rules.
// Each shortcut is a multi-step mini-mission with heavy integrity cost and exposure risk.
// If exposure hits 100% → Game Over (arrested)

ICAC.CorruptionSystem = {

  // ── EXPOSURE ──
  // Each corrupt act increases exposure. At 100% → arrested.
  // Can be reduced by: cover schemes, bribes to ICAC, having powerful protectors
  getExposure: function() {
    return ICAC.state.exposure || 0;
  },

  addExposure: function(amount) {
    var s = ICAC.state;
    s.exposure = Math.min(100, (s.exposure || 0) + amount);
    if (s.exposure >= 100) {
      // Trigger arrest game over
      return { arrested: true };
    }
    return { exposure: s.exposure };
  },

  reduceExposure: function(amount) {
    var s = ICAC.state;
    s.exposure = Math.max(0, (s.exposure || 0) - amount);
    return { exposure: s.exposure };
  },

  // ── SHORTCUT DEFINITIONS ──
  // Each shortcut bypasses normal promotion requirements for a specific rank jump
  shortcuts: [
    {
      id: 'bribe_sergeant',
      name: '\u884c\u8d3c\u4e70\u5b98',
      nameEn: 'Buy Your Stripes',
      desc: '\u7528$200\u8d3f\u8d42\u8001\u8b66\u957f\uff0c\u8ba9\u4ed6\u5728\u5347\u804c\u63a8\u8350\u4e0a\u5199\u4f60\u7684\u540d\u5b57',
      descEn: 'Bribe a senior sergeant to put your name on the promotion list',
      fromRank: 0, toRank: 1, // PC → WSP
      cost: 200,
      steps: [
        { name: '\u63a5\u89e6\u8001\u8b66\u957f', desc: '\u627e\u5230\u613f\u610f\u6536\u94b1\u7684\u8001\u8b66\u957f', risk: 10 },
        { name: '\u9001\u793c', desc: '\u5728\u798f\u8bb0\u5305\u4e00\u4e2a$200\u7ea2\u5305\u7ed9\u4ed6', risk: 15 },
        { name: '\u7b49\u5f85\u5347\u804c\u540d\u5355', desc: '\u4e00\u5468\u540e\u4f60\u7684\u540d\u5b57\u51fa\u73b0\u5728\u540d\u5355\u4e0a', risk: 5 }
      ],
      integrityCost: 15,
      exposureGain: 12,
      npc: 'officer_keung',
      flag: 'bribed_for_wsp'
    },
    {
      id: 'triad_promotion',
      name: '\u9ed1\u9053\u4fdd\u9a7e\u62a4\u822a',
      nameEn: 'Triad Escort',
      desc: '\u5e2e\u86c7\u7237\u62a4\u9001\u4e00\u6279\u8d27\u7269\u8fc7\u6d77\u5173\uff0c\u4ed6\u4fdd\u4f60\u5347\u5e2b\u957f',
      descEn: 'Escort triad goods past customs for Sergeant rank',
      fromRank: 1, toRank: 2, // WSP → SGT
      cost: 0,
      steps: [
        { name: '\u5bc6\u4f1a\u86c7\u7237', desc: '\u5728\u57ce\u5be8\u5916\u56f4\u89c1\u86c7\u7237', risk: 15 },
        { name: '\u591c\u95f4\u62a4\u9001', desc: '\u5f00\u8b66\u8f66\u5f15\u5bfc\u8d27\u8f66\u8d70\u6e2f\u82f1\u9053', risk: 25 },
        { name: '\u53d6\u5f97\u4fe1\u4efb', desc: '\u86c7\u7237\u5411\u8b66\u53f8\u63a8\u8350\u4f60', risk: 10 }
      ],
      integrityCost: 20,
      exposureGain: 18,
      npc: 'brother_snake',
      flag: 'triad_escort_sgt'
    },
    {
      id: 'gambling_den',
      name: '\u8d4c\u573a\u5e72\u80a1',
      nameEn: 'Silent Partner',
      desc: '\u6295\u8d44$500\u5f00\u4e00\u5bb6\u5730\u4e0b\u8d4c\u573a\uff0c\u8ba9\u4e0a\u7ea7\u5206\u7ea2',
      descEn: 'Open underground gambling den, share profits with superiors',
      fromRank: 2, toRank: 4, // SGT → SSGT (skip SSGT_MAJ)
      cost: 500,
      steps: [
        { name: '\u627e\u573a\u5b50', desc: '\u5728\u5317\u89d2\u79df\u4e00\u4e2a\u5730\u4e0b\u5ba4', risk: 10 },
        { name: '\u62c9\u4e0a\u7ea7\u5165\u80a1', desc: '\u8bf4\u670d\u5f20Sir\u6295\u8d44$300\u5360\u4e09\u6210\u5e72\u80a1', risk: 20 },
        { name: '\u5f00\u5f20', desc: '\u9ebb\u5c06\u9986\u6b63\u5f0f\u8fd0\u8425\uff0c\u4e0a\u7ea7\u5206\u7ea2', risk: 15 }
      ],
      integrityCost: 25,
      exposureGain: 20,
      npc: 'zhang_sir',
      flag: 'gambling_partner'
    },
    {
      id: 'frame_rival',
      name: '\u8e29\u7740\u5bf9\u624b\u4e0a\u4f4d',
      nameEn: 'Step on Your Rival',
      desc: '\u7ed9\u7ade\u4e89\u5bf9\u624b\u4e0b\u5957\uff0c\u8ba9\u4ed6\u88ab\u8c03\u5f80\u65b0\u754c',
      descEn: 'Frame your rival inspector, get him transferred to New Territories',
      fromRank: 4, toRank: 5, // SSGT_MAJ → Insp
      cost: 300,
      steps: [
        { name: '\u6536\u96c6\u9ed1\u6750\u6599', desc: '\u8ddf\u8e2a\u5bf9\u624b\uff0c\u62cd\u4e0b\u4ed6\u548c\u53e4\u60d1\u4ed4\u5403\u8336\u7684\u7167\u7247', risk: 15 },
        { name: '\u4f2a\u9020\u8bc1\u636e', desc: '\u5728\u4ed6\u529e\u516c\u684c\u91cc\u653e\u4e00\u4e2a\u88c5\u6709$500\u7684\u4fe1\u5c01', risk: 20 },
        { name: '\u5411ICAC\u4e3e\u62a5', desc: '\u7528\u533f\u540d\u4fe1\u5411ICAC\u4e3e\u62a5', risk: 15 },
        { name: '\u7b49\u5f85\u8c03\u4efb', desc: '\u4e00\u5468\u540e\u5bf9\u624b\u88ab\u8c03\u5f80\u65b0\u754c\u5b88\u6c34\u5858', risk: 5 }
      ],
      integrityCost: 30,
      exposureGain: 22,
      npc: 'rival_officer',
      flag: 'framed_rival_insp'
    },
    {
      id: 'hsueh_bribe',
      name: '\u8d70\u540e\u95e8',
      nameEn: 'Backdoor Deal',
      desc: '\u901a\u8fc7\u859b\u592a\u592a\u7ed9\u859b\u56fd\u680b\u9001$5000',
      descEn: 'Bribe Commissioner Hsueh through his wife',
      fromRank: 5, toRank: 7, // Insp → Sr_Insp (skip)
      cost: 5000,
      steps: [
        { name: '\u63a5\u8fd1\u859b\u592a\u592a', desc: '\u901a\u8fc7\u8d4d\u573a\u8ba4\u8bc6\u859b\u592a\u592a', risk: 20 },
        { name: '\u9001\u793c', desc: '\u5728\u5979\u751f\u65e5\u9001\u4e00\u6761$3000\u7684\u73cd\u73e0\u9879\u94fe', risk: 25 },
        { name: '\u63d0\u51fa\u8bf7\u6c42', desc: '\u8bf7\u5979\u5728\u859b\u56fd\u680b\u9762\u524d\u63d0\u4f60\u7684\u540d\u5b57', risk: 15 },
        { name: '\u7b49\u5f85\u4efb\u547d', desc: '\u5347\u804c\u4ee4\u4e0b\u6765\u4e86', risk: 10 }
      ],
      integrityCost: 35,
      exposureGain: 28,
      npc: 'hsueh_wife',
      flag: 'hsueh_bribe_sr_insp'
    },
    {
      id: 'election_rigging',
      name: '\u64cd\u63a7\u9009\u4e3e',
      nameEn: 'Rig the Election',
      desc: '\u63a7\u5236\u5317\u89d2\u5730\u533a\u8bae\u5458\u9009\u4e3e\uff0c\u6362\u53d6\u5e2e\u529e\u5347\u804c',
      descEn: 'Rig district council election, trade for promotion support',
      fromRank: 7, toRank: 10, // Sr_Insp → SP (big jump)
      cost: 8000,
      steps: [
        { name: '\u6536\u4e70\u5019\u9009\u4eba', desc: '\u627e\u4e00\u4e2a\u80fd\u8d62\u7684\u5019\u9009\u4eba\uff0c\u63d0\u4f9b$5000\u7ade\u9009\u8d44\u91d1', risk: 20 },
        { name: '\u5a01\u80c1\u5bf9\u624b', desc: '\u8ba9\u5c0f\u5149\u7684\u4eba\u53bb\u201c\u8c08\u8c08”\u5bf9\u624b\u9000\u9009', risk: 30 },
        { name: '\u8ddf\u5e2e\u529e\u4ea4\u6613', desc: '\u5e2e\u5f20Sir\u8d62\u5f97\u8bae\u5e2d\uff0c\u4ed6\u5e2e\u4f60\u5347\u804c', risk: 15 },
        { name: '\u7b49\u5f85\u7ed3\u679c', desc: '\u9009\u4e3e\u7ed3\u675f\uff0c\u4f60\u7684\u540d\u5b57\u51fa\u73b0\u5728\u5347\u804c\u540d\u5355', risk: 10 }
      ],
      integrityCost: 40,
      exposureGain: 30,
      npc: 'boss_fat',
      flag: 'rigged_election_sp'
    },
    {
      id: 'mutiny_leadership',
      name: '\u5175\u53d8\u82f1\u96c4',
      nameEn: 'Mutiny Hero',
      desc: '\u57281977\u5e74\u5927\u5175\u53d8\u4e2d\u5e26\u5934\u51b2\u8fdbICAC\uff0c\u6210\u4e3a\u8b66\u961f\u82f1\u96c4',
      descEn: 'Lead the 1977 mutiny charge, become police hero',
      fromRank: 10, toRank: 13, // SP → CP (massive jump)
      cost: 0,
      steps: [
        { name: '\u53d1\u52a8\u4eba\u7fa4', desc: '\u5728\u906e\u6253\u82b1\u56ed\u53d1\u8868\u6f14\u8bf4\uff0c\u70b9\u71c3\u6012\u706b', risk: 40 },
        { name: '\u7387\u9886\u51b2\u51fb', desc: '\u5e26\u5934\u51b2\u8fdbICAC\u603b\u90e8', risk: 50 },
        { name: '\u201c\u8425\u6551\u201d\u8c03\u67e5\u5458', desc: '\u5728\u66b4\u529b\u4e2d\u201c\u6551\u201d\u51fa\u4e00\u4e2aICAC\u8c03\u67e5\u5458\uff08\u5b9e\u9645\u4e0a\u662f\u4f60\u7684\u5185\u5e94\uff09', risk: 35 },
        { name: '\u7b49\u5f85\u7279\u8d66', desc: '\u7279\u8d66\u4ee4\u4e0b\u8fbe\uff0c\u4f60\u6210\u4e3a\u8b66\u961f\u82f1\u96c4', risk: 20 }
      ],
      integrityCost: 50,
      exposureGain: 35,
      npc: 'mutiny_crowd',
      flag: 'mutiny_hero_cp'
    }
  ],

  // ── GET AVAILABLE SHORTCUTS ──
  getAvailable: function() {
    var s = ICAC.state;
    var currentRank = s.player.rankIdx || 0;
    var shortcuts = [];

    for (var i = 0; i < this.shortcuts.length; i++) {
      var sc = this.shortcuts[i];
      // Must be at or above fromRank
      if (currentRank >= sc.fromRank && currentRank < sc.toRank) {
        // Check if already completed
        if (s.completedShortcuts && s.completedShortcuts.indexOf(sc.id) !== -1) continue;
        // Check if already active
        if (s.activeShortcuts && s.activeShortcuts.find(function(a) { return a.id === sc.id; })) continue;

        shortcuts.push({
          id: sc.id,
          name: sc.name,
          desc: sc.desc,
          fromRank: sc.fromRank,
          toRank: sc.toRank,
          targetRank: ICAC.ranks[sc.toRank] ? ICAC.ranks[sc.toRank].code : 'MAX',
          cost: sc.cost,
          steps: sc.steps.length,
          integrityCost: sc.integrityCost,
          exposureGain: sc.exposureGain,
          npc: sc.npc,
          canAfford: (s.money || 0) >= sc.cost
        });
      }
    }

    return shortcuts;
  },

  // ── START SHORTCUT ──
  start: function(shortcutId) {
    var s = ICAC.state;
    var def = null;
    for (var i = 0; i < this.shortcuts.length; i++) {
      if (this.shortcuts[i].id === shortcutId) { def = this.shortcuts[i]; break; }
    }
    if (!def) return { success: false, reason: 'not_found' };
    if ((s.money || 0) < def.cost) return { success: false, reason: 'not_enough_money' };

    // Deduct cost
    ICAC.PropertySystem.spendMoney(def.cost);

    // Create active shortcut
    var active = {
      id: def.id,
      name: def.name,
      def: def,
      currentStep: 0,
      status: 'active',
      started: s.day ? s.day.current : 1
    };

    if (!s.activeShortcuts) s.activeShortcuts = [];
    s.activeShortcuts.push(active);

    return { success: true, shortcut: active, firstStep: def.steps[0] };
  },

  // ── ADVANCE SHORTCUT STEP ──
  advance: function(shortcutId) {
    var s = ICAC.state;
    var active = null;
    for (var i = 0; i < (s.activeShortcuts || []).length; i++) {
      if (s.activeShortcuts[i].id === shortcutId) { active = s.activeShortcuts[i]; break; }
    }
    if (!active) return { success: false, reason: 'not_active' };

    var def = active.def;
    var step = def.steps[active.currentStep];
    if (!step) return { success: false, reason: 'no_step' };

    // Check AP
    if ((s.day.ap || 0) < 2) return { success: false, reason: 'not_enough_ap' };
    s.day.ap -= 2;

    // Roll for success (corrupt actions are riskier)
    var roll = Math.random() * 100;
    var protection = 0;
    // Powerful protectors reduce risk
    if ((s.relations || {}).brother_snake >= 30) protection += 10;
    if ((s.relations || {}).boss_fat >= 40) protection += 10;
    if ((s.relations || {}).sgt_lam >= 30) protection += 5;
    var successChance = 60 + protection;
    var success = roll <= successChance;

    active.currentStep++;

    // Add exposure regardless
    var exposureResult = this.addExposure(step.risk);

    var result = {
      success: true,
      step: step,
      passed: success,
      roll: Math.floor(roll),
      threshold: successChance,
      exposure: exposureResult.exposure,
      remainingSteps: def.steps.length - active.currentStep
    };

    if (exposureResult.arrested) {
      result.arrested = true;
      active.status = 'failed';
      return result;
    }

    // If all steps complete
    if (active.currentStep >= def.steps.length) {
      active.status = 'complete';

      // Apply effects
      s.stats.integrity = Math.max(0, (s.stats.integrity || 0) - def.integrityCost);

      // PROMOTE directly
      s.player.rankIdx = def.toRank;
      s.player.rank = ICAC.ranks[def.toRank];

      // Remove from active
      if (!s.completedShortcuts) s.completedShortcuts = [];
      s.completedShortcuts.push(shortcutId);
      s.activeShortcuts = (s.activeShortcuts || []).filter(function(a) { return a.id !== shortcutId; });

      // Set flag
      if (def.flag) s.flags[def.flag] = true;

      // Boost trust from corrupt allies
      if (!s.relations) s.relations = {};
      if (def.npc) s.relations[def.npc] = (s.relations[def.npc] || 0) + 20;

      result.complete = true;
      result.newRank = s.player.rank.code;
      result.newRankIdx = def.toRank;
    }

    return result;
  },

  // ── GET ACTIVE SHORTCUTS ──
  getActive: function() {
    return ICAC.state.activeShortcuts || [];
  },

  // ── EXPOSURE PROTECTION ──
  getProtectionSources: function() {
    var s = ICAC.state;
    var sources = [];
    if ((s.relations || {}).brother_snake >= 30) sources.push({ name: '蛇爷', bonus: 10 });
    if ((s.relations || {}).boss_fat >= 40) sources.push({ name: '肥佬', bonus: 10 });
    if ((s.relations || {}).sgt_lam >= 30) sources.push({ name: '林警长', bonus: 5 });
    if ((s.relations || {}).zhang_sir >= 50) sources.push({ name: '张Sir', bonus: 8 });
    return sources;
  },

  // ── INIT ──
  init: function() {
    var s = ICAC.state;
    if (!s.exposure) s.exposure = 0;
    if (!s.activeShortcuts) s.activeShortcuts = [];
    if (!s.completedShortcuts) s.completedShortcuts = [];
  }
};
