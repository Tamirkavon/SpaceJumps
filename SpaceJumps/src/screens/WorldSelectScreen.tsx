import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worlds';
import { MISSIONS } from '../data/missions';
import type { WorldConfig } from '../types';

function WorldCard({
  world, isSelected, isUnlocked, bestScore, completedCount, totalMissions,
  onSelect,
}: {
  world: WorldConfig;
  isSelected: boolean;
  isUnlocked: boolean;
  bestScore: number;
  completedCount: number;
  totalMissions: number;
  onSelect: () => void;
}) {
  const diffLabel = world.difficultyMultiplier <= 1 ? 'EASY' : world.difficultyMultiplier <= 1.8 ? 'MEDIUM' : 'HARD';
  const diffColor = world.difficultyMultiplier <= 1 ? '#22c55e' : world.difficultyMultiplier <= 1.8 ? '#f59e0b' : '#ef4444';

  return (
    <button
      onPointerDown={isUnlocked ? onSelect : undefined}
      className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-200 text-left w-full
        ${isSelected ? 'scale-[1.02]' : 'opacity-75 hover:opacity-100'}
        ${!isUnlocked ? 'cursor-not-allowed' : 'active:scale-[0.98]'}
      `}
      style={{
        borderColor: isSelected ? world.accentColor : world.accentColor + '40',
        boxShadow: isSelected ? `0 0 30px ${world.accentColor}40` : 'none',
      }}
    >
      {/* World art preview */}
      <div className="relative h-28 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${world.bgTop}, ${world.bgBottom})` }}>
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.8 ? 3 : 1.5,
              height: Math.random() > 0.8 ? 3 : 1.5,
              left: `${5 + i * 4.5}%`,
              top: `${10 + (i % 5) * 18}%`,
              opacity: 0.3 + Math.random() * 0.7,
            }} />
        ))}
        {/* Nebula blob */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 70% 50%, ${world.accentColor}20, transparent 70%)`,
        }} />
        {/* World name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div className="font-syncopate font-bold text-lg text-white" style={{ textShadow: `0 0 20px ${world.accentColor}` }}>
            {world.name}
          </div>
          <div className="font-mono text-xs" style={{ color: world.accentColor }}>{world.tagline}</div>
        </div>
        {/* Difficulty badge */}
        <div className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-orbitron font-bold border"
          style={{ color: diffColor, borderColor: diffColor, background: 'rgba(0,0,0,0.6)' }}>
          {diffLabel}
        </div>
        {/* Ground line */}
        <div className="absolute bottom-0 inset-x-0 h-6" style={{ background: `linear-gradient(0deg, ${world.groundColor}, transparent)` }} />
      </div>

      {/* Lock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
          <span className="text-4xl">🔒</span>
          <span className="font-orbitron text-yellow-400 font-bold mt-2">🪙 {world.unlockCost} COINS</span>
        </div>
      )}

      {/* Info bar */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ background: `linear-gradient(90deg, ${world.bgTop}ee, ${world.bgBottom}ee)` }}>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="font-orbitron text-white font-bold text-sm">{bestScore > 0 ? bestScore.toLocaleString() : '-'}</div>
            <div className="text-white/40 text-xs font-mono">BEST</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="font-orbitron font-bold text-sm" style={{ color: world.accentColor }}>{completedCount}/{totalMissions}</div>
            <div className="text-white/40 text-xs font-mono">MISSIONS</div>
          </div>
        </div>
        {isSelected && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: world.accentColor }} />
            <span className="font-orbitron text-xs font-bold" style={{ color: world.accentColor }}>SELECTED</span>
          </div>
        )}
      </div>
    </button>
  );
}

export function WorldSelectScreen() {
  const { profile, selectedCharacter, selectWorld, goTo } = useGame();
  const [selected, setSelected] = useState(WORLDS[0]);

  const handleConfirm = () => {
    selectWorld(selected);
    goTo('game');
  };

  return (
    <div className="screen-container stars-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-safe pb-3 border-b border-space-border">
        <button onPointerDown={() => goTo('character-select')} className="text-white/60 text-2xl w-10 h-10 flex items-center justify-center">←</button>
        <div>
          <h2 className="font-syncopate font-bold text-white text-lg">CHOOSE WORLD</h2>
          <p className="text-space-muted text-xs font-mono">
            {selectedCharacter?.name} is ready
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1 border border-yellow-500/30">
          <span className="text-yellow-400 text-sm">🪙</span>
          <span className="font-orbitron text-yellow-300 text-sm font-bold">{profile.totalCoins}</span>
        </div>
      </div>

      {/* World list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4 pb-4">
          {WORLDS.map(world => {
            const worldMissions = MISSIONS.filter(m => m.worldId === world.id);
            const completedCount = worldMissions.filter(m => profile.completedMissionIds.includes(m.id)).length;
            return (
              <WorldCard
                key={world.id}
                world={world}
                isSelected={selected.id === world.id}
                isUnlocked={profile.unlockedWorldIds.includes(world.id)}
                bestScore={profile.bestScores[world.id] ?? 0}
                completedCount={completedCount}
                totalMissions={worldMissions.length}
                onSelect={() => setSelected(world)}
              />
            );
          })}
        </div>
      </div>

      {/* Confirm */}
      <div className="px-4 pb-safe border-t border-space-border pt-4">
        <button
          onPointerDown={handleConfirm}
          className="btn-primary w-full py-4 text-lg"
          style={{ background: `linear-gradient(135deg, ${selected.bgTop}, ${selected.accentColor})` }}
        >
          ENTER {selected.name} →
        </button>
      </div>
    </div>
  );
}
