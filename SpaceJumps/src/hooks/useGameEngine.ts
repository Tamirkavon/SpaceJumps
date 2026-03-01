import { useRef, useState, useCallback, useEffect } from 'react';
import type {
  GameState, GamePhase, Player, Enemy, Obstacle, Collectible,
  Projectile, Particle, CharacterConfig, WorldConfig,
} from '../types';
import { applyPlayerPhysics, getSlideRect } from '../engine/physics';
import { overlaps } from '../engine/collision';
import {
  tickParticles, spawnHitParticles, spawnCoinParticles,
  spawnDamageNumber, spawnMagicParticles,
} from '../engine/particleSystem';
import {
  selectNextChunk, getBossChunk, getBossDistance, worldDifficultyAt,
} from '../engine/levelChunks';

// Layout constants
export const GROUND_FRACTION = 0.78;
export const PLAYER_X_FRACTION = 0.18;
export const PLAYER_W = 36;
export const PLAYER_H = 56;
export const BASE_SCROLL_SPEED = 90;   // Beat-em-up walking pace (was 280)
export const MAX_SCROLL_SPEED = 120;
export const PLAYER_MOVE_SPEED = 110; // px/s horizontal movement in combat

// Combat constants
export const SHIELD_DAMAGE_REDUCTION = 0.35; // player takes 35% dmg while shielding
export const PARRY_WINDOW_MS = 350;           // parry active for 350ms after tap
export const PARRY_STAGGER_MS = 700;          // attacker stunned 700ms on successful parry
export const PARRY_COOLDOWN_MS = 900;         // can't parry again for 900ms
export const COMBO_WINDOW_MS = 550;           // window between combo hits

// Wave-based enemy spawning — replaces chunk-based enemy detection
const COMBAT_WAVES: { distanceMin: number; enemies: Enemy['type'][] }[] = [
  { distanceMin: 400,  enemies: ['drone', 'drone'] },
  { distanceMin: 900,  enemies: ['drone', 'alien'] },
  { distanceMin: 1500, enemies: ['alien', 'drone', 'drone'] },
  { distanceMin: 2200, enemies: ['alien', 'mech'] },
  { distanceMin: 3000, enemies: ['mech', 'specter'] },
  { distanceMin: 3600, enemies: ['specter', 'specter', 'drone'] },
];

let _entityId = 0;
function newId() { return `e${++_entityId}`; }

function makePlayer(char: CharacterConfig, canvasW: number, canvasH: number): Player {
  const groundY = canvasH * GROUND_FRACTION;
  return {
    id: newId(),
    characterId: char.id,
    rect: { x: canvasW * PLAYER_X_FRACTION, y: groundY - PLAYER_H, w: PLAYER_W, h: PLAYER_H },
    vx: 0, vy: 0, alive: true,
    hp: char.stats.health, maxHp: char.stats.health,
    magicBar: 0, isGrounded: true, jumpsUsed: 0, isSliding: false,
    isAttacking: false, attackCooldownMs: 0, invincibleMs: 0,
    combo: 0, coins: 0, animFrame: 0, animTimer: 0,
    facingRight: true,
    movingLeft: false, movingRight: false,
    isShielding: false,
    parryWindowMs: 0, parryCooldownMs: 0, isParrying: false,
    lastParrySuccessMs: 0, comboHits: 0, comboWindowMs: 0,
  };
}

function initGameState(world: WorldConfig): GameState {
  return {
    phase: 'idle',
    worldId: world.id,
    distanceTraveled: 0,
    scrollX: 0,
    scrollSpeed: BASE_SCROLL_SPEED,
    score: 0,
    coinsThisRun: 0,
    combo: 0,
    maxCombo: 0,
    enemiesKilled: 0,
    magicUsed: 0,
    missionsProgress: {},
    lives: 3,
    countdownValue: 3,
    bossSpawned: false,
    levelCleared: false,
  };
}

