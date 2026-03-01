import type { CharacterConfig } from '../types';

interface Props {
  character: CharacterConfig;
  onResume: () => void;
  onQuit: () => void;
  score: number;
}

export function PauseMenu({ character, onResume, onQuit, score }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="card-glass rounded-3xl p-8 w-80 flex flex-col items-center gap-6 border-2"
        style={{ borderColor: character.colors.primary + '40' }}>

        {/* Title */}
        <div className="text-center">
          <div className="font-syncopate font-bold text-2xl text-white mb-1">PAUSED</div>
          <div className="font-mono text-sm" style={{ color: character.colors.primary }}>
            Score: {score.toLocaleString()}
          </div>
        </div>

        {/* Character icon */}
        <div
          className="w-20 h-20 rounded-full border-2 flex items-center justify-center text-4xl"
          style={{ borderColor: character.colors.primary, background: character.colors.secondary }}
        >
          {character.id === 'zara' ? '⚔' : character.id === 'krix' ? '👊' : character.id === 'lyra' ? '✨' : '🐾'}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onPointerDown={onResume}
            className="btn-primary w-full py-4 text-base"
          >
            ▶ RESUME
          </button>
          <button
            onPointerDown={onQuit}
            className="btn-secondary w-full py-4 text-base"
          >
            ✕ QUIT
          </button>
        </div>

        {/* Controls reminder */}
        <div className="text-center text-white/30 text-xs font-mono leading-relaxed">
          Tap = Jump • Swipe Down = Slide<br />
          Hold = Magic • ⚔ = Attack
        </div>
      </div>
    </div>
  );
}
