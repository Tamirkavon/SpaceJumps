import type { Particle } from '../types';

const MAX_PARTICLES = 200;

export function createParticle(
  x: number, y: number,
  vx: number, vy: number,
  color: string,
  size: number,
  lifeMs: number,
  text?: string,
): Particle {
  return { x, y, vx, vy, life: lifeMs, maxLife: lifeMs, color, size, text };
}

export function spawnHitParticles(particles: Particle[], x: number, y: number, color: string, count = 8) {
  if (particles.length > MAX_PARTICLES - count) {
    particles.splice(0, count);
  }
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 80 + Math.random() * 120;
    particles.push(createParticle(
      x, y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      color,
      2 + Math.random() * 3,
      400 + Math.random() * 300,
    ));
  }
}

export function spawnCoinParticles(particles: Particle[], x: number, y: number) {
  if (particles.length > MAX_PARTICLES - 5) particles.splice(0, 5);
  for (let i = 0; i < 5; i++) {
    particles.push(createParticle(
      x + Math.random() * 20 - 10, y,
      (Math.random() - 0.5) * 60,
      -80 - Math.random() * 60,
      '#f59e0b',
      2 + Math.random() * 2,
      600,
    ));
  }
}

export function spawnDamageNumber(particles: Particle[], x: number, y: number, damage: number, color: string) {
  if (particles.length > MAX_PARTICLES - 1) particles.splice(0, 1);
  particles.push(createParticle(x, y, (Math.random() - 0.5) * 30, -60, color, 14, 800, `-${damage}`));
}

export function spawnMagicParticles(particles: Particle[], x: number, y: number, color: string, count = 16) {
  if (particles.length > MAX_PARTICLES - count) particles.splice(0, count);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 150 + Math.random() * 100;
    particles.push(createParticle(
      x, y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      color,
      3 + Math.random() * 4,
      600 + Math.random() * 400,
    ));
  }
}

export function tickParticles(particles: Particle[], dt: number): void {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 120 * dt; // gentle gravity on particles
    p.life -= dt * 1000;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    if (p.text) {
      ctx.fillStyle = p.color;
      ctx.font = `bold ${p.size}px Orbitron, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(p.text, p.x, p.y);
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}
