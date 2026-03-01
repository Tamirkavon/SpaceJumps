import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worlds';
import { MISSIONS } from '../data/missions';
import { CHARACTERS } from '../data/characters';

export function ResultsScreen() {
  const { lastResult, selectedCharacter, profile, goTo, replay, earnCoins } = useGame();
  const coinSentRef = useRef(false);

  const result = lastResult;
  const world = result ? WORLDS.find(w => w.id === result.worldId) : null;
  const char = result ? CHARACTERS.find(c => c.id === result.characterId) : selectedCharacter;

  useEffect(() => {
    if (result && !coinSentRef.current) {
      coinSentRef.current = true;
    }
  }, [result]);

  if (!result || !world || !char) {
    return (
      <div className="screen-container items-center justify-center">
        <button onPointerDown={() => goTo('home')} className="btn-primary">← HOME</button>
      </div>
    );
  }

  const completedMissions = MISSIONS.filter(m => result.missionsCompleted.includes(m.id));
  const bonusCoins = completedMissions.reduce((sum, m) => sum + m.rewardCoins, 0);

  return (
    <div className="screen-container"
      style={{ background: `radial-gradient(ellipse at 50% 0%, ${world.accentColor}15 0%, transparent 50%), linear-gradient(180deg, #0a0a1a, #0a0a2a)` }}>

      <div className="flex flex-col items-center px-4 pt-safe gap-5 pb-safe overflow-y-auto">
        {/* Result title */}
        <div className="mt-6 text-center">
          <div className="font-syncopate font-bold text-3xl mb-2"
            style={{ color: result.stars === 3 ? '#f59e0b' : result.stars === 2 ? world.accentColor : '#fff',
              textShadow: `0 0 30px ${result.stars === 3 ? '#f59e0b' : world.accentColor}` }}>
            {result.stars === 3 ? 'WORLD CLEAR!' : result.stars === 2 ? 'WELL DONE!' : 'KEEP TRYING!'}
          </div>
          {/* Stars */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <span key={i} className="text-3xl transition-all duration-700"
                style={{ opacity: i <= result.stars ? 1 : 0.2, filter: i <= result.stars ? 'drop-shadow(0 0 8px gold)' : 'none' }}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Character badge */}
        <div className="flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3 border w-full"
          style={{ borderColor: char.colors.primary + '40' }}>
          <div className="text-3xl">{char.id === 'zara' ? '⚔' : char.id === 'krix' ? '👊' : char.id === 'lyra' ? '✨' : '🐾'}</div>
          <div>
            <div className="font-syncopate text-white font-bold">{char.name}</div>
            <div className="font-mono text-xs" style={{ color: char.colors.primary }}>{world.name}</div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: 'SCORE', value: result.score.toLocaleString(), icon: '⭐', color: '#f59e0b' },
            { label: 'DISTANCE', value: `${result.distanceMeters}m`, icon: '🚀', color: world.accentColor },
            { label: 'ENEMIES', value: result.enemiesKilled, icon: '💀', color: '#ef4444' },
            { label: 'COINS', value: result.coins, icon: '🪙', color: '#f59e0b' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="card-glass rounded-xl p-3 flex flex-col items-center gap-1">
              <span className="text-xl">{icon}</span>
              <div className="font-orbitron font-bold text-lg" style={{ color }}>{value}</div>
              <div className="text-white/40 text-xs font-mono">{label}</div>
            </div>
          ))}
        </div>

        {/* Mission completions */}
        {completedMissions.length > 0 && (
          <div className="w-full">
            <div className="font-orbitron text-xs font-bold text-white/60 mb-2 tracking-widest">MISSIONS COMPLETED</div>
            <div className="flex flex-col gap-2">
              {completedMissions.map(m => (
                <div key={m.id} className="flex items-center justify-between bg-black/40 rounded-xl px-3 py-2.5 border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="font-mono text-sm text-white/80">{m.title}</span>
                  </div>
                  <span className="font-orbitron text-yellow-400 text-sm font-bold">+{m.rewardCoins} 🪙</span>
                </div>
              ))}
            </div>
            {bonusCoins > 0 && (
              <div className="text-center mt-2 font-orbitron text-yellow-400 font-bold text-sm">
                Mission Bonus: +{bonusCoins} 🪙
              </div>
            )}
          </div>
        )}

        {/* Best score note */}
        {(profile.bestScores[result.worldId] ?? 0) === result.score && result.score > 0 && (
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-2">
            <span className="text-yellow-400">🏆</span>
            <span className="font-orbitron text-yellow-400 text-sm font-bold">NEW BEST SCORE!</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full pb-4">
          <button onPointerDown={replay} className="btn-primary w-full py-4">
            🔄 PLAY AGAIN
          </button>
          <button onPointerDown={() => goTo('world-select')} className="btn-secondary w-full py-4">
            🌍 CHANGE WORLD
          </button>
          <button onPointerDown={() => goTo('home')} className="btn-secondary w-full py-4">
            🏠 HOME
          </button>
        </div>
      </div>
    </div>
  );
}
