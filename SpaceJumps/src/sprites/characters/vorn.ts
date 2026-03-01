// VORN — Shadow Hunter (green bioluminescent panther)
export const vornSprites = {
  idle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <!-- Sleek dark suit -->
    <rect x="12" y="22" width="16" height="22" rx="3" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <!-- Bio-luminescent stripes -->
    <line x1="15" y1="22" x2="15" y2="44" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <line x1="20" y1="22" x2="20" y2="44" stroke="#22c55e" stroke-width="0.8" opacity="0.4"/>
    <line x1="25" y1="22" x2="25" y2="44" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <!-- Chest glowing node -->
    <circle cx="20" cy="30" r="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <circle cx="20" cy="30" r="1.5" fill="#86efac"/>
    <!-- Cat-like head -->
    <ellipse cx="20" cy="13" rx="10" ry="11" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <!-- Pointed ears -->
    <polygon points="11,8 14,0 17,8" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="23,8 26,0 29,8" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <!-- Inner ear glow -->
    <polygon points="12,7 14,2 16,7" fill="#22c55e" opacity="0.5"/>
    <polygon points="24,7 26,2 28,7" fill="#22c55e" opacity="0.5"/>
    <!-- Eyes - slit pupils -->
    <ellipse cx="16" cy="12" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="24" cy="12" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="16" cy="12" rx="1" ry="2.5" fill="#000505"/>
    <ellipse cx="24" cy="12" rx="1" ry="2.5" fill="#000505"/>
    <!-- Legs sleek -->
    <rect x="12" y="42" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1"/>
    <rect x="21" y="42" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1"/>
    <!-- Boots with claw tips -->
    <rect x="11" y="52" width="9" height="5" rx="2" fill="#051005"/>
    <polygon points="11,57 9,60 12,57" fill="#22c55e" opacity="0.8"/>
    <rect x="20" y="52" width="9" height="5" rx="2" fill="#051005"/>
    <polygon points="29,57 31,60 28,57" fill="#22c55e" opacity="0.8"/>
    <!-- Claw gauntlets -->
    <rect x="29" y="24" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <!-- Claw blades extended -->
    <line x1="31" y1="36" x2="29" y2="44" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <line x1="33" y1="36" x2="33" y2="45" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <line x1="35" y1="36" x2="37" y2="44" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <!-- Left gauntlet -->
    <rect x="5" y="24" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <line x1="7" y1="36" x2="5" y2="44" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <line x1="9" y1="36" x2="9" y2="45" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <!-- Shoulder glowing nodes -->
    <circle cx="12" cy="24" r="4" fill="#051005" stroke="#22c55e" stroke-width="1.5"/>
    <circle cx="28" cy="24" r="4" fill="#051005" stroke="#22c55e" stroke-width="1.5"/>
    <circle cx="12" cy="24" r="2" fill="#22c55e" opacity="0.6" filter="url(#glow)"/>
    <circle cx="28" cy="24" r="2" fill="#22c55e" opacity="0.6" filter="url(#glow)"/>
  </svg>`,

  run1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="12" y="20" width="16" height="22" rx="3" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <line x1="15" y1="20" x2="15" y2="42" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <line x1="25" y1="20" x2="25" y2="42" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <circle cx="20" cy="28" r="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="20" cy="11" rx="10" ry="11" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="11,6 14,-2 17,6" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="23,6 26,-2 29,6" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <ellipse cx="16" cy="10" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="24" cy="10" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <!-- Sprint legs -->
    <rect x="11" y="40" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1" transform="rotate(-25 14 40)"/>
    <rect x="21" y="40" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1" transform="rotate(20 25 40)"/>
    <!-- Arms pumping hard -->
    <rect x="28" y="22" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5" transform="rotate(-20 31 22)"/>
    <rect x="6" y="22" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5" transform="rotate(20 9 22)"/>
    <!-- Speed streaks -->
    <line x1="0" y1="25" x2="5" y2="25" stroke="#22c55e" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="30" x2="7" y2="30" stroke="#22c55e" stroke-width="1" opacity="0.5"/>
  </svg>`,

  run2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="12" y="21" width="16" height="22" rx="3" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <line x1="15" y1="21" x2="15" y2="43" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <line x1="25" y1="21" x2="25" y2="43" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <circle cx="20" cy="29" r="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="20" cy="12" rx="10" ry="11" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="11,7 14,-1 17,7" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="23,7 26,-1 29,7" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <ellipse cx="16" cy="11" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="24" cy="11" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <rect x="11" y="40" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1" transform="rotate(20 14 40)"/>
    <rect x="21" y="40" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1" transform="rotate(-25 25 40)"/>
    <rect x="28" y="23" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5" transform="rotate(20 31 23)"/>
    <rect x="6" y="23" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5" transform="rotate(-20 9 23)"/>
    <line x1="0" y1="26" x2="5" y2="26" stroke="#22c55e" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="31" x2="7" y2="31" stroke="#22c55e" stroke-width="1" opacity="0.5"/>
  </svg>`,

  jump: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="12" y="16" width="16" height="22" rx="3" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <line x1="15" y1="16" x2="15" y2="38" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <line x1="25" y1="16" x2="25" y2="38" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <circle cx="20" cy="24" r="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="20" cy="7" rx="10" ry="11" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="11,2 14,-6 17,2" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="23,2 26,-6 29,2" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <ellipse cx="16" cy="6" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="24" cy="6" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <!-- Leap pose - legs spread like a cat pounce -->
    <rect x="9" y="36" width="7" height="12" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1" transform="rotate(-40 12 36)"/>
    <rect x="24" y="36" width="7" height="12" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1" transform="rotate(40 28 36)"/>
    <!-- Claws extended forward for pounce -->
    <rect x="28" y="18" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5" transform="rotate(-40 31 18)"/>
    <line x1="30" y1="30" x2="26" y2="38" stroke="#22c55e" stroke-width="2" filter="url(#glow)" transform="rotate(-40 31 18)"/>
    <line x1="33" y1="30" x2="33" y2="40" stroke="#22c55e" stroke-width="2" filter="url(#glow)" transform="rotate(-40 31 18)"/>
    <rect x="6" y="18" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5" transform="rotate(-30 9 18)"/>
  </svg>`,

  slide: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="8" y="10" width="36" height="14" rx="4" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <line x1="12" y1="10" x2="12" y2="24" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <line x1="20" y1="10" x2="20" y2="24" stroke="#22c55e" stroke-width="0.8" opacity="0.4"/>
    <line x1="28" y1="10" x2="28" y2="24" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <circle cx="16" cy="17" r="3" fill="#22c55e" opacity="0.8" filter="url(#glow)"/>
    <!-- Head -->
    <ellipse cx="8" cy="17" rx="10" ry="10" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="2,9 5,2 8,9" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="8,9 11,2 14,9" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <ellipse cx="5" cy="16" rx="2.5" ry="2.5" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="11" cy="16" rx="2.5" ry="2.5" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <!-- Claws out forward -->
    <line x1="44" y1="13" x2="54" y2="10" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <line x1="44" y1="17" x2="56" y2="17" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <line x1="44" y1="21" x2="54" y2="24" stroke="#22c55e" stroke-width="2" filter="url(#glow)"/>
    <!-- Shadow trail -->
    <rect x="0" y="12" width="8" height="10" rx="2" fill="#050f05" opacity="0.3"/>
    <line x1="0" y1="11" x2="8" y2="11" stroke="#22c55e" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="17" x2="10" y2="17" stroke="#22c55e" stroke-width="1" opacity="0.3"/>
  </svg>`,

  attack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="10" y="22" width="16" height="22" rx="3" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <line x1="13" y1="22" x2="13" y2="44" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <line x1="23" y1="22" x2="23" y2="44" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
    <circle cx="18" cy="30" r="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="18" cy="13" rx="10" ry="11" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="9,8 12,0 15,8" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <polygon points="21,8 24,0 27,8" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <ellipse cx="14" cy="12" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="22" cy="12" rx="3" ry="3" fill="#22c55e" opacity="0.9" filter="url(#glow)"/>
    <rect x="10" y="42" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1"/>
    <rect x="19" y="42" width="7" height="13" rx="2" fill="#030a03" stroke="#22c55e" stroke-width="1"/>
    <!-- Claw slash extended far -->
    <rect x="24" y="22" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <!-- Three long slash marks -->
    <line x1="30" y1="18" x2="50" y2="26" stroke="#22c55e" stroke-width="3" filter="url(#glow)"/>
    <line x1="30" y1="24" x2="52" y2="28" stroke="#22c55e" stroke-width="3" filter="url(#glow)"/>
    <line x1="30" y1="30" x2="50" y2="30" stroke="#22c55e" stroke-width="3" filter="url(#glow)"/>
    <!-- Claw tips -->
    <circle cx="50" cy="26" r="2" fill="#86efac" filter="url(#glow)"/>
    <circle cx="52" cy="28" r="2" fill="#86efac" filter="url(#glow)"/>
    <circle cx="50" cy="30" r="2" fill="#86efac" filter="url(#glow)"/>
    <!-- Left arm -->
    <rect x="4" y="26" width="6" height="12" rx="2" fill="#050f05" stroke="#22c55e" stroke-width="1.5"/>
    <circle cx="12" cy="24" r="4" fill="#051005" stroke="#22c55e" stroke-width="1.5"/>
    <circle cx="26" cy="24" r="4" fill="#051005" stroke="#22c55e" stroke-width="1.5"/>
  </svg>`,
};
