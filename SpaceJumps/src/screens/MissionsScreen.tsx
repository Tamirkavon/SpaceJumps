import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { MISSIONS } from '../data/missions';
import { WORLDS } from '../data/worlds';

function getMissionProgress(missionId: string, profile: { completedMissionIds: string[] }) {
  return profile.completedMissionIds.includes(missionId);
}

export function MissionsScreen() {
  const { profile, goTo } = useGame();
  const [activeWorld, setActiveWorld] = useState('nebula');
  const world = WORLDS.find(w => w.id === activeWorld)!;
  const worldMissions = MISSIONS.filter(m => m.worldId === activeWorld);
  const completedCount = worldMissions.filter(m => getMissionProgress(m.id, profile)).length;

  return (
    <div className="screen-container stars-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-safe pb-3 border-b border-space-border">
        <button onPointerDown={() => goTo('home')} className="text-white/60 text-2xl w-10 h-10 flex items-center justify-center">←</button>
        <div>
          <h2 className="font-syncopate font-bold text-white text-lg">MISSIONS</h2>
          <p className="text-space-muted text-xs font-mono">Complete objectives to earn coins</p>
        </div>
      </div>

      {/* World tabs */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto pb-1">
        {WORLDS.map(w => (
          <button
            key={w.id}
            onPointerDown={() => setActiveWorld(w.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl font-orbitron text-xs font-bold uppercase tracking-wider transition-all duration-200 border-2
              ${activeWorld === w.id ? 'border-current' : 'border-space-border text-white/40'}`}
            style={{ color: activeWorld === w.id ? w.accentColor : undefined, borderColor: activeWorld === w.id ? w.accentColor : undefined }}
          >
            {w.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Progress header */}
      <div className="mx-4 mt-4 p-3 rounded-xl border flex items-center justify-between"
        style={{ background: `linear-gradient(90deg, ${world.bgTop}88, ${world.bgBottom}88)`, borderColor: world.accentColor + '40' }}>
        <div>
          <div className="font-syncopate text-white font-bold text-sm">{world.name}</div>
          <div className="font-mono text-xs mt-0.5" style={{ color: world.accentColor }}>{completedCount}/{worldMissions.length} completed</div>
        </div>
        <div className="flex items-center gap-1">
          {worldMissions.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all"
              style={{ background: i < completedCount ? world.accentColor : '#333' }} />
          ))}
        </div>
      </div>

      {/* Mission list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3 pb-4">
          {worldMissions.map(mission => {
            const done = getMissionProgress(mission.id, profile);
            const obj = mission.objective;
            let objText = '';
            if (obj.type === 'collect-coins') objText = `Collect ${obj.count} coins`;
            else if (obj.type === 'kill-enemies') objText = `Defeat ${obj.count} enemies`;
            else if (obj.type === 'survive-distance') objText = `Travel ${obj.meters} meters`;
            else if (obj.type === 'use-magic') objText = `Use magic ${obj.count} times`;
            else if (obj.type === 'kill-boss') objText = `Defeat the boss`;

            return (
              <div key={mission.id}
                className={`card-glass rounded-xl p-4 border transition-all duration-200 ${done ? 'opacity-70' : ''}`}
                style={{ borderColor: done ? world.accentColor + '60' : '#1a1a3e' }}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base
                    ${done ? 'bg-green-500/20 border-2 border-green-500' : 'bg-white/5 border-2 border-white/20'}`}>
                    {done ? '✓' : '○'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-orbitron text-sm font-bold text-white">{mission.title}</span>
                      <span className="font-orbitron text-yellow-400 text-xs font-bold flex-shrink-0">+{mission.rewardCoins} 🪙</span>
                    </div>
                    <p className="font-mono text-xs text-white/50 mt-0.5">{mission.description}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: world.accentColor }} />
                      <span className="font-mono text-xs" style={{ color: world.accentColor }}>{objText}</span>
                    </div>
                    {mission.rewardCharacterId && !done && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-purple-400 text-xs">🎁</span>
                        <span className="font-mono text-xs text-purple-400">Unlocks a hero!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
