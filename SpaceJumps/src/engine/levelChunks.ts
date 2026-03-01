import type { LevelChunk, WorldConfig } from '../types';

// Canvas logical width for chunk layout
const CW = 400;
// Ground relative Y — matches GROUND_FRACTION in useGameEngine (0.78)
const GY = 0.78;

function chunk(
  id: string,
  width: number,
  items: LevelChunk['items'],
  triggerCombat = false,
  triggerBoss = false,
): LevelChunk {
  return { id, width, items, triggerCombat, triggerBoss };
}

// ─── Nebula World Chunks ────────────────────────────────────────────────────
export const nebulaChunks: LevelChunk[] = [
  // Open run - just coins
  chunk('n-run1', CW, [
    { kind: 'collectible', type: 'coin', relX: 0.2, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.35, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.5, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.65, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.8, relY: GY - 0.05 },
  ]),

  // Low asteroid - jumpable (relY offset capped at 0.06 for clearance)
  chunk('n-ast1', CW, [
    { kind: 'obstacle', type: 'asteroid', relX: 0.3, relY: GY - 0.06 },
    { kind: 'collectible', type: 'coin', relX: 0.5, relY: GY - 0.12 },
    { kind: 'collectible', type: 'coin', relX: 0.7, relY: GY - 0.05 },
  ]),

  // Two asteroids spaced
  chunk('n-ast2', CW, [
    { kind: 'obstacle', type: 'asteroid', relX: 0.2, relY: GY - 0.06 },
    { kind: 'obstacle', type: 'asteroid', relX: 0.65, relY: GY - 0.06 },
    { kind: 'collectible', type: 'coin', relX: 0.42, relY: GY - 0.05 },
    { kind: 'collectible', type: 'gem', relX: 0.42, relY: GY - 0.12 },
  ]),

  // Debris field
  chunk('n-deb1', CW, [
    { kind: 'obstacle', type: 'debris', relX: 0.15, relY: GY - 0.05 },
    { kind: 'obstacle', type: 'debris', relX: 0.4, relY: GY - 0.05 },
    { kind: 'obstacle', type: 'debris', relX: 0.65, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.28, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.52, relY: GY - 0.05 },
  ]),

  // Coin arc (no enemies/obstacles — reward stretch)
  chunk('n-coins1', CW, [
    { kind: 'collectible', type: 'coin', relX: 0.1, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.2, relY: GY - 0.09 },
    { kind: 'collectible', type: 'coin', relX: 0.3, relY: GY - 0.12 },
    { kind: 'collectible', type: 'gem', relX: 0.4, relY: GY - 0.14 },
    { kind: 'collectible', type: 'coin', relX: 0.5, relY: GY - 0.12 },
    { kind: 'collectible', type: 'coin', relX: 0.6, relY: GY - 0.09 },
    { kind: 'collectible', type: 'coin', relX: 0.7, relY: GY - 0.05 },
  ]),

  // Mixed obstacles and magic crystal
  chunk('n-mix1', CW, [
    { kind: 'obstacle', type: 'asteroid', relX: 0.25, relY: GY - 0.06 },
    { kind: 'collectible', type: 'magic-crystal', relX: 0.5, relY: GY - 0.14 },
    { kind: 'obstacle', type: 'debris', relX: 0.75, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.5, relY: GY - 0.05 },
  ]),

  // Health orb run
  chunk('n-heal1', CW, [
    { kind: 'collectible', type: 'health-orb', relX: 0.3, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.5, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.7, relY: GY - 0.05 },
  ]),
];

// ─── Crimson World Chunks ───────────────────────────────────────────────────
export const crimsonChunks: LevelChunk[] = [
  chunk('c-run1', CW, [
    { kind: 'collectible', type: 'coin', relX: 0.25, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.5, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.75, relY: GY - 0.05 },
    { kind: 'obstacle', type: 'asteroid', relX: 0.6, relY: GY - 0.06 },
  ]),
  // Laser-h placed low enough to slide under (player can duck at GY - 0.15)
  chunk('c-laser1', CW, [
    { kind: 'obstacle', type: 'laser-h', relX: 0.3, relY: GY - 0.15 },
    { kind: 'collectible', type: 'coin', relX: 0.55, relY: GY - 0.05 },
    { kind: 'collectible', type: 'gem', relX: 0.7, relY: GY - 0.05 },
  ]),
  chunk('c-spike1', CW, [
    { kind: 'obstacle', type: 'spike-wall', relX: 0.35, relY: GY - 0.07 },
    { kind: 'collectible', type: 'coin', relX: 0.15, relY: GY - 0.05 },
    { kind: 'collectible', type: 'coin', relX: 0.65, relY: GY - 0.05 },
  ]),
  chunk('c-lasermix', CW, [
    { kind: 'obstacle', type: 'laser-v', relX: 0.3, relY: 0.35 },
    { kind: 'obstacle', type: 'laser-v', relX: 0.6, relY: 0.35 },
    { kind: 'collectible', type: 'coin', relX: 0.45, relY: GY - 0.05 },
    { kind: 'collectible', type: 'gem', relX: 0.45, relY: GY - 0.12 },
  ]),
  chunk('c-heal1', CW, [
    { kind: 'collectible', type: 'health-orb', relX: 0.25, relY: GY - 0.05 },
    { kind: 'collectible', type: 'magic-crystal', relX: 0.5, relY: GY - 0.05 },
    { kind: 'collectible', type: 'gem', relX: 0.75, relY: GY - 0.05 },
  ]),
];

