import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTERS } from '../data/characters';
import { WORLDS } from '../data/worlds';

export function ShopScreen() {
  const { profile, spendCoins, unlockCharacter, unlockWorld, goTo } = useGame();
  const [tab, setTab] = useState<'characters' | 'worlds'>('characters');
  const [flash, setFlash] = useState<string | null>(null);

  const handleBuyChar = (char: typeof CHARACTERS[0]) => {
    if (profile.unlockedCharacterIds.includes(char.id)) return;
    if (spendCoins(char.unlockCost)) {
      unlockCharacter(char.id);
      setFlash(`${char.name} unlocked!`);
      setTimeout(() => setFlash(null), 2000);
    } else {
      setFlash('Not enough coins!');
      setTimeout(() => setFlash(null), 1500);
    }
  };

  const handleBuyWorld = (world: typeof WORLDS[0]) => {
    if (profile.unlockedWorldIds.includes(world.id)) return;
    if (spendCoins(world.unlockCost)) {
      unlockWorld(world.id);
      setFlash(`${world.name} unlocked!`);
      setTimeout(() => setFlash(null), 2000);
    } else {
      setFlash('Not enough coins!');
      setTimeout(() => setFlash(null), 1500);
    }
  };

  return (
    <div className="screen-container stars-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-safe pb-3 border-b border-space-border">
        <button onPointerDown={() => goTo('home')} className="text-white/60 text-2xl w-10 h-10 flex items-center justify-center">←</button>
        <div>
          <h2 className="font-syncopate font-bold text-white text-lg">SPACE SHOP</h2>
          <p className="text-space-muted text-xs font-mono">Unlock heroes &amp; worlds</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1 border border-yellow-500/40">
          <span className="text-yellow-400">🪙</span>
          <span className="font-orbitron text-yellow-300 font-bold">{profile.totalCoins}</span>
        </div>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mx-4 mt-3 bg-green-500/20 border border-green-500/40 rounded-xl px-4 py-2 text-center font-orbitron text-green-400 text-sm animate-bounce-in">
          {flash}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4">
        {(['characters', 'worlds'] as const).map(t => (
          <button
            key={t}
            onPointerDown={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl font-orbitron text-sm font-bold uppercase tracking-wider transition-all duration-200
              ${tab === t ? 'bg-space-cyan/20 border-2 border-space-cyan text-space-cyan' : 'border-2 border-space-border text-white/40'}`}
          >
            {t === 'characters' ? '⚔ Heroes' : '🌍 Worlds'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tab === 'characters' && (
          <div className="flex flex-col gap-4">
            {CHARACTERS.filter(c => c.unlockCost > 0).map(char => {
              const owned = profile.unlockedCharacterIds.includes(char.id);
              const canAfford = profile.totalCoins >= char.unlockCost;
              return (
                <div key={char.id} className="card-glass rounded-2xl p-4 flex items-center gap-4 border"
                  style={{ borderColor: owned ? char.colors.primary + '60' : '#1a1a3e' }}>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${char.colors.secondary}, ${char.colors.primary}30)`, border: `2px solid ${char.colors.primary}` }}>
                    {char.ability.weaponType === 'sword' ? '⚔' : char.ability.weaponType === 'fists' ? '👊' : char.ability.weaponType === 'staff' ? '✨' : '🐾'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-syncopate text-white font-bold text-sm">{char.name}</div>
                    <div className="font-mono text-xs mt-0.5" style={{ color: char.colors.primary }}>{char.tagline}</div>
                    <div className="font-mono text-xs text-white/40 mt-1 leading-relaxed">{char.ability.name} · {char.ability.description}</div>
                  </div>
                  <div className="flex-shrink-0">
                    {owned ? (
                      <div className="flex items-center gap-1 text-green-400 font-orbitron text-xs font-bold">
                        <span>✓</span><span>OWNED</span>
                      </div>
                    ) : (
                      <button
                        onPointerDown={() => handleBuyChar(char)}
                        className={`rounded-xl px-3 py-2 font-orbitron text-xs font-bold transition-all
                          ${canAfford ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 active:scale-95' : 'bg-black/40 border border-white/10 text-white/30 cursor-not-allowed'}`}
                      >
                        🪙 {char.unlockCost}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab === 'worlds' && (
          <div className="flex flex-col gap-4">
            {WORLDS.filter(w => w.unlockCost > 0).map(world => {
              const owned = profile.unlockedWorldIds.includes(world.id);
              const canAfford = profile.totalCoins >= world.unlockCost;
              return (
                <div key={world.id} className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: owned ? world.accentColor + '60' : '#1a1a3e' }}>
                  {/* Preview banner */}
                  <div className="h-16 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${world.bgTop}, ${world.bgBottom})` }}>
                    <span className="font-syncopate font-bold text-white" style={{ textShadow: `0 0 15px ${world.accentColor}` }}>{world.name}</span>
                  </div>
                  {/* Info row */}
                  <div className="flex items-center justify-between px-4 py-3 bg-space-card">
                    <div>
                      <div className="font-mono text-xs text-white/50">{world.tagline}</div>
                      <div className="font-mono text-xs mt-0.5" style={{ color: world.accentColor }}>
                        {world.difficultyMultiplier <= 1 ? 'EASY' : world.difficultyMultiplier <= 1.8 ? 'MEDIUM' : 'HARD'}
                      </div>
                    </div>
                    {owned ? (
                      <div className="text-green-400 font-orbitron text-xs font-bold flex items-center gap-1">
                        <span>✓</span><span>OWNED</span>
                      </div>
                    ) : (
                      <button
                        onPointerDown={() => handleBuyWorld(world)}
                        className={`rounded-xl px-3 py-2 font-orbitron text-xs font-bold transition-all
                          ${canAfford ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 active:scale-95' : 'bg-black/40 border border-white/10 text-white/30 cursor-not-allowed'}`}
                      >
                        🪙 {world.unlockCost}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
