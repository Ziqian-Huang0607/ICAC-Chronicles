# ICAC Chronicles | 廉政行动

> **"知彼知己，百战不殆。"** — 孙子

A browser-based narrative strategy RPG set in 1974 Hong Kong, where you rise from a rookie police constable through the ranks of the Royal Hong Kong Police Force — navigating corruption, power, and moral choices. Inspired by Sun Tzu's *The Art of War*, the political maneuvering of history's most consequential leaders, and the gritty aesthetic of classic Hong Kong police cinema.

---

## The Purpose

ICAC Chronicles is not just a game — it's a masterclass in **做局术** (the art of strategic setup), **官术** (the craft of officialdom), **权术** (the mechanics of power), and **deception** — taught entirely through immersive narrative gameplay.

Every dialogue, every choice, every consequence is designed to teach real-world power dynamics:
- How Hitler redefined enemies to unify fractured political landscapes
- How Stalin eliminated rivals through gradual, imperceptible maneuvers
- How Mao applied contradiction theory to analyze power structures
- How Churchill used partial truth to rally a nation
- How Lee Kuan Yew built a city-state from nothing through institutional control
- How Caesar, Napoleon, and Thatcher wielded authority through different paths

These aren't trivia facts appended after gameplay — they're **woven into the fabric of the story**. When 陈教官 hands you a worn copy of *The Art of War* on your first day at the police training school, he's not quoting from a textbook. He's teaching you how to survive a system where corruption runs from the street-level sergeant to the Commissioner of Police himself.

Sun Tzu's thirteen chapters appear throughout the game as living principles:
- **始计篇** (Estimates) — assess the landscape before acting
- **作战篇** (Waging War) — understand the cost of engagement
- **谋攻篇** (Attack by Stratagem) — win without fighting
- **用间篇** (Employing Spies) — build your intelligence network

Each mission is a lesson. Each choice is a test. The story IS the classroom.

---

## The Motivation

This project grew from a simple obsession: **the gap between what history books teach and what actually works.**

Growing up watching old Hong Kong police movies — *Infernal Affairs* (无间道), *PTU*, *Election* (黑社会), *Long Arm of the Law*, and the classic ICAC television series — I was fascinated by the moral complexity. Cops who weren't heroes. Criminals who had codes. Systems that corrupted everyone who touched them.

Then I read Sun Tzu. Then I studied how Hitler went from a Vienna homeless shelter to the Chancellery in fourteen years with no army, no money, and no family connections. I read about Stalin's patient, decade-long elimination of eleven rivals. About how Mandela offered his jailer dignity to secure a nation's transition. About how Lee Kuan Yew built Singapore by controlling the institutions that control people.

The common thread? **These skills are teachable.** And the best way to teach them isn't a lecture — it's putting someone in the room and making them choose.

As a solo developer and student, I built ICAC Chronicles to prove that one person with no budget, no team, and no external assets can create a game that teaches something real. Every line of code, every story node, every UI element was crafted by hand. The procedural textures, the typewriter effect, the branching narrative engine — all built from scratch.

The game spans **1974 to 1980** — from ICAC's founding through the 1977 police mutiny to the eve of Hong Kong's economic transformation. Six years that saw the old corrupt police order crumble, a new system of accountability fight for survival, and one police officer rise from rookie constable to the most powerful man in the territory.

---

## Game Features

### Current Implementation

| Feature | Status |
|---------|--------|
| **6-Phase Epic Storyline (1974–1980, 50,000+ characters)** | **Complete** |
| **14 Missions across 116 narrative nodes** | **Complete** |
| 14 Rank Progression (PC to Commissioner) | Complete |
| 9 Hong Kong Districts with dynamic corruption | Complete |
| 2 Epic Paths (正直之路 / 权力之路) with 3 endings each | Complete |
| Typewriter Dialogue with Scrollable Textbox | Complete |
| Choice-Consequence System with Stats | Complete |
| Branching Narrative Engine | Complete |
| Sun Tzu Principles & Leader Parallels | Complete |
| **Game Over Scene** (killed/arrested/exiled/fired/betrayed) | **Complete** |
| Procedural Canvas Textures (no external assets) | Complete |
| Save/Load with localStorage | Complete |
| Web Audio API Sound Effects | Complete |
| Mobile Joystick Support | Complete |
| Free Play Sandbox Mode | Complete |

### Phase Structure

**Phase 1 (1974)** — Rookie PC — `tutorial` (21 nodes), `first_day` (16), `teahouse_money` (8)
> Ground level patrols. Sergeant Lam's tea money test. Your first moral fork: accept the system or fight it.

**Phase 2 (1974–75)** — Double Life — `double_life` (12), `icac_contact` (4), `promotion_exam` (11)
> Deep cover as ICAC informant "Sparrow." Traffic unit by day, spy by night. Promotion to Inspector.

**Phase 3 (1975)** — Inspector — `the_informant` (3), `the_mentor` (7)
> Power struggles intensify. Sergeant Lam becomes your mentor. Old Ghost's legacy. The web tightens.

**Phase 4 (1975)** — The Confrontation — `network_war` (4), `crisis_point` (3), `final_confrontation` (6)
> Climax against Commissioner Hsueh Kok Tung. Two paths branch: integrity or power. Both lead to 1976.

**Phase 5 (1976)** — The Dragon Head — `triad_election` (10 nodes)
> Wo Shing Wo's triad election. Two candidates: the young reformer Siu Kong wants real estate and legitimacy; the old guard Tiger Uncle wants tradition and brutality. You don't pick a side — you pick the outcome. Machiavelli's *The Prince* in action: manipulate both, control the board, or seize the throne yourself. Three radically different endings: bloody purge, dark Machiavellian deception, or police-state takeover.

