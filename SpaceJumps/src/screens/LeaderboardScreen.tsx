import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worlds';
import { CHARACTERS } from '../data/characters';

export function LeaderboardScreen() {
  const { profile, goTo } = useGame();

  return (
    <div className="screen-container stars-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-safe pb-3 border-b border-space-border">
        <button onPointerDown={() => goTo('home')} className="text-white/60 text-2xl w-10 h-10 flex items-center justify-center">←</button>
        <div>
          <h2 className="font-syncopate font-bold text-white text-lg">HIGH SCORES</h2>
          <p className="text-space-muted text-xs font-mono">Your best scores per world</p>
        </div>
        <div className="ml-auto text-2xl">🏆</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col gap-6 pb-6">
          {WORLDS.map((world, wi) => {
            const best = profile.bestScores[world.id] ?? 0;
            const unlocked = profile.unlockedWorldIds.includes(world.id);
            return (
              <div key={world.id} className="rounded-2xl overflow-hidden border"
                style={{ borderColor: unlocked ? world.accentColor + '50' : '#1a1a3e' }}>
                {/* World banner */}
                <div className="h-16 flex items-center justify-between px-4 relative overflow-hidden"
                  style={{ background: `linear-gradient(90deg, ${world.bgTop}, ${world.bgBottom})` }}>
                  {/* Stars */}
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 rounded-full bg-white"
                      style={{ left: `${5 + i * 10}%`, top: `${20 + (i % 3) * 30}%`, opacity: 0.4 }} />
                  ))}
                  <div>
                    <div className="font-syncopate text-white font-bold text-sm" style={{ textShadow: `0 0 15px ${world.accentColor}` }}>
                      #{wi + 1} {world.name}
                    </div>
                    <div className="font-mono text-xs" style={{ color: world.accentColor + 'cc' }}>{world.tagline}</div>
                  </div>
                  {!unlocked && <span className="text-2xl">🔒</span>}
                </div>

                {/* Score row */}
                <div className="bg-space-card px-4 py-4">
                  {best > 0 ? (
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-orbitron text-2xl font-bold"
                          style={{ color: world.accentColor, textShadow: `0 0 10px ${world.accentColor}` }}>
                          {best.toLocaleString()}
                        </div>
                        <div className="text-white/40 text-xs font-mono">BEST SCORE</div>
                      </div>
                      <div className="flex-1 h-px bg-space-border" />
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-lg">
                          {best > 10000 ? '⭐⭐⭐' : best > 5000 ? '⭐⭐' : '⭐'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/30">
                      <span className="font-mono text-sm">
                        {unlocked ? 'No runs yet — play to set a score!' : 'Locked — buy in shop to access'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Total stats */}
          <div className="card-glass rounded-2xl p-4 border border-space-border">
            <div className="font-orbitron text-xs font-bold text-white/40 mb-3 tracking-widest">OVERALL STATS</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="font-orbitron text-xl font-bold text-yellow-400">{profile.totalCoins.toLocaleString()}</div>
                <div className="text-white/40 text-xs font-mono">TOTAL COINS</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron text-xl font-bold text-purple-400">{profile.completedMissionIds.length}</div>
                <div className="text-white/40 text-xs font-mono">MISSIONS DONE</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron text-xl font-bold text-cyan-400">{profile.unlockedCharacterIds.length}/{CHARACTERS.length}</div>
                <div className="text-white/40 text-xs font-mono">HEROES</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron text-xl font-bold text-orange-400">{profile.unlockedWorldIds.length}/{WORLDS.length}</div>
                <div className="text-white/40 text-xs font-mono">WORLDS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
