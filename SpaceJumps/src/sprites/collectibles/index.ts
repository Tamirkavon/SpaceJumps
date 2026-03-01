export const coinSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <circle cx="14" cy="14" r="13" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="14" cy="14" r="10" fill="#d97706"/>
  <circle cx="14" cy="14" r="8" fill="#f59e0b" opacity="0.8"/>
  <!-- Star symbol -->
  <polygon points="14,6 15.5,11.5 21,11.5 16.5,15 18,20.5 14,17 10,20.5 11.5,15 7,11.5 12.5,11.5" fill="#fcd34d" filter="url(#g)"/>
  <!-- Shine -->
  <ellipse cx="10" cy="9" rx="3" ry="2" fill="#fef9c3" opacity="0.4" transform="rotate(-30 10 9)"/>
</svg>`;

export const gemSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Diamond shape -->
  <polygon points="14,2 26,10 26,22 14,30 2,22 2,10" fill="#0ea5e9" stroke="#38bdf8" stroke-width="1.5"/>
  <!-- Facets -->
  <polygon points="14,2 26,10 14,12" fill="#7dd3fc" opacity="0.7"/>
  <polygon points="2,10 14,12 14,2" fill="#0284c7" opacity="0.8"/>
  <polygon points="14,12 26,10 26,22 14,30" fill="#0369a1" opacity="0.6"/>
  <polygon points="14,12 2,10 2,22 14,30" fill="#0284c7" opacity="0.7"/>
  <!-- Center shine -->
  <polygon points="14,6 20,10 14,14 8,10" fill="#e0f2fe" opacity="0.5"/>
  <!-- Outer glow -->
  <polygon points="14,2 26,10 26,22 14,30 2,22 2,10" fill="none" stroke="#7dd3fc" stroke-width="2" opacity="0.5" filter="url(#g)"/>
</svg>`;

export const healthOrbSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <circle cx="14" cy="14" r="13" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
  <circle cx="14" cy="14" r="10" fill="#b91c1c"/>
  <circle cx="14" cy="14" r="8" fill="#ef4444" opacity="0.9" filter="url(#g)"/>
  <!-- Cross symbol -->
  <rect x="11" y="7" width="6" height="14" rx="2" fill="#fca5a5"/>
  <rect x="7" y="11" width="14" height="6" rx="2" fill="#fca5a5"/>
  <!-- Shine -->
  <ellipse cx="10" cy="9" rx="3" ry="2" fill="#fee2e2" opacity="0.4" transform="rotate(-30 10 9)"/>
</svg>`;

export const magicCrystalSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 34">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Crystal shard -->
  <polygon points="12,0 22,8 20,28 12,34 4,28 2,8" fill="#4c1d95" stroke="#c084fc" stroke-width="1.5"/>
  <polygon points="12,0 22,8 12,10" fill="#7c3aed" opacity="0.8"/>
  <polygon points="2,8 12,10 12,0" fill="#5b21b6" opacity="0.9"/>
  <polygon points="12,10 22,8 20,28 12,34" fill="#4c1d95" opacity="0.7"/>
  <polygon points="12,10 2,8 4,28 12,34" fill="#5b21b6" opacity="0.7"/>
  <!-- Inner glow -->
  <ellipse cx="12" cy="16" rx="4" ry="6" fill="#c084fc" opacity="0.4" filter="url(#g)"/>
  <!-- Facet shine -->
  <polygon points="12,2 18,8 12,8" fill="#e9d5ff" opacity="0.3"/>
  <!-- Outer glow -->
  <polygon points="12,0 22,8 20,28 12,34 4,28 2,8" fill="none" stroke="#c084fc" stroke-width="1.5" opacity="0.5" filter="url(#g)"/>
</svg>`;
