// ZARA — Star Knight (cyan plasma sword)
export const zaraSprites = {
  idle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <!-- Body -->
    <rect x="12" y="22" width="16" height="22" rx="3" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <!-- Chest armor -->
    <rect x="15" y="24" width="10" height="8" rx="2" fill="#00a0cc" opacity="0.8"/>
    <!-- Head -->
    <ellipse cx="20" cy="15" rx="9" ry="10" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <!-- Visor -->
    <rect x="13" y="11" width="14" height="5" rx="2" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <!-- Legs -->
    <rect x="12" y="42" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1"/>
    <rect x="21" y="42" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1"/>
    <!-- Boots -->
    <rect x="11" y="51" width="9" height="5" rx="2" fill="#005080"/>
    <rect x="20" y="51" width="9" height="5" rx="2" fill="#005080"/>
    <!-- Sword -->
    <rect x="28" y="18" width="3" height="20" rx="1" fill="#003050"/>
    <rect x="28.5" y="8" width="2" height="14" rx="1" fill="#00f0ff" opacity="0.95" filter="url(#glow)"/>
    <!-- Sword crossguard -->
    <rect x="25" y="21" width="9" height="3" rx="1" fill="#00a0cc"/>
    <!-- Arm -->
    <rect x="26" y="26" width="5" height="12" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1"/>
    <!-- Left arm -->
    <rect x="9" y="26" width="5" height="10" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1"/>
    <!-- Shoulder pads -->
    <ellipse cx="12" cy="25" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
    <ellipse cx="28" cy="25" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
  </svg>`,

  run1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="12" y="20" width="16" height="22" rx="3" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="15" y="22" width="10" height="8" rx="2" fill="#00a0cc" opacity="0.8"/>
    <ellipse cx="20" cy="13" rx="9" ry="10" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="13" y="9" width="14" height="5" rx="2" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <!-- Running legs - stride 1 -->
    <rect x="11" y="40" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1" transform="rotate(-15 14 40)"/>
    <rect x="21" y="40" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1" transform="rotate(20 25 40)"/>
    <rect x="10" y="49" width="9" height="5" rx="2" fill="#005080" transform="rotate(-15 14 40)"/>
    <rect x="20" y="49" width="9" height="5" rx="2" fill="#005080" transform="rotate(20 25 40)"/>
    <rect x="28" y="16" width="3" height="20" rx="1" fill="#003050"/>
    <rect x="28.5" y="6" width="2" height="14" rx="1" fill="#00f0ff" opacity="0.95" filter="url(#glow)"/>
    <rect x="25" y="19" width="9" height="3" rx="1" fill="#00a0cc"/>
    <rect x="27" y="24" width="5" height="12" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1" transform="rotate(-10 30 24)"/>
    <rect x="8" y="22" width="5" height="10" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1" transform="rotate(15 10 22)"/>
    <ellipse cx="12" cy="23" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
    <ellipse cx="28" cy="23" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
  </svg>`,

  run2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="12" y="21" width="16" height="22" rx="3" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="15" y="23" width="10" height="8" rx="2" fill="#00a0cc" opacity="0.8"/>
    <ellipse cx="20" cy="14" rx="9" ry="10" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="13" y="10" width="14" height="5" rx="2" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <!-- Running legs - stride 2 (opposite) -->
    <rect x="11" y="40" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1" transform="rotate(20 14 40)"/>
    <rect x="21" y="40" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1" transform="rotate(-15 25 40)"/>
    <rect x="10" y="49" width="9" height="5" rx="2" fill="#005080" transform="rotate(20 14 40)"/>
    <rect x="20" y="49" width="9" height="5" rx="2" fill="#005080" transform="rotate(-15 25 40)"/>
    <rect x="28" y="17" width="3" height="20" rx="1" fill="#003050"/>
    <rect x="28.5" y="7" width="2" height="14" rx="1" fill="#00f0ff" opacity="0.95" filter="url(#glow)"/>
    <rect x="25" y="20" width="9" height="3" rx="1" fill="#00a0cc"/>
    <rect x="27" y="25" width="5" height="12" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1" transform="rotate(10 30 25)"/>
    <rect x="8" y="23" width="5" height="10" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1" transform="rotate(-15 10 23)"/>
    <ellipse cx="12" cy="24" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
    <ellipse cx="28" cy="24" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
  </svg>`,

  jump: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="12" y="18" width="16" height="22" rx="3" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="15" y="20" width="10" height="8" rx="2" fill="#00a0cc" opacity="0.8"/>
    <ellipse cx="20" cy="11" rx="9" ry="10" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="13" y="7" width="14" height="5" rx="2" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <!-- Tuck legs for jump -->
    <rect x="11" y="38" width="7" height="10" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1" transform="rotate(-30 14 38)"/>
    <rect x="22" y="38" width="7" height="10" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1" transform="rotate(30 26 38)"/>
    <rect x="10" y="46" width="9" height="5" rx="2" fill="#005080" transform="rotate(-30 14 38)"/>
    <rect x="21" y="46" width="9" height="5" rx="2" fill="#005080" transform="rotate(30 26 38)"/>
    <!-- Sword raised for jump -->
    <rect x="29" y="10" width="3" height="20" rx="1" fill="#003050" transform="rotate(30 30 20)"/>
    <rect x="29.5" y="2" width="2" height="14" rx="1" fill="#00f0ff" opacity="0.95" filter="url(#glow)" transform="rotate(30 30 20)"/>
    <rect x="26" y="17" width="9" height="3" rx="1" fill="#00a0cc" transform="rotate(30 30 20)"/>
    <rect x="28" y="20" width="5" height="10" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1" transform="rotate(30 30 20)"/>
    <rect x="7" y="20" width="5" height="10" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1" transform="rotate(-20 9 20)"/>
    <ellipse cx="12" cy="22" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
    <ellipse cx="28" cy="22" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
  </svg>`,

  slide: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <!-- Sliding body horizontal -->
    <ellipse cx="30" cy="15" rx="20" ry="10" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="14" y="10" width="12" height="8" rx="2" fill="#00a0cc" opacity="0.8"/>
    <ellipse cx="14" cy="15" rx="9" ry="9" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="7" y="11" width="14" height="5" rx="2" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <!-- Sword trailing horizontal -->
    <rect x="32" y="12" width="22" height="2" rx="1" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <rect x="30" y="11" width="4" height="4" rx="1" fill="#00a0cc"/>
    <!-- Legs tucked -->
    <ellipse cx="40" cy="20" rx="8" ry="5" fill="#082030" stroke="#00f0ff" stroke-width="1"/>
    <!-- Speed lines -->
    <line x1="0" y1="10" x2="8" y2="10" stroke="#00f0ff" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="15" x2="10" y2="15" stroke="#00f0ff" stroke-width="1" opacity="0.3"/>
    <line x1="0" y1="20" x2="6" y2="20" stroke="#00f0ff" stroke-width="1" opacity="0.4"/>
  </svg>`,

  attack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="10" y="22" width="16" height="22" rx="3" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="13" y="24" width="10" height="8" rx="2" fill="#00a0cc" opacity="0.8"/>
    <ellipse cx="18" cy="15" rx="9" ry="10" fill="#0a2040" stroke="#00f0ff" stroke-width="1.5"/>
    <rect x="11" y="11" width="14" height="5" rx="2" fill="#00f0ff" opacity="0.9" filter="url(#glow)"/>
    <!-- Legs stable -->
    <rect x="10" y="42" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1"/>
    <rect x="19" y="42" width="7" height="12" rx="2" fill="#082030" stroke="#00f0ff" stroke-width="1"/>
    <rect x="9" y="51" width="9" height="5" rx="2" fill="#005080"/>
    <rect x="18" y="51" width="9" height="5" rx="2" fill="#005080"/>
    <!-- Sword slashing diagonally with arc -->
    <path d="M 26 15 Q 45 25 42 40" stroke="#00f0ff" stroke-width="3" fill="none" opacity="0.4" filter="url(#glow)"/>
    <path d="M 26 18 Q 44 28 40 42" stroke="#00f0ff" stroke-width="2" fill="none" opacity="0.6" filter="url(#glow)"/>
    <rect x="24" y="16" width="3" height="20" rx="1" fill="#003050" transform="rotate(45 26 26)"/>
    <rect x="24.5" y="8" width="2" height="16" rx="1" fill="#00f0ff" opacity="1" filter="url(#glow)" transform="rotate(45 26 26)"/>
    <!-- Arm extended -->
    <rect x="24" y="22" width="14" height="5" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1"/>
    <rect x="7" y="26" width="5" height="10" rx="2" fill="#0a2040" stroke="#00f0ff" stroke-width="1"/>
    <ellipse cx="10" cy="25" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
    <ellipse cx="26" cy="25" rx="5" ry="4" fill="#004060" stroke="#00f0ff" stroke-width="1"/>
    <!-- Impact flash -->
    <circle cx="42" cy="30" r="8" fill="rgba(0,240,255,0.3)" filter="url(#glow)"/>
    <circle cx="42" cy="30" r="4" fill="rgba(0,240,255,0.6)" filter="url(#glow)"/>
  </svg>`,
};
