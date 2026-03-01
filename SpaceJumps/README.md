# Space Jumps

A space-themed runner-brawler adventure game for mobile and web. Select your hero, jump through space worlds, fight enemies, collect coins, and defeat bosses.

## Play Now

**https://spacejumpsapp.netlify.app**

## Gameplay

Golden Axe + Tekken style beat-em-up. Walk through space worlds, fight waves of enemies with a full combat system, and defeat bosses.

- **Run & Jump** — tap to jump over obstacles, slide under lasers
- **Wave Combat** — enemy waves spawn and walk toward you; the screen stops while you fight
- **4 Combat Buttons** — Attack (3-hit combo with FINISH!), Magic (area blast), Shield (hold to block 65% damage), Parry (tap for perfect block + counter)
- **Boss Fights** — powerful boss at the end of each world
- **4 Characters** — Zara, Krix, Lyra, Vorn (each with unique stats and magic)
- **3 Worlds** — Nebula Fields, Crimson Void, The Void Rift
- **Shop & Missions** — earn coins, unlock characters and worlds, complete objectives

## Features

- Progressive Web App (PWA) — add to home screen on mobile
- Portrait-locked, touch-optimized controls
- Persistent progress via localStorage (profile, coins, unlocks, best scores)
- Leaderboard for best scores per world
- Hebrew instructions screen (RTL layout)

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (space-themed color palette)
- HTML5 Canvas with DPR scaling
- Web Audio API for SFX
- SVG sprites (inline, no external image files)

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Deploy

Uses Netlify. Run `/netlify-deploy` in Claude Code to build and push to production automatically.
