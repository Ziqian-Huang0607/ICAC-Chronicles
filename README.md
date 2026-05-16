# ICAC Chronicles | 廉政行动

> **"权力游戏不是可选项，是必修课。你可以不当赢家，但你至少要知道规则。否则，你连怎么死的都不知道。"** —— 陈教官

A browser-based **narrative strategy RPG** set in 1974–1980 Hong Kong. Play as a rookie police constable with $100 and a badge. Six years later: Commissioner of Police, or the most powerful corrupt officer in the territory. The difference is what **you do, every single day**.

This is a **power simulator**, not a visual novel. You don't read about setting traps — you build them, step by step, with real consequences.

---

## What This Game Teaches

**做局术** (the art of strategic setup) — not through lectures, through gameplay:

- **巡逻** teaches you that information is power — who owns what, who owes whom, what's hidden in plain sight
- **做局** teaches you the 5-step trap: Identify → Gather → Plant → Execute → Cover
- **报告** teaches you that the same facts, written three different ways, produce three different decisions
- **谈判** teaches you that a weaker player's best weapon is the stronger player's arrogance

**Sun Tzu's thirteen chapters** appear as living principles, not quotes:
- **始计篇** (Estimates) — assess before you act
- **作战篇** (Waging War) — every action has a cost
- **用间篇** (Employing Spies) — your network is your most valuable asset

**Historical leaders** appear as operational models: Hitler's enemy redefinition, Stalin's patient elimination, Churchill's information control, Lee Kuan Yew's institutional capture, Mandela's strategic patience.

---

## How It Works

### The Daily Cycle

Each day you get **Action Points** (3–7 depending on rank). Spend them. When AP runs out, **End Day** — income processes, schemes advance, new day begins.

| Action | Cost | What You Actually Do |
|--------|------|---------------------|
| **巡逻** (Patrol) | 1 AP | Walk your district. Gather intel. Find scheme opportunities. Collect protection fees ($3–5 base + district control bonus). |
| **做局** (Scheme) | 2 AP | Build 5-step traps against targets. Each step rolls for success. |
| **结网** (Network) | 1 AP | Meet NPCs: 阿May, 肥佬, 蛇爷, 黄Sir... Build relationships. |
| **调查** (Investigate) | 2 AP | Build case files. Progress from 0% to 100%. |
| **理财** (Finance) | 1 AP | Manage money, assets, district control. |
| **训练** (Train) | 1 AP | Improve skills for promotion. |
| **休息** (Rest) | 1 AP | Recover mental state. |

### Money System

You start with **$100**. Money is a separate resource — not a stat, not a score. You need it for everything.

| Source | Income |
|--------|--------|
| Patrol | $3–5 per patrol (+ district control bonus) |
| Daily income | From assets you own |
| Monthly salary | $80+ depending on rank |
| Mission rewards | Varies by choice |

| Asset | Cost | Daily Income |
|-------|------|-------------|
| 茶钱网络 (Tea Money) | Free | $5–35 |
| 麻将馆 (Mahjong Parlor) | $500 | $25 |
| 夜总会 (Nightclub) | $2,000 | $80 |
| 旧区改造 (Property Development) | $5,000 | $200 |

### The 5-Step Scheme Builder

The core mechanic. Instead of reading "you set up a trap," you build it:

1. **确认目标** — Research patterns, weaknesses. 70% base success.
2. **收集材料** — Photos, documents, witnesses. Intel from patrol gives bonuses.
3. **布置陷阱** — Plant evidence, deliver blackmail. Riskiest step.
4. **引爆局势** — Trigger at the critical moment.
5. **擦尾巴** — Eliminate traces. If this fails, consequences spike.

Methods: 勒索 (blackmail), 设局陷害 (frame), 操控操纵 (manipulate), 挖角动摇 (undermine), 破坏阻挠 (sabotage), 引诱上钩 (entrap)

### Two Paths to Power

**正道** (Righteous): Patrol. Train. Pass exams. Build assets. Complete schemes. Climb through merit.

**邪道** (Corrupt): Take tea money. Make deals with 蛇爷. Frame rivals. Every corrupt choice has a price — relationships fracture, mental state deteriorates, and some doors close forever.

### Game Over States

| Ending | Trigger |
|--------|---------|
| **殉职** (Killed) | Confront armed criminals recklessly |
| **众叛亲离** (Betrayed) | Sell out your last ally |
| **革职** (Fired) | Caught by internal investigation |
| **流放** (Exiled) | Transferred to permanent dead-end post |

---

## The Story: 1974–1980

### Phase 1 (1974) — Rookie PC — 6 missions, 71 nodes

Ground-level patrols teaching observation, consequence, and street-level power dynamics.

- **入职第一课** — 陈教官 hands you *The Art of War*. Your first lesson: assess before you act.
- **北角第一天** — Meet 林警长, 老鬼, 阿May. Learn the invisible map of power.
- **街头智慧** — Your first solo patrol. Three street encounters: a smuggling front, triad debt collectors, a suspicious warehouse. Information is power.
- **笔墨权谋** — Writing patrol reports. The same facts written three ways produce three different decisions from superiors. Learn 做局术 through paperwork.
- **初见蛇爷** — The shadow king of Hong Kong's underground teaches you "留白" — the art of strategic ambiguity.
- **第一笔茶钱** — Sergeant Lam's tea money test. Your first moral fork: take it, refuse it, or pretend while taking notes.

