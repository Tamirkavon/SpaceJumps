// ─── Screens ─────────────────────────────────────────────────────────────────
export type Screen =
  | 'home'
  | 'character-select'
  | 'world-select'
  | 'game'
  | 'results'
  | 'shop'
  | 'missions'
  | 'leaderboard'
  | 'instructions';

// ─── Characters ──────────────────────────────────────────────────────────────
export type WeaponType = 'sword' | 'fists' | 'staff' | 'claws';
export type MagicType  = 'lightning' | 'nova' | 'phase' | 'stealth';
export type SpecialEffect = 'aoe' | 'pierce' | 'heal' | 'invisibility';

export interface CharacterStats {
  speed: number;
  jumpForce: number;
  health: number;
  attackDamage: number;
  magicDamage: number;
  magicCost: number;
}

export interface CharacterAbility {
  name: string;
  description: string;
  weaponType: WeaponType;
  magicType: MagicType;
  magicBarFillRate: number;
  comboWindow: number;
  specialEffect: SpecialEffect;
}

export interface CharacterColors {
  primary: string;
  secondary: string;
  glow: string;
}

export interface CharacterConfig {
  id: string;
  name: string;
  tagline: string;
  stats: CharacterStats;
  ability: CharacterAbility;
  colors: CharacterColors;
  unlockCost: number;
  tip: string; // Hebrew tip
}

// ─── Geometry ─────────────────────────────────────────────────────────────────
export interface Vec2 { x: number; y: number; }
export interface Rect { x: number; y: number; w: number; h: number; }

// ─── Entities ─────────────────────────────────────────────────────────────────
export interface Entity {
  id: string;
  rect: Rect;
  vx: number;
  vy: number;
  alive: boolean;
}

export interface Player extends Entity {
  characterId: string;
  hp: number;
  maxHp: number;
  magicBar: number;
  isGrounded: boolean;
  jumpsUsed: number;
  isSliding: boolean;
  isAttacking: boolean;
  attackCooldownMs: number;
  invincibleMs: number;
  combo: number;
  coins: number;
  animFrame: number;
  animTimer: number;
  facingRight: boolean;
  movingLeft: boolean;
  movingRight: boolean;
  isShielding: boolean;
  parryWindowMs: number;
  parryCooldownMs: number;
  isParrying: boolean;
  lastParrySuccessMs: number;
  comboHits: number;
  comboWindowMs: number;
}

export type EnemyMovePattern = 'patrol' | 'charge' | 'shooter' | 'boss';

export interface Enemy extends Entity {
  type: EnemyType;
  hp: number;
  maxHp: number;
  attackDamage: number;
  movePattern: EnemyMovePattern;
  staggerMs: number;
  attackCooldownMs: number;
  animFrame: number;
  animTimer: number;
  projectiles: Projectile[];
  phase?: number; // for boss enemies
}

export type EnemyType =
  | 'drone'
  | 'alien'
  | 'mech'
  | 'specter'
  | 'boss-titan'
  | 'boss-queen'
  | 'boss-void';

export interface Projectile extends Entity {
  damage: number;
  ownedBy: 'player' | 'enemy';
  lifeMs: number;
  color: string;
}

export type ObstacleKind = 'asteroid' | 'laser-h' | 'laser-v' | 'debris' | 'spike-wall';

export interface Obstacle extends Entity {
  kind: ObstacleKind;
  isLethal: boolean;
  animPhase: number;
  color: string;
}

export interface Collectible extends Entity {
  kind: 'coin' | 'gem' | 'health-orb' | 'magic-crystal';
  value: number;
  animPhase: number;
}

// ─── Particles ─────────────────────────────────────────────────────────────────
export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  text?: string; // for floating damage numbers
}

// ─── Game State Machine ─────────────────────────────────────────────────────
export type GamePhase =
  | 'idle'
  | 'countdown'
  | 'running'
  | 'combat'
  | 'paused'
  | 'boss'
  | 'dead'
  | 'level-clear'
  | 'results';

export interface GameState {
  phase: GamePhase;
  worldId: string;
  distanceTraveled: number;
  scrollX: number;
  scrollSpeed: number;
  score: number;
  coinsThisRun: number;
  combo: number;
  maxCombo: number;
  enemiesKilled: number;
  magicUsed: number;
  missionsProgress: Record<string, number>;
  lives: number;
  countdownValue: number;
  bossSpawned: boolean;
  levelCleared: boolean;
}

// ─── Worlds ───────────────────────────────────────────────────────────────────
export interface WorldConfig {
  id: string;
  name: string;
  tagline: string;
  bgTop: string;
  bgBottom: string;
  accentColor: string;
  groundColor: string;
  starDensity: number;
  obstacleTypes: ObstacleKind[];
  enemyTypes: EnemyType[];
  bossType: EnemyType;
  difficultyMultiplier: number;
  unlockCost: number;
  nebula?: { color: string; x: number; y: number; r: number }[];
}

// ─── Level Generation ─────────────────────────────────────────────────────────
export interface ChunkItem {
  kind: 'obstacle' | 'enemy' | 'collectible';
  type: string;
  relX: number;
  relY: number;
}

export interface LevelChunk {
  id: string;
  width: number;
  items: ChunkItem[];
  triggerCombat: boolean;
  triggerBoss: boolean;
}

// ─── Progression / Persistence ───────────────────────────────────────────────
export interface PlayerProfile {
  totalCoins: number;
  unlockedCharacterIds: string[];
  unlockedWorldIds: string[];
  bestScores: Record<string, number>;
  completedMissionIds: string[];
}

// ─── Missions ─────────────────────────────────────────────────────────────────
export type MissionObjective =
  | { type: 'collect-coins'; count: number }
  | { type: 'kill-enemies'; count: number }
  | { type: 'survive-distance'; meters: number }
  | { type: 'use-magic'; count: number }
  | { type: 'kill-boss'; bossType: EnemyType };

export interface Mission {
  id: string;
  worldId: string;
  title: string;
  description: string;
  objective: MissionObjective;
  rewardCoins: number;
  rewardCharacterId?: string;
}

// ─── Run Result ───────────────────────────────────────────────────────────────
export interface RunResult {
  worldId: string;
  characterId: string;
  score: number;
  coins: number;
  distanceMeters: number;
  enemiesKilled: number;
  missionsCompleted: string[];
  stars: 1 | 2 | 3;
}

// ─── Context ──────────────────────────────────────────────────────────────────
export interface SpaceJumpsContextType {
  screen: Screen;
  selectedCharacter: CharacterConfig | null;
  selectedWorld: WorldConfig | null;
  lastResult: RunResult | null;
  profile: PlayerProfile;
  gameKey: number;
  goTo: (screen: Screen) => void;
  selectCharacter: (char: CharacterConfig) => void;
  selectWorld: (world: WorldConfig) => void;
  setLastResult: (result: RunResult) => void;
  spendCoins: (amount: number) => boolean;
  earnCoins: (amount: number) => void;
  unlockCharacter: (id: string) => void;
  unlockWorld: (id: string) => void;
  completeMission: (id: string) => void;
  updateBestScore: (worldId: string, score: number) => void;
  replay: () => void;
}
