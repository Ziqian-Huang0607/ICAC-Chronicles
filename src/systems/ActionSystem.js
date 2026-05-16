// ActionSystem - Daily decision cycle (Tropico/Papers Please style)
// Player has action points per day. Every action consumes AP and advances time.
// Core principle: 玩家自己做决定，而不是被告诉"你做了这个"

ICAC.ActionSystem = {

  // Daily action points by rank
  getActionPoints: function() {
    var rankIdx = ICAC.state.player.rankIdx || 0;
    return 3 + Math.floor(rankIdx / 3); // PC=3, SGT=4, Insp=5, ASP=6, CP=7
  },

  // Available daily actions
  getAvailableActions: function() {
    var s = ICAC.state, p = s.progress;
    var actions = [];
    var rankIdx = s.player.rankIdx || 0;
    var phase = p.phase || 1;

    // ── PATROL (always available) ──
    // 巡逻 - gather intel on district, find opportunities, build presence
    actions.push({
      id: 'patrol', label: '\u5de1\u903b', labelEn: 'Patrol',
      desc: '\u5728\u8857\u533a\u5de1\u903b\uff0c\u6536\u96c6\u60c5\u62a5\uff0c\u5efa\u7acb\u5a01\u4fe1',
      descEn: 'Patrol streets, gather intel, build presence',
      cost: 1, icon: '\ud83d\ude94',
      available: true,
      effect: function() { return ICAC.ActionSystem.doPatrol(); }
    });

    // ── SCHEME (Phase 2+, need target) ──
    // 做局 - plan and execute multi-step traps
    if (phase >= 2) {
      var activeSchemes = ICAC.ActionSystem.getActiveSchemes();
      actions.push({
        id: 'scheme', label: '\u505a\u5c40', labelEn: 'Scheme',
        desc: activeSchemes.length > 0
          ? '\u7ee7\u7eed\u8fdb\u884c\u4e2d\u7684\u505a\u5c40 (' + activeSchemes.length + '\u4e2a)'
          : '\u7b56\u5212\u9677\u9631\uff0c\u79fb\u9664\u969c\u788d',
        descEn: activeSchemes.length > 0 ? 'Continue active schemes (' + activeSchemes.length + ')' : 'Plan traps to remove obstacles',
        cost: 2, icon: '\u265f',
        available: true,
        effect: function() { return ICAC.ActionSystem.doScheme(); }
      });
    }

    // ── NETWORK (Phase 2+) ──
    // Networking - build relationships, recruit allies
    if (phase >= 2) {
      actions.push({
        id: 'network', label: '\u7ed3\u7f51', labelEn: 'Network',
        desc: '\u7ea6\u89c1NPC\uff0c\u62c9\u62ec\u5173\u7cfb\uff0c\u53d1\u5c55\u7ebf\u4eba',
        descEn: 'Meet NPCs, build relationships, recruit informants',
        cost: 1, icon: '\ud83e\udd1d',
        available: true,
        effect: function() { return ICAC.ActionSystem.doNetwork(); }
      });
    }

    // ── INVESTIGATE (Phase 3+, Inspector+) ──
    // 调查 - gather evidence, build cases
    if (phase >= 3 || rankIdx >= 5) {
      actions.push({
        id: 'investigate', label: '\u8c03\u67e5', labelEn: 'Investigate',
        desc: '\u6536\u96c6\u8bc1\u636e\uff0c\u5efa\u7acb\u6848\u4ef6\uff0c\u627e\u51fa\u5bf9\u624b\u7684\u5f31\u70b9',
        descEn: 'Collect evidence, build cases, find weaknesses',
        cost: 2, icon: '\ud83d\udd0d',
        available: true,
        effect: function() { return ICAC.ActionSystem.doInvestigate(); }
      });
    }

    // ── FINANCE (always available) ──
    // 理财 - manage money, investments
    actions.push({
      id: 'finance', label: '\u7406\u8d22', labelEn: 'Finance',
      desc: '\u7ba1\u7406\u8d22\u4ea7\u3001\u6295\u8d44\u3001\u6536\u53d6\u4fdd\u62a4\u8d39',
      descEn: 'Manage assets, investments, collect protection fees',
      cost: 1, icon: '\ud83d\udcb0',
      available: true,
      effect: function() { return ICAC.ActionSystem.doFinance(); }
    });

    // ── TRAIN (always available) ──
    // 训练 - improve skills
    actions.push({
      id: 'train', label: '\u8bad\u7ec3', labelEn: 'Train',
      desc: '\u63d0\u5347\u4e13\u4e1a\u6280\u80fd\uff0c\u4e3a\u664b\u5347\u8003\u8bd5\u505a\u51c6\u5907',
        descEn: 'Improve skills, prepare for promotion exams',
        cost: 1, icon: '\ud83c\udf93',
        available: true,
        effect: function() { return ICAC.ActionSystem.doTrain(); }
      });

    // ── REST (always available) ──
    // 休息 - recover psych
    actions.push({
      id: 'rest', label: '\u4f11\u606f', labelEn: 'Rest',
      desc: '\u6062\u590d\u5fc3\u7406\u72b6\u6001\uff0c\u907f\u514d\u5d29\u6e83',
      descEn: 'Recover mental state, avoid burnout',
      cost: 1, icon: '\ud83d\ude34',
      available: true,
      effect: function() { return ICAC.ActionSystem.doRest(); }
    });

    return actions;
  },

  // ── EXECUTE ACTION ──
  executeAction: function(actionId) {
    var actions = this.getAvailableActions();
    var action = null;
    for (var i = 0; i < actions.length; i++) {
      if (actions[i].id === actionId) { action = actions[i]; break; }
    }
    if (!action || !action.available) return { success: false, reason: 'action_not_available' };

    var s = ICAC.state;
    if (s.day.ap < action.cost) return { success: false, reason: 'not_enough_ap' };

    // Deduct AP
    s.day.ap -= action.cost;
    s.day.actionsTaken.push(actionId);
    s.stats.actionsTotal = (s.stats.actionsTotal || 0) + 1;

    // Execute
    var result = action.effect();
    result.action = action;
    result.remainingAp = s.day.ap;

    // Auto-save
    try { localStorage.setItem('icac_autosave', JSON.stringify({ state: ICAC.state, time: Date.now() })); } catch(e){}

    return result;
  },

  // ── PATROL ──
  doPatrol: function() {
    var s = ICAC.state;
    var district = s.player.district || 'north_point';
    var distData = ICAC.districtData ? ICAC.districtData.find(function(d) { return d.id === district; }) : null;
    var results = [];

    // 1. Gather intel (random chance)
    if (Math.random() < 0.4) {
      var intelTypes = ['npc_location', 'financial_record', 'criminal_activity', 'political_connection'];
      var intel = intelTypes[Math.floor(Math.random() * intelTypes.length)];
      if (!s.intel) s.intel = {};
      if (!s.intel[district]) s.intel[district] = [];
      s.intel[district].push({ type: intel, date: s.day.current, value: Math.floor(Math.random() * 20) + 5 });
      results.push({ type: 'intel', desc: '\u53d1\u73b0' + district + '\u7684' + this.getIntelLabel(intel) });
    }

    // 2. Find scheme opportunity
    if (Math.random() < 0.25) {
      var opps = this.getSchemeOpportunities(district);
      if (opps.length > 0) {
        var opp = opps[Math.floor(Math.random() * opps.length)];
        if (!s.opportunities) s.opportunities = [];
        s.opportunities.push(opp);
        results.push({ type: 'opportunity', desc: '\u53d1\u73b0\u673a\u4f1a: ' + opp.title, data: opp });
      }
    }

    // 3. Build presence (small trust gain)
    s.stats.trust = Math.min(100, (s.stats.trust || 0) + 2);
    results.push({ type: 'stat', stat: 'trust', value: 2 });

    // 4. Base patrol income + district control bonus
    var baseIncome = 3 + Math.floor(Math.random() * 3); // $3-5 per patrol
    var controlBonus = ICAC.PropertySystem ? ICAC.PropertySystem.calcDistrictIncome(district) : 0;
    var totalIncome = baseIncome + controlBonus;
    if (totalIncome > 0) {
      ICAC.PropertySystem.addMoney(totalIncome);
      results.push({ type: 'money', value: totalIncome, desc: '\u5de1\u903b\u6536\u5165 $' + totalIncome + (controlBonus > 0 ? ' (\u542b\u4fdd\u62a4\u8d39 $' + controlBonus + ')' : '') });
    }

    // 5. Increase district control slightly
    if (!s.assets) s.assets = {};
    if (!s.assets[district]) s.assets[district] = { controlLevel: 0, businesses: [] };
    s.assets[district].controlLevel = Math.min(100, (s.assets[district].controlLevel || 0) + 2);
    if (s.assets[district].controlLevel > 0) {
      results.push({ type: 'control', district: district, value: 2, desc: district + ' \u63a7\u5236\u5ea6 +' + 2 + '%' });
    }

    // Refresh HUD
    var gameScene = ICAC.game ? ICAC.game.scene.getScene('GameScene') : null;
    if(gameScene && gameScene.refreshStatsBar) gameScene.refreshStatsBar();

    return { success: true, results: results, message: '\u5b8c\u6210' + district + '\u5de1\u903b' };
  },

  getIntelLabel: function(type) {
    var labels = {
      npc_location: '\u4eba\u7269\u884c\u8e2a',
      financial_record: '\u8d22\u52a1\u7ebf\u7d22',
      criminal_activity: '\u72af\u7f6a\u6d3b\u52a8',
      political_connection: '\u653f\u6cbb\u5173\u7cfb'
    };
    return labels[type] || type;
  },

  // ── SCHEME ──
  doScheme: function() {
    return { success: true, type: 'open_scheme_ui', message: '\u6253\u5f00\u505a\u5c40\u754c\u9762' };
  },

  getActiveSchemes: function() {
    return (ICAC.state.schemes || []).filter(function(s) { return s.status === 'active'; });
  },

  getSchemeOpportunities: function(district) {
    var opps = [];
    var phase = ICAC.state.progress.phase || 1;
    // Phase-specific opportunities
    if (phase >= 4) {
      opps.push({ id: 'frame_hsueh', title: '\u7ed9\u859b\u56fd\u680b\u4e0b\u5957', target: 'hsueh_kok_tung', difficulty: 5, reward: 'mission_progress' });
    }
    if (phase >= 5) {
      opps.push({ id: 'control_triad', title: '\u63a7\u5236\u548c\u80dc\u548c\u9009\u4e3e', target: 'wo_shing_wo', difficulty: 4, reward: 'district_control' });
    }
    if (phase >= 3) {
      opps.push({ id: 'undermine_rival', title: '\u6316\u5bf9\u624b\u9ed1\u6750\u6599', target: 'rival_officer', difficulty: 3, reward: 'promotion_boost' });
    }
    opps.push({ id: 'collect_blackmail', title: '\u6536\u96c6\u52c3\u7d22\u6750\u6599', target: 'local_official', difficulty: 2, reward: 'money' });
    return opps;
  },

  // ── NETWORK ──
  doNetwork: function() {
    var s = ICAC.state;
    var npcs = this.getAvailableNPCs();
    if (npcs.length === 0) {
      s.stats.credibility = Math.min(100, (s.stats.credibility || 0) + 3);
      return { success: true, results: [{ type: 'stat', stat: 'credibility', value: 3 }], message: '\u793e\u4ea4\u5708\u5c42\u62d3\u5c55' };
    }
    return { success: true, type: 'open_network_ui', npcs: npcs, message: '\u6253\u5f00\u7ed3\u7f51\u754c\u9762' };
  },

  getAvailableNPCs: function() {
    var phase = ICAC.state.progress.phase || 1;
    var npcs = [];
    if (phase >= 1) npcs.push({ id: 'ah_may', name: '\u963fMay', role: '\u884c\u653f\u526f\u4e3b\u4efb' });
    if (phase >= 1) npcs.push({ id: 'instructor_chen', name: '\u9648\u6559\u5b98', role: '\u8bad\u7ec3\u5b66\u6821\u6559\u5b98' });
    if (phase >= 2) npcs.push({ id: 'boss_fat', name: '\u80a5\u4f6c', role: '\u5317\u89d2\u5546\u4f1a\u4e3b\u5e2d' });
    if (phase >= 2) npcs.push({ id: 'wong_sir', name: '\u9ec4Sir', role: 'ICAC\u9ad8\u7ea7\u8c03\u67e5\u5458' });
    if (phase >= 3) npcs.push({ id: 'sgt_lam', name: '\u6797\u8b66\u957f', role: '\u524d\u5317\u89d2\u8b66\u5f18\u8d1f\u8d23\u4eba' });
    if (phase >= 4) npcs.push({ id: 'zhang_sir', name: '\u5f20Sir', role: '\u9ad8\u7ea7\u7763\u5bdf' });
    if (phase >= 5) npcs.push({ id: 'siu_kong', name: '\u5c0f\u5149', role: '\u548c\u80dc\u548c\u65b0\u4e00\u4ee3\u5934\u76ee' });
    if (phase >= 5) npcs.push({ id: 'tiger_uncle', name: '\u864e\u53d4', role: '\u548c\u80dc\u548c\u5143\u8001' });
    return npcs;
  },

  // ── INVESTIGATE ──
  doInvestigate: function() {
    var s = ICAC.state;
    var results = [];

    // Build case file progress
    if (!s.caseFiles) s.caseFiles = {};
    var targetCase = s.currentInvestigation || 'hsueh_corruption';
    if (!s.caseFiles[targetCase]) s.caseFiles[targetCase] = 0;

    var progress = Math.floor(Math.random() * 15) + 10;
    s.caseFiles[targetCase] += progress;

    results.push({ type: 'case_progress', case: targetCase, value: progress, total: s.caseFiles[targetCase] });

    // Intel bonus
    s.stats.credibility = Math.min(100, (s.stats.credibility || 0) + 3);
    results.push({ type: 'stat', stat: 'credibility', value: 3 });

    return { success: true, results: results, message: '\u8c03\u67e5' + targetCase + ' \u8fdb\u5ea6 +' + progress + '%' };
  },

  // ── SHORTCUT ──
  doShortcut: function() {
    return { success: true, type: 'open_shortcut_ui', message: '\u6253\u5f00\u8d70\u4fbf\u95e8\u754c\u9762' };
  },

  // ── FINANCE ──
  doFinance: function() {
    return { success: true, type: 'open_finance_ui', message: '\u6253\u5f00\u7406\u8d22\u754c\u9762' };
  },

  // ── TRAIN ──
  doTrain: function() {
    var s = ICAC.state;
    var skill = Math.floor(Math.random() * 3);
    var skills = ['integrity', 'trust', 'credibility'];
    var skillName = skills[skill];
    s.stats[skillName] = Math.min(100, (s.stats[skillName] || 0) + 3);

    // Training progress toward promotion
    if (!s.trainingProgress) s.trainingProgress = 0;
    s.trainingProgress += 10;

    return {
      success: true,
      results: [{ type: 'stat', stat: skillName, value: 3 }, { type: 'training', value: 10 }],
      message: '\u8bad\u7ec3\u5b8c\u6210\uff0c' + skillName + ' +3\uff0c\u664b\u5347\u51c6\u5907 +' + s.trainingProgress + '%'
    };
  },

  // ── REST ──
  doRest: function() {
    var s = ICAC.state;
    var recover = Math.floor(Math.random() * 10) + 10;
    s.stats.psych = Math.min(100, (s.stats.psych || 0) + recover);
    return { success: true, results: [{ type: 'stat', stat: 'psych', value: recover }], message: '\u4f11\u606f\u5b8c\u6210\uff0c\u5fc3\u7406 +' + recover };
  },

  // ── END DAY ──
  endDay: function() {
    var s = ICAC.state;
    var results = [];

    // Daily income (from assets, district control, tea money)
    var income = ICAC.PropertySystem ? ICAC.PropertySystem.calcDailyIncome() : 0;
    if (income > 0) {
      ICAC.PropertySystem.addMoney(income);
      results.push({ type: 'income', value: income, desc: '\u6bcf\u65e5\u6536\u5165 $' + income });
    }

    // Daily expenses
    var expenses = ICAC.PropertySystem ? ICAC.PropertySystem.calcDailyExpenses() : 5;
    ICAC.PropertySystem.spendMoney(expenses);
    if (expenses > 0) results.push({ type: 'expense', value: expenses, desc: '\u65e5\u5e38\u5f00\u652f $' + expenses });

    // Process active schemes (advance by 1 step)
    if (s.schemes) {
      s.schemes.forEach(function(scheme) {
        if (scheme.status === 'active' && scheme.steps && scheme.currentStep < scheme.steps.length) {
          scheme.currentStep++;
          if (scheme.currentStep >= scheme.steps.length) {
            scheme.status = 'complete';
            results.push({ type: 'scheme_complete', scheme: scheme.id, desc: '\u505a\u5c40\u5b8c\u6210: ' + scheme.title });
            // Apply scheme rewards
            if (scheme.rewards) {
              scheme.rewards.forEach(function(r) {
                if (r.type === 'stat_change') {
                  s.stats[r.stat] = Math.min(100, Math.max(0, (s.stats[r.stat] || 0) + r.value));
                  results.push({ type: 'stat', stat: r.stat, value: r.value });
                }
                if (r.type === 'money') {
                  ICAC.PropertySystem.addMoney(r.value);
                  results.push({ type: 'money', value: r.value });
                }
                if (r.type === 'flag') {
                  s.flags[r.flag] = true;
                  results.push({ type: 'flag', flag: r.flag });
                }
              });
            }
          }
        }
      });
    }

    // Advance day
    s.day.current++;
    s.day.ap = this.getActionPoints();
    s.day.actionsTaken = [];

    // Check for sub-mission triggers
    var subMission = ICAC.SubMissionSystem ? ICAC.SubMissionSystem.checkTriggers() : null;
    if (subMission) {
      results.push({ type: 'sub_mission', data: subMission });
    }

    // Monthly salary
    if (s.day.current % 30 === 0) {
      var salary = ICAC.PropertySystem ? ICAC.PropertySystem.calcSalary() : 100;
      ICAC.PropertySystem.addMoney(salary);
      results.push({ type: 'salary', value: salary, desc: '\u6708\u85aa $' + salary });
    }

    // Check promotion eligibility
    var promoCheck = ICAC.ActionSystem.checkPromotion();
    if (promoCheck.eligible) {
      results.push({ type: 'promotion_available', rank: promoCheck.nextRank });
    }

    // Refresh HUD
    var gameScene = ICAC.game ? ICAC.game.scene.getScene('GameScene') : null;
    if(gameScene && gameScene.refreshStatsBar) gameScene.refreshStatsBar();

    return { success: true, day: s.day.current, results: results };
  },

  // ── SIMPLE PROMOTION ──
  // Promotions happen through completing story missions, not grinding stats
  checkPromotion: function() {
    var s = ICAC.state;
    var completed = s.progress.completed.length;
    var phase = s.progress.phase;
    var currentIdx = s.player.rankIdx || 0;
    if (currentIdx >= ICAC.ranks.length - 1) return { eligible: false };

    // Auto-promote based on mission completion
    var targetIdx = 0;
    if (completed >= 1) targetIdx = 1; // WSP
    if (completed >= 3) targetIdx = 2; // SGT
    if (completed >= 5) targetIdx = 3; // SSGT
    if (completed >= 7) targetIdx = 4; // SGT_MAJ
    if (phase >= 2) targetIdx = 5; // Insp
    if (phase >= 3) targetIdx = 7; // Ch_Insp
    if (phase >= 4) targetIdx = 9; // SP
    if (phase >= 5) targetIdx = 11; // CSP
    if (phase >= 6) targetIdx = 13; // CP

    if (targetIdx > currentIdx) {
      return { eligible: true, nextRank: ICAC.ranks[targetIdx], targetIdx: targetIdx };
    }
    return { eligible: false };
  },

  // ── INIT DAY STATE ──
  initDay: function() {
    var s = ICAC.state;
    if (!s.day) {
      s.day = {
        current: 1,
        ap: this.getActionPoints(),
        actionsTaken: [],
        weekDay: 1 // 1=Monday
      };
    }
    if (!s.schemes) s.schemes = [];
    if (!s.completedSchemes) s.completedSchemes = [];
    if (!s.intel) s.intel = {};
    if (!s.opportunities) s.opportunities = [];
    if (!s.caseFiles) s.caseFiles = {};
    if (!s.trainingProgress) s.trainingProgress = 0;
    if (!s.relations) s.relations = {};
  }
};