**Phase 6 (1977)** — The Mutiny — `icac_mutiny` (11 nodes)
> The October 1977 police mutiny — Hong Kong's darkest month. 5,000 off-duty officers storm ICAC headquarters. You must choose: side with the rioters and become the police's uncrowned king, protect ICAC and become the system's eternal outcast, or play both sides as the ultimate double agent. Three endings: the lone hero, the power-hungry minister, or the mastermind who fooled both camps.

**Endgame** — `free_play` — Sandbox mode. Patrol Hong Kong, manage districts, build your legacy.

### Architecture
- **Phaser 3** — game engine
- **Vanilla JavaScript** — zero frameworks, zero dependencies beyond Phaser
- **Global `ICAC` namespace** — all modules communicate through a single global
- **`<script>` tag loading** — works on `file://` protocol, no build step, no server required
- **Procedural assets** — all textures generated at runtime via Canvas, zero external image files
- **Branching narrative engine** — node-based with stat/relationship/flag consequences

---

## Roadmap

### Phase 1 — Audio & Atmosphere (Next)
- **Hong Kong Radio Station**: An in-game radio playing classic 1970s-80s Cantopop and Hong Kong pop songs, toggleable during gameplay for full immersion
- **Professional Sound Design**: Replace Web Audio synthesis with recorded SFX — typewriter keys, police sirens, Hong Kong street ambience, radio static
- **Dynamic Soundtrack**: Mood-reactive background music that shifts between tension, contemplation, and action

### Phase 2 — Cloud & Persistence
- **Firebase Integration**: Cloud saves, player profiles, and cross-device progress sync
- **Global Leaderboard**: Compare story completion paths, rank progression speed, and moral alignment
- **Analytics**: Track which choices players make most — which teaches us which power techniques resonate

### Phase 3 — Languages & Accessibility
- **Multi-Language Support**: Full Traditional Chinese (Hong Kong), Simplified Chinese, and English localizations for all 50,000+ characters of dialogue
- **Accessibility Features**: Screen reader support, dyslexia-friendly fonts, colorblind modes, adjustable typewriter speed
- **Mobile Optimization**: Touch-friendly dialogue scrolling, improved virtual joystick, native app wrapper

### Phase 4 — Open World Expansion
- **Fully Accessible Open World**: All 9 districts explorable in real-time with dynamic events, random encounters, and emergent gameplay
- **Free Roam Mode**: After completing the story, patrol Hong Kong, respond to radio calls, build your precinct
- **District Control System**: Reduce corruption, build community relationships, manage police resources

### Phase 5 — ICAC-2: New Storylines
- **1980s Expansion**: The decade of greed — triad wars, stock market manipulation, the Joint Declaration
- **Post-1997 Era**: The handover — navigating Hong Kong's transition, new power structures, new alliances
- **Prequel: The War Years**: 1940s Hong Kong under Japanese occupation — how the old police order was forged
- **Multi-Character Campaign**: Play as different characters — ICAC investigator, triad boss, journalist

---

## How to Play

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. Works directly from `file://` — no server needed
4. Click **新游戏 (New Game)** to begin
5. Navigate the Hong Kong map, click districts with mission markers, make choices, learn power
6. Your progress auto-saves to browser localStorage

### Controls
| Input | Action |
|-------|--------|
| WASD / Arrow Keys | Move player on map |
| Click District | View info / start mission |
| Click Dialogue | Skip typewriter / advance |
| Click Choice | Select narrative option |
| Mouse Wheel | Scroll dialogue text |
| ESC | Return to map |
| Touch / Virtual Joystick | Mobile movement |

---

## Technical Stack

```
ICAC Chronicles/
├── index.html              # Entry point — <script> tag load order
├── phaser.min.js           # Phaser 3 game engine
├── src/
│   ├── data/
│   │   ├── missions.js     # 14 missions, 116 nodes, 50,000+ chars (1974–1980)
│   │   ├── districts.js    # 9 HK districts with corruption data
│   │   ├── ranks.js        # 14 police ranks with requirements
│   │   ├── sunzi.js        # Sun Tzu 13 chapters reference
│   │   └── leaders.js      # Historical leaders database
│   ├── scenes/
│   │   ├── MenuScene.js    # Title screen with animated particles
│   │   ├── GameScene.js    # Hong Kong map + HUD + district interactions
│   │   ├── MissionScene.js # Dialogue engine with scrollable textbox
│   │   ├── GameOverScene.js# Dramatic career endings
│   │   ├── PreloadScene.js # Procedural texture generation
│   │   └── BootScene.js    # State initialization
│   ├── systems/
│   │   └── UIToolkit.js    # HOI4-style UI components
│   └── main.js             # Game bootstrap + settings
└── sw.js                   # Service worker for offline play
```

---

## Philosophy

> **"You can be a good person and still understand how power works. In fact, you have a moral obligation to understand it — because the people who don't understand power are the ones who get hurt by it."**

This game doesn't glorify corruption. It doesn't romanticize dictatorship. It shows you the mechanics — the levers, the switches, the hidden wiring — so you can recognize them in the real world. Sun Tzu said know your enemy as you know yourself. In 1974 Hong Kong, the enemy was sometimes wearing the same uniform. Sometimes it was the person offering you tea money. Sometimes it was the face in the mirror.

The best defense against manipulation is understanding how manipulation works. That's what ICAC Chronicles teaches — not through lectures, but through living it.

---

## License

**MIT License**

Copyright (c) 2025 Gordon Huang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

> *"权力游戏不是可选项,是必修课。你可以不当赢家,但你至少要知道规则。否则,你连怎么死的都不知道。"*
> 
> — 陈教官, ICAC Chronicles
