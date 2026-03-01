import { useEffect, useRef, useCallback } from 'react';
import type { GameEngineReturn } from '../hooks/useGameEngine';
import { GROUND_FRACTION, PLAYER_W, PLAYER_H } from '../hooks/useGameEngine';
import { drawParticles } from '../engine/particleSystem';
import { drawSprite, SPRITE_KEYS } from '../utils/spriteLoader';
import type { WorldConfig, CharacterConfig, Enemy, Obstacle, Collectible, Player } from '../types';

interface Props {
  engine: GameEngineReturn;
  world: WorldConfig;
  character: CharacterConfig;
}

// Star positions (generated once)
let starCache: { x: number; y: number; r: number; alpha: number }[] = [];

function ensureStars(count: number, w: number, h: number) {
  if (starCache.length !== count) {
    starCache = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.5 + Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.8,
    }));
  }
}

function drawBackground(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  world: WorldConfig, scrollX: number,
) {
  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, world.bgTop);
  grad.addColorStop(1, world.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Nebula clouds
  if (world.nebula) {
    for (const n of world.nebula) {
      const nx = (n.x * w - scrollX * 0.02) % (w * 1.5) - w * 0.25;
      const ny = n.y * h;
      const radGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r * w);
      radGrad.addColorStop(0, n.color);
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // Stars (parallax layers)
  ensureStars(world.starDensity, w, h);
  const layers = [0.05, 0.15, 0.3]; // parallax multipliers
  const starGroup = Math.ceil(world.starDensity / 3);
  for (let layer = 0; layer < 3; layer++) {
    const scroll = scrollX * layers[layer];
    ctx.fillStyle = '#ffffff';
    for (let i = layer * starGroup; i < Math.min((layer + 1) * starGroup, starCache.length); i++) {
      const s = starCache[i];
      const sx = ((s.x - scroll) % w + w) % w;
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(sx, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function drawGround(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  world: WorldConfig, scrollX: number,
) {
  const groundY = h * GROUND_FRACTION;
  // Ground surface
  ctx.fillStyle = world.groundColor;
  ctx.fillRect(0, groundY, w, h - groundY);
  // Ground top line glow
  ctx.strokeStyle = world.accentColor;
  ctx.lineWidth = 2;
  ctx.shadowColor = world.accentColor;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(w, groundY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Ground grid lines (scrolling)
  ctx.strokeStyle = world.accentColor;
  ctx.globalAlpha = 0.12;
  ctx.lineWidth = 1;
  const gridSpacing = 60;
  const offset = scrollX % gridSpacing;
  for (let x = -offset; x < w; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function getCharacterSpriteKey(charId: string, state: string, frame: number): string {
  const prefix = charId.toUpperCase();
  switch (state) {
    case 'run': return frame === 0 ? SPRITE_KEYS[`${prefix}_RUN1` as keyof typeof SPRITE_KEYS] : SPRITE_KEYS[`${prefix}_RUN2` as keyof typeof SPRITE_KEYS];
    case 'jump': return SPRITE_KEYS[`${prefix}_JUMP` as keyof typeof SPRITE_KEYS];
    case 'slide': return SPRITE_KEYS[`${prefix}_SLIDE` as keyof typeof SPRITE_KEYS];
    case 'attack': return SPRITE_KEYS[`${prefix}_ATTACK` as keyof typeof SPRITE_KEYS];
    default: return SPRITE_KEYS[`${prefix}_IDLE` as keyof typeof SPRITE_KEYS];
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, player: Player, character: CharacterConfig) {
  let state = 'run';
  if (!player.isGrounded) state = 'jump';
  if (player.isSliding) state = 'slide';
  if (player.isAttacking) state = 'attack';
  if (player.animFrame === 0 && state === 'run') state = 'run';

  const key = getCharacterSpriteKey(character.id, state, player.animFrame);
  const { x, y } = player.rect;
  const iSlide = player.isSliding;
  const w = iSlide ? PLAYER_H : PLAYER_W;
  const h = iSlide ? PLAYER_W : PLAYER_H;
  const drawY = iSlide ? y + PLAYER_H / 2 : y;
  const cx = x + w / 2;
  const cy = y + h / 2;

  // ── Shield aura (drawn behind player sprite) ──────────────────────────
  if (player.isShielding) {
    ctx.save();
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.ellipse(cx, cy + h * 0.05, w * 0.75, h * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(96, 165, 250, 0.18)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + h * 0.05, w * 0.75, h * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Parry attempt flash (cyan ring while window is open) ─────────────
  if (player.isParrying && player.parryWindowMs > 0) {
    ctx.save();
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = (player.parryWindowMs / 350) * 0.8;
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, w * 1.1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Invincibility flash
  if (player.invincibleMs > 0 && Math.floor(player.invincibleMs / 100) % 2 === 0) {
    ctx.globalAlpha = 0.4;
  }

  const flip = !player.facingRight;
  drawSprite(ctx, key, x, drawY, w, h, flip);
  ctx.globalAlpha = 1;

  // ── Parry success ring burst (expands outward after success) ─────────
  if (player.lastParrySuccessMs > 0) {
    const maxMs = 700;
    const progress = 1 - (player.lastParrySuccessMs / maxMs);
    const radius = w * 0.6 + progress * w * 2.8;
    const alpha = (1 - progress) * 0.85;
    ctx.save();
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = Math.max(0.5, 3 - progress * 2.5);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Magic bar glow above player when full
  if (player.magicBar >= 100) {
    ctx.strokeStyle = character.colors.primary;
    ctx.lineWidth = 2;
    ctx.shadowColor = character.colors.primary;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.75, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function getEnemySpriteKey(type: Enemy['type']): string {
  switch (type) {
    case 'drone': return SPRITE_KEYS.DRONE;
    case 'alien': return SPRITE_KEYS.ALIEN;
    case 'mech': return SPRITE_KEYS.MECH;
    case 'specter': return SPRITE_KEYS.SPECTER;
    case 'boss-titan': return SPRITE_KEYS.BOSS_TITAN;
    case 'boss-queen': return SPRITE_KEYS.BOSS_QUEEN;
    case 'boss-void': return SPRITE_KEYS.BOSS_VOID;
    default: return SPRITE_KEYS.DRONE;
  }
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
  if (enemy.staggerMs > 0) {
    ctx.globalAlpha = 0.7;
    ctx.translate(Math.random() * 4 - 2, 0); // shake
  }
  const key = getEnemySpriteKey(enemy.type);
  drawSprite(ctx, key, enemy.rect.x, enemy.rect.y, enemy.rect.w, enemy.rect.h, true);
  ctx.globalAlpha = 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset after shake

  // HP bar
  const barW = enemy.rect.w;
  const barH = 5;
  const barX = enemy.rect.x;
  const barY = enemy.rect.y - 10;
  const hpFrac = Math.max(0, enemy.hp / enemy.maxHp);
  ctx.fillStyle = '#1a0000';
  ctx.fillRect(barX, barY, barW, barH);
  const barColor = hpFrac > 0.5 ? '#22c55e' : hpFrac > 0.25 ? '#f59e0b' : '#ef4444';
  ctx.fillStyle = barColor;
  ctx.fillRect(barX, barY, barW * hpFrac, barH);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barW, barH);
}

function getObstacleKey(kind: Obstacle['kind']): string {
  switch (kind) {
    case 'asteroid': return SPRITE_KEYS.ASTEROID;
    case 'debris': return SPRITE_KEYS.DEBRIS;
    case 'spike-wall': return SPRITE_KEYS.SPIKE_WALL;
    case 'laser-h': return SPRITE_KEYS.LASER_H;
    case 'laser-v': return SPRITE_KEYS.LASER_V;
    default: return SPRITE_KEYS.ASTEROID;
  }
}

function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle, t: number) {
  ctx.save();
  if (obs.kind === 'laser-h' || obs.kind === 'laser-v') {
    // Pulse opacity for lasers
    ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 8 + obs.animPhase);
  }
  const key = getObstacleKey(obs.kind);
  drawSprite(ctx, key, obs.rect.x, obs.rect.y, obs.rect.w, obs.rect.h);
  ctx.restore();
}

function getCollectibleKey(kind: Collectible['kind']): string {
  switch (kind) {
    case 'coin': return SPRITE_KEYS.COIN;
    case 'gem': return SPRITE_KEYS.GEM;
    case 'health-orb': return SPRITE_KEYS.HEALTH_ORB;
    case 'magic-crystal': return SPRITE_KEYS.MAGIC_CRYSTAL;
    default: return SPRITE_KEYS.COIN;
  }
}

function drawCollectible(ctx: CanvasRenderingContext2D, col: Collectible) {
  const bob = Math.sin(col.animPhase) * 3;
  const key = getCollectibleKey(col.kind);
  drawSprite(ctx, key, col.rect.x, col.rect.y + bob, col.rect.w, col.rect.h);
}

function drawBossHPBar(ctx: CanvasRenderingContext2D, enemy: Enemy, w: number) {
  const isBoss = enemy.type.startsWith('boss');
  if (!isBoss) return;
  const barH = 14;
  const barW = w * 0.8;
  const barX = w * 0.1;
  const barY = 16;
  const hpFrac = Math.max(0, enemy.hp / enemy.maxHp);

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(barX - 2, barY - 2, barW + 4, barH + 4);
  ctx.fillStyle = '#1a0000';
  ctx.fillRect(barX, barY, barW, barH);

  const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
  grad.addColorStop(0, '#ef4444');
  grad.addColorStop(0.5, '#f59e0b');
  grad.addColorStop(1, '#22c55e');
  ctx.fillStyle = grad;
  ctx.fillRect(barX, barY, barW * hpFrac, barH);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barW, barH);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px Orbitron, sans-serif';
  ctx.textAlign = 'center';
  const name = enemy.type === 'boss-titan' ? 'TITAN' : enemy.type === 'boss-queen' ? 'QUEEN' : 'VOID';
  ctx.fillText(`⚡ ${name} ⚡`, w / 2, barY + 10);
  ctx.textAlign = 'left';
}

function drawPhaseOverlay(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  phase: string, countdownValue: number, world: WorldConfig,
  liveEnemies: number, currentWave: number,
) {
  if (phase === 'countdown') {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = world.accentColor;
    ctx.font = `bold ${w * 0.25}px Orbitron, sans-serif`;
    ctx.textAlign = 'center';
    ctx.shadowColor = world.accentColor;
    ctx.shadowBlur = 30;
    ctx.fillText(countdownValue > 0 ? String(countdownValue) : 'GO!', w / 2, h / 2 + 20);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
  }

  if (phase === 'running' && liveEnemies > 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(w - 108, 8, 100, 26);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px Orbitron, sans-serif';
    ctx.textAlign = 'right';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 6;
    ctx.fillText(`👾 ${liveEnemies}`, w - 12, 26);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
  }

  if (phase === 'boss') {
    ctx.fillStyle = '#ff6b35';
    ctx.font = 'bold 22px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff6b35';
    ctx.shadowBlur = 20;
    ctx.fillText('⚡ BOSS FIGHT! ⚡', w / 2, 50);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
  }
}

export function GameCanvas({ engine, world, character }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRafRef = useRef(0);
  const tRef = useRef(0);

  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { renderRafRef.current = requestAnimationFrame(renderLoop); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { renderRafRef.current = requestAnimationFrame(renderLoop); return; }

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine.onCanvasReady(w, h);
    }

    tRef.current += 0.016;
    const t = tRef.current;
    const state = engine.stateRef.current;
    const player = engine.playerRef.current;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background
    drawBackground(ctx, w, h, world, state.scrollX);
    drawGround(ctx, w, h, world, state.scrollX);

    // Speed lines when charging right
    if (engine.phase === 'running' && state.scrollSpeed > 105) {
      const alpha = Math.min(0.35, (state.scrollSpeed - 105) / 60);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      const now = Date.now();
      for (let i = 0; i < 10; i++) {
        const yt = (h * 0.1) + (h * 0.75 * i / 10) + ((now * 0.35 + i * 137) % (h * 0.75));
        const lineLen = 18 + (state.scrollSpeed - 105) * 0.5;
        const xBase = w * 0.25 + Math.sin(i * 2.1) * w * 0.35;
        ctx.beginPath();
        ctx.moveTo(xBase, yt % h);
        ctx.lineTo(xBase - lineLen, yt % h);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Obstacles
    for (const obs of engine.obstaclesRef.current) {
      if (obs.rect.x < w + 10 && obs.rect.x + obs.rect.w > -10) {
        drawObstacle(ctx, obs, t);
      }
    }

    // Collectibles
    for (const col of engine.collectiblesRef.current) {
      if (col.rect.x < w + 10 && col.rect.x + col.rect.w > -10) {
        drawCollectible(ctx, col);
      }
    }

    // Enemies
    for (const enemy of engine.enemiesRef.current) {
      if (enemy.alive && enemy.rect.x < w + 20 && enemy.rect.x + enemy.rect.w > -20) {
        ctx.save();
        drawEnemy(ctx, enemy);
        ctx.restore();
      }
    }

    // Player
    if (player) {
      drawPlayer(ctx, player, character);
    }

    // Particles
    drawParticles(ctx, engine.particlesRef.current);

    // Boss HP bar
    const boss = engine.enemiesRef.current.find(e => e.alive && e.type.startsWith('boss'));
    if (boss && (engine.phase === 'boss' || engine.phase === 'level-clear')) {
      drawBossHPBar(ctx, boss, w);
    }

    // Red damage vignette
    const invMs = player?.invincibleMs ?? 0;
    if (invMs > 700) {
      const alpha = Math.min(0.5, (invMs - 700) / 300 * 0.5);
      const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85);
      grad.addColorStop(0, 'rgba(255,0,0,0)');
      grad.addColorStop(1, `rgba(220,0,0,${alpha})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Phase overlays
    const liveEnemies = engine.enemiesRef.current.filter(e => e.alive).length;
    drawPhaseOverlay(ctx, w, h, engine.phase, engine.countdownValue, world, liveEnemies, 0);

    renderRafRef.current = requestAnimationFrame(renderLoop);
  }, [engine, world, character]);

  useEffect(() => {
    renderRafRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(renderRafRef.current);
  }, [renderLoop]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ touchAction: 'none', imageRendering: 'auto' }}
    />
  );
}