### Phase 2 (1974–75) — Double Life — 3 missions, 27 nodes

Deep cover as ICAC informant "Sparrow." Traffic unit by day, spy by night. 肥佬 teaches money. 蛇爷 teaches leverage. Promotion to Inspector.

### Phase 3 (1975) — Inspector — 2 missions, 10 nodes

Power struggles intensify. 林警长 becomes mentor or puppet. 老鬼's legacy.

### Phase 4 (1975) — The Confrontation — 3 missions, 13 nodes

Climax against Commissioner 薛国栋. Scheme it step by step. Two paths: integrity or power. Both lead to 1976.

### Phase 5 (1976) — The Dragon Head — 1 mission, 10 nodes

和胜和 triad election. Young reformer 小光 vs old guard 虎叔. Pick the outcome, not the side.

### Phase 6 (1977) — The Mutiny — 1 mission, 11 nodes

October 1977 police mutiny. 5,000 officers storm ICAC headquarters. Side with rioters, protect ICAC, or play both sides.

### Endgame — Free Play

Sandbox mode. Patrol 9 districts. Manage assets. Build your empire. Your legacy continues.

**Total: 17 missions, 400+ narrative nodes, 260,000+ characters of story.**

---

## Technical Architecture

```
icac-chronicles/
├── index.html                    # Entry point — <script> tag load order
├── phaser.min.js                 # Phaser 3 game engine (local)
├── src/
│   ├── data/
│   │   ├── missions.js           # 17 missions, 400+ nodes, 260KB (1974–1980)
│   │   ├── districts.js          # 9 HK districts
│   │   ├── ranks.js              # 14 police ranks
│   │   ├── sunzi.js              # Sun Tzu 13 chapters
│   │   └── leaders.js            # Historical leaders database
│   ├── scenes/
│   │   ├── BootScene.js          # State initialization
│   │   ├── PreloadScene.js       # Procedural texture generation
│   │   ├── MenuScene.js          # Title screen with animated particles
│   │   ├── GameScene.js          # Hong Kong map + HUD + daily actions
│   │   ├── MissionScene.js       # Dialogue engine with scrollable textbox
│   │   ├── GameOverScene.js      # Career-ending scenarios
│   │   ├── DebriefScene.js       # Mission completion summary
│   │   └── SettingsScene.js      # Pause/settings menu
│   ├── systems/
│   │   ├── ActionSystem.js       # Daily AP cycle + actions + promotion
│   │   ├── SchemeSystem.js       # 5-step trap builder
│   │   ├── PropertySystem.js     # Money, assets, income, expenses
│   │   ├── SubMissionSystem.js   # Granular objectives between missions
│   │   ├── NetworkSystem.js      # NPC relationship network data
│   │   ├── SaveSystem.js         # localStorage auto-save
│   │   ├── AudioSystem.js        # Sound management
│   │   ├── UIToolkit.js          # HOI4-style UI components
│   │   ├── CoverSystem.js        # Cover identity management
│   │   └── ReputationSystem.js   # NPC reputation tracking
│   └── main.js                   # Game bootstrap + scene manager
└── sw.js                         # Service worker for offline play
```

- **Phaser 3** — game engine
- **Vanilla JavaScript** — zero frameworks, zero dependencies beyond Phaser
- **Global `ICAC` namespace** — all modules communicate through a single global object
- **`<script>` tag loading** — works on `file://` protocol, no build step, no server required
- **Procedural assets** — all textures generated at runtime via Canvas, zero external image files
- **Auto-save** — every 30 seconds to browser localStorage

---

## How to Play

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. Works directly from `file://` — no server needed
4. Click **新游戏 (New Game)** to begin
5. Use daily Action Points: patrol, scheme, network, investigate, finance
6. Complete story missions by walking your player to mission markers on the map
7. Choose your path: honest grind or corrupt deals
8. Your progress auto-saves every 30 seconds

---

## Current Status

This is a **complete, playable game** with:
- 17 story missions with 400+ narrative decision points
- 7 daily action types with concrete gameplay effects
- Full money system: income, expenses, assets, district control
- 5-step scheme builder with dice-roll mechanics
- 14-rank promotion progression (PC → CP)
- 6 game over states
- Works offline on `file://`

### Known Limitations
- Finance and Network UIs return placeholder messages (core data systems work, UI panels need building)
- Mobile joystick exists but may need tuning
- Audio system is stubbed (no sound files included)

---

## Roadmap

### Phase 1 — UI Completion
- Finance panel (asset purchase, district management)
- Network panel (NPC relationship visualization)
- Scheme execution UI (step-by-step with dice animation)

### Phase 2 — Audio & Atmosphere
- 1970s Cantopop radio station
- Sound effects (typewriter, sirens, street ambience)
- Dynamic tension soundtrack

### Phase 3 — Cloud & Multi-Device
- Cloud saves via Firebase
- Cross-device progress sync

### Phase 4 — Content Expansion
- 1980s storyline (stock manipulation, Joint Declaration)
- Post-1997 era (handover politics)
- Multiple character campaigns

---

## License

**MIT License**

Copyright (c) 2025 Gordon Huang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

---

> *"你做过的每一个选择，都定义了你是谁。不是你是谁，是你选择了成为谁。"*
>
> — 陈教官, ICAC Chronicles
