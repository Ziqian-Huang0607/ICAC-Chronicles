// ============================================================
// SUN TZU AS GAME MECHANICS
// Each chapter = a playable technique
// ============================================================
ICAC.sunziData = [
  {
    chapter: 1, id: "shiji", title: "始计篇", titleEn: "Laying Plans",
    mechanic: "情报评估",
    gameplay: "在任何行动前，先评估敌我双方的实力、意图、弱点。游戏中表现为'观察'选项——在采取任何行动前，你可以先观察目标，获得额外信息。",
    techniques: [
      "五事七计：评估时考虑七个维度——道德、天时、地利、将领、法规、兵力、训练",
      "兵者诡道：能而示之不能，用而示之不用。故意展示虚假信息给对手",
      "多算胜少算：准备越充分，成功率越高。每次'观察'增加后续行动成功率"
    ]
  },
  {
    chapter: 2, id: "zuozhan", title: "作战篇", titleEn: "Waging War",
    mechanic: "资源管理",
    gameplay: "任何行动都有成本——时间、金钱、人际关系。你需要管理有限的资源，决定哪些行动值得投入。",
    techniques: [
      "因粮于敌：从对手那里获取资源，而不是消耗自己的",
      "速战速决：拖延的战斗消耗最大。设定明确的目标和时间限制",
      "赏罚分明：用激励让团队高效运转，而不是只靠命令"
    ]
  },
  {
    chapter: 3, id: "mougong", title: "谋攻篇", titleEn: "Attack by Stratagem",
    mechanic: "不战而胜",
    gameplay: "最高境界不是打赢，而是让对手不战而降。通过布局、威胁、谈判达到目标，避免正面冲突。",
    techniques: [
      "上兵伐谋：用策略瓦解对手的意图，比用武力打败他更高明",
      "知彼知己：了解对手和自己，百战不殆",
      "围师必阙：给被包围的敌人留一条生路，否则他们会拼死反抗"
    ]
  },
  {
    chapter: 4, id: "junxing", title: "军形篇", titleEn: "Tactical Dispositions",
    mechanic: "立于不败之地",
    gameplay: "先确保自己不会被击败，再寻找击败对手的机会。防御性的策略往往是最好的选择。",
    techniques: [
      "先为不可胜：先让自己处于不可被击败的位置",
      "胜兵先胜而后求战：胜利者在开战前已经赢了，失败者是先开战再想办法赢",
      "藏于九地之下：隐藏自己的真实实力，让对手低估你"
    ]
  },
  {
    chapter: 5, id: "bingshi", title: "兵势篇", titleEn: "Energy",
    mechanic: "力量放大",
    gameplay: "用最小的力量产生最大的效果。找到关键点，一击必中。",
    techniques: [
      "转圆石于千仞之山：把力量放在关键位置，让势能替你工作",
      "奇正相生：常规手段和非常规手段交替使用",
      "势如彍弩，节如发机：时机一到，迅速行动"
    ]
  },
  {
    chapter: 6, id: "xushi", title: "虚实篇", titleEn: "Weak Points and Strong",
    mechanic: "信息战",
    gameplay: "让对手不知道你的真实位置和意图。虚则实之，实则虚之。",
    techniques: [
      "攻其所不守：攻击对手没有防备的地方",
      "形人而我无形：让对手暴露位置，而我隐藏自己的",
      "水因地而制流：根据地形调整策略，没有固定模式"
    ]
  },
  {
    chapter: 7, id: "junzheng", title: "军争篇", titleEn: "Maneuvering",
    mechanic: "速度与时机",
    gameplay: "在对手之前到达关键位置。速度是信息战的生命线。",
    techniques: [
      "以迂为直：看似绕远路，实际上是最快的路径",
      "避其锐气，击其惰归：避开对手最强的时候，攻击他最松懈的时候",
      "朝气锐，昼气惰，暮气归：人的状态有周期性，把握时机"
    ]
  },
  {
    chapter: 8, id: "jiubian", title: "九变篇", titleEn: "Variation in Tactics",
    mechanic: "应变能力",
    gameplay: "计划永远赶不上变化。预先准备多个方案，根据局势调整。",
    techniques: [
      "将在外君命有所不受：执行者需要根据现场情况自主决策",
      "无恃其不来，恃吾有以待也：不要期望对手不行动，而要准备好应对",
      "智者之虑，必杂于利害：考虑问题时同时考虑利益和损失"
    ]
  },
  {
    chapter: 9, id: "xingjun", title: "行军篇", titleEn: "The Army on the March",
    mechanic: "环境利用",
    gameplay: "利用地形、天气、社会环境作为你的工具。在不同的环境中采用不同的策略。",
    techniques: [
      "处军相敌：选择营地和观察敌情的方法",
      "兵非贵益多也：兵不在多而在精",
      "令之以文，齐之以武：用教化统一思想，用纪律统一行动"
    ]
  },
  {
    chapter: 10, id: "dixing", title: "地形篇", titleEn: "Terrain",
    mechanic: "地盘控制",
    gameplay: "控制关键位置和信息节点。香港的每个区都有不同的权力结构，了解并利用这些差异。",
    techniques: [
      "通形者先居高阳：先占领有利地形",
      "挂形者敌无备：趁对手没有防备时快速进攻",
      "支形者我出而不利：知道什么时候不该行动"
    ]
  },
  {
    chapter: 11, id: "jiudi", title: "九地篇", titleEn: "The Nine Situations",
    mechanic: "绝境求生",
    gameplay: "当你被逼入绝境时，人会爆发出最大的战斗力。知道如何置之死地而后生。",
    techniques: [
      "投之亡地然后存：把人放在绝境，反而能激发潜力",
      "深入则专：投入越深，决心越大",
      "兵士甚陷则不惧：当风险已经最大时，反而不再恐惧"
    ]
  },
  {
    chapter: 12, id: "huogong", title: "火攻篇", titleEn: "The Attack by Fire",
    mechanic: "精准打击",
    gameplay: "像火攻一样——精确、突然、毁灭性。但只在必要时使用，因为副作用巨大。",
    techniques: [
      "火攻有五：攻击对手的五个关键弱点——人员、物资、财务、组织、声誉",
      "非利不动：没有明确利益不要行动",
      "主不可以怒而兴师：不要让情绪驱动决策"
    ]
  },
  {
    chapter: 13, id: "yongjian", title: "用间篇", titleEn: "The Use of Spies",
    mechanic: "间谍网络",
    gameplay: "建立和管理情报网络。五种间谍各有用途——知道什么时候用哪一种。",
    techniques: [
      "乡间：利用当地人获取信息",
      "内间：利用对手内部的人",
      "反间：利用对手派来的间谍反过来对付他",
      "死间：故意传播虚假信息给对手",
      "生间：派自己的人深入敌后收集情报"
    ]
  }
];

ICAC.sunziById = function(id) {
  for (var i = 0; i < ICAC.sunziData.length; i++)
    if (ICAC.sunziData[i].id === id) return ICAC.sunziData[i];
  return null;
};
