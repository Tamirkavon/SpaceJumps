import type { CharacterConfig } from '../types';

interface Props {
  character: CharacterConfig;
  magicBar: number;
  onMoveLeft: (active: boolean) => void;
  onMoveRight: (active: boolean) => void;
  onJump: () => void;
  onAttack: () => void;
  onMagic: () => void;
  onShieldStart: () => void;
  onShieldEnd: () => void;
  onParry: () => void;
  phase: string;
  isShielding: boolean;
  parryCooldownActive: boolean;
  lastParrySuccessMs: number;
}

export function CombatOverlay({
  character, magicBar,
  onMoveLeft, onMoveRight, onJump,
  onAttack, onMagic, onShieldStart, onShieldEnd, onParry,
  phase, isShielding, parryCooldownActive, lastParrySuccessMs,
}: Props) {
  // Hide during non-interactive phases
  if (phase === 'paused' || phase === 'dead' || phase === 'level-clear'
    || phase === 'idle' || phase === 'results') return null;

  const inCombat = phase === 'combat' || phase === 'boss';
  const magicReady = magicBar >= character.stats.magicCost;
  const parryFlash = lastParrySuccessMs > 0;
  const primary = character.colors.primary;
  const secondary = character.colors.secondary;

  const moveBtnStyle = {
    width: 60, height: 60,
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.25)',
    color: '#cbd5e1',
    borderRadius: '50%',
  };

  return (
    <div
      className="flex-none flex w-full select-none"
      style={{
        height: 128,
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'rgba(0,0,0,0.72)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* ── Movement Section (left 45%) ── */}
      <div
        className="flex items-center justify-around"
        style={{
          width: '45%',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          opacity: phase === 'countdown' ? 0.3 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        {/* ◄ LEFT */}
        <button
          onPointerDown={e => { e.stopPropagation(); onMoveLeft(true); }}
          onPointerUp={e => { e.stopPropagation(); onMoveLeft(false); }}
          onPointerLeave={e => { e.stopPropagation(); onMoveLeft(false); }}
          onPointerCancel={e => { e.stopPropagation(); onMoveLeft(false); }}
          className="pointer-events-auto flex items-center justify-center active:scale-90 transition-transform font-orbitron font-bold"
          style={moveBtnStyle}
        >
          <span className="text-2xl leading-none">◄</span>
        </button>

        {/* ▲ JUMP */}
        <button
          onPointerDown={e => { e.stopPropagation(); onJump(); }}
          className="pointer-events-auto flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-transform font-orbitron font-bold"
          style={{
            ...moveBtnStyle,
            background: 'rgba(255,255,255,0.14)',
            border: '2px solid rgba(255,255,255,0.35)',
            color: '#f1f5f9',
          }}
        >
          <span className="text-2xl leading-none">▲</span>
          <span className="text-[8px] uppercase tracking-wider opacity-70">Jump</span>
        </button>

        {/* ► RIGHT */}
        <button
          onPointerDown={e => { e.stopPropagation(); onMoveRight(true); }}
          onPointerUp={e => { e.stopPropagation(); onMoveRight(false); }}
          onPointerLeave={e => { e.stopPropagation(); onMoveRight(false); }}
          onPointerCancel={e => { e.stopPropagation(); onMoveRight(false); }}
          className="pointer-events-auto flex items-center justify-center active:scale-90 transition-transform font-orbitron font-bold"
          style={moveBtnStyle}
        >
          <span className="text-2xl leading-none">►</span>
        </button>
      </div>

      {/* ── Action Section (right 55%) ── */}
      <div className="flex-1 grid grid-cols-2 gap-1 p-1.5">
        {/* ATTACK */}
        <button
          onPointerDown={e => { e.stopPropagation(); onAttack(); }}
          className="pointer-events-auto rounded-xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider active:scale-95 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${secondary}, ${primary}33)`,
            border: `2px solid ${primary}`,
            color: primary,
            boxShadow: `0 0 14px ${primary}44`,
          }}
        >
          <span className="text-lg leading-none">⚔</span>
          <span className="text-[10px]">ATTACK</span>
        </button>

        {/* MAGIC */}
        <button
          onPointerDown={e => { e.stopPropagation(); onMagic(); }}
          className="pointer-events-auto rounded-xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider active:scale-95 transition-all duration-300"
          style={{
            background: magicReady
              ? `linear-gradient(135deg, ${primary}33, ${primary}66)`
              : 'rgba(0,0,0,0.5)',
            border: `2px solid ${magicReady ? primary : '#333'}`,
            color: magicReady ? primary : '#555',
            boxShadow: magicReady ? `0 0 18px ${primary}66` : 'none',
          }}
        >
          <span className="text-lg leading-none">✦</span>
          <span className="text-[10px]">
            {magicReady ? character.ability.name.split(' ')[0].toUpperCase() : `${Math.floor(magicBar)}%`}
          </span>
        </button>

        {/* SHIELD (hold to block) */}
        <button
          onPointerDown={e => { e.stopPropagation(); onShieldStart(); }}
          onPointerUp={e => { e.stopPropagation(); onShieldEnd(); }}
          onPointerLeave={e => { e.stopPropagation(); onShieldEnd(); }}
          onPointerCancel={e => { e.stopPropagation(); onShieldEnd(); }}
          className="pointer-events-auto rounded-xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider select-none transition-all duration-100"
          style={{
            background: isShielding
              ? 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
              : 'rgba(0,0,0,0.55)',
            border: `2px solid ${isShielding ? '#60a5fa' : '#334155'}`,
            color: isShielding ? '#bfdbfe' : '#64748b',
            boxShadow: isShielding ? '0 0 18px rgba(96,165,250,0.65)' : 'none',
            transform: isShielding ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          <span className="text-lg leading-none">🛡</span>
          <span className="text-[10px]">{isShielding ? 'BLOCKING' : 'SHIELD'}</span>
        </button>

        {/* PARRY (tap for perfect block) */}
        <button
          onPointerDown={e => { e.stopPropagation(); onParry(); }}
          className="pointer-events-auto rounded-xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider active:scale-95 select-none transition-all duration-150"
          style={{
            background: parryFlash
              ? 'linear-gradient(135deg, #064e3b, #10b981)'
              : parryCooldownActive
                ? 'rgba(0,0,0,0.3)'
                : `linear-gradient(135deg, ${secondary}55, ${primary}22)`,
            border: `2px solid ${parryFlash ? '#10b981' : parryCooldownActive ? '#1e293b' : '#475569'}`,
            color: parryFlash ? '#6ee7b7' : parryCooldownActive ? '#334155' : '#94a3b8',
            boxShadow: parryFlash ? '0 0 18px rgba(16,185,129,0.7)' : 'none',
            opacity: parryCooldownActive && !parryFlash ? 0.5 : 1,
          }}
        >
          <span className="text-lg leading-none">🔰</span>
          <span className="text-[10px]">{parryFlash ? 'PARRY!' : 'PARRY'}</span>
        </button>
      </div>
    </div>
  );
}
