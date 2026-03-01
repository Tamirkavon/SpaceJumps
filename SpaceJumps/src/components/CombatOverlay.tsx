import type { CharacterConfig } from '../types';

interface Props {
  character: CharacterConfig;
  magicBar: number;
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
  onAttack, onMagic, onShieldStart, onShieldEnd, onParry,
  phase, isShielding, parryCooldownActive, lastParrySuccessMs,
}: Props) {
  const inCombat = phase === 'combat' || phase === 'boss';
  if (!inCombat) return null;

  const magicReady = magicBar >= character.stats.magicCost;
  const parryFlash = lastParrySuccessMs > 0;

  const primary = character.colors.primary;
  const secondary = character.colors.secondary;

  return (
    <div
      className="absolute bottom-0 inset-x-0 z-30 pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
    >
      <div className="grid grid-cols-2 gap-2 px-3">

        {/* ── Row 1: Attack + Magic ── */}

        {/* ATTACK */}
        <button
          onPointerDown={e => { e.stopPropagation(); onAttack(); }}
          className="pointer-events-auto h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider active:scale-95 transition-transform select-none"
          style={{
            background: `linear-gradient(135deg, ${secondary}, ${primary}33)`,
            border: `2px solid ${primary}`,
            color: primary,
            boxShadow: `0 0 18px ${primary}44`,
          }}
        >
          <span className="text-xl leading-none">⚔</span>
          <span className="text-xs">ATTACK</span>
        </button>

        {/* MAGIC */}
        <button
          onPointerDown={e => { e.stopPropagation(); onMagic(); }}
          className="pointer-events-auto h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider active:scale-95 transition-all duration-300 select-none"
          style={{
            background: magicReady
              ? `linear-gradient(135deg, ${primary}33, ${primary}66)`
              : 'rgba(0,0,0,0.5)',
            border: `2px solid ${magicReady ? primary : '#333'}`,
            color: magicReady ? primary : '#555',
            boxShadow: magicReady ? `0 0 22px ${primary}66` : 'none',
          }}
        >
          <span className="text-xl leading-none">✦</span>
          <span className="text-xs">
            {magicReady
              ? character.ability.name.split(' ')[0].toUpperCase()
              : `${Math.floor(magicBar)}%`}
          </span>
        </button>

        {/* ── Row 2: Shield + Parry ── */}

        {/* SHIELD (hold to block) */}
        <button
          onPointerDown={e => { e.stopPropagation(); onShieldStart(); }}
          onPointerUp={e => { e.stopPropagation(); onShieldEnd(); }}
          onPointerLeave={e => { e.stopPropagation(); onShieldEnd(); }}
          onPointerCancel={e => { e.stopPropagation(); onShieldEnd(); }}
          className="pointer-events-auto h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider select-none transition-all duration-100"
          style={{
            background: isShielding
              ? 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
              : 'rgba(0,0,0,0.55)',
            border: `2px solid ${isShielding ? '#60a5fa' : '#334155'}`,
            color: isShielding ? '#bfdbfe' : '#64748b',
            boxShadow: isShielding ? '0 0 22px rgba(96,165,250,0.65)' : 'none',
            transform: isShielding ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          <span className="text-xl leading-none">🛡</span>
          <span className="text-xs">{isShielding ? 'BLOCKING' : 'SHIELD'}</span>
        </button>

        {/* PARRY (tap — timing based) */}
        <button
          onPointerDown={e => { e.stopPropagation(); onParry(); }}
          className="pointer-events-auto h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 font-orbitron font-bold uppercase tracking-wider active:scale-95 select-none transition-all duration-150"
          style={{
            background: parryFlash
              ? 'linear-gradient(135deg, #064e3b, #10b981)'
              : parryCooldownActive
                ? 'rgba(0,0,0,0.3)'
                : `linear-gradient(135deg, ${secondary}55, ${primary}22)`,
            border: `2px solid ${parryFlash ? '#10b981' : parryCooldownActive ? '#1e293b' : '#475569'}`,
            color: parryFlash ? '#6ee7b7' : parryCooldownActive ? '#334155' : '#94a3b8',
            boxShadow: parryFlash ? '0 0 22px rgba(16,185,129,0.7)' : 'none',
            opacity: parryCooldownActive && !parryFlash ? 0.5 : 1,
          }}
        >
          <span className="text-xl leading-none">🔰</span>
          <span className="text-xs">{parryFlash ? 'PARRY!' : 'PARRY'}</span>
        </button>

      </div>
    </div>
  );
}
