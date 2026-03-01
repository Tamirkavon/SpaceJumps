// LYRA — Void Sorceress (purple robes + void staff)
export const lyraSprites = {
  idle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 65">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <!-- Flowing robe -->
    <path d="M 10 26 Q 6 42 8 58 L 32 58 Q 34 42 30 26 Z" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <!-- Robe shimmer -->
    <path d="M 14 28 Q 13 42 14 55" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <path d="M 20 27 Q 19 43 20 56" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.3"/>
    <path d="M 26 28 Q 27 42 26 55" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <!-- Body under robe -->
    <rect x="13" y="22" width="14" height="14" rx="3" fill="#200036" stroke="#c084fc" stroke-width="1"/>
    <!-- Chest gem -->
    <ellipse cx="20" cy="28" rx="4" ry="4" fill="#c084fc" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="20" cy="28" rx="2" ry="2" fill="#e9d5ff"/>
    <!-- Head - elegant -->
    <ellipse cx="20" cy="12" rx="9" ry="11" fill="#200036" stroke="#c084fc" stroke-width="1.5"/>
    <!-- Hair / hood -->
    <path d="M 11 10 Q 10 2 20 1 Q 30 2 29 10" fill="#8b5cf6" stroke="#c084fc" stroke-width="1"/>
    <!-- Face veil -->
    <rect x="13" y="10" width="14" height="5" rx="2" fill="#c084fc" opacity="0.3"/>
    <!-- Eyes glowing -->
    <ellipse cx="16" cy="12" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <ellipse cx="24" cy="12" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <!-- Staff left side -->
    <rect x="5" y="4" width="3" height="52" rx="1.5" fill="#4a1070"/>
    <rect x="5.5" y="4" width="2" height="52" rx="1" fill="#c084fc" opacity="0.5"/>
    <!-- Orb top -->
    <circle cx="6.5" cy="5" r="6" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <circle cx="6.5" cy="5" r="3" fill="#c084fc" opacity="0.8" filter="url(#glow)"/>
    <circle cx="6.5" cy="5" r="1.5" fill="#e9d5ff" filter="url(#glow)"/>
    <!-- Floating particles around staff -->
    <circle cx="3" cy="18" r="1.5" fill="#c084fc" opacity="0.7" filter="url(#glow)"/>
    <circle cx="10" cy="30" r="1" fill="#c084fc" opacity="0.5" filter="url(#glow)"/>
    <circle cx="2" cy="40" r="1.5" fill="#8b5cf6" opacity="0.6" filter="url(#glow)"/>
    <!-- Arms -->
    <path d="M 13 26 Q 8 30 6 36" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 27 26 Q 30 30 28 32" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  run1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 65">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M 10 24 Q 5 40 7 56 L 33 56 Q 35 40 30 24 Z" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 14 26 Q 13 40 14 53" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <path d="M 26 26 Q 27 40 26 53" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <rect x="13" y="20" width="14" height="14" rx="3" fill="#200036" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="20" cy="26" rx="4" ry="4" fill="#c084fc" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="20" cy="10" rx="9" ry="11" fill="#200036" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 11 8 Q 10 0 20 -1 Q 30 0 29 8" fill="#8b5cf6" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="16" cy="10" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <ellipse cx="24" cy="10" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <!-- Staff animated tilt -->
    <rect x="6" y="2" width="3" height="50" rx="1.5" fill="#4a1070" transform="rotate(-10 8 26)"/>
    <rect x="6.5" y="2" width="2" height="50" rx="1" fill="#c084fc" opacity="0.5" transform="rotate(-10 8 26)"/>
    <circle cx="8" cy="3" r="6" fill="#1a0028" stroke="#c084fc" stroke-width="1.5" transform="rotate(-10 8 26)"/>
    <circle cx="8" cy="3" r="3" fill="#c084fc" opacity="0.8" filter="url(#glow)" transform="rotate(-10 8 26)"/>
    <path d="M 13 24 Q 7 26 5 32" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate(-10 8 26)"/>
    <path d="M 27 24 Q 32 22 31 28" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  run2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 65">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M 10 25 Q 6 41 8 57 L 32 57 Q 34 41 30 25 Z" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 14 27 Q 13 41 14 54" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <path d="M 26 27 Q 27 41 26 54" stroke="#c084fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <rect x="13" y="21" width="14" height="14" rx="3" fill="#200036" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="20" cy="27" rx="4" ry="4" fill="#c084fc" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="20" cy="11" rx="9" ry="11" fill="#200036" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 11 9 Q 10 1 20 0 Q 30 1 29 9" fill="#8b5cf6" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="16" cy="11" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <ellipse cx="24" cy="11" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <!-- Staff other tilt -->
    <rect x="6" y="3" width="3" height="50" rx="1.5" fill="#4a1070" transform="rotate(10 8 27)"/>
    <rect x="6.5" y="3" width="2" height="50" rx="1" fill="#c084fc" opacity="0.5" transform="rotate(10 8 27)"/>
    <circle cx="8" cy="4" r="6" fill="#1a0028" stroke="#c084fc" stroke-width="1.5" transform="rotate(10 8 27)"/>
    <circle cx="8" cy="4" r="3" fill="#c084fc" opacity="0.8" filter="url(#glow)" transform="rotate(10 8 27)"/>
    <path d="M 13 25 Q 7 27 5 33" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate(10 8 27)"/>
    <path d="M 27 25 Q 31 28 30 30" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  jump: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 65">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M 12 22 Q 8 36 10 50 L 30 50 Q 32 36 28 22 Z" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <rect x="13" y="18" width="14" height="14" rx="3" fill="#200036" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="20" cy="24" rx="4" ry="4" fill="#c084fc" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="20" cy="8" rx="9" ry="11" fill="#200036" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 11 6 Q 10 -2 20 -3 Q 30 -2 29 6" fill="#8b5cf6" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="16" cy="8" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <ellipse cx="24" cy="8" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <!-- Levitating - staff raised up -->
    <rect x="4" y="0" width="3" height="45" rx="1.5" fill="#4a1070" transform="rotate(-20 5 22)"/>
    <circle cx="3" cy="1" r="7" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <circle cx="3" cy="1" r="4" fill="#c084fc" opacity="0.9" filter="url(#glow)"/>
    <circle cx="3" cy="1" r="2" fill="#e9d5ff" filter="url(#glow)"/>
    <!-- Magic lift aura -->
    <ellipse cx="20" cy="55" rx="16" ry="5" fill="#c084fc" opacity="0.3" filter="url(#glow)"/>
    <!-- Arms stretched up -->
    <path d="M 13 22 Q 6 16 4 8" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 27 22 Q 32 18 33 12" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  slide: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 35">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M 8 12 Q 4 20 6 30 L 48 30 Q 50 20 44 12 Z" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <ellipse cx="12" cy="18" rx="11" ry="11" fill="#200036" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 4 10 Q 5 3 12 2 Q 19 3 19 10" fill="#8b5cf6" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="9" cy="17" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <ellipse cx="15" cy="17" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <!-- Staff horizontal with magical trail -->
    <rect x="22" y="12" width="36" height="2.5" rx="1" fill="#4a1070"/>
    <rect x="22" y="12" width="36" height="2.5" rx="1" fill="#c084fc" opacity="0.7" filter="url(#glow)"/>
    <circle cx="58" cy="13" r="5" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <circle cx="58" cy="13" r="3" fill="#c084fc" opacity="0.9" filter="url(#glow)"/>
    <!-- Magic trail -->
    <path d="M 22 13 Q 10 13 2 13" stroke="#c084fc" stroke-width="1" fill="none" opacity="0.5" stroke-dasharray="3,3"/>
    <line x1="0" y1="10" x2="8" y2="10" stroke="#c084fc" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="16" x2="10" y2="16" stroke="#c084fc" stroke-width="1" opacity="0.3"/>
  </svg>`,

  attack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 65">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M 10 26 Q 6 42 8 58 L 32 58 Q 34 42 30 26 Z" fill="#1a0028" stroke="#c084fc" stroke-width="1.5"/>
    <rect x="13" y="22" width="14" height="14" rx="3" fill="#200036" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="20" cy="28" rx="4" ry="4" fill="#c084fc" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="20" cy="12" rx="9" ry="11" fill="#200036" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 11 10 Q 10 2 20 1 Q 30 2 29 10" fill="#8b5cf6" stroke="#c084fc" stroke-width="1"/>
    <ellipse cx="16" cy="12" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <ellipse cx="24" cy="12" rx="2.5" ry="2" fill="#c084fc" filter="url(#glow)"/>
    <!-- Staff pointed forward shooting bolt -->
    <rect x="26" y="26" width="22" height="2.5" rx="1.5" fill="#4a1070"/>
    <rect x="26" y="26" width="22" height="2.5" rx="1.5" fill="#c084fc" opacity="0.7" filter="url(#glow)"/>
    <circle cx="48" cy="27" r="6" fill="#1a0028" stroke="#c084fc" stroke-width="2"/>
    <circle cx="48" cy="27" r="4" fill="#c084fc" opacity="0.9" filter="url(#glow)"/>
    <!-- Void bolt projectile -->
    <ellipse cx="44" cy="27" rx="8" ry="4" fill="#c084fc" opacity="0.5" filter="url(#glow)"/>
    <!-- Lightning arcs -->
    <path d="M 48 22 L 44 27 L 49 29 L 45 35" stroke="#e9d5ff" stroke-width="1.5" fill="none" filter="url(#glow)"/>
    <!-- Arm extended -->
    <path d="M 27 28 Q 22 28 17 28" stroke="#c084fc" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 13 26 Q 7 30 5 36" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,
};