function getEnemyStats(type: Enemy['type']) {
  switch (type) {
    case 'drone':      return { w: 36, h: 30, hp: 130,  atk: 10, pattern: 'patrol' as const };
    case 'alien':      return { w: 38, h: 54, hp: 160,  atk: 15, pattern: 'shooter' as const };
    case 'mech':       return { w: 50, h: 64, hp: 250,  atk: 25, pattern: 'patrol' as const };
    case 'specter':    return { w: 36, h: 54, hp: 140,  atk: 12, pattern: 'charge' as const };
    case 'boss-titan': return { w: 96, h: 100, hp: 900,  atk: 30, pattern: 'boss' as const };
    case 'boss-queen': return { w: 100, h: 110, hp: 1200, atk: 25, pattern: 'boss' as const };
    case 'boss-void':  return { w: 110, h: 110, hp: 1600, atk: 35, pattern: 'boss' as const };
    default:           return { w: 36, h: 36, hp: 130, atk: 10, pattern: 'patrol' as const };
  }
}

// Spawn a wave of enemies directly at the right edge of the visible screen
function spawnCombatWave(
  types: Enemy['type'][],
  canvasW: number, canvasH: number,
  enemies: Enemy[],
) {
  const gY = canvasH * GROUND_FRACTION;
  types.forEach((type, i) => {
    const stats = getEnemyStats(type);
    // Stagger enemies across the right edge, 65px apart
    const spawnX = canvasW + 20 + i * 65;
    enemies.push({
      id: newId(), type,
      rect: { x: spawnX, y: gY - stats.h, w: stats.w, h: stats.h },
      vx: 0, vy: 0, alive: true,
      hp: stats.hp, maxHp: stats.hp,
      attackDamage: stats.atk,
      movePattern: stats.pattern,
      staggerMs: 0, attackCooldownMs: 800,
      animFrame: 0, animTimer: 0,
      projectiles: [], phase: 0,
    });
  });
}

function spawnEntity(
  chunk: ReturnType<typeof selectNextChunk>,
  spawnX: number, canvasW: number, canvasH: number,
  enemies: Enemy[], obstacles: Obstacle[], collectibles: Collectible[],
  world: WorldConfig,
) {
  const gY = canvasH * GROUND_FRACTION;
  for (const item of chunk.items) {
    const x = spawnX + item.relX * canvasW;
    const y = item.relY * canvasH;
    if (item.kind === 'obstacle') {
      let w = 40, h = 40;
      if (item.type === 'laser-h') { w = 180; h = 14; }
      else if (item.type === 'laser-v') { w = 14; h = 120; }
      else if (item.type === 'spike-wall') { w = 24; h = 60; }
      obstacles.push({
        id: newId(), kind: item.type as Obstacle['kind'],
        rect: { x, y: item.type === 'asteroid' || item.type === 'debris' ? gY - h : y, w, h },
        vx: 0, vy: 0, alive: true,
        isLethal: item.type === 'spike-wall' || item.type === 'laser-h' || item.type === 'laser-v',
        animPhase: 0, color: world.accentColor,
      });
    } else if (item.kind === 'collectible') {
      const sz = item.type === 'gem' || item.type === 'magic-crystal' ? 22 : 20;
      collectibles.push({
        id: newId(), kind: item.type as Collectible['kind'],
        rect: { x, y, w: sz, h: sz },
        vx: 0, vy: 0, alive: true,
        value: item.type === 'gem' ? 25 : item.type === 'magic-crystal' ? 0 : item.type === 'health-orb' ? 0 : 1,
        animPhase: Math.random() * Math.PI * 2,
      });
    }
    // NOTE: enemies in chunks are intentionally ignored — waves handle spawning
  }
}

