import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTERS } from '../data/characters';
import type { CharacterConfig } from '../types';

function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, background: color, boxShadow: `0 0 4px ${color}` }}
      />
    </div>
  );
}

function CharacterCard({
  char, isSelected, isUnlocked, onSelect,
}: {
  char: CharacterConfig;
  isSelected: boolean;
  isUnlocked: boolean;
  onSelect: () => void;
}) {
  const weaponIcon = char.ability.weaponType === 'sword' ? '⚔' : char.ability.weaponType === 'fists' ? '👊' : char.ability.weaponType === 'staff' ? '✨' : '🐾';
  const magicIcon = char.ability.magicType === 'lightning' ? '⚡' : char.ability.magicType === 'nova' ? '💥' : char.ability.magicType === 'phase' ? '🌀' : '👁';

  return (
    <button
      onPointerDown={isUnlocked ? onSelect : undefined}
      className={`relative rounded-2xl border-2 p-4 flex flex-col gap-3 transition-all duration-200 text-left
        ${isSelected ? 'scale-[1.02]' : 'opacity-80 hover:opacity-100'}
        ${!isUnlocked ? 'cursor-not-allowed' : 'active:scale-[0.98]'}
      `}
      style={{
        borderColor: isSelected ? char.colors.primary : isUnlocked ? char.colors.primary + '40' : '#333',
        background: isSelected
          ? `linear-gradient(135deg, ${char.colors.secondary}cc, ${char.colors.primary}15)`
          : `linear-gradient(135deg, #0f0f1a, #12122e)`,
        boxShadow: isSelected ? `0 0 30px ${char.colors.primary}40, inset 0 0 20px ${char.colors.primary}10` : 'none',
      }}
    >
      {/* Lock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 rounded-2xl bg-black/60 flex flex-col items-center justify-center z-10">
          <span className="text-3xl">🔒</span>
          <span className="font-orbitron text-yellow-400 text-sm font-bold mt-1">🪙 {char.unlockCost}</span>
        </div>
      )}

      {/* Character emoji */}
      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${char.colors.secondary}, ${char.colors.primary}30)`, border: `2px solid ${char.colors.primary}` }}
        >
          {weaponIcon}
        </div>
        <div>
          <div className="font-syncopate font-bold text-white text-base">{char.name}</div>
          <div className="text-xs font-mono mt-0.5" style={{ color: char.colors.primary }}>{char.tagline}</div>
        </div>
      </div>

      {/* Ability */}
      <div className="bg-black/30 rounded-xl p-2.5 border border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">{magicIcon}</span>
          <span className="font-orbitron text-xs font-bold text-white">{char.ability.name}</span>
        </div>
        <p className="text-xs font-mono text-white/50 leading-relaxed">{char.ability.description}</p>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs font-mono w-16">SPD</span>
          <StatBar value={char.stats.speed} max={350} color={char.colors.primary} />
          <span className="text-white/40 text-xs w-6">{Math.round(char.stats.speed / 3.5)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs font-mono w-16">HP</span>
          <StatBar value={char.stats.health} max={150} color="#22c55e" />
          <span className="text-white/40 text-xs w-6">{char.stats.health}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs font-mono w-16">ATK</span>
          <StatBar value={char.stats.attackDamage} max={60} color="#ef4444" />
          <span className="text-white/40 text-xs w-6">{char.stats.attackDamage}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs font-mono w-16">MAGIC</span>
          <StatBar value={char.stats.magicDamage} max={130} color={char.colors.primary} />
          <span className="text-white/40 text-xs w-6">{char.stats.magicDamage}</span>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="flex items-center gap-1.5 pt-1">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: char.colors.primary }} />
          <span className="font-orbitron text-xs font-bold" style={{ color: char.colors.primary }}>SELECTED</span>
        </div>
      )}
    </button>
  );
}

export function CharacterSelectScreen() {
  const { profile, selectCharacter, goTo } = useGame();
  const [selected, setSelected] = useState(CHARACTERS[0]);

  const handleConfirm = () => {
    selectCharacter(selected);
    goTo('world-select');
  };

  return (
    <div className="screen-container stars-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-safe pb-3 border-b border-space-border">
        <button onPointerDown={() => goTo('home')} className="text-white/60 text-2xl w-10 h-10 flex items-center justify-center">←</button>
        <div>
          <h2 className="font-syncopate font-bold text-white text-lg">CHOOSE HERO</h2>
          <p className="text-space-muted text-xs font-mono">Select your champion</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1 border border-yellow-500/30">
          <span className="text-yellow-400 text-sm">🪙</span>
          <span className="font-orbitron text-yellow-300 text-sm font-bold">{profile.totalCoins}</span>
        </div>
      </div>

      {/* Character grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-1 gap-4 pb-4">
          {CHARACTERS.map(char => (
            <CharacterCard
              key={char.id}
              char={char}
              isSelected={selected.id === char.id}
              isUnlocked={profile.unlockedCharacterIds.includes(char.id)}
              onSelect={() => setSelected(char)}
            />
          ))}
        </div>
      </div>

      {/* Confirm button */}
      <div className="px-4 pb-safe border-t border-space-border pt-4">
        <button
          onPointerDown={handleConfirm}
          className="btn-primary w-full py-4 text-lg"
          style={{ background: `linear-gradient(135deg, ${selected.colors.secondary}, ${selected.colors.primary})` }}
        >
          CHOOSE {selected.name} →
        </button>
      </div>
    </div>
  );
}
