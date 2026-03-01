import type { Rect, Player } from '../types';

export const GRAVITY = 1800;     // px/s²
export const GROUND_FRICTION = 0.85;
export const MAX_FALL_SPEED = 1200;
export const SLIDE_DURATION = 600; // ms

export function applyGravity(vy: number, dt: number): number {
  return Math.min(vy + GRAVITY * dt, MAX_FALL_SPEED);
}

export function applyPlayerPhysics(player: Player, groundY: number, dt: number): void {
  // Gravity
  if (!player.isGrounded) {
    player.vy = applyGravity(player.vy, dt);
  }

  // Move
  player.rect.y += player.vy * dt;
  player.rect.x += player.vx * dt;

  // Ground check
  if (player.rect.y + player.rect.h >= groundY) {
    player.rect.y = groundY - player.rect.h;
    player.vy = 0;
    player.isGrounded = true;
    if (player.isSliding && player.vx !== 0) {
      player.vx *= GROUND_FRICTION;
      if (Math.abs(player.vx) < 1) player.vx = 0;
    }
  } else {
    player.isGrounded = false;
  }

  // Clamp X to screen
  player.rect.x = Math.max(0, player.rect.x);
}

export function getSlideRect(rect: Rect): Rect {
  // When sliding, player hitbox is half height
  return { x: rect.x, y: rect.y + rect.h / 2, w: rect.w, h: rect.h / 2 };
}
