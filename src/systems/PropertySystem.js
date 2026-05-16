// PropertySystem - Money, investments, real estate, income/expenses
// Core principle: 玩家自己管理财产，从收茶钱到操控整个北角经济

ICAC.PropertySystem = {

  // ── MONEY ──
  addMoney: function(amount) {
    var s = ICAC.state;
    if (!s.money) s.money = 100;
    s.money += amount;
    return s.money;
  },

  spendMoney: function(amount) {
    var s = ICAC.state;
    if (!s.money) s.money = 100;
    s.money = Math.max(0, s.money - amount);
    return s.money;
  },

  getMoney: function() {
    return ICAC.state.money || 100;
  },

  // ── SALARY BY RANK ──
  calcSalary: function() {
    var salaries = [80, 120, 180, 250, 350, 500, 700, 1000, 1500, 2200, 3500, 5000, 8000, 15000];
    var idx = Math.min(ICAC.state.player.rankIdx || 0, salaries.length - 1);
    return salaries[idx];
  },

  // ── DAILY EXPENSES ──
  calcDailyExpenses: function() {
    var rankIdx = ICAC.state.player.rankIdx || 0;
    var base = 3 + rankIdx; // food, transport, basic needs
    // Housing cost based on lifestyle
    var housing = this.getHousingCost();
    return base + housing;
  },

  getHousingCost: function() {
    var style = ICAC.state.lifestyle || 'modest';
    var costs = { modest: 5, comfortable: 15, luxury: 40, extravagant: 100 };
    return costs[style] || 5;
  },

  // ── DISTRICT INCOME ──
  calcDistrictIncome: function(districtId) {
    var s = ICAC.state;
    if (!s.assets) s.assets = {};
    var assets = s.assets[districtId] || {};
    var control = assets.controlLevel || 0; // 0-100
    var income = 0;

    // Protection fees (scale with control)
    if (control > 0) {
      income += Math.floor(control * 0.5); // $0-50 per day based on control
    }

    // Business income
    if (assets.businesses) {
      assets.businesses.forEach(function(b) {
        income += b.dailyIncome || 0;
      });
    }

    return income;
  },

  // ── ASSET MANAGEMENT ──
  getAvailableAssets: function() {
    var rankIdx = ICAC.state.player.rankIdx || 0;
    var phase = ICAC.state.progress.phase || 1;
    var assets = [];

    // Basic assets (always)
    assets.push({
      id: 'tea_money', name: '\u8336\u94b1\u7f51\u7edc', nameEn: 'Tea Money Network',
      type: 'passive', cost: 0, dailyIncome: 5,
      desc: '\u4ece\u5c0f\u5546\u8d2d\u6536\u4fdd\u62a4\u8d39\uff0c\u89c4\u6a21\u5c0f\u4f46\u7a33\u5b9a',
      unlockRank: 0, unlockPhase: 1
    });

    if (phase >= 2 || rankIdx >= 2) {
      assets.push({
        id: 'mahjong_parlor', name: '\u9ebb\u5c06\u9986', nameEn: 'Mahjong Parlor',
        type: 'business', cost: 500, dailyIncome: 25,
        desc: '\u975e\u6cd5\u8d4c\u535a\u573a\u6240\uff0c\u6536\u5165\u4e30\u539a\u4f46\u6709\u88ab\u67e5\u5c01\u98ce\u9669',
        unlockRank: 2, unlockPhase: 2
      });
    }

    if (phase >= 3 || rankIdx >= 4) {
      assets.push({
        id: 'nightclub', name: '\u591c\u603b\u4f1a', nameEn: 'Nightclub',
        type: 'business', cost: 2000, dailyIncome: 80,
        desc: '\u591c\u603b\u4f1a\u62bd\u6c34\uff0c\u9700\u8981\u4fdd\u62a4\u8d39\u652f\u51fa',
        unlockRank: 4, unlockPhase: 3
      });
    }

    if (phase >= 4 || rankIdx >= 6) {
      assets.push({
        id: 'property_development', name: '\u65e7\u533a\u6539\u9020', nameEn: 'Property Development',
        type: 'investment', cost: 5000, dailyIncome: 200,
        desc: '\u62c5\u4efb\u653f\u5e9c\u62c6\u8fc1\u987e\u95ee\uff0c\u4ece\u5730\u4ea7\u5546\u5904\u62ff\u56de\u6263',
        unlockRank: 6, unlockPhase: 4
      });
    }

    if (phase >= 5 || rankIdx >= 9) {
      assets.push({
        id: 'shipping_company', name: '\u8d27\u8fd0\u516c\u53f8', nameEn: 'Shipping Company',
        type: 'investment', cost: 15000, dailyIncome: 500,
        desc: '\u63a7\u5236\u6d77\u4e0a\u8d27\u8fd0\uff0c\u8d5a\u53d6\u8d38\u6613\u4f63\u91d1',
        unlockRank: 9, unlockPhase: 5
      });
    }

    return assets;
  },

  purchaseAsset: function(assetId) {
    var s = ICAC.state;
    var assets = this.getAvailableAssets();
    var asset = null;
    for (var i = 0; i < assets.length; i++) {
      if (assets[i].id === assetId) { asset = assets[i]; break; }
    }
    if (!asset) return { success: false, reason: 'asset_not_found' };
    if ((s.money || 0) < asset.cost) return { success: false, reason: 'not_enough_money' };

    this.spendMoney(asset.cost);
    if (!s.ownedAssets) s.ownedAssets = [];
    s.ownedAssets.push({
      id: asset.id,
      name: asset.name,
      type: asset.type,
      dailyIncome: asset.dailyIncome,
      purchased: s.day ? s.day.current : 1
    });

    return { success: true, asset: asset };
  },

  // ── HOUSING / LIFESTYLE ──
  setLifestyle: function(style) {
    var styles = ['modest', 'comfortable', 'luxury', 'extravagant'];
    if (styles.indexOf(style) === -1) return { success: false };
    ICAC.state.lifestyle = style;
    return { success: true, style: style, cost: this.getHousingCost() };
  },

  // ── BRIBES & TRIBUTE ──
  payBribe: function(target, amount) {
    var s = ICAC.state;
    if ((s.money || 0) < amount) return { success: false, reason: 'not_enough_money' };
    this.spendMoney(amount);
    if (!s.bribes) s.bribes = [];
    s.bribes.push({ target: target, amount: amount, date: s.day ? s.day.current : 1 });
    // Improve relationship
    if (!s.relations) s.relations = {};
    s.relations[target] = (s.relations[target] || 0) + Math.floor(amount / 20);
    return { success: true, relationBoost: Math.floor(amount / 20) };
  },

  // ── DAILY TOTALS ──
  calcDailyIncome: function() {
    var s = ICAC.state;
    var total = 0;

    // Salary (paid monthly, not daily)
    // District income from control
    total += this.calcDistrictIncome(s.player.district || 'north_point');

    // Owned assets
    if (s.ownedAssets) {
      s.ownedAssets.forEach(function(a) {
        total += a.dailyIncome || 0;
      });
    }

    // Tea money (base)
    if (!s.ownedAssets || !s.ownedAssets.find(function(a) { return a.id === 'tea_money'; })) {
      var rankIdx = s.player.rankIdx || 0;
      total += 5 + rankIdx * 2;
    }

    return total;
  },

  getFinancialReport: function() {
    return {
      cash: this.getMoney(),
      dailyIncome: this.calcDailyIncome(),
      dailyExpenses: this.calcDailyExpenses(),
      netDaily: this.calcDailyIncome() - this.calcDailyExpenses(),
      salary: this.calcSalary(),
      ownedAssets: (ICAC.state.ownedAssets || []).length,
      totalAssetIncome: (ICAC.state.ownedAssets || []).reduce(function(sum, a) { return sum + (a.dailyIncome || 0); }, 0)
    };
  }
};
