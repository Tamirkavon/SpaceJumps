// Converts SVG strings to HTMLImageElement for canvas drawImage()
const cache = new Map<string, HTMLImageElement>();

export function svgToImage(svgString: string, key: string): Promise<HTMLImageElement> {
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key)!);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      cache.set(key, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function getImage(key: string): HTMLImageElement | null {
  return cache.get(key) ?? null;
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  key: string,
  x: number, y: number,
  w: number, h: number,
  flipX = false,
) {
  const img = cache.get(key);
  if (!img) return;
  ctx.save();
  if (flipX) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, w, h);
  } else {
    ctx.drawImage(img, x, y, w, h);
  }
  ctx.restore();
}

// Preload all sprites at app startup
import { zaraSprites } from '../sprites/characters/zara';
import { krixSprites } from '../sprites/characters/krix';
import { lyraSprites } from '../sprites/characters/lyra';
import { vornSprites } from '../sprites/characters/vorn';
import {
  droneSprite, alienSprite, mechSprite, specterSprite,
  bossTitanSprite, bossQueenSprite, bossVoidSprite,
} from '../sprites/enemies';
import {
  asteroidSprite, debrisSprite, spikeWallSprite, laserHSprite, laserVSprite,
} from '../sprites/obstacles';
import { coinSprite, gemSprite, healthOrbSprite, magicCrystalSprite } from '../sprites/collectibles';

export const SPRITE_KEYS = {
  // Zara
  ZARA_IDLE: 'zara-idle',
  ZARA_RUN1: 'zara-run1',
  ZARA_RUN2: 'zara-run2',
  ZARA_JUMP: 'zara-jump',
  ZARA_SLIDE: 'zara-slide',
  ZARA_ATTACK: 'zara-attack',
  // Krix
  KRIX_IDLE: 'krix-idle',
  KRIX_RUN1: 'krix-run1',
  KRIX_RUN2: 'krix-run2',
  KRIX_JUMP: 'krix-jump',
  KRIX_SLIDE: 'krix-slide',
  KRIX_ATTACK: 'krix-attack',
  // Lyra
  LYRA_IDLE: 'lyra-idle',
  LYRA_RUN1: 'lyra-run1',
  LYRA_RUN2: 'lyra-run2',
  LYRA_JUMP: 'lyra-jump',
  LYRA_SLIDE: 'lyra-slide',
  LYRA_ATTACK: 'lyra-attack',
  // Vorn
  VORN_IDLE: 'vorn-idle',
  VORN_RUN1: 'vorn-run1',
  VORN_RUN2: 'vorn-run2',
  VORN_JUMP: 'vorn-jump',
  VORN_SLIDE: 'vorn-slide',
  VORN_ATTACK: 'vorn-attack',
  // Enemies
  DRONE: 'drone',
  ALIEN: 'alien',
  MECH: 'mech',
  SPECTER: 'specter',
  BOSS_TITAN: 'boss-titan',
  BOSS_QUEEN: 'boss-queen',
  BOSS_VOID: 'boss-void',
  // Obstacles
  ASTEROID: 'asteroid',
  DEBRIS: 'debris',
  SPIKE_WALL: 'spike-wall',
  LASER_H: 'laser-h',
  LASER_V: 'laser-v',
  // Collectibles
  COIN: 'coin',
  GEM: 'gem',
  HEALTH_ORB: 'health-orb',
  MAGIC_CRYSTAL: 'magic-crystal',
};

export async function preloadAllSprites(): Promise<void> {
  const loads: Promise<HTMLImageElement>[] = [
    svgToImage(zaraSprites.idle, SPRITE_KEYS.ZARA_IDLE),
    svgToImage(zaraSprites.run1, SPRITE_KEYS.ZARA_RUN1),
    svgToImage(zaraSprites.run2, SPRITE_KEYS.ZARA_RUN2),
    svgToImage(zaraSprites.jump, SPRITE_KEYS.ZARA_JUMP),
    svgToImage(zaraSprites.slide, SPRITE_KEYS.ZARA_SLIDE),
    svgToImage(zaraSprites.attack, SPRITE_KEYS.ZARA_ATTACK),
    svgToImage(krixSprites.idle, SPRITE_KEYS.KRIX_IDLE),
    svgToImage(krixSprites.run1, SPRITE_KEYS.KRIX_RUN1),
    svgToImage(krixSprites.run2, SPRITE_KEYS.KRIX_RUN2),
    svgToImage(krixSprites.jump, SPRITE_KEYS.KRIX_JUMP),
    svgToImage(krixSprites.slide, SPRITE_KEYS.KRIX_SLIDE),
    svgToImage(krixSprites.attack, SPRITE_KEYS.KRIX_ATTACK),
    svgToImage(lyraSprites.idle, SPRITE_KEYS.LYRA_IDLE),
    svgToImage(lyraSprites.run1, SPRITE_KEYS.LYRA_RUN1),
    svgToImage(lyraSprites.run2, SPRITE_KEYS.LYRA_RUN2),
    svgToImage(lyraSprites.jump, SPRITE_KEYS.LYRA_JUMP),
    svgToImage(lyraSprites.slide, SPRITE_KEYS.LYRA_SLIDE),
    svgToImage(lyraSprites.attack, SPRITE_KEYS.LYRA_ATTACK),
    svgToImage(vornSprites.idle, SPRITE_KEYS.VORN_IDLE),
    svgToImage(vornSprites.run1, SPRITE_KEYS.VORN_RUN1),
    svgToImage(vornSprites.run2, SPRITE_KEYS.VORN_RUN2),
    svgToImage(vornSprites.jump, SPRITE_KEYS.VORN_JUMP),
    svgToImage(vornSprites.slide, SPRITE_KEYS.VORN_SLIDE),
    svgToImage(vornSprites.attack, SPRITE_KEYS.VORN_ATTACK),
    svgToImage(droneSprite, SPRITE_KEYS.DRONE),
    svgToImage(alienSprite, SPRITE_KEYS.ALIEN),
    svgToImage(mechSprite, SPRITE_KEYS.MECH),
    svgToImage(specterSprite, SPRITE_KEYS.SPECTER),
    svgToImage(bossTitanSprite, SPRITE_KEYS.BOSS_TITAN),
    svgToImage(bossQueenSprite, SPRITE_KEYS.BOSS_QUEEN),
    svgToImage(bossVoidSprite, SPRITE_KEYS.BOSS_VOID),
    svgToImage(asteroidSprite, SPRITE_KEYS.ASTEROID),
    svgToImage(debrisSprite, SPRITE_KEYS.DEBRIS),
    svgToImage(spikeWallSprite, SPRITE_KEYS.SPIKE_WALL),
    svgToImage(laserHSprite, SPRITE_KEYS.LASER_H),
    svgToImage(laserVSprite, SPRITE_KEYS.LASER_V),
    svgToImage(coinSprite, SPRITE_KEYS.COIN),
    svgToImage(gemSprite, SPRITE_KEYS.GEM),
    svgToImage(healthOrbSprite, SPRITE_KEYS.HEALTH_ORB),
    svgToImage(magicCrystalSprite, SPRITE_KEYS.MAGIC_CRYSTAL),
  ];
  await Promise.all(loads);
}