// ─── Void World Chunks ──────────────────────────────────────────────────────
export const voidChunks: LevelChunk[] = [
  chunk('v-run1', CW, [
    { kind: 'obstacle', type: 'debris', relX: 0.2, relY: GY - 0.05 },
    { kind: 'obstacle', type: 'asteroid', relX: 0.5, relY: GY - 0.06 },
    { kind: 'collectible', type: 'gem', relX: 0.35, relY: GY - 0.12 },
  ]),
  chunk('v-allobs', CW, [
    { kind: 'obstacle', type: 'spike-wall', relX: 0.2, relY: GY - 0.07 },
    { kind: 'obstacle', type: 'laser-h', relX: 0.5, relY: GY - 0.15 },
    { kind: 'obstacle', type: 'spike-wall', relX: 0.75, relY: GY - 0.07 },
    { kind: 'collectible', type: 'coin', relX: 0.35, relY: GY - 0.05 },
  ]),
  chunk('v-heal1', CW, [
    { kind: 'collectible', type: 'health-orb', relX: 0.3, relY: GY - 0.05 },
    { kind: 'collectible', type: 'magic-crystal', relX: 0.5, relY: GY - 0.05 },
    { kind: 'collectible', type: 'gem', relX: 0.7, relY: GY - 0.05 },
  ]),
  chunk('v-lasermix', CW, [
    { kind: 'obstacle', type: 'laser-v', relX: 0.25, relY: 0.3 },
    { kind: 'obstacle', type: 'laser-v', relX: 0.65, relY: 0.3 },
    { kind: 'collectible', type: 'coin', relX: 0.45, relY: GY - 0.05 },
  ]),
];

// Boss trigger chunks (end of each world) — bosses use wave spawning, these just have loot
export const bossChunkNebula: LevelChunk = chunk('boss-nebula', CW * 2, [
  { kind: 'collectible', type: 'health-orb', relX: 0.15, relY: GY - 0.05 },
  { kind: 'collectible', type: 'magic-crystal', relX: 0.25, relY: GY - 0.05 },
], false, true);

export const bossChunkCrimson: LevelChunk = chunk('boss-crimson', CW * 2, [
  { kind: 'collectible', type: 'health-orb', relX: 0.1, relY: GY - 0.05 },
  { kind: 'collectible', type: 'magic-crystal', relX: 0.2, relY: GY - 0.05 },
], false, true);

export const bossChunkVoid: LevelChunk = chunk('boss-void', CW * 2, [
  { kind: 'collectible', type: 'health-orb', relX: 0.1, relY: GY - 0.05 },
  { kind: 'collectible', type: 'magic-crystal', relX: 0.2, relY: GY - 0.05 },
], false, true);

export function getChunksForWorld(worldId: string): LevelChunk[] {
  switch (worldId) {
    case 'nebula': return nebulaChunks;
    case 'crimson': return crimsonChunks;
    case 'void': return voidChunks;
    default: return nebulaChunks;
  }
}

export function getBossChunk(worldId: string): LevelChunk {
  switch (worldId) {
    case 'nebula': return bossChunkNebula;
    case 'crimson': return bossChunkCrimson;
    case 'void': return bossChunkVoid;
    default: return bossChunkNebula;
  }
}

// How far to travel (in pixels) before boss chunk
export function getBossDistance(worldId: string): number {
  const base = worldId === 'nebula' ? 4000 : worldId === 'crimson' ? 6000 : 8000;
  return base;
}

export function selectNextChunk(worldId: string, difficulty: number): LevelChunk {
  const chunks = getChunksForWorld(worldId);
  // Weight toward harder chunks as difficulty increases
  const idx = Math.floor(Math.random() * Math.min(chunks.length, 3 + Math.floor(difficulty * 2)));
  return chunks[Math.min(idx, chunks.length - 1)];
}

export function worldDifficultyAt(distance: number, multiplier: number): number {
  return Math.min((distance / 3000) * multiplier, 3);
}
