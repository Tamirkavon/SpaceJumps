# Space Jumps

A space-themed runner-brawler adventure game for mobile and web. Select your hero, jump through space worlds, fight enemies, collect coins, and defeat bosses.

## Play Now

> Deployment in progress — link will be added here once live.

## Gameplay

- **Run & Jump** — tap to jump, swipe down to slide past obstacles
- **Combat Mode** — when enemies appear, scroll pauses and attack/magic buttons appear
- **Boss Fights** — 3-phase boss at the end of each world
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
