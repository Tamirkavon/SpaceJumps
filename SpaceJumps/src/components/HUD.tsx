import type { GameEngineReturn } from '../hooks/useGameEngine';
import type { CharacterConfig } from '../types';

interface Props {
  engine: GameEngineReturn;
  character: CharacterConfig;
  onPause: () => void;
}

export function HUD({ engine, character, onPause }: Props) {
  const player = engine.playerRef.current;
  const hp = player?.hp ?? 0;
  const maxHp = player?.maxHp ?? 100;
  const magicBar = player?.magicBar ?? 0;
  const hpPct = (hp / maxHp) * 100;
  const hpColor = hpPct > 50 ? '#22c55e' : hpPct > 25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="absolute inset-x-0 top-0 z-20 pointer-events-none" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="flex items-start justify-between px-3 pt-2 gap-2">

        {/* Left: HP + Magic */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-shrink-0" style={{ width: 160 }}>
          {/* HP bar */}
          <div className="flex items-center gap-1.5">
            <span className="text-red-400 text-xs font-mono">❤</span>
            <div className="flex-1 h-3 bg-black/60 rounded-full border border-white/20 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${hpPct}%`, background: hpColor, boxShadow: `0 0 6px ${hpColor}` }}
              />
            </div>
            <span className="text-white/70 text-xs font-mono" style={{ minWidth: 28 }}>{hp}</span>
          </div>

          {/* Magic bar */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: character.colors.primary }}>✦</span>
            <div className="flex-1 h-3 bg-black/60 rounded-full border border-white/20 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${magicBar}%`,
                  background: `linear-gradient(90deg, ${character.colors.secondary}, ${character.colors.primary})`,
                  boxShadow: magicBar >= 100 ? `0 0 10px ${character.colors.primary}` : 'none',
                }}
              />
            </div>
            <span className="text-xs font-mono text-white/50">{Math.floor(magicBar)}%</span>
          </div>

          {/* Lives */}
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-sm" style={{ opacity: i < engine.lives ? 1 : 0.2 }}>⭐</span>
            ))}
          </div>
        </div>

        {/* Center: Score + Distance */}
        <div className="flex flex-col items-center gap-0.5 pointer-events-none">
          <div
            className="font-orbitron font-bold text-lg leading-none"
            style={{ color: character.colors.primary, textShadow: `0 0 10px ${character.colors.primary}` }}
          >
            {engine.score.toLocaleString()}
          </div>
          <div className="text-white/40 text-xs font-mono">
            {Math.floor((engine.stateRef.current?.distanceTraveled ?? 0) / 10)}m
          </div>
        </div>

        {/* Right: Coins + Pause */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <button
            className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/70 active:bg-white/20 transition-colors"
            onPointerDown={onPause}
          >
            ⏸
          </button>
          <div className="flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5 border border-yellow-500/30">
            <span className="text-yellow-400 text-xs">🪙</span>
            <span className="text-yellow-300 text-xs font-mono font-bold">
              {engine.stateRef.current?.coinsThisRun ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
