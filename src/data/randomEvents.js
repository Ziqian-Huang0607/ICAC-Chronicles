// ICAC Chronicles — Random Event System
// 16 fragmented power-play events across 4 Phases
// Design philosophy:海量碎片化事件堆叠出宏大权力博弈的颗粒感

ICAC.randomEvents = [

  // ═══════════════════════════════════════════════════════════
  // PHASE 1 — 底层警员期 (Rookie PC / WSP)
  // ═══════════════════════════════════════════════════════════

  {
    id: "p1_street_protection",
    phase: 1,
    weight: 1.0,
    title: { zh: "街头风波", en: "Street Trouble" },
    location: { zh: "春秧街 · 北角", en: "Chun Yeung St, North Point" },
    text: {
      zh: "下午四点，春秧街。你巡逻到水果批发市场附近，看见三个穿花衬衫的年轻人围着一个六十多岁的水果摊老板娘。为首的那个染着金发，手里拿着一根棒球棍，正用棍头戳着老板娘的秤。\n\n'阿婶，这个月的数目不对啊。上个月你说生意差，少了五百。这个月生意好了，怎么还是少五百？'\n\n老板娘低着头，手里攥着一叠皱巴巴的钞票。'真的没有了...昨天进货花了很多...'\n\n你认出来了——那三个人是和合图的小弟，经常在北角一带收保护费。他们的老大是肥佬的侄子，叫阿杰。\n\n金发少年回头看了你一眼，笑了。'哦，差人。放心，我们不会动粗的。只是...跟阿婶算算账。'他晃了晃手里的棒球棍，'PC编号4388，是吧？我记住你了。'\n\n周围的摊贩都在看着你们。没有人出声。在这种街区，沉默是最安全的生存策略。\n\n你想起陈教官说过的话：毛泽东在井冈山的时候，面对地方军阀和国民党的双重压力，选择了'农村包围城市'——不是硬碰硬，是找到系统的裂缝，从边缘渗透。但你现在面临的选择比理论残酷得多：一个老太太的生计，三个混混的威胁，和整个街区对你的观察。",
      en: "4 PM, Chun Yeung Street. Three young men in floral shirts surround an elderly fruit vendor. The leader, blonde-haired, taps her scale with a baseball bat. 'Auntie, the numbers don't add up.' He turns to you. 'PC 4388, right? I'll remember you.' The whole street is watching. Nobody makes a sound."
    },
    choices: [
      {
        text: { zh: "上前制止：'够了，跟我回警署。'", en: "Intervene: 'That's enough. Back to the station.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 10 },
          { type: "stat_change", stat: "psych", value: -5 },
          { type: "relationship", npc: "ah_jie", value: -15 }
        ],
        feedback: { zh: "阿杰恶狠狠地瞪了你一眼，带着人走了。老板娘感激地看着你，但第二天你的警帽被人放在了储物柜里，里面塞了一张写着'多管闲事'的纸条。", en: "They leave glaring. The vendor thanks you, but the next day a note reading 'mind your business' is in your locker." }
      },
      {
        text: { zh: "假装巡逻路过，记下时间和地点", en: "Pretend to patrol past, log time and location" },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "stat_change", stat: "integrity", value: -5 },
          { type: "relationship", npc: "ah_jie", value: 5 }
        ],
        feedback: { zh: "你没有直接冲突，但你的笔记本上多了一条记录。这些碎片在未来某一天可能会拼成一副完整的图画。阿杰朝你点了点头——一种街头的默契。", en: "No direct conflict, but your notebook gains an entry. Ah Jay nods — street-level understanding." }
      },
      {
        text: { zh: "上前调解：'阿杰，给她三天。我担保。'", en: "Mediate: 'Ah Jay, give her three days. I vouch for her.'" },
        consequences: [
          { type: "stat_change", stat: "trust", value: 10 },
          { type: "stat_change", stat: "money", value: -5 },
          { type: "relationship", npc: "ah_jie", value: 10 },
          { type: "relationship", npc: "boss_fat", value: 5 }
        ],
        feedback: { zh: "阿杰挑了挑眉毛。'PC担保？行，给你面子。三天。'他转身走了。老板娘拉住你的手，塞给你一个苹果。你用自己的钱垫上了那五百块保护费。这不是胜利，是...权宜之计。", en: "'PC's word? Fine, three days.' You pay the $500 out of pocket. Not victory — a temporary arrangement." }
      }
    ]
  },

  {
    id: "p1_chief_mistress",
    phase: 1,
    weight: 1.0,
    title: { zh: "红色跑车", en: "The Red Sports Car" },
    location: { zh: "渣华道 · 北角", en: "Java Road, North Point" },
    text: {
      zh: "你在渣华道指挥交通。一辆红色的MG跑车斜斜地停在消防通道上，车门敞着，车载音响放着邓丽君的《月亮代表我的心》。\n\n车主是一个三十出头的女人，穿一身米白色的香奈儿套装，踩着高跟鞋从隔壁的珠宝店走出来，手里拎了几个袋子。她看都没看你一眼，径直走向车门。\n\n你认出了车牌：HK-1388。这是高级警司周SIR的车——名义上是他太太的座驾，但整个警署都知道真正的'车主'是谁。周SIR的情妇，一个上海来的珠宝商遗孀。\n\n去年有个新来的交通警给她贴了罚单，第二天就被调去新界守水塘。\n\n消防通道。按规定，违停罚款$200，可拖走。但你站在烈日下，汗水顺着脖子流进衣领，手里握着罚单簿，感觉它重得像一块砖头。",
      en: "A red MG blocks the fire lane, Teresa Teng pouring from the speakers. The driver emerges from a jewelry store in Chanel. You recognize the plate: HK-1388. Chief Superintendent Chow's 'family car' — everyone knows who really drives it. The last officer who ticketed her was guarding a reservoir in the New Territories the next day."
    },
    choices: [
      {
        text: { zh: "贴罚单，公事公办", en: "Issue the ticket. By the book." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 15 },
          { type: "stat_change", stat: "psych", value: -10 },
          { type: "flag", flag: "ticketed_chows_car", value: true }
        ],
        feedback: { zh: "女人接过罚单，看了一眼，笑了。'新来的？'她把罚单折好，放进包里，'周SIR会记住你的。'她开车走了，留下你和那张罚单存根。当晚，你的值班表被调整了——下周开始上大夜班。", en: "She takes the ticket, smiles. 'New?' Chow will remember you. That night, your shift changes to graveyard." }
      },
      {
        text: { zh: "绕道走开，当作没看到", en: "Walk away. See nothing." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: -10 },
          { type: "stat_change", stat: "trust", value: 10 },
          { type: "relationship", npc: "cst_chow", value: 5 }
        ],
        feedback: { zh: "你转身走向路口的另一端。身后传来汽车发动的声音和一阵香水味。老警察阿强在旁边看着你，点了点头——仿佛在说：'学会了？'这就是警队的生存法则：有些东西看得见，但不能碰。", en: "You turn away. Officer Keung nods. Lesson learned: some things you see but never touch." }
      },
      {
        text: { zh: "记下时间和地点，不贴罚单", en: "Log it. No ticket. Not yet." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "stat_change", stat: "integrity", value: 5 },
          { type: "flag", flag: "logged_chows_car", value: true }
        ],
        feedback: { zh: "你没有贴罚单，但你的口袋里多了一张便签：'1974.3.15，14:30，渣华道，HK-1388，消防通道违停。'这些碎片现在看起来毫无用处。但希特勒在《我的奋斗》里说过：政治是记忆的艺术。记住一切，即使现在用不上。", en: "No ticket, but your pocket holds a note. Hitler wrote: politics is the art of memory. Remember everything, even when you cannot use it yet." }
      }
    ]
  },

  {
    id: "p1_fake_report",
    phase: 1,
    weight: 1.0,
    title: { zh: "润色报告", en: "Polishing the Report" },
    location: { zh: "北角警署 · 行政组", en: "North Point Station, Admin" },
    text: {
      zh: "晚上十点，警署里只剩你和老警察阿强。他端着两杯咖啡走过来，把其中一杯放在你桌上，然后递过来一份报告。\n\n'帮个忙，年轻人。帮我看看这份报告...措辞上有没有问题。'\n\n你翻开一看——是一份伤人案的案情记录。被告是个有黑社会背景的赌场打手，受害者是一个欠了高利贷的小商贩。报告的措辞明显偏向被告：'双方在争执中发生肢体接触'、'受害者首先表现出攻击性'、'被告的行为属于自卫性质'。\n\n但你知道真相——那个商贩现在还躺在伊丽莎白医院，断了三根肋骨。而那个打手，昨天还在福记茶餐厅跟林警长喝茶。\n\n阿强靠在桌边，压低声音：'大家都这么做。你写好了，下星期我请你饮茶。北角最好的茶楼，福记。'他特意强调了'福记'两个字，好像那是一个暗号。\n\n你想起斯大林说过：在一个每个人都撒谎的系统里，说真话的人是叛徒。你现在明白了这句话的重量。",
      en: "10 PM. Only you and Officer Keung remain. He hands you a report to 'polish.' You read it: a gang enforcer beat a shopkeeper within an inch of his life, but the report frames it as 'self-defense.' Keung leans in: 'Everyone does this. Do it well, I'll treat you to tea at Fuk Kee.' He emphasizes Fuk Kee like a code word."
    },
    choices: [
      {
        text: { zh: "拒绝：'我不能写这个。'", en: "Refuse: 'I can't write this.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 15 },
          { type: "relationship", npc: "officer_keung", value: -20 },
          { type: "stat_change", stat: "trust", value: -10 }
        ],
        feedback: { zh: "阿强的表情僵住了。他慢慢收起报告，咖啡也没喝。'好。有原则。'他转身走了，声音在走廊里回荡：'希望你能一直这么有原则。'第二天，你发现所有人都对你客气了几分——但也疏远了几分。在警队，'有原则'有时候是一个危险的标签。", en: "Keung's face freezes. 'Principles. Hope you can afford them.' The next day, everyone is politer — and more distant." }
      },
      {
        text: { zh: "照做，但偷偷复印了一份原版", en: "Do it. But keep a copy." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 20 },
          { type: "stat_change", stat: "integrity", value: -5 },
          { type: "relationship", npc: "officer_keung", value: 10 },
          { type: "flag", flag: "copied_fake_report", value: true }
        ],
        feedback: { zh: "你花了半小时改好了报告，措辞滴水不漏。阿强满意地收走了。但在他转身的那一刻，你已经把原版塞进了自己的文件夹。这不是背叛——是保险。撒切尔夫人在跟内阁大臣谈判的时候，总是让秘书在门外记录每一句话。知道别人不知道的事，是最基本的权力。", en: "You rewrite it perfectly. But the original is now in your folder. Thatcher always had a secretary record every word. Knowing what others don't — the most basic power." }
      },
      {
        text: { zh: "照做，但把假报告的信息通过阿May转给ICAC", en: "Do it. Then leak it to ICAC through May." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 10 },
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "relationship", npc: "officer_keung", value: 5 },
          { type: "flag", flag: "leaked_to_icac", value: true }
        ],
        feedback: { zh: "你完美地完成了报告，获得了阿强的信任。但当晚，阿May在复印室'不小心'多印了一份——那份原版。几天后，黄Sir的档案柜里多了一份关于北角伤人案处理不当的匿名材料。你同时坐在了棋盘的两边。这不是不诚实——这是...做局术。", en: "You gain Keung's trust. But that night, an 'extra' copy finds its way to Wong Sir's filing cabinet. You sit on both sides of the board." }
      }
    ]
  },

  {
    id: "p1_mays_test",
    phase: 1,
    weight: 0.8,
    title: { zh: "残缺档案", en: "The Incomplete File" },
    location: { zh: "北角警署 · 档案室", en: "North Point Station, Records" },
    text: {
      zh: "档案室。阿May递给你一份牛皮纸袋。\n\n'这是你上次要的福记茶餐厅举报记录。'她面无表情地说，然后转身整理文件去了。\n\n你打开纸袋，里面是三页泛黄的记录纸。第一页是1973年6月的一份举报信，说福记涉及非法聚赌。第二页是调查报告，结论是'证据不足，不予立案'。第三页...第三页只有半张，边缘有明显的撕痕。剩下的部分不见了。\n\n你盯着那半张纸。上面依稀可见几个字：'...据线人提供，每月十五...薛...'然后就没有了。\n\n你抬头看阿May。她背对着你，但你知道她知道你发现了什么。\n\n这是故意的。她在测试你。看你什么反应——是追问，是沉默，还是...假装没注意？\n\n阿May在警署十年，从打字员做到行政组副主任。她见过五个指挥官来来去去，见过三任ICAC专员无功而返，见过无数个像你这样的年轻人满怀热情地来，然后悄无声息地走。\n\n如果她给你一份残缺档案，那一定是有原因的。问题是：你愿意走进这个测试吗？",
      en: "May hands you a file. Inside are three yellowed pages about Fuk Kee. The third page is torn — the bottom half missing. Faint words remain: '...according to informant, every 15th...Hsueh...' You look up. May's back is turned, but you know she knows. She's testing you. Ten years at this station. Five commanders. Three ICAC commissioners. Countless rookies like you. She has her reasons. The question is: do you step into the test?"
    },
    choices: [
      {
        text: { zh: "'阿May，这页缺了一半。'", en: "'May, half a page is missing.'" },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "relationship", npc: "ah_may", value: 10 }
        ],
        feedback: { zh: "阿May转过身，嘴角有一丝几乎看不见的笑意。'是吗？让我看看。'她接过档案，翻了翻，'哦，可能是装订的时候弄丢了。我帮你找找。'三天后，你的储物柜里多了一份文件——完整的第三页，还多了一份1973年全年的举报汇总。她给了你一个入口。但入口后面是什么，要看你自己了。", en: "May turns. A ghost of a smile. 'Let me check.' Three days later, your locker holds the complete page — plus a full year of complaints. She gave you an entrance. What's behind it is up to you." }
      },
      {
        text: { zh: "不追问，自己去别处查", en: "Don't ask. Find out yourself." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 20 },
          { type: "stat_change", stat: "psych", value: -10 },
          { type: "flag", flag: "investigated_alone", value: true }
        ],
        feedback: { zh: "你把档案还了回去，什么都没说。但那个晚上，你在交通组的废弃文件柜里翻了三个小时。拿破仑说过：信息就是权力。他通过阅读敌方报纸来了解战场动态，通过窃听外交官的谈话来预判联盟变化。你也一样——只不过你的战场是一个潮湿的文件柜。", en: "You return the file silently. That night, you dig through discarded records for three hours. Napoleon said: information is power. Your battlefield is a damp filing cabinet." }
      },
      {
        text: { zh: "当作没注意，把档案归档", en: "Pretend not to notice. File it away." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 10 },
          { type: "stat_change", stat: "integrity", value: -5 },
          { type: "relationship", npc: "ah_may", value: -5 }
        ],
        feedback: { zh: "你把档案放进了归还篮。阿May看了你一眼——那眼神里有失望，也有...确认？'知道什么时候不问问题，也是一种技能。'她低声说。但你知道，从她那个眼神里，你失去了一样东西：她的尊重。在未来的某个时刻，当所有人都站队的时候，阿May可能会选择不站在你这边。而这，可能就是决定性的一票。", en: "You file it away. May looks at you — disappointment, confirmation? 'Knowing when not to ask is also a skill.' But you lost something: her respect. When everyone picks a side, May might not pick yours. And that could be the deciding vote." }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE 2 — 双重身份期 (Traffic / ICAC Informant)
  // ═══════════════════════════════════════════════════════════

  {
    id: "p2_smuggle_convoy",
    phase: 2,
    weight: 1.0,
    title: { zh: "深夜车队", en: "The Night Convoy" },
    location: { zh: "渣华道 · 交通岗", en: "Java Road Traffic Post" },
    text: {
      zh: "凌晨两点十七分。渣华道。\n\n三辆没有正确报关标签的货车从你面前驶过。第一辆是白色的三菱Fuso，车牌HK-4471。第二辆是蓝色的五十铃，车牌HK-8893。第三辆是黑色的丰田Dyna，车窗贴着深色隔热膜。\n\n你认识这些车。北角运输公司的车队——林警长的'合法生意'。每个月十五号，它们准时从码头出发，走渣华道转英皇道，然后消失在中环的某个仓库里。\n\nCargo manifest上写的是'日用品'。但你上个月偷偷记过一次车牌——那辆白色Fuso三天后被拍到在新界的某个仓库卸货，下来的'日用品'是一箱一箱的...电子零件。没有报税单，没有进口许可。\n\n走私。\n\n第一辆车经过你身边的时候，司机放慢了速度。车窗摇下。阿光的脸露出来——林警长的司机兼'业务经理'。他朝你点点头，手里晃着一包万宝路。'风大，PC。进去岗亭喝杯热茶吧。'\n\n这不是建议。是通知。",
      en: "2:17 AM. Three unlabeled trucks pass your post. You know them — North Point Transport, Sergeant Lam's 'legitimate business.' The driver is Ah Kwong. He slows down, window rolling down. 'Windy night, PC. Have some tea in the booth.' Not a suggestion. A notification."
    },
    choices: [
      {
        text: { zh: "举手示意停车：'请出示报关文件。'", en: "Signal to stop: 'Customs documents, please.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 20 },
          { type: "stat_change", stat: "psych", value: -15 },
          { type: "relationship", npc: "sgt_lam", value: -25 },
          { type: "relationship", npc: "ah_kwong", value: -20 }
        ],
        feedback: { zh: "阿光的表情瞬间凝固。他没有停车，反而踩了一脚油门。三辆车加速驶过，消失在夜色中。但你记下了所有细节——时间、车牌、车型、数量。这些信息后来出现在黄Sir的档案里，成为了Operation Storm证据链上的一环。代价是：第二天你被调去了最偏远的岗位——新界边境巡逻。林警长的'安排'。", en: "Ah Kwong's face freezes. He floors it instead. You log every detail — later becoming part of Operation Storm's evidence chain. The cost: reassigned to the New Territories border." }
      },
      {
        text: { zh: "假装没注意，记下车牌", en: "Pretend not to see. Log the plates." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 20 },
          { type: "stat_change", stat: "integrity", value: 5 },
          { type: "relationship", npc: "sgt_lam", value: 5 },
          { type: "flag", flag: "logged_smuggle_plates", value: true }
        ],
        feedback: { zh: "你退进了岗亭。阿光笑了，扔进来那包万宝路。'聪明的PC。'车队消失在黑暗中。你从口袋里掏出笔记本——希特勒在最危险的时候选择忍耐，不是因为他懦弱，是因为他清楚：现在出手，什么都改变不了。但记住一切，等到时机成熟...", en: "You step into the booth. Ah Kwong smiles, tosses in the cigarettes. 'Smart PC.' Hitler endured not from weakness — but because he knew: strike now, change nothing. Remember everything. Wait." }
      },
      {
        text: { zh: "主动帮忙开路：'这边走，前面没有同事。'", en: "Help clear the way: 'No colleagues ahead. Go.'" },
        consequences: [
          { type: "stat_change", stat: "trust", value: 20 },
          { type: "stat_change", stat: "integrity", value: -15 },
          { type: "relationship", npc: "sgt_lam", value: 20 },
          { type: "relationship", npc: "ah_kwong", value: 15 },
          { type: "money", value: 10 }
        ],
        feedback: { zh: "阿光愣了一下，然后大笑。他从车窗里扔出一个牛皮纸信封——里面是一叠钞票。'林Sir说得对，你是聪明人。'你接过信封，感觉它在手里发烫。这是你第一次从林警长的网络里拿钱。不是最后一笔。这扇门的特点是一旦推开，就再也关不上了。", en: "Ah Kwong laughs, tosses an envelope. 'Lam Sir was right. You're smart.' The envelope burns in your hand. Your first payment from Lam's network. Not the last. This door only opens inward." }
      }
    ]
  },

  {
    id: "p2_icac_passerby",
    phase: 2,
    weight: 0.8,
    title: { zh: "陌生人", en: "The Stranger" },
    location: { zh: "福记茶餐厅 · 北角", en: "Fuk Kee Cafe, North Point" },
    text: {
      zh: "你在福记吃下午茶——一个菠萝油，一杯冻奶茶。这是你在交通组养成的习惯：每天下午三点，来福记坐十五分钟，观察进出的每一个人。\n\n今天福记很空。老板娘阿珍在柜台后面算账，收音机里放着商业电台的节目。你坐在角落的位置，背对墙壁，面向门口——这是陈教官教你的：永远不要让任何人出现在你背后。\n\n一个穿灰色工装的男人推门进来，径直走向你的桌子。'不好意思，借过。'他从你身边挤过去的时候，'不小心'撞到了你的手臂。\n\n'对不起对不起。'他连声道歉，弯腰捡起掉在地上的东西——然后消失在厨房的方向。\n\n你低头看桌子。你的奶茶旁边多了一张折叠的纸条。\n\n你打开它。上面只有一行字：\n\n'明天下午三点，铜锣湾图书馆。戴蓝色领带。一个人来。'\n\n没有署名。没有暗号。但你认出了字迹——黄Sir的。\n\nICAC在联系你。但问题是：福记是林警长的地盘。你在这里收到ICAC的纸条，意味着有人看到了全过程。是福记的老板娘？还是刚才那个穿工装的男人本身就是林警长的人？\n\n信任，在任何间谍小说里都是最奢侈的商品。",
      en: "3 PM at Fuk Kee. A man in gray overalls 'accidentally' bumps your table. When he leaves, a folded note sits beside your milk tea: 'Tomorrow 3 PM, Causeway Bay Library. Blue tie. Come alone.' You recognize Wong Sir's handwriting. But Fuk Kee is Lam's territory. Who saw this? The owner's wife? Or was the man himself one of Lam's people? Trust is the most expensive commodity in any spy story."
    },
    choices: [
      {
        text: { zh: "按时赴约", en: "Go to the meeting." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 15 },
          { type: "stat_change", stat: "credibility", value: 10 },
          { type: "flag", flag: "met_icac_library", value: true }
        ],
        feedback: { zh: "你去了。铜锣湾图书馆三楼，历史区，最里面的桌子。黄Sir坐在那里，面前摊着一本《香港年鉴1973》。'你来了。'他说，'这意味着你愿意成为...麻雀。'从那天起，你有两个身份：白天是交通组的PC 4388，晚上是ICAC的代号'麻雀'。这种双重生活会让你失去睡眠，但不眠之夜是成为某种人的代价。", en: "Third floor, history section. Wong Sir sits with Hong Kong Yearbook 1973. 'You came. That means you're willing to be... Sparrow.' From that day: PC 4388 by day, ICAC informant by night. Insomnia is the price of becoming something." }
      },
      {
        text: { zh: "不去，但把纸条交给林警长", en: "Don't go. Give the note to Sergeant Lam." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 20 },
          { type: "stat_change", stat: "integrity", value: -20 },
          { type: "relationship", npc: "sgt_lam", value: 25 }
        ],
        feedback: { zh: "你把纸条放在林警长的办公桌上。他拿起来看了一眼，然后点燃打火机，烧了它。'好。'他说，只有一个字。但从那天起，他看你的眼神变了——不再是测试，而是...接纳。你成了他的人。彻底。这是撒切尔夫人的策略：永远不坐两边。选一边，坐到死。", en: "You place the note on Lam's desk. He reads it, lights a lighter, burns it. 'Good.' One word. But his look changes — no longer testing, but accepting. You are his. Completely. Thatcher's strategy: never sit on both sides. Pick one. Sit until you die." }
      },
      {
        text: { zh: "不去，撕掉纸条当作没收到", en: "Don't go. Tear it up. Pretend it never happened." },
        consequences: [
          { type: "stat_change", stat: "psych", value: -10 },
          { type: "stat_change", stat: "trust", value: -5 },
          { type: "stat_change", stat: "integrity", value: -5 }
        ],
        feedback: { zh: "你把纸条撕碎，冲进了福记的厕所。站在镜子前，你看着自己。你会发现一个可怕的事实：不选择，本身就是一种选择。而且是最坏的那种——因为它让你同时失去了两边的信任。ICAC认为你不可靠，林警长认为你不可控。曼德拉在罗本岛花了27年才学会一件事：中立不是美德，是懦弱。", en: "You flush the pieces down Fuk Kee's toilet. In the mirror, you face a terrible truth: not choosing is itself a choice. And the worst kind — you lose both sides' trust. Mandela spent 27 years on Robben Island learning: neutrality is not virtue, it is cowardice." }
      }
    ]
  },

  {
    id: "p2_walled_city_drugs",
    phase: 2,
    weight: 1.0,
    title: { zh: "城寨暗影", en: "Shadows of the Walled City" },
    location: { zh: "九龙城寨外围 · 龙岗道", en: "Outside Walled City, Lung Kong Road" },
    text: {
      zh: "你巡逻到九龙城寨外围——一条叫龙岗道的小巷。这里是'三不管'地带的边缘：香港警察不敢进，中国政府不想管，英国政府不愿碰。\n\n巷子尽头停着一辆黑色的丰田皇冠。两个人站在车旁边：一个是小光，你之前在福记见过他——和胜和的红棍，林警长的'线人'。另一个是戴着墨镜的鬼佬，穿皮夹克，背着一个运动包。\n\n小光从鬼佬手里接过一个东西。很小，用报纸包着。他们说了几句话——距离太远你听不到——然后鬼佬上车走了。\n\n小光站在原地，把那包东西塞进夹克内袋。然后他抬头，看到了你。\n\n你们的目光相遇。隔着三十米的距离。\n\n你看到了他脸上的表情：不是惊讶，不是恐惧，是...评估。他在评估你。评估你看到了多少，评估你会做什么，评估你值不值得...被处理。\n\n城寨的空气永远带着一种潮湿的发霉味和远处 garbage 的酸臭。但此刻，你闻到的只有危险。纯粹的危险。",
      en: "Lung Kong Road, the Walled City's edge. Three-no-man's-land: HK police dare not enter, China doesn't want to govern, Britain won't touch. A black Toyota Crown. Two figures: Siu Kwong, the triad red pole you saw at Fuk Kee. And a foreigner in sunglasses. An exchange. Newspaper-wrapped. Then Siu Kwong looks up. Your eyes meet across thirty meters. His expression: not surprise, not fear — assessment. Assessing what you saw, what you'll do, whether you're worth... handling."
    },
    choices: [
      {
        text: { zh: "上前亮明身份：'警察，站着别动。'", en: "Approach: 'Police. Freeze.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 20 },
          { type: "stat_change", stat: "psych", value: -15 },
          { type: "relationship", npc: "siu_kwong", value: -30 },
          { type: "relationship", npc: "sgt_lam", value: -20 }
        ],
        feedback: { zh: "小光没有跑。他慢慢举起双手，笑了。'PC，你知道这是谁的地盘吗？'他指了指身后的城寨入口——黑暗像一张嘴。'你前进一步，你就不是警察了。你只是一具尸体。'他转过身，走进城寨。你站在原地，手里握着警棍，却感觉自己是手无寸铁的那个。但回去之后，你的报告里多了一条：'1974.4.8，龙岗道，疑似毒品交易，涉及和胜和成员。'这是你的记录，你的保险，你的...武器。", en: "Siu Kwong raises his hands, smiling. 'PC, do you know whose turf this is?' He points to the Walled City's mouth of darkness. 'One more step, you're not police. You're a corpse.' He turns and walks in. But your report gains an entry: suspected drug deal. Your record. Your insurance. Your weapon." }
      },
      {
        text: { zh: "藏在暗处，用手机远距离拍照", en: "Hide in shadows. Take photos from afar." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 25 },
          { type: "stat_change", stat: "psych", value: -5 },
          { type: "flag", flag: "photo_drug_deal", value: true }
        ],
        feedback: { zh: "你退进了旁边的巷子里。掏出ICAC给你的微型相机——伪装成打火机——按了三下快门。距离太远，光线太暗，但小光的侧脸和那辆皇冠的车牌都进去了。丘吉尔在达达尼尔海峡战役失败后，没有正面攻击，而是绕过地中海从希腊撤退——保存实力，等待更好的时机。你现在也是。", en: "You retreat into an alley. The ICAC mini-camera — disguised as a lighter — clicks three times. Churchill after Gallipoli didn't attack head-on. He retreated through Greece, preserved strength, waited. So do you." }
      },
      {
        text: { zh: "转身离开，当作什么都没看到", en: "Turn and walk away." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 15 },
          { type: "stat_change", stat: "integrity", value: -10 },
          { type: "relationship", npc: "siu_kwong", value: 15 }
        ],
        feedback: { zh: "你转身，沿着来时的路走回去。每一步都像是踩在碎玻璃上。但你没有回头。身后传来小光的声音：'聪明的PC。'不是嘲讽，是...认可。在城寨的规则里，不看见是一种尊重，不干预是一种智慧，不记住...是一种生存技能。小光后来在福记请你喝过一杯酒。那杯酒里没有毒，但你知道：从现在开始，你欠他一个人情。而在香港，人情比高利贷更难还。", en: "You walk back. Each step on broken glass. But you don't look back. Siu Kwong's voice: 'Smart PC.' Not mockery — approval. In Walled City rules, not-seeing is respect, not-intervening is wisdom. Later he buys you a drink at Fuk Kee. No poison. But you owe him a favor. In Hong Kong, favors cost more than loans." }
      }
    ]
  },

  {
    id: "p2_locker_room",
    phase: 2,
    weight: 0.9,
    title: { zh: "更衣室", en: "The Locker Room" },
    location: { zh: "北角警署 · 地下更衣室", en: "North Point Station, Locker Room" },
    text: {
      zh: "你站在更衣室的储物柜前，刚解开衬衫的第一颗扣子。\n\n隔壁隔间里传来两个声音。你认出来——阿强和阿Ben，刑侦组的两个老油条。他们以为更衣室里没人。\n\n'...那个新来的，交通组那个，听说跟ICAC有联系。'\n\n'谁说的？'\n\n'阿May啊。她说看到有人在福记塞纸条给他。'\n\n沉默。\n\n'如果是真的，那他活不过半年。林Sir最讨厌内鬼。'\n\n'也不一定。张Sir那边好像在保他。上周我看见他从张Sir办公室出来。'\n\n'张Sir？那事情就复杂了。两个大佬各押一边...'\n\n水流声。他们在洗手。\n\n'你觉得呢？他是哪边的人？'\n\n'谁知道。也许...两边都不是。也许他以为自己有选择。'\n\n笑声。\n\n你站在自己的储物柜前，衬衫半解，手里攥着皮带。他们的每一句话都像一根针。阿May看到了？她在监视你？还是...她在保护你，用'泄露'的方式提醒你？\n\n信息在警队流通的方式永远不是直接的。它通过'不小心'听到的对话、'偶然'看到的眼神、'无意'中说漏的嘴来传递。每个信息都是一颗子弹，打向谁取决于谁扣动扳机。",
      en: "At your locker, first button undone. Two voices from the next stall — Keung and Ben, CID veterans. They think they're alone. '...the new guy, traffic unit. Word is he's connected to ICAC.' 'Who says?' 'May. She saw someone pass him a note at Fuk Kee.' Silence. 'If true, he won't last six months. Lam hates rats.' 'Not necessarily. Chief Inspector Cheung seems to be protecting him.' 'Cheung? Then it's complicated. Two bosses betting on different horses...' You stand there, belt in hand, every word a needle. Is May watching you? Or protecting you — warning you by 'leaking'?"
    },
    choices: [
      {
        text: { zh: "故意重重关上柜门，让他们知道你听见了", en: "Slam your locker. Let them know you heard." },
        consequences: [
          { type: "stat_change", stat: "psych", value: -10 },
          { type: "stat_change", stat: "trust", value: -15 },
          { type: "flag", flag: "locker_room_confronted", value: true }
        ],
        feedback: { zh: "砰。柜子门撞在金属框架上的声音在地下室里回响。隔壁瞬间安静了。然后——脚步声，两个人的，匆匆离开了更衣室。你知道从明天开始，所有人都知道你听见了。这是一种宣告：'我知道你们在说我。'但宣告是有代价的。在情报战中，暴露自己知道多少，等于暴露自己的底牌。", en: "BANG. The echo dies. Footsteps scurry away. Everyone will know by tomorrow. You've declared: 'I heard you.' But in intelligence work, revealing what you know equals revealing your hand." }
      },
      {
        text: { zh: "保持安静，继续听", en: "Stay silent. Keep listening." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 20 },
          { type: "stat_change", stat: "psych", value: -5 },
          { type: "flag", flag: "heard_locker_intel", value: true }
        ],
        feedback: { zh: "你一动不动。他们又说了十五分钟——关于张Sir和林Sir的权力斗争，关于ICAC即将展开的Operation Storm，关于一个代号为'麻雀'的线人。斯大林在克里姆林宫有个习惯：每次开会的时候，他坐在角落里不说话，让别人以为他不重要。但其实他听到了一切。等他开口的时候，每个人都发现自己已经说太多了。", en: "You don't move. Fifteen more minutes — about Cheung vs Lam, about ICAC's upcoming Operation Storm, about an informant codenamed 'Sparrow.' Stalin sat in corners, silent, letting everyone think him unimportant. When he spoke, everyone realized they'd said too much." }
      },
      {
        text: { zh: "咳嗽一声，然后自然地跟他们打招呼", en: "Cough. Greet them naturally." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 10 },
          { type: "stat_change", stat: "psych", value: -5 },
          { type: "relationship", npc: "officer_keung", value: 5 }
        ],
        feedback: { zh: "'咳——咳。'然后你绕过去，'阿强，阿Ben，今晚踢球去不？'他们明显愣了一下，然后迅速恢复正常。'哦，是你啊。不去了，今晚加班。'你笑着点点头，开始换衣服。表面上的友好比敌意更有用——因为敌人会防着你，但朋友不会。这是李光耀在新加坡的做法：让对手以为你是自己人，直到他们发现的时候已经太晚了。", en: "'Evening game?' you ask casually. They freeze, then recover. Friends are more useful than enemies — enemies guard against you; friends don't. Lee Kuan Yew's method: let opponents think you're one of them until it's too late." }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE 3 — 督察期 (Office Politics)
  // ═══════════════════════════════════════════════════════════

  {
    id: "p3_bonus_distribution",
    phase: 3,
    weight: 1.0,
    title: { zh: "年底分金", en: "Year-End Dividends" },
    location: { zh: "北角警署 · 督察办公室", en: "Inspector's Office, North Point" },
    text: {
      zh: "年底。你有五千港币的'表现奖金'要分配给五个下属。\n\n阿杰——跟着你破了上个月那宗走私案，但性格冲动，经常越级汇报。\n\n阿珍——行政出身，做事稳妥，但缺乏现场经验，不太受前线警员尊重。\n\n老陈——二十年老警长，经验丰富但最近身体不太好，明年可能要提前退休。\n\n小敏——唯一的女下属，O记调过来的，专业能力强但和CID这边的人总有些摩擦。\n\n阿龙——张Sir推荐进来的人，能力一般，但背景深厚。\n\n五千块。平均每人一千，谁都不会满意。给某个人的多了，其他人的少了，办公室里的人心就会起变化。\n\n希特勒在组建纳粹党的时候，最擅长的就是分配资源——不是平均分配，是有策略地倾斜。给谁、不给谁、给多少，每一个决定都在塑造权力结构。\n\n奖金只是表面。真正的游戏是：你想让谁成为你的派系核心？",
      en: "Year-end. $5,000 performance bonus for five subordinates. Ah Jay — closed last month's smuggling case but reports above your head. Jane — reliable admin but no street cred. Old Chen — twenty years, ailing, retiring soon. Minnie — transferred from O-Unit, capable but friction with CID. Long — Cheung's recommendation, mediocre but connected. $5,000. Even split satisfies nobody. Hitler's real skill was strategic allocation: who gets what shapes the power structure. The bonus is surface. The real game: who becomes your faction's core?"
    },
    choices: [
      {
        text: { zh: "按功绩分配：阿杰1500，小敏1500，老陈1000，阿珍500，阿龙500", en: "By merit: Jay 1500, Minnie 1500, Chen 1000, Jane 500, Long 500" },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "stat_change", stat: "trust", value: 10 },
          { type: "relationship", npc: "ah_jie_sub", value: 20 },
          { type: "relationship", npc: "minnie", value: 20 },
          { type: "relationship", npc: "along", value: -15 }
        ],
        feedback: { zh: "阿杰和小敏眼睛亮了。老陈默默点点头。阿珍低下头继续写字。阿龙的表情没有变化，但你知道——他会把这件事告诉张Sir。按功绩分配是最'公平'的做法，但公平本身就是一种政治立场：你选择了专业主义而不是关系网络。这在长期来看是健康的，但短期内会让你失去张Sir一系的支持。", en: "Jay and Minnie's eyes light up. Fairness is itself a political stance — you chose meritocracy over connections. Healthy long-term, but you lose Cheung's faction's support." }
      },
      {
        text: { zh: "制造派系：阿杰2000，阿龙1500，小敏500，老陈500，阿珍500", en: "Build factions: Jay 2000, Long 1500, Minnie 500, Chen 500, Jane 500" },
        consequences: [
          { type: "stat_change", stat: "trust", value: 25 },
          { type: "stat_change", stat: "integrity", value: -15 },
          { type: "relationship", npc: "ah_jie_sub", value: 30 },
          { type: "relationship", npc: "along", value: 25 },
          { type: "relationship", npc: "minnie", value: -20 },
          { type: "relationship", npc: "old_chen", value: -10 }
        ],
        feedback: { zh: "阿杰几乎要站起来敬礼。阿龙微微一笑——那是张Sir的人收到信号时的表情。但小敏没有说话，只是把分配表折好放进了抽屉。老陈叹了口气。你成功地制造了一个核心派系，但你也制造了对立面。这是毛泽东的'统一战线'策略：团结一部分人，孤立一部分人，打击一部分人。问题是，被孤立和被打击的人不会永远沉默。", en: "Jay nearly salutes. Long's smile is Cheung's man receiving a signal. But Minnie says nothing, folding the sheet into her drawer. You've built a core faction and an opposition. Mao's United Front: unite some, isolate some, strike some. The isolated won't stay silent forever." }
      },
      {
        text: { zh: "全部给老陈：'您明年退休了，算兄弟们的心意。'", en: "All to Chen: 'Your retirement gift, from all of us.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 20 },
          { type: "stat_change", stat: "trust", value: -10 },
          { type: "relationship", npc: "old_chen", value: 40 },
          { type: "relationship", npc: "ah_jie_sub", value: -10 },
          { type: "relationship", npc: "along", value: -10 }
        ],
        feedback: { zh: "老陈愣在那里，然后眼眶红了。他站起来，拍了拍你的肩膀。'我干了二十年，第一次有人...'他说不下去。但这个决定在其他四个人中引起了微妙的反应——不是不满，是...重新评估。他们看到了你的价值观，这比任何派系斗争都更有说服力。曼德拉在成为总统之后，第一个任命的白人官员是他的前狱卒——不是为了报复，是为了证明：宽容是最高级的权力。", en: "Chen's eyes redden. The others don't show displeasure — reassessment. They see your values. Mandela's first white appointee was his former jailer — not revenge, but proof: forgiveness is the highest form of power." }
      }
    ]
  },

  {
    id: "p3_cheung_trap",
    phase: 3,
    weight: 1.0,
    title: { zh: "借刀杀人", en: "The Borrowed Knife" },
    location: { zh: "张Sir办公室 · 总部", en: "Chief Inspector Cheung's Office" },
    text: {
      zh: "张Sir的办公室比你想象的小。一张胡桃木书桌，一把皮椅，墙上挂着一幅水墨画——'观沧海'。\n\n他示意你坐下，然后从抽屉里拿出一份文件。\n\n'李Sir。O记的新星。三年破了十二宗大案，上个月还被港督点名表扬。'张Sir的语气平淡得像在念天气预报。'问题是，他开始查北角的事了。'\n\n他把文件推到你面前。是一份O记的内部调查报告——关于北角'疑似三合会渗透警队'的线索汇总。署名：李Sir。\n\n'李Sir很有才华。有才华的人，通常有两个特点：自信，和...容易犯错。'张Sir靠在椅背上，'我要你帮他犯一个错。'\n\n他递给你一张照片。照片上是一个年轻人，站在码头旁边。\n\n'这是李Sir的线人，叫阿东。实际上，阿东是我的线人。三年前就安插在李Sir身边的。'张Sir笑了，'我要你把阿东的'真实身份'泄露给李Sir的竞争对手——O记的另一位督察，王Sir。'\n\n你明白了。张Sir要借你的手，让王Sir去揭穿李Sir的线人有问题，从而摧毁李Sir的信誉。\n\n'李Sir查北角，等于查我。'张Sir站起来，走到窗前，'而查我的人，不能有好下场。这不只是权力斗争，这是...生存。'\n\n你看着手里的照片。照片上的阿东看起来不到二十五岁，眼神里有年轻人的锐气。他可能不知道自己是张Sir的棋子，也不知道你即将成为张Sir的另一枚棋子。\n\n权力的游戏里，最可怕的不是你是棋子——是你已经学会了下棋的手法。",
      en: "Cheung's office is smaller than expected. He slides a file across the desk. 'Inspector Lee. O-Unit's rising star. Twelve major cases in three years, commended by the Governor last month.' His tone is weather-report flat. 'Problem is, he's started looking into North Point.' The file contains Lee's internal report on triad infiltration. 'Talented people share two traits: confidence, and... making mistakes. I need you to help him make one.' He hands you a photo. 'This is Lee's informant, Ah Tung. Actually, he's been my informant for three years. I want you to leak his 'real identity' to Lee's rival — Inspector Wang of O-Unit.' You understand: Cheung wants you to set up Lee's public humiliation. 'Lee investigating North Point means investigating me. And those who investigate me... cannot fare well.' You look at the photo. Ah Tung looks under twenty-five, eyes full of youthful edge. He doesn't know he's Cheung's pawn, or that you're about to become another."
    },
    choices: [
      {
        text: { zh: "照做：把阿东的信息泄露给王Sir", en: "Do it. Leak Ah Tung's info to Wang." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 25 },
          { type: "stat_change", stat: "integrity", value: -20 },
          { type: "relationship", npc: "zhang_sir", value: 30 },
          { type: "flag", flag: "framed_lee", value: true }
        ],
        feedback: { zh: "你把消息'不经意'地透露给了王Sir的心腹。三天后，O记内部会议上，王Sir当众质疑李Sir的线人可靠性。李Sir的脸色从红变紫再变白。一周后，李Sir被调往交通组——从O记明星变成了交通岗的PC。张Sir在走廊里遇见你，只说了一句：'做得好。'但你晚上睡不着。李Sir可能不是好人，但他不一定是坏人。你只是摧毁了一个陌生人的职业生涯，因为你的上司让你这么做。希特勒说过：领袖不承担责任，责任属于追随者。但你现在既是追随者，也是执行者。", en: "You 'casually' leak the info. Three days later, Wang publicly questions Lee's informant. A week later, Lee's in traffic. Cheung passes you in the corridor: 'Well done.' But you can't sleep. Lee might not be good, but he might not be bad. You destroyed a stranger's career because your boss asked. Hitler said leaders don't bear responsibility — followers do. But you're both follower and executioner." }
      },
      {
        text: { zh: "拒绝：'张Sir，我不做这种事。'", en: "Refuse: 'Sir, I don't do this kind of thing.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 20 },
          { type: "stat_change", stat: "trust", value: -20 },
          { type: "relationship", npc: "zhang_sir", value: -25 }
        ],
        feedback: { zh: "张Sir没有生气。他只是看着你，看了很久。然后他把文件收回抽屉，站起来，走到你面前。'好。有原则。'他说，但他的语气不是在赞美——是在做笔记。'有原则的人，在我的世界里，只有两个结局。要么成为英雄，要么成为烈士。你自己选。'他转身回到窗前，背对着你。'你可以走了。'你走出办公室，感觉背后有一双眼睛在盯着你的每一个决定。从那天起，张Sir不再给你特殊任务。但也不会给你任何保护。你成为了...孤立的棋子。", en: "Cheung doesn't get angry. He studies you. 'Principles. In my world, principled people have two endings: hero or martyr. Your choice.' He turns away. 'You can go.' From that day, Cheung gives you no special tasks — and no protection. You are an isolated piece." }
      },
      {
        text: { zh: "做，但提前通知李Sir", en: "Do it. But warn Lee first." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 25 },
          { type: "stat_change", stat: "integrity", value: 10 },
          { type: "stat_change", stat: "psych", value: -15 },
          { type: "relationship", npc: "zhang_sir", value: -10 },
          { type: "flag", flag: "warned_lee", value: true }
        ],
        feedback: { zh: "你在泄露消息之前，通过阿May给李Sir传了一张纸条：'阿东有问题。保护好自己。'李Sir收到消息后，立刻切断了和阿东的所有联系，同时开始反查阿东的背景。王Sir的揭穿落空了。张Sir怀疑有人走漏了风声，但没有证据指向你。你同时坐在了两边——这是做局术的最高境界，也是最大的危险。丘吉尔在二战期间同时跟美国和苏联保持友好关系，两边都以为他是自己人。但实际上，他只忠于一个目标：英国的生存。你也一样。", en: "Before leaking, you warn Lee through May. Lee cuts ties with Ah Tung immediately. Wang's exposure falls flat. Cheung suspects a leak but has no proof. You sit on both sides — the highest form of gamecraft, and the greatest danger. Churchill maintained friendship with both America and Russia, each thinking him theirs. He served only Britain's survival. So do you." }
      }
    ]
  },

  {
    id: "p3_casino_visit",
    phase: 3,
    weight: 1.0,
    title: { zh: "地下赌场", en: "The Underground Casino" },
    location: { zh: "和胜和地下赌场 · 湾仔", en: "Wo Shing Wo Casino, Wan Chai" },
    text: {
      zh: "林警长让你'去打个招呼'。\n\n地址是湾仔骆克道一栋旧楼的地下室。门口有两个穿黑西装的年轻人，看到你的工作证后什么也没问，直接打开了门。\n\n里面的空间比你想的大得多。二十几张赌桌，百家乐、牌九、骰宝、轮盘——什么都有。空气里弥漫着烟味、汗味和一种说不清的紧张气息。大概一百多个人，有穿西装的商人，有穿工服的码头工人，还有几个你认得出的面孔——湾仔警署的两个CID探员。\n\n他们在赌博。警察在黑帮的赌场里赌博。\n\n赌场经理是一个五十多岁的女人，叫十三姨。她看到你，微笑着走过来。'林Sir的人？'她上下打量你，'比我想象的年轻。'\n\n她递给你一个信封。'这个月的。'\n\n信封很厚。你不需要打开也知道里面是什么。\n\n'林Sir说，让你顺便看看场子。'十三姨说，'他说你眼光好，能看出问题。'\n\n你接过信封，感觉它在手里发烫。这不是视察，是收保护费。林警长让你来，是为了让你成为这个网络的一部分——不是旁观者，是参与者。一旦你接过这个信封，你就和这里的每一个人绑在了一起。\n\n邓小平淡然处之。1979年他访问美国，被问到中国的人权问题，他说：'什么是人权？吃饱饭就是人权。' pragmatism 到了极致。你现在面临的是同一种 pragmatism：不接这个信封，你失去林警长的信任；接了，你失去自己的一部分。",
      en: "Lam sends you to 'say hello.' Lockhart Road, Wan Chai, an old building's basement. Two suits open the door. Inside: twenty tables, baccarat, pai gow, roulette. Among the gamblers — two CID detectives from Wan Chai station. Thirteen Aunt, the manager, approaches. 'Lam Sir's man? Younger than I imagined.' She hands you an envelope. 'This month's.' You don't need to open it. 'Lam Sir says you have good eyes. Look around.' You hold the envelope, burning. This isn't inspection — it's collection. Lam is making you part of the network. Deng Xiaoping, asked about human rights in 1979, said: 'What are human rights? Full stomachs are human rights.' Pure pragmatism. Take the envelope, lose Lam's trust. Don't take, lose part of yourself."
    },
    choices: [
      {
        text: { zh: "收下信封：'替我谢谢林Sir。'", en: "Take it: 'My regards to Sergeant Lam.'" },
        consequences: [
          { type: "stat_change", stat: "money", value: 25 },
          { type: "stat_change", stat: "integrity", value: -20 },
          { type: "relationship", npc: "sgt_lam", value: 25 },
          { type: "relationship", npc: "thirteen_aunt", value: 15 },
          { type: "flag", flag: "took_casino_money", value: true }
        ],
        feedback: { zh: "十三姨笑了——那种看到你做出她预料之中的选择的笑。'好。林Sir说得对，你是聪明人。'你走出赌场，夜风吹在脸上。信封在你内袋里，像一个烙印。这是你的第一笔黑钱。不是最后一笔。拿破仑说过：权力腐蚀，绝对权力绝对腐蚀。但你现在明白了一个更深刻的道理：权力不腐蚀人，权力只是暴露人。你本来就是这样的人，只是之前没有机会证明。", en: "Thirteen Aunt smiles — the smile of someone who predicted your choice. 'Lam Sir was right. Smart.' The envelope in your pocket is a brand. Your first dirty money. Not the last. Napoleon said power corrupts. But the deeper truth: power doesn't corrupt, it reveals. You were always this person — you just lacked opportunity to prove it." }
      },
      {
        text: { zh: "不收钱，但仔细观察场子", en: "Decline the money. Observe carefully." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 15 },
          { type: "stat_change", stat: "credibility", value: 20 },
          { type: "relationship", npc: "sgt_lam", value: -10 },
          { type: "flag", flag: "observed_casino", value: true }
        ],
        feedback: { zh: "你把信封推了回去。'我来看看就好。'十三姨的表情变了——不是生气，是...警惕。一个不收钱的人，要么是有原则的白痴，要么是有野心的猎人。她不知道你是哪一种，但她知道：不管哪一种，都是危险。你在赌场里转了一个小时，记下了每一张赌桌的位置、每一个出入口、每一个摄像头盲区。这些信息后来成为了ICAC突袭和胜和赌博网络时的关键情报。但你走出赌场的时候，感觉背后有眼睛在盯着你。不收钱的人，在地下世界里比收太多钱的人更危险。因为前者有目的，后者只是贪婪。", en: "You push the envelope back. 'Just looking.' Thirteen Aunt's expression shifts — not angry, wary. Someone who refuses money is either a principled fool or an ambitious hunter. Either way: dangerous. You map every table, exit, blind spot. This becomes key intel for ICAC's later raids. But as you leave, eyes follow. In the underworld, those who refuse money are more dangerous than those who take too much — the former has purpose; the latter, only greed." }
      },
      {
        text: { zh: "收下信封，但把钱全部匿名捐给受害者援助基金", en: "Take it. Donate all of it anonymously." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 25 },
          { type: "stat_change", stat: "psych", value: -15 },
          { type: "relationship", npc: "sgt_lam", value: 15 },
          { type: "flag", flag: "laundered_casino_money", value: true }
        ],
        feedback: { zh: "你收下了信封。十三姨满意地笑了。林警长那边通过了测试。但你没有去银行存这笔钱——而是把它塞进了一个没有署名的信封，丢进了圣约翰座堂的捐赠箱。这是 Mandela 的做法：在罗本岛的时候，他被迫穿着囚服参加监狱长的派对，但他始终在心里保持着那个自由的自己。你收下了肮脏的钱，但没有让它弄脏你。这是一种...精神上的走钢丝。它能维持多久，取决于你的平衡能力。", en: "You accept. Thirteen Aunt is satisfied. Lam's test: passed. But you don't deposit it — you stuff it into an anonymous envelope, drop it into St. John's Cathedral's donation box. Mandela's way: forced to wear prison garb at the warden's parties, but inwardly free. You took dirty money without letting it dirty you. Spiritual tightrope walking. How long you maintain balance depends on your skill." }
      }
    ]
  },

  {
    id: "p3_o_cid_friction",
    phase: 3,
    weight: 0.9,
    title: { zh: "部门摩擦", en: "Departmental Friction" },
    location: { zh: "总部大楼 · 走廊", en: "HQ Building, Corridor" },
    text: {
      zh: "走廊里，两群人面对面站着，空气里弥漫着一触即发的火药味。\n\n左边是O记（反黑组）的人，领头的是陈SIR——一个四十多岁的硬汉，在警队二十年了，从街头巡警做到O记指挥官。他身后站着七八个穿便服的探员，每一个都眼神凌厉。\n\n右边是CID（刑侦组）的人，领头的是刘SIR——张Sir的人，也是你的间接上司。他身后的人数更多，十几个，穿制服的和不穿制服的都有。\n\n走廊中间，一个戴着手铐的年轻人被两个人各拽着一只胳膊。他是谁？\n\n'这个人是我们O记跟了三个月的线人。'陈SIR的声音像砂纸，'你们CID没有任何通报就把他抓了，是什么意思？'\n\n刘SIR冷笑：'线人？他上周参与了湾仔的一宗持械抢劫。我们有证人、有物证、有监控。这是刑事案件，归CID管。'\n\n'但他也是我们O记'台风行动'的关键证人。没有他，整个行动泡汤。'\n\n'那是你的问题，不是我的。'\n\n你站在人群后面。作为督察，你有权力介入——也有权力不介入。但你知道，无论你选择站在哪一边，都在定义你的派系归属。\n\n办公室政治最残酷的地方在于：没有中立的选项。中立意味着两边都不信任你。",
      en: "In the corridor, two groups face off, air thick with explosive tension. Left: O-Unit led by Chan Sir — twenty years on the force, street patrol to O-Unit commander, seven detectives behind him. Right: CID led by Lau Sir — Cheung's man, your indirect superior, a dozen officers. Between them, a handcuffed young man pulled by both sides. 'He's our informant — three months of work.' Chan's voice is sandpaper. 'Your CID grabbed him without notice.' Lau smirks: 'Informant? He participated in an armed robbery last week. Evidence, witnesses, CCTV. Criminal case. CID jurisdiction.' 'He's key witness for Operation Typhoon. Without him, the whole operation collapses.' 'Your problem, not mine.' You stand behind the crowd. As Inspector, you can intervene — or not. But whichever side you choose defines your faction. Office politics has no neutral option. Neutrality means neither side trusts you."
    },
    choices: [
      {
        text: { zh: "支持O记：'按规矩，线人保护优先。'", en: "Support O-Unit: 'Rules say informant protection first.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 15 },
          { type: "stat_change", stat: "trust", value: -10 },
          { type: "relationship", npc: "chan_sir", value: 25 },
          { type: "relationship", npc: "lau_sir", value: -20 },
          { type: "relationship", npc: "zhang_sir", value: -10 }
        ],
        feedback: { zh: "陈SIR看了你一眼——那种看到一个 unexpectedly 有价值的人的眼神。'说得好。'他说，'按规矩。'刘SIR的表情阴沉下来。'好。督察有意见。我记住了。'他挥挥手，CID的人放开了手铐。年轻人被O记带走了。但你知道，从今天起，刘SIR——也就是张Sir的人——会在每一个可能的场合给你制造麻烦。这是派系政治的代价：得到一个盟友，失去另一个。希特勒在纳粹党内清除冲锋队的时候，用的也是这种'选择'策略——逼每一个人站队，然后通过站队结果来决定谁是朋友谁是敌人。", en: "Chan looks at you — seeing unexpected value. 'Well said. By the rules.' Lau's face darkens. 'Inspector has opinions. I'll remember.' The youth is led away by O-Unit. But Lau — Cheung's man — will make trouble at every turn. Hitler purged the SA using the same strategy: force everyone to pick a side, then use their choice to determine friend from enemy." }
      },
      {
        text: { zh: "支持CID：'刑事案件优先，O记可以事后申请证人保护。'", en: "Support CID: 'Criminal case first. O-Unit can apply for witness protection later.'" },
        consequences: [
          { type: "stat_change", stat: "trust", value: 15 },
          { type: "stat_change", stat: "integrity", value: -5 },
          { type: "relationship", npc: "lau_sir", value: 25 },
          { type: "relationship", npc: "chan_sir", value: -20 },
          { type: "relationship", npc: "zhang_sir", value: 15 }
        ],
        feedback: { zh: "刘SIR满意地点了点头。'督察说得对。程序是程序。'陈SIR没有说话，只是盯着你看了一眼——那种看到潜在威胁的眼神。'好。'他说，'程序。'然后他带着他的人走了。走廊里安静下来，但你知道，这场战争没有结束，只是被推迟了。你选择了张Sir/CID这一边，这意味着你在这个越来越分裂的警队里，有了明确的标签。标签意味着归属，归属意味着安全——也意味着限制。", en: "Lau nods, satisfied. Chan stares — seeing a potential threat. 'Procedures,' he says, leading his people away. The war isn't over, just postponed. You've chosen Cheung/CID. In an increasingly divided force, labels mean belonging, belonging means safety — and limitation." }
      },
      {
        text: { zh: "调解：'两边各退一步——CID先审48小时，之后移交O记作为证人。'", en: "Mediate: 'CID questions for 48 hours, then O-Unit takes him as witness.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 10 },
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "relationship", npc: "chan_sir", value: 5 },
          { type: "relationship", npc: "lau_sir", value: 5 },
          { type: "relationship", npc: "zhang_sir", value: -5 }
        ],
        feedback: { zh: "陈SIR和刘SIR对视了一眼。两人都不满意，但都没有更好的方案。'48小时。'陈SIR说。'48小时。'刘SIR重复。妥协。没有人完全满意，但没有人完全输。这是毛泽东'统一战线'理论的精髓：不是让一方完全胜利，而是让每一方都得到一部分，从而维持整体的平衡。张Sir后来听说了这件事，没有表扬你也没有批评你。但你知道，在他眼里，你不再是'张Sir的人'——你是一个...独立变量。而独立变量，在权力游戏里，是最不可控的存在。", en: "Chan and Lau exchange glances. Neither is satisfied, but neither has a better option. Compromise: nobody fully wins, nobody fully loses. The essence of Mao's United Front — give each side something, maintain overall balance. Cheung heard about it later. Neither praised nor criticized. But in his eyes, you're no longer 'Cheung's man.' You're an independent variable. And in power games, independent variables are the most uncontrollable." }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE 4 — 网络战 (High-Stakes Crisis)
  // ═══════════════════════════════════════════════════════════

  {
    id: "p4_informant_kidnapped",
    phase: 4,
    weight: 1.0,
    title: { zh: "绑票", en: "The Kidnapping" },
    location: { zh: "未知地点 · 凌晨三点", en: "Unknown Location, 3 AM" },
    text: {
      zh: "凌晨三点，你的电话响了。\n\n不是办公室电话，是你家里的私人电话。知道这个号码的人不超过五个。\n\n'督察？'一个男人的声音，低沉，带着一种刻意的冷漠。'你认识肥佬，对吧？北角商会的。'\n\n你的血液凝固了。\n\n'他现在在我们这里。很安全——暂时。'电话那头传来一阵窸窣声，然后是肥佬的声音，虚弱但清晰：'不要...不要管我...保护证据...'\n\n然后是另一个声音——一个你熟悉的声音。薛家俊。薛国栋的侄子。\n\n'督察，我叔叔说了，游戏规则很简单。你用你收集的所有关于薛氏投资的文件，换肥佬一条命。明天中午十二点，一个人来西环码头仓库B-17。带文件，不带人。'\n\n'如果我报警呢？'\n\n笑声。'你可以试试。但肥佬的死，会算在你头上。而且，督察——你确定你那边的人里面，没有我叔叔的人吗？'\n\n电话挂了。\n\n你站在黑暗里，手里握着电话，感觉整个世界都在旋转。\n\n肥佬。你的线人，你的盟友，你在这个城市里最信任的人之一。他被抓了。因为你知道了太多。\n\n丘吉尔在1940年面临过同样的选择：敦刻尔克撤退意味着放弃比利时和法国，拯救英国军队；继续战斗意味着全军覆没。他选择了撤退——不是因为怯懦，是因为他清楚：没有军队，就没有未来。\n\n你现在面临同样的计算：交出证据，失去武器；不交出，失去盟友。",
      en: "3 AM. Your home phone rings — known to fewer than five people. 'Inspector? You know Boss Fat, right?' Your blood freezes. 'He's with us. Safe — for now.' Fat's voice, weak but clear: 'Don't... don't worry about me... protect the evidence...' Then another voice — Simon Sit, Commissioner Hsueh's nephew. 'The rules are simple. All your files on Hsueh Investment for Fat's life. Tomorrow noon, Pier B-17 alone. Files yes, people no.' 'If I call the police?' Laughter. 'You can try. But his death will be on you. And Inspector — are you sure there's no one on your side who works for my uncle?' Click. You stand in darkness, world spinning. Churchill in 1940 faced the same choice: Dunkirk meant abandoning Belgium and France to save the army; fighting on meant total destruction. He chose retreat — not cowardice, but clarity: no army, no future."
    },
    choices: [
      {
        text: { zh: "带一份伪造的证据去换人", en: "Bring forged evidence. Exchange for Fat." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: -15 },
          { type: "stat_change", stat: "credibility", value: 25 },
          { type: "stat_change", stat: "psych", value: -20 },
          { type: "relationship", npc: "boss_fat", value: 30 },
          { type: "flag", flag: "forged_evidence_exchange", value: true }
        ],
        feedback: { zh: "你花了整整一夜制作了一份几乎完美的伪造文件——所有的格式、签名、水印都一模一样，但关键数据全是假的。中午，你一个人去了西环码头。薛家俊检查了文件，满意地点了点头。肥佬被放了出来，一瘸一拐地走向你。但就在你们转身离开的时候，薛家俊的声音从背后传来：'督察...如果我发现这些是假的，肥佬就不是一瘸一拐了。他会沉进海里。'你没有回头。丘吉尔说过：在战争中，真相如此珍贵，需要用谎言来保护。你现在完全理解了这句话。", en: "You spend all night forging near-perfect documents. At noon, you go alone. Simon checks them, satisfied. Fat limps toward you. As you turn to leave: 'Inspector... if these are fake, Fat won't limp. He'll sink.' You don't look back. Churchill said: in war, truth is so precious it must be protected by a bodyguard of lies. You understand completely now." }
      },
      {
        text: { zh: "拒绝交易，组织营救", en: "Refuse the trade. Organize a rescue." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 25 },
          { type: "stat_change", stat: "trust", value: 20 },
          { type: "stat_change", stat: "psych", value: -25 },
          { type: "relationship", npc: "boss_fat", value: 20 },
          { type: "flag", flag: "organized_rescue", value: true }
        ],
        feedback: { zh: "你挂掉电话，立刻拨了三个号码：黄Sir（ICAC），陈教官（训练学校，有人脉），小光（和胜和，地下情报）。六小时后，一支由ICAC行动组、CID便衣和...小光的'朋友们'组成的混合队伍包围了西环码头。薛家俊在试图逃跑的时候被抓获。肥佬被救出来的时候，身上有多处淤伤，但没有生命危险。他看着你，说了三个字：'值得的。'但你知道，这次行动暴露了你整个网络——小光的身份、陈教官和你的关系、ICAC内部的行动能力。薛国栋现在知道了你的全部底牌。这是 Mandela 的选择：1994年大选前，ANC 的武装力量已经准备好全面内战，但他选择了谈判——因为他知道，真正的胜利不是消灭敌人，是赢得和平。", en: "You call three numbers: Wong Sir, Instructor Chen, Siu Kwong. Six hours later, a joint force surrounds the pier. Simon is caught escaping. Fat has bruises but lives. 'Worth it,' he says. But your entire network is exposed — Siu Kwong's identity, Chen's connection to you, ICAC's operational capacity. Hsueh now knows your full hand. Mandela chose negotiation before the 1994 election because true victory isn't destroying enemies — it's winning peace." }
      },
      {
        text: { zh: "交出部分真实证据，保全核心材料", en: "Surrender partial real evidence. Keep the core." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: -25 },
          { type: "stat_change", stat: "credibility", value: -15 },
          { type: "relationship", npc: "boss_fat", value: 15 },
          { type: "relationship", npc: "wong_sir", value: -20 },
          { type: "flag", flag: "sacrificed_partial_evidence", value: true }
        ],
        feedback: { zh: "你选择了最务实的方案：交出边缘文件——一些不致命的公司注册资料、几份过期的银行流水——但保留了核心的录音带和账本。肥佬被释放了。薛家俊拿到文件后大笑：'督察，你以为我叔叔不知道你在保留什么吗？他知道。他只是不在乎。因为等你交出这些的时候，就已经太晚了。'你走出仓库，夜风吹在脸上。你保住了盟友，也保住了大部分武器。但你也失去了两样更珍贵的东西：黄Sir的信任（因为你未经批准擅自交出了调查材料），和你自己心中的某种坚持。撒切尔说过：做一个决定，然后让它变成正确的决定。你现在只能希望这个决定是正确的。", en: "You choose pragmatism: peripheral files released, core recordings and ledgers kept. Fat is freed. Simon laughs: 'My uncle knows what you kept. He just doesn't care. By the time you use it, it'll be too late.' You kept your ally and most weapons. But lost Wong Sir's trust — unauthorized release of investigation materials — and something in yourself. Thatcher said: make a decision, then make it the right one. You can only hope." }
      }
    ]
  },

  {
    id: "p4_audit_investigation",
    phase: 4,
    weight: 1.0,
    title: { zh: "审计风暴", en: "The Audit Storm" },
    location: { zh: "北角警署 · 督察办公室", en: "Inspector's Office, North Point" },
    text: {
      zh: "周一早晨，一封盖着'内部审计处'钢印的信出现在你的办公桌上。\n\n'根据警务处处长办公室指示，现要求督察（编号4388）提交以下材料：\n一、过去三年（1972-1974）所有银行流水及存款证明；\n二、目前持有之全部不动产及有价证券清单；\n三、直系亲属之财务状况概述；\n四、过去十二个月所有超过港币五百元之现金往来说明。\n请于七日内提交。逾期视为拒绝配合。'\n\n信纸下方盖着薛国栋的私人印章。\n\n处长要查你的账。\n\n这不是例行审计。例行审计不会查一个督察的私人账单。这是针对性调查——薛国栋在找你的把柄。\n\n你回忆过去三年：\n——你在福记收过几次'茶钱'（虽然你后来把钱匿名捐了）\n——林警长给过你一个信封（赌场那个月的保护费，你也捐了）\n——张Sir的'过年利是'\n——ICAC给你的'线人津贴'\n\n每一笔单独看都不致命，但合在一起，足以让一个监察委员会得出结论：你是一个 corrupt 的警察。\n\n毛泽东说过：敌人最可怕的武器不是枪炮，是档案。在苏联，大清洗不是靠审判，是靠档案管理员的一句话。你现在面临的就是同一种武器。",
      en: "Monday morning. An Internal Audit Division letter on your desk, sealed with Commissioner Hsueh's chop: 'Submit: (1) Three years of bank statements; (2) All real estate and securities; (3) Direct relatives' financial status; (4) Explanation of all cash transactions exceeding HK$500 in the past twelve months. Seven days.' This isn't routine — routine audits don't target Inspectors' personal finances. Hsueh is hunting for leverage. You review three years: tea money at Fuk Kee (later anonymously donated), Lam's casino envelope (donated), Cheung's 'New Year lai see,' ICAC informant stipends. Individually harmless, together: a corrupt officer. Mao said: the enemy's most terrifying weapon isn't guns — it's files. In the USSR, the Great Purge wasn't achieved through trials but through archivists' notes. Same weapon. Same danger."
    },
    choices: [
      {
        text: { zh: "如实提交所有材料", en: "Submit everything honestly." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 20 },
          { type: "stat_change", stat: "credibility", value: 15 },
          { type: "stat_change", stat: "psych", value: -15 },
          { type: "flag", flag: "submitted_honest_audit", value: true }
        ],
        feedback: { zh: "你花了两天时间整理所有材料——每一笔收入，每一笔支出，甚至包括那个匿名捐赠的收据存根。你把材料交给了审计处，然后在走廊里等了三天。三天后，审计结果出来了：'未发现重大财务异常。建议结案。'薛国栋的秘书给你打了一个电话：'处长说，他很...失望。'你挂掉电话，笑了。这是 Gandhi 的策略：当你没有任何秘密的时候，敌人的武器就失效了。透明不是软弱，是最强大的防御。", en: "Two days organizing every transaction, including anonymous donation receipts. Three days waiting. Result: 'No significant irregularities found. Case closed.' Hsueh's secretary calls: 'The Commissioner is... disappointed.' You smile. Gandhi's strategy: when you have no secrets, enemy weapons fail. Transparency isn't weakness — it's the strongest defense." }
      },
      {
        text: { zh: "通过关系网络向审计处施压", en: "Use your network to pressure the auditors." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 25 },
          { type: "stat_change", stat: "integrity", value: -15 },
          { type: "relationship", npc: "boss_fat", value: 10 },
          { type: "relationship", npc: "thirteen_aunt", value: 10 },
          { type: "flag", flag: "pressured_auditors", value: true }
        ],
        feedback: { zh: "你打了四个电话。第一个给肥佬——他认识审计处主任的太太。第二个给十三姨——她的赌场里有一个常客是审计处的副主任。第三个给小光——和胜和在审计处有一个清洁工，可以'不小心'看到文件的走向。第四个给张Sir——他直接给审计处打了一个电话。四天后，审计处通知你：'由于材料补充需要，调查期限延长三十天。'三十天后，Operation Storm已经结束了。审计调查成了一桩无头案。这是做局术的最高境界：不是对抗规则，是让规则在你需要的时候暂停。希特勒在1933年就是通过让国会'暂停'，然后永远不复会，来实现权力集中的。", en: "Four calls: Boss Fat knows the auditor's wife; Thirteen Aunt has a regular who's deputy director; Siu Kwong has a cleaner who can 'accidentally' see file movements; Cheung calls directly. Four days later: 'Investigation extended thirty days for supplementary materials.' Thirty days later, Operation Storm is over. The highest form of gamecraft: not fighting rules, but pausing them when needed. Hitler made the Reichstag 'suspend' in 1933 — then never reconvene." }
      },
      {
        text: { zh: "伪造账单，清除所有可疑记录", en: "Forge documents. Clean all suspicious records." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 20 },
          { type: "stat_change", stat: "integrity", value: -25 },
          { type: "stat_change", stat: "psych", value: -20 },
          { type: "flag", flag: "forged_audit_docs", value: true }
        ],
        feedback: { zh: "你花了整整三天伪造银行流水、补写收据、制造合理的现金往来解释。你甚至让阿May帮你'找到'了一些'遗失'的行政记录。当你把材料交给审计处的时候，它们看起来完美无缺——比真的还真。审计处的人翻了翻，点了点头：'没问题。'你走出审计处大楼的时候，感到一种奇怪的空虚。你曾经是那个拒绝福记茶钱的人。现在你伪造政府文件来保护自己。不是世界改变了你——是你选择了成为这个世界的一部分。这是每一个 dictator 的起点：不是邪恶，是 pragmatism。pragmatism 一点点累积，直到你回头看的时候，发现自己已经走了很远。", en: "Three days forging bank statements, receipts, explanations. You even have May 'find' some 'lost' admin records. The auditors flip through, nod: 'No issues.' Walking out, you feel hollow emptiness. You were the one who refused Fuk Kee's tea money. Now you forge government documents to protect yourself. The world didn't change you — you chose to become part of it. Every dictator's starting point: not evil, but pragmatism. Accumulating until you look back and find yourself very far from where you started." }
      }
    ]
  },

  {
    id: "p4_media_ambush",
    phase: 4,
    weight: 0.9,
    title: { zh: "记者围堵", en: "The Media Ambush" },
    location: { zh: "北角警署 · 正门口", en: "North Point Station Entrance" },
    text: {
      zh: "下午五点，你走出警署大门，准备回家。\n\n然后你看到了他们。\n\n三个男人，两个女人。一个拿着麦克风，一个扛着摄像机，另外三个拿着笔记本和录音机。他们像一群闻到了血腥味的鲨鱼，迅速包围了你。\n\n'督察！请问您对警队系统性贪污有何看法？'\n\n'有传言称北角警署存在长期收取保护费的情况，您作为督察是否知情？'\n\n'能否回应一下关于警务处处长薛国栋涉嫌利用空壳公司洗钱的指控？'\n\n'您个人是否与ICAC有合作关系？'\n\n问题像子弹一样飞来。每一个都致命。\n\n你认出了那个拿麦克风的男人——《南华早报》的调查记者，叫Peter Morgan。他上个月发了一篇关于湾仔警队腐败的报道，直接导致两个高级警司被内部调查。\n\n他的目光锐利，像手术刀。他不是来采访的，他是来...猎杀的。\n\n周围已经开始有人围观。路过的行人停下了脚步。一个卖鱼蛋的小贩举起了头。\n\n在媒体的聚光灯下，你说的每一个字都会被放大、被解读、被扭曲。沉默会被当作默认，否认会被当作掩盖，承认会被当作背叛。\n\n丘吉尔在1940年面对媒体的时候说过：'给他们鲜血、汗水和眼泪——但永远不要给他们迷茫。'领袖的魅力不在于说了什么，而在于说的方式让人忘记内容。",
      en: "5 PM. You exit the station. Then you see them — three men, two women. Microphone, camera, notebooks. They circle like sharks smelling blood. 'Inspector! Views on systemic police corruption?' 'Rumors of long-term protection fees at North Point — as Inspector, were you aware?' 'Response to allegations Commissioner Hsueh launders money through shell companies?' 'Personal cooperation with ICAC?' Bullets of questions. You recognize the mic holder — Peter Morgan, South China Morning Post investigative reporter. Last month his Wan Chai exposé led to two Superintendents' suspension. His gaze is surgical. He's not here to interview — he's here to hunt. Pedestrians gather. A fishball vendor looks up. Under the media spotlight, every word will be magnified, interpreted, twisted. Silence equals admission; denial equals cover-up; admission equals betrayal. Churchill in 1940: 'Give them blood, toil, tears and sweat — but never give them confusion.' Leadership isn't what's said but how it's said, making content irrelevant."
    },
    choices: [
      {
        text: { zh: "'我无可奉告。请让开。'", en: "'No comment. Excuse me.'" },
        consequences: [
          { type: "stat_change", stat: "credibility", value: -15 },
          { type: "stat_change", stat: "psych", value: -5 }
        ],
        feedback: { zh: "你推开人群，走向停车场。身后传来Peter Morgan的声音：'督察选择了沉默。有时候，沉默本身就是一种回答。'第二天，报纸的标题是：《北角督察面对贪污指控沉默以对》。你的上司把你叫进办公室：'你知道沉默在政治上意味着什么吗？意味着你默认了所有指控。'但你也知道，说任何话都可能被薛国栋利用。在这种时候，不说话比说错话更安全。这是 Stalin 在1930年代的做法：当媒体问问题时，最好的策略是不存在。不是否认，不是承认，是...不存在。", en: "You push through. Behind you, Morgan: 'The Inspector chose silence. Sometimes silence is its own answer.' Headline next day: 'North Point Inspector Silent on Corruption Allegations.' Your superior: 'Do you know what silence means politically? It means you admit everything.' But speaking risks Hsueh's exploitation. Stalin's 1930s strategy: when media asks questions, the best response is nonexistence. Not denial, not admission — absence." }
      },
      {
        text: { zh: "'警队有完善的内部监督机制。个别问题不代表整体。'", en: "'Robust internal oversight exists. Individual issues don't represent the whole.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 10 },
          { type: "stat_change", stat: "trust", value: -10 },
          { type: "stat_change", stat: "credibility", value: -5 },
          { type: "flag", flag: "hinted_to_media", value: true }
        ],
        feedback: { zh: "你说得很小心，每一个字都经过斟酌。Peter Morgan盯着你的眼睛，似乎在寻找裂缝。'个别问题？'他重复了一遍，'请问您说的个别问题，具体指什么？'你意识到自己说多了一个词。一个词就够了——'个别'。记者就像鲨鱼，一滴血就能让他们疯狂。第二天，Peter Morgan的文章标题是：《北角督察暗示警队存在个别腐败问题》。你没有指名道姓，没有提供证据，但你...暗示了。薛国栋看到了这篇文章。他的秘书给你打了一个电话：'处长说，他很欣赏你的...诚实。'那种语气让你出了一身冷汗。", en: "You speak carefully. Morgan's eyes search for cracks. 'Individual issues?' he repeats. 'Specifically?' You realize you said one word too many. One word — 'individual.' Reporters are sharks; one drop of blood triggers frenzy. Next day: 'North Point Inspector Implies Individual Corruption Exists.' Hsueh's secretary calls: 'The Commissioner appreciates your... honesty.' The tone makes you break into a cold sweat." }
      },
      {
        text: { zh: "通过关系让报社主编'暂缓'这篇报道", en: "Use connections to delay the story." },
        consequences: [
          { type: "stat_change", stat: "trust", value: 20 },
          { type: "stat_change", stat: "integrity", value: -20 },
          { type: "relationship", npc: "boss_fat", value: 15 },
          { type: "flag", flag: "suppressed_media", value: true }
        ],
        feedback: { zh: "你当晚打了两个电话。第一个给肥佬——他是《南华早报》广告部的大客户。第二个给十三姨——她和报社副主编每周在跑马地'偶遇'。四十八小时后，Peter Morgan被主编叫进办公室：'这篇报道证据不足，暂缓。'Morgan知道发生了什么。他在走廊里遇见你，只说了一句话：'你以为你赢了。但真相不会因为你不说就消失。它只是...推迟了。'你看着他离开的背影，想起了毛泽东的一句话：枪杆子里面出政权。但在这个时代，笔杆子和枪杆子一样致命。你能控制枪杆子，但你能控制笔杆子多久？", en: "Two calls that night: Boss Fat is SCMP's major advertiser; Thirteen Aunt 'accidentally' meets the deputy editor at Happy Valley. Forty-eight hours later, Morgan is told: 'Insufficient evidence. Hold.' Morgan meets you in the corridor: 'You think you won. But truth doesn't disappear because you won't speak. It's just... postponed.' Mao said: political power grows from gun barrels. But in this era, pens are as lethal as guns. You can control guns. But for how long can you control pens?" }
      }
    ]
  },

  {
    id: "p4_sacrifice_ally",
    phase: 4,
    weight: 1.0,
    title: { zh: "最后通牒", en: "The Ultimatum" },
    location: { zh: "未知 · 电话", en: "Unknown — Telephone" },
    text: {
      zh: "电话响了。你没有看来电显示，直接接了。\n\n'督察。'薛国栋的声音。不是通过秘书，是他本人。你听过他的声音——在警队年度晚宴上，在无线电频道里，在训练学校的录音带里。但这是他第一次直接跟你说话。\n\n'我侄子的事，我已经知道了。Operation Storm，我也知道了。你以为你赢了，但其实你只是在加速自己的毁灭。'\n\n他的声音很平静，像在读一份天气预报。\n\n'我给你一个选择。很简单。'\n\n'交出一个人来顶罪。一个足够重要的人——能让ICAC满意、能让媒体闭嘴、能让港督觉得问题解决了。'\n\n'作为交换，我撤销对你的所有调查。你继续当你的督察，甚至...我可以让你升警司。'\n\n'你不交人，我就让你交。我会把你网络里的每一个人——肥佬、小光、阿May、陈教官——一个一个地毁掉。不是杀死，是毁掉。让他们在牢里度过余生，让他们在业内永远无法翻身，让他们的家人...承受后果。'\n\n'我给你24小时。'\n\n电话挂了。\n\n你坐在黑暗里，手里握着电话。\n\n这不是选择。这是...处决。\n\n交出一个人，他活，你活，所有人都能活下去——但你出卖了一个信任你的人。\n\n不交人，所有人一起死——但你保持了底线。\n\nFranco在西班牙内战结束的时候面临过同样的选择：处决所有共和党人，还是赦免他们。他选择了处决——因为他知道，留下活口就是留下未来的威胁。\n\n你现在面临的是同一种冷酷的算术。",
      en: "The phone rings. You answer without checking. 'Inspector.' Hsueh Kok Tung's voice. Not through a secretary — him. You've heard it at annual dinners, radio channels, training recordings. But this is the first time he's speaking directly to you. 'I know about my nephew. I know about Operation Storm. You think you've won, but you're only accelerating your destruction.' His voice is calm, like a weather report. 'I'll give you a choice. Simple. Hand over one person to take the fall. Someone important enough to satisfy ICAC, silence the media, make the Governor think it's resolved. In exchange, I withdraw all investigations against you. You remain Inspector, or... I can make you Superintendent.' 'Don't hand over anyone, and I'll make you hand them over. One by one — Fat, Siu Kwong, May, Instructor Chen — destroyed. Not killed. Destroyed. Prison for life, professionally ruined, their families... bearing consequences.' 'Twenty-four hours.' Click. You sit in darkness. This isn't a choice. It's execution. Hand over one person, he lives, you live, everyone survives — but you betray someone who trusted you. Don't hand over anyone, everyone dies together — but you keep your bottom line. Franco faced the same at the Spanish Civil War's end: execute all Republicans or pardon them. He chose execution — because leaving survivors means leaving future threats. You face the same cold arithmetic."
    },
    choices: [
      {
        text: { zh: "牺牲小光——他的 criminal record 最多，最容易被定罪", en: "Sacrifice Siu Kwong — most criminal record, easiest to convict." },
        consequences: [
          { type: "stat_change", stat: "integrity", value: -50 },
          { type: "stat_change", stat: "trust", value: -30 },
          { type: "relationship", npc: "siu_kwong", value: -100 },
          { type: "relationship", npc: "boss_fat", value: -20 },
          { type: "relationship", npc: "ah_may", value: -15 },
          { type: "flag", flag: "sacrificed_siu_kwong", value: true }
        ],
        feedback: { zh: "你拨了薛国栋的电话。'小光。和胜和的红棍，北角多起案件有关联，城寨毒品交易有他的份。'你说这些话的时候，感觉自己的灵魂在被撕裂。薛国栋在电话那头笑了。'好选择。有 criminal record 的人最容易被定罪。媒体会欢呼，ICAC会结案，港督会觉得问题解决了。'三天后，小光在城寨外围被'意外'抓获，身上被搜出了大量毒品——那些毒品是谁放的，你知道，我也知道。他在法庭上看着你，眼神里没有愤怒，只有...失望。那种失望比任何仇恨都更重。你活下来了，你保住了其他人，但你失去了某种永远无法找回的东西。Hitler在'长刀之夜'就是这样清洗冲锋队的——为了更大的利益，牺牲最忠诚的追随者。这种牺牲的代价不是道德，是...人心。", en: "You dial Hsueh. 'Siu Kwong. Wo Shing Wo red pole, linked to multiple North Point cases, present at Walled City drug deals.' Speaking, you feel your soul tear. Hsueh laughs. 'Good choice. Criminal records make easy convictions. Media cheers, ICAC closes, Governor is satisfied.' Three days later, Siu Kwong is 'caught' with drugs — planted, you know and I know. In court, he looks at you with no anger, only... disappointment. Worse than hatred. You survived, saved others, but lost something forever. Hitler's Night of Long Knives purged the SA the same way — sacrificing the most loyal followers for greater goals. The price isn't morality. It's... humanity." }
      },
      {
        text: { zh: "拒绝：'你可以毁掉我，但我不会出卖任何人。'", en: "Refuse: 'You can destroy me, but I won't betray anyone.'" },
        consequences: [
          { type: "stat_change", stat: "integrity", value: 50 },
          { type: "stat_change", stat: "psych", value: -40 },
          { type: "stat_change", stat: "trust", value: 30 },
          { type: "flag", flag: "refused_ultimatum", value: true }
        ],
        feedback: { zh: "你挂掉了电话。没有犹豫。\n\n Mandela在罗本岛的27年里，有无数次机会可以妥协——释放的条件很简单：放弃武装斗争，承认白人政府的合法性。他拒绝了，每一次。'我不是在为他们牺牲，'他说，'我是在为我们牺牲。'\n\n你做了同样的事。\n\n薛国栋的报复来得比想象中更快。第二天，内部审计处的通知贴在了公告栏上。第三天，你被停职接受调查。第四天，肥佬的商会收到了税务局的'例行检查'通知。第五天，阿May被调往档案室。\n\n但你的盟友们没有离开。黄Sir在ICAC总部继续推进Operation Storm。陈教官在训练学校里，每天给新学员讲你的故事。小光在城寨里，用他的方式保护着你的家人。\n\n你失去了一切——职位、名誉、自由。但你赢得了某种更珍贵的东西：信任。当所有人都知道你宁死不出卖朋友的时候，你就拥有了世界上最强大的武器。\n\n这不是结束。这是另一种开始。", en: "You hang up. No hesitation. During 27 years on Robben Island, Mandela had countless chances to compromise — simple conditions: renounce armed struggle, recognize white government legitimacy. He refused every time. 'I am not sacrificing for them,' he said. 'I am sacrificing for us.' You do the same. Hsueh's retaliation is swift: suspension, investigation, tax audits for Fat's businesses, May transferred to the archives. But your allies don't leave. Wong Sir pushes Operation Storm. Instructor Chen tells your story to every new recruit. Siu Kwong protects your family in his own way. You lost everything — position, reputation, freedom. But you gained something more precious: trust. When everyone knows you'd rather die than betray a friend, you wield the world's most powerful weapon. This isn't the end. It's another beginning." }
      },
      {
        text: { zh: "假装同意，但暗中启动Operation Storm提前收网", en: "Pretend to agree. But secretly accelerate Operation Storm." },
        consequences: [
          { type: "stat_change", stat: "credibility", value: 30 },
          { type: "stat_change", stat: "integrity", value: 10 },
          { type: "stat_change", stat: "psych", value: -30 },
          { type: "flag", flag: "accelerated_storm", value: true }
        ],
        feedback: { zh: "你拨了薛国栋的电话。'我需要时间考虑。24小时不够——给我72小时。我要确保...选对人。'薛国栋在电话那头笑了。'好。有策略。我喜欢有策略的人。'但你挂了电话之后，立刻拨了另外三个号码。第一个给黄Sir：'Operation Storm，提前。现在。'第二个给陈教官：'保护所有人，立刻转移。'第三个给肥佬：'冻结所有资产，准备配合ICAC。'72小时后，薛国栋在等你的电话。但他等到的是ICAC的行动组破门而入。这是 Napoleonic warfare 的精髓：假装撤退，诱敌深入，然后反击。最伟大的胜利不是正面击溃敌人，是让敌人在以为你投降的时候发现——你已经赢了。", en: "You call Hsueh. 'I need time. Twenty-four hours isn't enough — give me seventy-two. I need to make sure... I pick the right person.' Hsueh laughs. 'Strategic. I like strategic people.' But after hanging up, you dial three numbers. Wong Sir: 'Operation Storm — accelerate. Now.' Instructor Chen: 'Protect everyone. Immediate evacuation.' Boss Fat: 'Freeze all assets. Prepare for ICAC cooperation.' Seventy-two hours later, Hsueh waits for your call. But what arrives is ICAC's tactical team breaking down his door. Napoleonic warfare's essence: feign retreat, lure the enemy deep, then counterstrike. The greatest victory isn't defeating enemies head-on — it's making them discover you've already won while they thought you'd surrendered." }
      }
    ]
  }
];
