// SubMissionSystem - Granular tasks between main missions
// These are small, concrete objectives that build toward the next major mission
// Each sub-mission requires player ACTION, not just reading

ICAC.SubMissionSystem = {

  // ── SUB-MISSION DEFINITIONS ──
  definitions: [
    // Phase 1: Rookie
    {
      id: 'patrol_north_point', phase: 1, rankIdx: 0,
      title: '\u719f\u6089\u5317\u89d2\u8857\u5934',
      desc: '\u5728\u5317\u89d2\u5de1\u903b5\u5929\uff0c\u4e86\u89e3\u8857\u533a\u5e03\u5c40',
      requirements: [{ type: 'patrol_days', district: 'north_point', count: 5 }],
      reward: { trust: 10, intel: { north_point: { type: 'npc_location', value: 15 } } },
      unlocks: 'first_day'
    },
    {
      id: 'write_reports', phase: 1, rankIdx: 0,
      title: '\u5b66\u4f1a\u5199\u62a5\u544a',
      desc: '\u519910\u4efd\u65e5\u5e38\u5de1\u903b\u62a5\u544a',
      requirements: [{ type: 'days_passed', count: 10 }],
      reward: { credibility: 10, training: 20 },
      unlocks: null
    },
    {
      id: 'meet_lam_sir', phase: 1, rankIdx: 1,
      title: '\u6797\u8b66\u957f\u7684\u6d4b\u8bd5',
      desc: '\u5728\u798f\u8bb0\u4e0e\u6797\u8b66\u957f\u559d\u8336\u4e09\u6b21',
      requirements: [{ type: 'network_npc', npc: 'sgt_lam', count: 3 }],
      reward: { trust: 15, flag: { met_lam: true } },
      unlocks: 'teahouse_money'
    },
    // Phase 2: Double Life
    {
      id: 'gather_fuk_kee_intel', phase: 2, rankIdx: 2,
      title: '\u8c03\u67e5\u798f\u8bb0\u8336\u9910\u5385',
      desc: '\u6536\u96c6\u798f\u8bb0\u7684\u8d22\u52a1\u8bb0\u5f55\u548c\u5ba2\u4eba\u540d\u5355',
      requirements: [{ type: 'intel_collected', district: 'north_point', count: 5 }],
      reward: { credibility: 15, money: 200 },
      unlocks: 'double_life'
    },
    {
      id: 'earn_first_bribe', phase: 2, rankIdx: 2,
      title: '\u7b2c\u4e00\u7b14\u5916\u5feb',
      desc: '\u79ef\u7d2f\u8d44\u4ea7\u5230$300',
      requirements: [{ type: 'money_min', value: 300 }],
      reward: { credibility: 5 },
      unlocks: null
    },
    {
      id: 'build_icac_cover', phase: 2, rankIdx: 3,
      title: '\u5efa\u7acbICAC\u5173\u7cfb',
      desc: '\u4e0e\u9ec4Sir\u4f1a\u97622\u6b21\uff0c\u5efa\u7acb\u7ebf\u4eba\u5173\u7cfb',
      requirements: [{ type: 'network_npc', npc: 'wong_sir', count: 2 }],
      reward: { integrity: 10, flag: { icac_contact_established: true } },
      unlocks: 'icac_contact'
    },
    // Phase 3: Inspector
    {
      id: 'first_scheme', phase: 3, rankIdx: 4,
      title: '\u521d\u6b21\u505a\u5c40',
      desc: '\u5b8c\u6210\u4f60\u7684\u7b2c\u4e00\u4e2a\u505a\u5c40',
      requirements: [{ type: 'schemes_complete', count: 1 }],
      reward: { credibility: 20, trust: 10 },
      unlocks: 'the_informant'
    },
    {
      id: 'build_asset_base', phase: 3, rankIdx: 4,
      title: '\u79ef\u7d2f\u8d44\u672c',
      desc: '\u8d44\u4ea7\u8fbe\u5230$1000',
      requirements: [{ type: 'money_min', value: 1000 }],
      reward: { credibility: 10 },
      unlocks: 'the_mentor'
    },
    {
      id: 'control_district', phase: 3, rankIdx: 5,
      title: '\u63a7\u5236\u8857\u533a',
      desc: '\u5728\u5317\u89d2\u5efa\u7acb60%\u4ee5\u4e0a\u7684\u63a7\u5236\u529b',
      requirements: [{ type: 'district_control', district: 'north_point', value: 60 }],
      reward: { trust: 20, credibility: 15 },
      unlocks: null
    },
    // Phase 4: Confrontation
    {
      id: 'build_case_hsueh', phase: 4, rankIdx: 6,
      title: '\u8c03\u67e5\u859b\u56fd\u680b',
      desc: '\u5c06\u859b\u56fd\u680b\u8154\u8d2a\u6848\u4ef6\u8fdb\u5ea6\u63a8\u8fdb\u523050%',
      requirements: [{ type: 'case_progress', case: 'hsueh_corruption', value: 50 }],
      reward: { integrity: 20, credibility: 20 },
      unlocks: 'network_war'
    },
    {
      id: 'recruit_allies', phase: 4, rankIdx: 6,
      title: '\u7ed3\u76df',
      desc: '\u4e0e3\u4e2a\u4ee5\u4e0aNPC\u5efa\u7acb50+\u5173\u7cfb',
      requirements: [{ type: 'alliance_count', count: 3 }],
      reward: { trust: 25 },
      unlocks: 'crisis_point'
    },
    {
      id: 'financial_independence', phase: 4, rankIdx: 7,
      title: '\u8d22\u52a1\u72ec\u7acb',
      desc: '\u8d44\u4ea7\u8fbe\u5230$5000',
      requirements: [{ type: 'money_min', value: 5000 }],
      reward: { credibility: 30 },
      unlocks: 'final_confrontation'
    },
    // Phase 5: Triad Election
    {
      id: 'infiltrate_triad', phase: 5, rankIdx: 8,
      title: '\u6e17\u900f\u548c\u80dc\u548c',
      desc: '\u6536\u96c65\u4efd\u4e09\u5408\u4f1a\u60c5\u62a5',
      requirements: [{ type: 'intel_collected', count: 5 }],
      reward: { credibility: 20 },
      unlocks: 'triad_election'
    },
    {
      id: 'choose_candidate', phase: 5, rankIdx: 8,
      title: '\u9009\u8fb9\u7ad9\u961f',
      desc: '\u4e0e\u5c0f\u5149\u548c\u864e\u53d4\u5404\u4f1a\u9762\u4e00\u6b21',
      requirements: [{ type: 'network_npc', npc: 'siu_kong', count: 1 }, { type: 'network_npc', npc: 'tiger_uncle', count: 1 }],
      reward: { trust: 15 },
      unlocks: null
    },
    // Phase 6: Mutiny
    {
      id: 'gauge_sentiment', phase: 6, rankIdx: 9,
      title: '\u4f30\u6d4b\u6c11\u610f',
      desc: '\u4e0e5\u4e2a\u4ee5\u4e0a\u5e95\u5c42\u8b66\u5458\u5bf9\u8bdd',
      requirements: [{ type: 'network_count', count: 5 }],
      reward: { credibility: 15 },
      unlocks: 'icac_mutiny'
    }
  ],

  // ── CHECK TRIGGERS ──
  checkTriggers: function() {
    var s = ICAC.state;
    var available = [];

    for (var i = 0; i < this.definitions.length; i++) {
      var def = this.definitions[i];

      // Check if already completed
      if (s.completedSubMissions && s.completedSubMissions.indexOf(def.id) !== -1) continue;

      // Check if already active
      if (s.activeSubMissions && s.activeSubMissions.find(function(m) { return m.id === def.id; })) continue;

      // Check phase/rank
      if (def.phase && s.progress.phase < def.phase) continue;
      if (def.rankIdx && s.player.rankIdx < def.rankIdx) continue;

      // Check prerequisite sub-missions
      if (def.requires) {
        var prereqMet = true;
        for (var j = 0; j < def.requires.length; j++) {
          if (!s.completedSubMissions || s.completedSubMissions.indexOf(def.requires[j]) === -1) {
            prereqMet = false; break;
          }
        }
        if (!prereqMet) continue;
      }

      available.push(def);
    }

    // Return first available (or random)
    return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
  },

  // ── CHECK COMPLETION ──
  checkCompletion: function(subMissionId) {
    var s = ICAC.state;
    var def = null;
    for (var i = 0; i < this.definitions.length; i++) {
      if (this.definitions[i].id === subMissionId) { def = this.definitions[i]; break; }
    }
    if (!def) return false;

    for (var j = 0; j < def.requirements.length; j++) {
      var r = def.requirements[j];
      if (!this.checkRequirement(r)) return false;
    }
    return true;
  },

  checkRequirement: function(r) {
    var s = ICAC.state;
    switch(r.type) {
      case 'patrol_days':
        return ((s.patrolLog || {})[r.district] || 0) >= r.count;
      case 'days_passed':
        return (s.day || {}).current >= r.count;
      case 'network_npc':
        return ((s.networkLog || {})[r.npc] || 0) >= r.count;
      case 'network_count':
        var total = 0;
        if (s.networkLog) { for (var k in s.networkLog) total += s.networkLog[k]; }
        return total >= r.count;
      case 'intel_collected':
        var intelTotal = 0;
        if (s.intel) { for (var d in s.intel) intelTotal += s.intel[d].length; }
        return intelTotal >= r.count;
      case 'money_min':
        return (s.money || 0) >= r.value;
      case 'schemes_complete':
        return (s.completedSchemes || []).length >= r.count;
      case 'case_progress':
        return ((s.caseFiles || {})[r.case] || 0) >= r.value;
      case 'district_control':
        var assets = (s.assets || {})[r.district] || {};
        return (assets.controlLevel || 0) >= r.value;
      case 'alliance_count':
        var allies = 0;
        if (s.relations) {
          for (var npc in s.relations) {
            if (s.relations[npc] >= 50) allies++;
          }
        }
        return allies >= r.count;
    }
    return false;
  },

  // ── COMPLETE SUB-MISSION ──
  complete: function(subMissionId) {
    var s = ICAC.state;
    var def = null;
    for (var i = 0; i < this.definitions.length; i++) {
      if (this.definitions[i].id === subMissionId) { def = this.definitions[i]; break; }
    }
    if (!def) return { success: false };

    // Apply rewards
    if (def.reward) {
      for (var stat in def.reward) {
        if (stat === 'flag') {
          for (var flag in def.reward.flag) {
            s.flags[flag] = def.reward.flag[flag];
          }
        } else if (stat === 'intel') {
          // Handle intel reward
        } else if (stat === 'money') {
          ICAC.PropertySystem.addMoney(def.reward[stat]);
        } else {
          s.stats[stat] = Math.min(100, (s.stats[stat] || 0) + def.reward[stat]);
        }
      }
    }

    // Mark completed
    if (!s.completedSubMissions) s.completedSubMissions = [];
    s.completedSubMissions.push(subMissionId);

    // Unlock next mission if applicable
    if (def.unlocks) {
      if (s.progress.available.indexOf(def.unlocks) === -1) {
        s.progress.available.push(def.unlocks);
      }
    }

    return { success: true, reward: def.reward, unlocks: def.unlocks };
  }
};