export interface GameEngineReturn {
  stateRef: React.MutableRefObject<GameState>;
  playerRef: React.MutableRefObject<Player | null>;
  enemiesRef: React.MutableRefObject<Enemy[]>;
  obstaclesRef: React.MutableRefObject<Obstacle[]>;
  collectiblesRef: React.MutableRefObject<Collectible[]>;
  projectilesRef: React.MutableRefObject<Projectile[]>;
  particlesRef: React.MutableRefObject<Particle[]>;
  phase: GamePhase;
  score: number;
  lives: number;
  countdownValue: number;
  jump: () => void;
  slide: () => void;
  attack: () => void;
  castMagic: () => void;
  shield: (active: boolean) => void;
  parry: () => void;
  moveLeft: (active: boolean) => void;
  moveRight: (active: boolean) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  waveRef: React.MutableRefObject<number>;
  bossDistance: number;
  scrollSpeed: number;
  onCanvasReady: (w: number, h: number) => void;
}

export function useGameEngine(
  character: CharacterConfig,
  world: WorldConfig,
  onRunEnd: (result: { score: number; coins: number; distance: number; killed: number; magicUsed: number; won: boolean }) => void,
): GameEngineReturn {
  const canvasSizeRef = useRef({ w: 390, h: 844 });

  const stateRef = useRef<GameState>(initGameState(world));
  const playerRef = useRef<Player | null>(null);
  const enemiesRef = useRef<Enemy[]>([]);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const phaseRef = useRef<GamePhase>('idle');
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const nextChunkXRef = useRef(0);
  const nextWaveIdxRef = useRef(0);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const characterRef = useRef(character);
  const worldRef = useRef(world);
  const onRunEndRef = useRef(onRunEnd);
  characterRef.current = character;
  worldRef.current = world;
  onRunEndRef.current = onRunEnd;

  const [phase, setPhase] = useState<GamePhase>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [countdownValue, setCountdownValue] = useState(3);

  const setPhaseSync = useCallback((p: GamePhase) => {
    phaseRef.current = p;
    stateRef.current.phase = p;
    setPhase(p);
  }, []);

  const onCanvasReady = useCallback((w: number, h: number) => {
    canvasSizeRef.current = { w, h };
    const p = makePlayer(character, w, h);
    playerRef.current = p;
    nextChunkXRef.current = w;
    // Spawn first few obstacle/collectible chunks
    for (let i = 0; i < 3; i++) {
      const chunk = selectNextChunk(world.id, 0);
      spawnEntity(chunk, nextChunkXRef.current, w, h,
        enemiesRef.current, obstaclesRef.current, collectiblesRef.current, world);
      nextChunkXRef.current += chunk.width;
    }
  }, [character, world]);

  const tickRef = useRef<(ts: number) => void>(() => undefined);

  tickRef.current = (ts: number) => {
    const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
    lastTsRef.current = ts;
    const ph = phaseRef.current;
    const state = stateRef.current;
    const player = playerRef.current;
    const char = characterRef.current;
    const wrld = worldRef.current;

    if (!player || ph === 'paused' || ph === 'dead' || ph === 'results' || ph === 'level-clear') {
      rafRef.current = requestAnimationFrame((ts2) => tickRef.current(ts2));
      return;
    }

    const { w: CW, h: CH } = canvasSizeRef.current;
    const groundY = CH * GROUND_FRACTION;

    // ── Physics ──────────────────────────────────────────────────────────
    applyPlayerPhysics(player, groundY, dt);

    // ── Player horizontal movement (running/boss) ─────────────────────────
    if (ph === 'running' || ph === 'boss') {
      const moveSpeed = player.movingLeft ? -PLAYER_MOVE_SPEED
        : player.movingRight ? PLAYER_MOVE_SPEED : 0;
      if (moveSpeed !== 0) {
        player.rect.x = Math.max(10, Math.min(CW - PLAYER_W - 10, player.rect.x + moveSpeed * dt));
        player.facingRight = moveSpeed > 0;
      }
    }

    // Cooldown timers
    if (player.attackCooldownMs > 0) player.attackCooldownMs -= dt * 1000;
    if (player.invincibleMs > 0) player.invincibleMs -= dt * 1000;
    if (player.parryWindowMs > 0) player.parryWindowMs -= dt * 1000;
    if (player.parryCooldownMs > 0) player.parryCooldownMs -= dt * 1000;
    if (player.lastParrySuccessMs > 0) player.lastParrySuccessMs -= dt * 1000;
    if (player.comboWindowMs > 0) {
      player.comboWindowMs -= dt * 1000;
    } else if (player.comboHits > 0) {
      player.comboHits = 0; // reset stale combo
    }

    // Animation
    player.animTimer += dt * 1000;
    if (player.animTimer > 200) {
      player.animFrame = (player.animFrame + 1) % 2;
      player.animTimer = 0;
    }

    // ── World Scroll (running phase only — stops in combat/boss) ─────────
    if (ph === 'running') {
      const targetSpeed = player.movingRight
        ? MAX_SCROLL_SPEED
        : player.movingLeft
        ? 30
        : BASE_SCROLL_SPEED;
      state.scrollSpeed += (targetSpeed - state.scrollSpeed) * Math.min(1, dt * 3);
      const speed = state.scrollSpeed;
      state.scrollX += speed * dt;
      state.distanceTraveled += speed * dt;

      // Scroll obstacles and collectibles leftward
      for (const obs of obstaclesRef.current) { obs.rect.x -= speed * dt; }
      for (const col of collectiblesRef.current) {
        col.rect.x -= speed * dt;
        col.animPhase += dt * 3;
      }

      // Remove off-screen entities
      obstaclesRef.current = obstaclesRef.current.filter(o => o.rect.x + o.rect.w > -50);
      collectiblesRef.current = collectiblesRef.current.filter(c => c.rect.x + c.rect.w > -50);

      // Spawn new terrain chunks (obstacles + collectibles, no enemies)
      const bossDistance = getBossDistance(wrld.id);
      if (!state.bossSpawned && state.distanceTraveled >= bossDistance) {
        state.bossSpawned = true;
        // Spawn boss loot chunk
        const bossChunk = getBossChunk(wrld.id);
        spawnEntity(bossChunk, nextChunkXRef.current - state.scrollX + CW, CW, CH,
          enemiesRef.current, obstaclesRef.current, collectiblesRef.current, wrld);
        // Spawn boss enemy directly on screen
        spawnCombatWave([wrld.bossType], CW, CH, enemiesRef.current);
        // Clear wave enemies — boss fight starts clean
        enemiesRef.current = enemiesRef.current.filter(e => e.type.startsWith('boss'));
        setPhaseSync('boss');
      } else if (nextChunkXRef.current - state.scrollX < CW * 2) {
        const difficulty = worldDifficultyAt(state.distanceTraveled, wrld.difficultyMultiplier);
        const chunk = selectNextChunk(wrld.id, difficulty);
        spawnEntity(chunk, nextChunkXRef.current - state.scrollX + CW, CW, CH,
          enemiesRef.current, obstaclesRef.current, collectiblesRef.current, wrld);
        nextChunkXRef.current += chunk.width;
      }

      // Wave-based enemy spawning — world keeps scrolling, no phase change
      const waveIdx = nextWaveIdxRef.current;
      if (waveIdx < COMBAT_WAVES.length && state.distanceTraveled >= COMBAT_WAVES[waveIdx].distanceMin) {
        spawnCombatWave(COMBAT_WAVES[waveIdx].enemies, CW, CH, enemiesRef.current);
        nextWaveIdxRef.current = waveIdx + 1;
      }
    }

    // Animate collectibles during boss phase (running phase animates them above)
    if (ph === 'boss') {
      for (const col of collectiblesRef.current) {
        col.animPhase += dt * 3;
      }
    }

    // ── Enemy AI ─────────────────────────────────────────────────────────
    if (ph === 'combat' || ph === 'boss' || ph === 'running') {
      const visibleEnemies = enemiesRef.current.filter(e => e.alive && e.rect.x < CW + 200);

      for (const enemy of visibleEnemies) {
        enemy.animTimer += dt * 1000;
        if (enemy.animTimer > 300) {
          enemy.animFrame = (enemy.animFrame + 1) % 2;
          enemy.animTimer = 0;
        }
        if (enemy.attackCooldownMs > 0) enemy.attackCooldownMs -= dt * 1000;
        if (enemy.staggerMs > 0) {
          enemy.staggerMs -= dt * 1000;
          continue;
        }

        const px = player.rect.x + player.rect.w / 2;
        const ex = enemy.rect.x + enemy.rect.w / 2;
        const dist = Math.abs(px - ex);

        // Enemy movement — always active at full speed
        if (enemy.movePattern === 'patrol') {
          const dir = px < ex ? -1 : 1;
          enemy.rect.x += dir * 75 * dt;
        } else if (enemy.movePattern === 'charge') {
          const dir = px < ex ? -1 : 1;
          enemy.rect.x += dir * 120 * dt;
        } else if (enemy.movePattern === 'shooter') {
          const dir = px < ex ? -1 : 1;
          if (dist > 150) enemy.rect.x += dir * 50 * dt;
        } else if (enemy.movePattern === 'boss') {
          if (!enemy.vx) enemy.vx = -60;
          enemy.rect.x += enemy.vx * dt;
          if (enemy.rect.x < CW * 0.4 || enemy.rect.x > CW * 0.7) enemy.vx *= -1;
        }
        // Keep enemies from walking off left edge
        if (enemy.rect.x < 10) enemy.rect.x = 10;

        // Melee attack player if in range
        if (dist < 65 && enemy.attackCooldownMs <= 0) {
          if (player.invincibleMs <= 0 && overlaps(player.rect, enemy.rect)) {
            // Check parry first (highest priority)
            if (player.isParrying && player.parryWindowMs > 0) {
              // Successful parry!
              enemy.staggerMs = PARRY_STAGGER_MS;
              player.parryWindowMs = 0;
              player.isParrying = false;
              player.lastParrySuccessMs = 700;
              enemy.attackCooldownMs = 1500;
              spawnHitParticles(particlesRef.current,
                player.rect.x + player.rect.w / 2, player.rect.y + player.rect.h / 2,
                '#00ffff', 12);
              // "PARRY!" floating text
              particlesRef.current.push({
                x: player.rect.x + 5, y: player.rect.y - 25,
                vx: 10, vy: -60, life: 900, maxLife: 900,
                color: '#00ffff', size: 14, text: 'PARRY!',
              });
              continue;
            }

            let dmg = enemy.attackDamage;
            // Shield reduces damage by 65%
            if (player.isShielding) {
              dmg = Math.round(dmg * SHIELD_DAMAGE_REDUCTION);
            }
            player.hp -= dmg;
            player.invincibleMs = player.isShielding ? 500 : 800;
            spawnDamageNumber(particlesRef.current, player.rect.x + 20, player.rect.y - 10, dmg, '#ef4444');
            spawnHitParticles(particlesRef.current,
              player.rect.x + player.rect.w / 2, player.rect.y + player.rect.h / 2,
              player.isShielding ? '#60a5fa' : '#ef4444', 5);
            enemy.attackCooldownMs = 1200;

            if (player.hp <= 0) {
              player.hp = 0;
              state.lives--;
              setLives(state.lives);
              if (state.lives <= 0) {
                setPhaseSync('dead');
                onRunEndRef.current({
                  score: state.score, coins: state.coinsThisRun,
                  distance: Math.floor(state.distanceTraveled / 10),
                  killed: state.enemiesKilled, magicUsed: state.magicUsed,
                  won: false,
                });
                return;
              } else {
                player.hp = char.stats.health;
                player.invincibleMs = 2000;
              }
            }
          }
        }
      }

      // Remove dead enemies + spawn death particles
      for (const enemy of enemiesRef.current.filter(e => !e.alive)) {
        spawnHitParticles(particlesRef.current,
          enemy.rect.x + enemy.rect.w / 2, enemy.rect.y + enemy.rect.h / 2, '#ffaa44', 14);
      }
      const beforeCount = enemiesRef.current.length;
      enemiesRef.current = enemiesRef.current.filter(e => e.alive);
      state.enemiesKilled += beforeCount - enemiesRef.current.length;

      // Check if boss is defeated
      const aliveOnScreen = enemiesRef.current.filter(e => e.rect.x < CW + 150).length;
      if (aliveOnScreen === 0) {
        if (ph === 'boss') {
          state.levelCleared = true;
          setPhaseSync('level-clear');
          onRunEndRef.current({
            score: state.score, coins: state.coinsThisRun,
            distance: Math.floor(state.distanceTraveled / 10),
            killed: state.enemiesKilled, magicUsed: state.magicUsed,
            won: true,
          });
          return;
        }
      }
    }

    // ── Obstacle Collision ────────────────────────────────────────────────
    if (player.invincibleMs <= 0) {
      const playerRect = player.isSliding ? getSlideRect(player.rect) : player.rect;
      for (const obs of obstaclesRef.current) {
        if (!obs.alive) continue;
        if (overlaps(playerRect, obs.rect)) {
          let dmg = obs.isLethal ? 50 : 20;
          if (player.isShielding) dmg = Math.round(dmg * SHIELD_DAMAGE_REDUCTION);
          player.hp -= dmg;
          player.invincibleMs = 600;
          spawnHitParticles(particlesRef.current, obs.rect.x, obs.rect.y, '#ef4444', 6);
          spawnDamageNumber(particlesRef.current, player.rect.x + 20, player.rect.y - 10, dmg, '#ef4444');
          if (player.hp <= 0) {
            player.hp = 0;
            state.lives--;
            setLives(state.lives);
            if (state.lives <= 0) {
              setPhaseSync('dead');
              onRunEndRef.current({ score: state.score, coins: state.coinsThisRun,
                distance: Math.floor(state.distanceTraveled / 10),
                killed: state.enemiesKilled, magicUsed: state.magicUsed, won: false });
              return;
            } else {
              player.hp = char.stats.health;
              player.invincibleMs = 2000;
            }
          }
          break;
        }
      }
    }

    // ── Collectible Collision ─────────────────────────────────────────────
    for (const col of collectiblesRef.current) {
      if (!col.alive) continue;
      if (overlaps(player.rect, col.rect)) {
        col.alive = false;
        if (col.kind === 'coin') {
          state.coinsThisRun += col.value;
          state.score += 10;
          spawnCoinParticles(particlesRef.current, col.rect.x, col.rect.y);
        } else if (col.kind === 'gem') {
          state.coinsThisRun += col.value;
          state.score += 250;
          spawnHitParticles(particlesRef.current, col.rect.x, col.rect.y, '#38bdf8', 8);
        } else if (col.kind === 'health-orb') {
          player.hp = Math.min(player.hp + 30, player.maxHp);
          spawnHitParticles(particlesRef.current, col.rect.x, col.rect.y, '#ef4444', 8);
        } else if (col.kind === 'magic-crystal') {
          player.magicBar = Math.min(player.magicBar + 40, 100);
          spawnHitParticles(particlesRef.current, col.rect.x, col.rect.y, '#c084fc', 8);
        }
        setScore(state.score);
      }
    }
    collectiblesRef.current = collectiblesRef.current.filter(c => c.alive);

    // ── Particles ─────────────────────────────────────────────────────────
    tickParticles(particlesRef.current, dt);

    rafRef.current = requestAnimationFrame((ts2) => tickRef.current(ts2));
  };

  const startCountdown = useCallback(() => {
    setPhaseSync('countdown');
    let count = 3;
    setCountdownValue(count);
    countdownIntervalRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(countdownIntervalRef.current);
        setPhaseSync('running');
        lastTsRef.current = performance.now();
        rafRef.current = requestAnimationFrame((ts) => tickRef.current(ts));
      } else {
        setCountdownValue(count);
      }
    }, 1000);
  }, [setPhaseSync]); // eslint-disable-line

  // ── Player Actions ─────────────────────────────────────────────────────
  const jump = useCallback(() => {
    const ph = phaseRef.current;
    if (ph !== 'running' && ph !== 'combat' && ph !== 'boss') return;
    const player = playerRef.current;
    if (!player) return;
    if (player.isGrounded) {
      player.vy = character.stats.jumpForce;
      player.isGrounded = false;
      player.isSliding = false;
      player.jumpsUsed = 1;
    } else if (player.jumpsUsed < 2) {
      player.vy = character.stats.jumpForce * 0.85;
      player.jumpsUsed = 2;
    }
  }, [character.stats.jumpForce]);

  const slide = useCallback(() => {
    const ph = phaseRef.current;
    if (ph !== 'running') return;
    const player = playerRef.current;
    if (!player || !player.isGrounded) return;
    player.isSliding = true;
    setTimeout(() => { if (playerRef.current) playerRef.current.isSliding = false; }, 600);
  }, []);

  const attack = useCallback(() => {
    const ph = phaseRef.current;
    if (ph !== 'running' && ph !== 'boss') return;
    const player = playerRef.current;
    if (!player || player.attackCooldownMs > 0) return;

    // Combo tracking
    if (player.comboWindowMs <= 0) player.comboHits = 0;
    player.comboHits = (player.comboHits % 3) + 1;
    player.comboWindowMs = COMBO_WINDOW_MS;

    const isFinisher = player.comboHits === 3;
    const dmgMultiplier = isFinisher ? 1.5 : 1.0;
    const hitboxW = isFinisher ? 90 : 70;

    player.isAttacking = true;
    player.attackCooldownMs = isFinisher ? 600 : 300;
    setTimeout(() => { if (playerRef.current) playerRef.current.isAttacking = false; }, 220);

    const atkRect = player.facingRight
      ? { x: player.rect.x + player.rect.w, y: player.rect.y + player.rect.h * 0.2, w: hitboxW, h: player.rect.h * 0.6 }
      : { x: player.rect.x - hitboxW, y: player.rect.y + player.rect.h * 0.2, w: hitboxW, h: player.rect.h * 0.6 };

    let hitAny = false;
    for (const enemy of enemiesRef.current) {
      if (!enemy.alive) continue;
      if (overlaps(atkRect, enemy.rect)) {
        const dmg = Math.round(character.stats.attackDamage * dmgMultiplier);
        enemy.hp -= dmg;
        enemy.staggerMs = isFinisher ? 500 : 250;
        spawnDamageNumber(particlesRef.current,
          enemy.rect.x + enemy.rect.w / 2, enemy.rect.y - 8, dmg,
          isFinisher ? '#ffffff' : '#f59e0b');
        spawnHitParticles(particlesRef.current,
          enemy.rect.x + enemy.rect.w / 2, enemy.rect.y + enemy.rect.h / 2,
          isFinisher ? '#ffffff' : character.colors.primary,
          isFinisher ? 10 : 6);
        if (enemy.hp <= 0) {
          enemy.alive = false;
          stateRef.current.score += isFinisher ? 150 : 100;
          setScore(stateRef.current.score);
        }
        if (playerRef.current) {
          playerRef.current.magicBar = Math.min(
            playerRef.current.magicBar + character.ability.magicBarFillRate, 100);
        }
        hitAny = true;
      }
    }

    // Show combo indicator on multi-hit
    if (hitAny && player.comboHits > 1) {
      const label = isFinisher ? 'FINISH!' : `HIT ${player.comboHits}`;
      particlesRef.current.push({
        x: player.rect.x + player.rect.w + 10, y: player.rect.y - 10,
        vx: 25, vy: -45, life: 550, maxLife: 550,
        color: isFinisher ? '#ffffff' : '#f59e0b', size: 13, text: label,
      });
    }
  }, [character]);

  const castMagic = useCallback(() => {
    const ph = phaseRef.current;
    if (ph !== 'running' && ph !== 'boss') return;
    const player = playerRef.current;
    if (!player || player.magicBar < character.stats.magicCost) return;
    player.magicBar -= character.stats.magicCost;
    stateRef.current.magicUsed++;

    const cx = player.rect.x + player.rect.w / 2;
    const cy = player.rect.y + player.rect.h / 2;
    spawnMagicParticles(particlesRef.current, cx, cy, character.colors.primary, 20);

    for (const enemy of enemiesRef.current) {
      if (!enemy.alive) continue;
      const dmg = character.stats.magicDamage;
      enemy.hp -= dmg;
      enemy.staggerMs = 600;
      spawnDamageNumber(particlesRef.current,
        enemy.rect.x + enemy.rect.w / 2, enemy.rect.y - 8, dmg, character.colors.primary);
      if (enemy.hp <= 0) {
        enemy.alive = false;
        stateRef.current.score += 150;
        setScore(stateRef.current.score);
      }
    }

    if (character.ability.specialEffect === 'heal') {
      player.hp = Math.min(player.hp + 20, player.maxHp);
    } else if (character.ability.specialEffect === 'invisibility') {
      player.invincibleMs = 3000;
    }
  }, [character]);

  const shield = useCallback((active: boolean) => {
    const ph = phaseRef.current;
    if (ph !== 'combat' && ph !== 'boss' && ph !== 'running') return;
    const player = playerRef.current;
    if (!player) return;
    if (active && player.isAttacking) return; // can't shield mid-attack
    player.isShielding = active;
  }, []);

  const parry = useCallback(() => {
    const ph = phaseRef.current;
    if (ph !== 'running' && ph !== 'boss') return;
    const player = playerRef.current;
    if (!player) return;
    if (player.parryCooldownMs > 0) return; // on cooldown
    if (player.isAttacking) return; // can't parry mid-attack
    player.isParrying = true;
    player.parryWindowMs = PARRY_WINDOW_MS;
    player.parryCooldownMs = PARRY_COOLDOWN_MS;
  }, []);

  const moveLeft = useCallback((active: boolean) => {
    const player = playerRef.current;
    if (!player) return;
    player.movingLeft = active;
    if (active) player.movingRight = false;
  }, []);

  const moveRight = useCallback((active: boolean) => {
    const player = playerRef.current;
    if (!player) return;
    player.movingRight = active;
    if (active) player.movingLeft = false;
  }, []);

  const pauseGame = useCallback(() => {
    if (phaseRef.current === 'running' || phaseRef.current === 'combat' || phaseRef.current === 'boss') {
      cancelAnimationFrame(rafRef.current);
      setPhaseSync('paused');
    }
  }, [setPhaseSync]);

  const resumeGame = useCallback(() => {
    if (phaseRef.current === 'paused') {
      setPhaseSync('running');
      lastTsRef.current = performance.now();
      rafRef.current = requestAnimationFrame((ts) => tickRef.current(ts));
    }
  }, [setPhaseSync]);

  useEffect(() => {
    const t = setTimeout(() => startCountdown(), 500);
    return () => {
      clearTimeout(t);
      clearInterval(countdownIntervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line

  return {
    stateRef, playerRef, enemiesRef, obstaclesRef, collectiblesRef,
    projectilesRef, particlesRef,
    phase, score, lives, countdownValue,
    jump, slide, attack, castMagic, shield, parry,
    moveLeft, moveRight,
    pauseGame, resumeGame, onCanvasReady,
    waveRef: nextWaveIdxRef,
    bossDistance: getBossDistance(world.id),
    scrollSpeed: stateRef.current?.scrollSpeed ?? BASE_SCROLL_SPEED,
  };
}
