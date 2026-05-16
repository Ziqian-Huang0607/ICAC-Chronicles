// SchemeSystem - Multi-step trap builder
// Core principle: 玩家一步步自己做局，而不是被告诉"你做了局"
// 5 steps: IDENTIFY → GATHER → PLANT → EXECUTE → COVER

ICAC.SchemeSystem = {

  // ── CREATE NEW SCHEME ──
  createScheme: function(config) {
    var s = ICAC.state;
    var scheme = {
      id: 'scheme_' + Date.now(),
      title: config.title || '\u672a\u547d\u540d\u505a\u5c40',
      target: config.target,
      targetName: config.targetName || config.target,
      method: config.method, // 'blackmail', 'frame', 'manipulate', 'undermine', 'sabotage'
      methodName: this.getMethodName(config.method),
      difficulty: config.difficulty || 3, // 1-10
      steps: [],
      currentStep: 0,
      status: 'planning', // planning, active, complete, failed
      coverQuality: 0, // 0-100
      intelBonus: 0, // from gathered intel
      riskLevel: 0, // accumulated risk
      rewards: config.rewards || [],
      created: s.day ? s.day.current : 1
    };

    // Generate steps based on method
    scheme.steps = this.generateSteps(scheme);

    if (!s.schemes) s.schemes = [];
    s.schemes.push(scheme);

    return scheme;
  },

  getMethodName: function(method) {
    var names = {
      blackmail: '\u52c3\u7d22', frame: '\u8bbe\u5c40\u9677\u5bb3',
      manipulate: '\u64cd\u63a7\u64cd\u7eb5', undermine: '\u6316\u89d2\u52a8\u6447',
      sabotage: '\u7834\u574f\u963b\u632b', entrap: '\u5f15\u8bf1\u4e0a\u94a9'
    };
    return names[method] || method;
  },

  // ── GENERATE STEPS ──
  generateSteps: function(scheme) {
    var steps = [];
    var diff = scheme.difficulty;

    // Step 1: IDENTIFY - Find the target's weakness
    steps.push({
      name: '\u786e\u8ba4\u76ee\u6807',
      nameEn: 'Identify Target',
      desc: '\u7814\u7a76' + scheme.targetName + '\u7684\u884c\u4e3a\u6a21\u5f0f\u3001\u5f31\u70b9\u548c\u4e60\u60ef',
      type: 'intel',
      successChance: 70 + scheme.intelBonus,
      risk: 5,
      apCost: 1
    });

    // Step 2: GATHER - Collect materials/evidence
    steps.push({
      name: '\u6536\u96c6\u6750\u6599',
      nameEn: 'Gather Materials',
      desc: '\u6536\u96c6\u7528\u4e8e\u505a\u5c40\u7684\u6750\u6599:\u7167\u7247\u3001\u6587\u4ef6\u3001\u8bc1\u4eba',
      type: 'resource',
      successChance: 60 + scheme.intelBonus,
      risk: 10 + diff,
      apCost: 1
    });

    // Step 3: PLANT - Plant the trap
    var plantDesc = {
      blackmail: '\u5c06\u52c3\u7d22\u6750\u6599\u653e\u5230\u76ee\u6807\u4e0d\u7ecf\u610f\u4f1a\u53d1\u73b0\u7684\u5730\u65b9',
      frame: '\u4f2a\u9020\u8bc1\u636e\u5e76\u5c06\u5176\u653e\u5165\u76ee\u6807\u7684\u751f\u6d3b\u5708',
      manipulate: '\u901a\u8fc7\u4e2d\u95f4\u4eba\u5411\u76ee\u6807\u4f20\u8fbe\u7279\u5b9a\u4fe1\u606f',
      undermine: '\u5728\u76ee\u6807\u7684\u540c\u76df\u4e2d\u6492\u4e0b\u6000\u7591\u7684\u79cd\u5b50',
      sabotage: '\u5728\u5173\u952e\u65f6\u523b\u7834\u574f\u76ee\u6807\u7684\u8ba1\u5212',
      entrap: '\u8bbe\u8ba1\u4e00\u4e2a\u5f15\u8bf1\u8ba9\u76ee\u6807\u81ea\u5df1\u8d70\u8fdb\u9677\9631'
    };
    steps.push({
      name: '\u5e03\u7f6e\u9677\u9631',
      nameEn: 'Plant the Trap',
      desc: plantDesc[scheme.method] || '\u5e03\u7f6e\u9677\u9631',
      type: 'action',
      successChance: 50 + scheme.intelBonus - diff * 2,
      risk: 15 + diff * 2,
      apCost: 2
    });

    // Step 4: EXECUTE - Trigger the trap
    steps.push({
      name: '\u5f15\u7206\u5c40\u52bf',
      nameEn: 'Execute',
      desc: '\u5728\u6070\u5f53\u7684\u65f6\u673a\u89e6\u53d1\u9677\u9631\uff0c\u8ba9\u76ee\u6807\u9677\u5165\u88ab\u52a8',
      type: 'action',
      successChance: 55 + scheme.intelBonus - diff,
      risk: 20 + diff * 2,
      apCost: 2
    });

    // Step 5: COVER - Hide your involvement
    steps.push({
      name: '\u64e6\u5c3e\u5df4',
      nameEn: 'Cover Tracks',
      desc: '\u6e05\u9664\u6240\u6709\u4e0e\u4f60\u6709\u5173\u7684\u75d5\u8ff9\uff0c\u5efa\u7acb\u4e0d\u5728\u573a\u8bc1\u636e',
      type: 'cover',
      successChance: 65 - diff,
      risk: 10,
      apCost: 1
    });

    return steps;
  },

  // ── ADVANCE SCHEME ──
  advanceStep: function(schemeId) {
    var s = ICAC.state;
    var scheme = null;
    for (var i = 0; i < (s.schemes || []).length; i++) {
      if (s.schemes[i].id === schemeId) { scheme = s.schemes[i]; break; }
    }
    if (!scheme) return { success: false, reason: 'scheme_not_found' };
    if (scheme.status !== 'active' && scheme.status !== 'planning') {
      return { success: false, reason: 'scheme_not_active' };
    }

    if (scheme.status === 'planning') scheme.status = 'active';

    var step = scheme.steps[scheme.currentStep];
    if (!step) return { success: false, reason: 'no_more_steps' };

    // Check AP
    if ((s.day.ap || 0) < step.apCost) {
      return { success: false, reason: 'not_enough_ap', required: step.apCost };
    }
    s.day.ap -= step.apCost;

    // Roll for success
    var roll = Math.random() * 100;
    var success = roll <= step.successChance;

    scheme.currentStep++;
    scheme.riskLevel += step.risk;

    var result = {
      success: true,
      stepCompleted: step,
      stepIndex: scheme.currentStep - 1,
      roll: Math.floor(roll),
      threshold: step.successChance,
      passed: success,
      remainingSteps: scheme.steps.length - scheme.currentStep,
      schemeComplete: scheme.currentStep >= scheme.steps.length
    };

    if (!success) {
      // Partial failure - increase risk
      scheme.riskLevel += 15;
      result.partial = true;
      result.message = '\u6b65\u9aa4\u5b8c\u6210\u4f46\u6709\u7f3a\u9677\uff08\u6210\u529f\u7387: ' + step.successChance + '%\uff0c\u9ab0\u5b50: ' + Math.floor(roll) + '%\uff09';
    } else {
      result.message = '\u6b65\u9aa4\u6210\u529f\uff08\u6210\u529f\u7387: ' + step.successChance + '%\uff0c\u9ab0\u5b50: ' + Math.floor(roll) + '%\uff09';
    }

    // If scheme complete
    if (scheme.currentStep >= scheme.steps.length) {
      scheme.status = 'complete';
      if (!s.completedSchemes) s.completedSchemes = [];
      s.completedSchemes.push(scheme.id);
      result.schemeComplete = true;
      result.finalRisk = scheme.riskLevel;

      // Calculate cover quality
      scheme.coverQuality = Math.max(0, 100 - scheme.riskLevel);

      // Apply rewards
      if (scheme.rewards) {
        result.rewards = [];
        scheme.rewards.forEach(function(r) {
          if (r.type === 'stat_change') {
            s.stats[r.stat] = Math.min(100, Math.max(0, (s.stats[r.stat] || 0) + r.value));
            result.rewards.push({ type: 'stat', stat: r.stat, value: r.value });
          }
          if (r.type === 'money') {
            ICAC.PropertySystem.addMoney(r.value);
            result.rewards.push({ type: 'money', value: r.value });
          }
          if (r.type === 'flag') {
            s.flags[r.flag] = true;
            result.rewards.push({ type: 'flag', flag: r.flag });
          }
        });
      }

      result.message = '\u505a\u5c40\u5b8c\u6210\uff01\u5371\u9669\u7b49\u7ea7: ' + scheme.riskLevel + '%\uff0c\u63a9\u62a4\u8d28\u91cf: ' + scheme.coverQuality + '%';
    }

    return result;
  },

  // ── GET ACTIVE SCHEMES ──
  getActiveSchemes: function() {
    return (ICAC.state.schemes || []).filter(function(s) {
      return s.status === 'active' || s.status === 'planning';
    });
  },

  getCompletedSchemes: function() {
    return ICAC.state.completedSchemes || [];
  },

  // ── GET AVAILABLE METHODS ──
  getAvailableMethods: function() {
    var phase = ICAC.state.progress.phase || 1;
    var rankIdx = ICAC.state.player.rankIdx || 0;
    var methods = [];

    methods.push({
      id: 'blackmail', name: '\u52c3\u7d22', desc: '\u5229\u7528\u628a\u67c4\u5a01\u80c1\u76ee\u6807\u5c31\u8303',
      unlockPhase: 1, unlockRank: 0
    });

    if (phase >= 2 || rankIdx >= 2) {
      methods.push({
        id: 'frame', name: '\u8bbe\u5c40\u9677\u5bb3', desc: '\u4f2a\u9020\u8bc1\u636e\u8ba9\u76ee\u6807\u80cc\u4e0a\u9ed1\u9505',
        unlockPhase: 2, unlockRank: 2
      });
    }

    if (phase >= 3 || rankIdx >= 4) {
      methods.push({
        id: 'undermine', name: '\u6316\u89d2\u52a8\u6447', desc: '\u5728\u76ee\u6807\u7684\u540c\u76df\u4e2d\u6492\u4e0b\u6000\u7591',
        unlockPhase: 3, unlockRank: 4
      });
    }

    if (phase >= 4 || rankIdx >= 6) {
      methods.push({
        id: 'manipulate', name: '\u64cd\u63a7\u64cd\u7eb5', desc: '\u901a\u8fc7\u4fe1\u606f\u64cd\u63a7\u8ba9\u76ee\u6807\u81ea\u5df1\u8d70\u8fdb\u7edd\u8def',
        unlockPhase: 4, unlockRank: 6
      });
    }

    methods.push({
      id: 'sabotage', name: '\u7834\u574f\u963b\u632c', desc: '\u5728\u5173\u952e\u65f6\u523b\u7834\u574f\u76ee\u6807\u7684\u8ba1\u5212',
      unlockPhase: 1, unlockRank: 1
    });

    if (phase >= 5 || rankIdx >= 8) {
      methods.push({
        id: 'entrap', name: '\u5f15\u8bf1\u4e0a\u94a9', desc: '\u8bbe\u8ba1\u5b8c\u7f8e\u9677\u9631\u8ba9\u76ee\u6807\u81ea\u6295\u7f57\u7f51',
        unlockPhase: 5, unlockRank: 8
      });
    }

    return methods;
  },

  // ── GET AVAILABLE TARGETS ──
  getAvailableTargets: function() {
    var phase = ICAC.state.progress.phase || 1;
    var targets = [];

    if (phase >= 1) {
      targets.push({ id: 'local_hood', name: '\u5c0f\u6d41\u6c13', difficulty: 1, desc: '\u8857\u5934\u5c0f\u6df7\u6df7\uff0c\u5bb9\u6613\u5bf9\u4ed8' });
      targets.push({ id: 'corrupt_clerk', name: '\u8153\u8153\u516c\u52a1\u5458', difficulty: 2, desc: '\u8d2a\u5c0f\u4fbf\u5b9c\u7684\u653f\u5e9c\u5c0f\u5b98' });
    }
    if (phase >= 2) {
      targets.push({ id: 'rival_officer', name: '\u7ade\u4e89\u5bf9\u624b', difficulty: 3, desc: '\u8b66\u961f\u5185\u90e8\u7684\u7ade\u4e89\u8005' });
      targets.push({ id: 'triad_lieutenant', name: '\u4e09\u5408\u4f1a\u5c0f\u5934\u76ee', difficulty: 4, desc: '\u9ed1\u5e2e\u4e2d\u5c42\u7ba1\u7406\u8005' });
    }
    if (phase >= 3) {
      targets.push({ id: 'sgt_lam', name: '\u6797\u8b66\u957f', difficulty: 5, desc: '\u4f60\u7684\u5f15\u8def\u4eba\uff0c\u73b0\u5728\u7684\u5bf9\u624b' });
    }
    if (phase >= 4) {
      targets.push({ id: 'zhang_sir', name: '\u5f20Sir', difficulty: 6, desc: '\u9ad8\u7ea7\u7763\u5bdf\uff0c\u653f\u6cbb\u52bf\u529b\u5f3a\u5927' });
      targets.push({ id: 'hsueh_kok_tung', name: '\u859b\u56fd\u680b', difficulty: 8, desc: '\u8b66\u52a1\u5904\u5904\u957f\uff0c\u6743\u52bf\u7684\u5dc5\u5cf0' });
    }
    if (phase >= 5) {
      targets.push({ id: 'siu_kong', name: '\u5c0f\u5149', difficulty: 5, desc: '\u548c\u80dc\u548c\u65b0\u4e00\u4ee3\u5934\u76ee\uff0c\u6fc0\u8fdb\u800c\u81ea\u5927' });
      targets.push({ id: 'tiger_uncle', name: '\u864e\u53d4', difficulty: 6, desc: '\u548c\u80dc\u548c\u5143\u8001\uff0c\u6b8b\u5fcd\u4f46\u8bb2\u89c4\u77e9' });
    }

    return targets;
  },

  // ── INTEL BOOST ──
  applyIntel: function(schemeId, intelType) {
    var s = ICAC.state;
    var scheme = null;
    for (var i = 0; i < (s.schemes || []).length; i++) {
      if (s.schemes[i].id === schemeId) { scheme = s.schemes[i]; break; }
    }
    if (!scheme) return { success: false };

    var bonus = 0;
    switch(intelType) {
      case 'npc_location': bonus = 10; break;
      case 'financial_record': bonus = 15; break;
      case 'criminal_activity': bonus = 20; break;
      case 'political_connection': bonus = 12; break;
    }

    scheme.intelBonus += bonus;
    // Recalculate step chances
    scheme.steps = this.generateSteps(scheme);
    scheme.steps.forEach(function(step, idx) {
      if (idx < scheme.currentStep) {
        // Already completed steps stay as-is
        step.completed = true;
      }
    });

    return { success: true, bonus: bonus, totalBonus: scheme.intelBonus };
  }
};
