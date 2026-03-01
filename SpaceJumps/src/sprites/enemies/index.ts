// Enemy SVG sprites

export const droneSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 36">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Main hex body -->
  <polygon points="20,3 33,11 33,25 20,33 7,25 7,11" fill="#1a0010" stroke="#ff2020" stroke-width="2"/>
  <!-- Inner hex -->
  <polygon points="20,8 28,13 28,22 20,27 12,22 12,13" fill="#2a0020" stroke="#ff4040" stroke-width="1"/>
  <!-- Core red eye -->
  <circle cx="20" cy="18" r="6" fill="#ff2020" opacity="0.9" filter="url(#g)"/>
  <circle cx="20" cy="18" r="3" fill="#ff6060" filter="url(#g)"/>
  <circle cx="18" cy="16" r="1.5" fill="#ffaaaa"/>
  <!-- Side thrusters -->
  <ellipse cx="5" cy="18" rx="4" ry="2" fill="#330010" stroke="#ff2020" stroke-width="1"/>
  <ellipse cx="35" cy="18" rx="4" ry="2" fill="#330010" stroke="#ff2020" stroke-width="1"/>
  <!-- Thruster glow -->
  <ellipse cx="2" cy="18" rx="2" ry="1.5" fill="#ff4040" opacity="0.7" filter="url(#g)"/>
  <ellipse cx="38" cy="18" rx="2" ry="1.5" fill="#ff4040" opacity="0.7" filter="url(#g)"/>
  <!-- Weapon barrels -->
  <rect x="15" y="28" width="3" height="6" rx="1" fill="#ff2020"/>
  <rect x="22" y="28" width="3" height="6" rx="1" fill="#ff2020"/>
</svg>`;

export const alienSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 60">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Spindly alien body -->
  <rect x="16" y="22" width="12" height="22" rx="3" fill="#0a2010" stroke="#40ff80" stroke-width="1.5"/>
  <!-- Alien patterns -->
  <ellipse cx="22" cy="30" rx="5" ry="5" fill="#40ff80" opacity="0.3"/>
  <!-- Large alien head -->
  <ellipse cx="22" cy="13" rx="13" ry="12" fill="#0a2010" stroke="#40ff80" stroke-width="1.5"/>
  <!-- Big compound eyes -->
  <ellipse cx="14" cy="11" rx="5" ry="5" fill="#40ff80" opacity="0.9" filter="url(#g)"/>
  <ellipse cx="30" cy="11" rx="5" ry="5" fill="#40ff80" opacity="0.9" filter="url(#g)"/>
  <ellipse cx="14" cy="11" rx="3" ry="3" fill="#002010"/>
  <ellipse cx="30" cy="11" rx="3" ry="3" fill="#002010"/>
  <!-- Antennae -->
  <line x1="18" y1="2" x2="14" y2="-4" stroke="#40ff80" stroke-width="1.5" filter="url(#g)"/>
  <circle cx="13" cy="-5" r="2" fill="#40ff80" filter="url(#g)"/>
  <line x1="26" y1="2" x2="30" y2="-4" stroke="#40ff80" stroke-width="1.5" filter="url(#g)"/>
  <circle cx="31" cy="-5" r="2" fill="#40ff80" filter="url(#g)"/>
  <!-- Long arms holding blaster -->
  <rect x="7" y="24" width="4" height="16" rx="2" fill="#0a2010" stroke="#40ff80" stroke-width="1"/>
  <rect x="33" y="24" width="4" height="16" rx="2" fill="#0a2010" stroke="#40ff80" stroke-width="1"/>
  <!-- Blaster weapon right -->
  <rect x="36" y="32" width="8" height="5" rx="2" fill="#1a4030" stroke="#40ff80" stroke-width="1.5"/>
  <rect x="43" y="33" width="4" height="3" rx="1" fill="#40ff80" opacity="0.8" filter="url(#g)"/>
  <!-- Legs -->
  <rect x="16" y="42" width="5" height="14" rx="2" fill="#051008" stroke="#40ff80" stroke-width="1"/>
  <rect x="23" y="42" width="5" height="14" rx="2" fill="#051008" stroke="#40ff80" stroke-width="1"/>
</svg>`;

export const mechSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 70">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Huge mech body -->
  <rect x="10" y="20" width="34" height="30" rx="4" fill="#1a1010" stroke="#cc4400" stroke-width="2.5"/>
  <!-- Chest hazard stripes -->
  <rect x="12" y="22" width="8" height="4" fill="#cc4400" opacity="0.8"/>
  <rect x="24" y="22" width="8" height="4" fill="#cc4400" opacity="0.8"/>
  <rect x="36" y="22" width="6" height="4" fill="#cc4400" opacity="0.8"/>
  <!-- Reactor core -->
  <circle cx="27" cy="36" r="9" fill="#330a00" stroke="#ff6b35" stroke-width="2"/>
  <circle cx="27" cy="36" r="5" fill="#ff6b35" opacity="0.8" filter="url(#g)"/>
  <circle cx="27" cy="36" r="2" fill="#ffaa44"/>
  <!-- Head small box -->
  <rect x="17" y="8" width="20" height="14" rx="3" fill="#1a1010" stroke="#cc4400" stroke-width="2"/>
  <!-- Optic sensor visor -->
  <rect x="19" y="11" width="16" height="5" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#g)"/>
  <!-- Huge arms with cannons -->
  <rect x="0" y="22" width="14" height="20" rx="3" fill="#110a00" stroke="#cc4400" stroke-width="2"/>
  <rect x="40" y="22" width="14" height="20" rx="3" fill="#110a00" stroke="#cc4400" stroke-width="2"/>
  <!-- Cannon barrels -->
  <rect x="-6" y="28" width="10" height="8" rx="2" fill="#cc4400" stroke="#ff6b35" stroke-width="1.5"/>
  <rect x="50" y="28" width="10" height="8" rx="2" fill="#cc4400" stroke="#ff6b35" stroke-width="1.5"/>
  <circle cx="-6" cy="32" r="3" fill="#ff6b35" opacity="0.9" filter="url(#g)"/>
  <circle cx="60" cy="32" r="3" fill="#ff6b35" opacity="0.9" filter="url(#g)"/>
  <!-- Tank legs -->
  <rect x="10" y="48" width="14" height="18" rx="3" fill="#0a0500" stroke="#cc4400" stroke-width="2"/>
  <rect x="30" y="48" width="14" height="18" rx="3" fill="#0a0500" stroke="#cc4400" stroke-width="2"/>
  <!-- Treads -->
  <rect x="8" y="62" width="18" height="6" rx="3" fill="#1a1010" stroke="#cc4400" stroke-width="1.5"/>
  <rect x="28" y="62" width="18" height="6" rx="3" fill="#1a1010" stroke="#cc4400" stroke-width="1.5"/>
  <line x1="14" y1="62" x2="14" y2="68" stroke="#cc4400" stroke-width="1" opacity="0.6"/>
  <line x1="20" y1="62" x2="20" y2="68" stroke="#cc4400" stroke-width="1" opacity="0.6"/>
  <line x1="34" y1="62" x2="34" y2="68" stroke="#cc4400" stroke-width="1" opacity="0.6"/>
  <line x1="40" y1="62" x2="40" y2="68" stroke="#cc4400" stroke-width="1" opacity="0.6"/>
</svg>`;

export const specterSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
  <defs>
    <filter id="g"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="phase"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <!-- Ghostly wispy body -->
  <path d="M 20 8 Q 35 20 34 40 Q 32 52 26 55 Q 20 60 20 55 Q 20 60 14 55 Q 8 52 6 40 Q 5 20 20 8 Z"
    fill="#0d0020" stroke="#c084fc" stroke-width="1.5" opacity="0.85" filter="url(#phase)"/>
  <!-- Spectral wisps -->
  <path d="M 14 50 Q 10 58 8 60" stroke="#c084fc" stroke-width="2" fill="none" opacity="0.6"/>
  <path d="M 20 55 Q 20 62 18 64" stroke="#c084fc" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 26 50 Q 30 58 32 60" stroke="#c084fc" stroke-width="2" fill="none" opacity="0.6"/>
  <!-- Hollow skull face -->
  <ellipse cx="20" cy="22" rx="12" ry="14" fill="#120025" stroke="#c084fc" stroke-width="1.5"/>
  <!-- Hollow eyes -->
  <ellipse cx="14" cy="20" rx="5" ry="6" fill="#c084fc" opacity="0.15" filter="url(#g)"/>
  <ellipse cx="26" cy="20" rx="5" ry="6" fill="#c084fc" opacity="0.15" filter="url(#g)"/>
  <ellipse cx="14" cy="20" rx="4" ry="5" fill="#000010"/>
  <ellipse cx="26" cy="20" rx="4" ry="5" fill="#000010"/>
  <!-- Glowing eye cores -->
  <ellipse cx="14" cy="20" rx="2" ry="2.5" fill="#c084fc" filter="url(#g)"/>
  <ellipse cx="26" cy="20" rx="2" ry="2.5" fill="#c084fc" filter="url(#g)"/>
  <!-- Scream mouth -->
  <ellipse cx="20" cy="30" rx="5" ry="4" fill="#000010"/>
  <ellipse cx="20" cy="30" rx="3" ry="2.5" fill="#c084fc" opacity="0.1" filter="url(#g)"/>
  <!-- Phase shimmer lines -->
  <line x1="8" y1="35" x2="14" y2="35" stroke="#c084fc" stroke-width="1" opacity="0.4" stroke-dasharray="2,2"/>
  <line x1="26" y1="38" x2="34" y2="38" stroke="#c084fc" stroke-width="1" opacity="0.3" stroke-dasharray="2,2"/>
  <!-- Clawed hands -->
  <path d="M 6 35 Q 2 32 1 28 Q 3 26 4 30" stroke="#c084fc" stroke-width="1.5" fill="none" filter="url(#g)"/>
  <path d="M 34 35 Q 38 32 39 28 Q 37 26 36 30" stroke="#c084fc" stroke-width="1.5" fill="none" filter="url(#g)"/>
</svg>`;

export const bossTitanSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110">
  <defs><filter id="g"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Massive mech titan body -->
  <rect x="20" y="28" width="60" height="50" rx="6" fill="#110a00" stroke="#ff6b35" stroke-width="3"/>
  <!-- Armor plates -->
  <rect x="22" y="30" width="20" height="12" rx="2" fill="#cc4400" opacity="0.9"/>
  <rect x="58" y="30" width="20" height="12" rx="2" fill="#cc4400" opacity="0.9"/>
  <rect x="32" y="30" width="36" height="4" rx="1" fill="#ff8844" opacity="0.6"/>
  <!-- Reactor core huge -->
  <circle cx="50" cy="55" r="16" fill="#330a00" stroke="#ff6b35" stroke-width="2.5"/>
  <circle cx="50" cy="55" r="10" fill="#ff6b35" opacity="0.9" filter="url(#g)"/>
  <circle cx="50" cy="55" r="5" fill="#ffaa44" filter="url(#g)"/>
  <circle cx="50" cy="55" r="2" fill="#ffffff"/>
  <!-- Head cube -->
  <rect x="30" y="8" width="40" height="22" rx="4" fill="#110a00" stroke="#ff6b35" stroke-width="2.5"/>
  <!-- Optic visor -->
  <rect x="32" y="13" width="36" height="10" rx="3" fill="#ff6b35" opacity="1" filter="url(#g)"/>
  <circle cx="41" cy="18" r="5" fill="#ffcc44" filter="url(#g)"/>
  <circle cx="59" cy="18" r="5" fill="#ffcc44" filter="url(#g)"/>
  <!-- Horns -->
  <polygon points="34,8 30,0 38,8" fill="#cc4400" stroke="#ff6b35" stroke-width="1"/>
  <polygon points="66,8 70,0 62,8" fill="#cc4400" stroke="#ff6b35" stroke-width="1"/>
  <!-- Massive arms -->
  <rect x="0" y="28" width="24" height="38" rx="5" fill="#0a0500" stroke="#ff6b35" stroke-width="2.5"/>
  <rect x="76" y="28" width="24" height="38" rx="5" fill="#0a0500" stroke="#ff6b35" stroke-width="2.5"/>
  <!-- Cannons on arms -->
  <rect x="-14" y="38" width="18" height="14" rx="3" fill="#cc4400" stroke="#ff8844" stroke-width="2"/>
  <circle cx="-14" cy="45" r="5" fill="#ff6b35" opacity="1" filter="url(#g)"/>
  <rect x="96" y="38" width="18" height="14" rx="3" fill="#cc4400" stroke="#ff8844" stroke-width="2"/>
  <circle cx="114" cy="45" r="5" fill="#ff6b35" opacity="1" filter="url(#g)"/>
  <!-- Tank treads legs -->
  <rect x="20" y="76" width="26" height="24" rx="4" fill="#0a0500" stroke="#ff6b35" stroke-width="2"/>
  <rect x="54" y="76" width="26" height="24" rx="4" fill="#0a0500" stroke="#ff6b35" stroke-width="2"/>
  <rect x="18" y="94" width="30" height="10" rx="5" fill="#1a0a00" stroke="#ff6b35" stroke-width="2"/>
  <rect x="52" y="94" width="30" height="10" rx="5" fill="#1a0a00" stroke="#ff6b35" stroke-width="2"/>
  <!-- Damage sparks decoration -->
  <line x1="22" y1="70" x2="30" y2="76" stroke="#ffaa44" stroke-width="1.5" opacity="0.7"/>
  <line x1="70" y1="72" x2="78" y2="78" stroke="#ffaa44" stroke-width="1.5" opacity="0.7"/>
</svg>`;

export const bossQueenSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 120">
  <defs><filter id="g"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Alien mantis queen body -->
  <ellipse cx="55" cy="65" rx="26" ry="34" fill="#051505" stroke="#40ff80" stroke-width="2.5"/>
  <!-- Carapace segments -->
  <ellipse cx="55" cy="55" rx="22" ry="12" fill="#0a2010" stroke="#40ff80" stroke-width="1.5"/>
  <ellipse cx="55" cy="67" rx="20" ry="10" fill="#0a2010" stroke="#40ff80" stroke-width="1.5"/>
  <ellipse cx="55" cy="78" rx="17" ry="9" fill="#0a2010" stroke="#40ff80" stroke-width="1.5"/>
  <!-- Bio-luminescence -->
  <ellipse cx="55" cy="60" rx="10" ry="8" fill="#40ff80" opacity="0.3" filter="url(#g)"/>
  <ellipse cx="55" cy="72" rx="8" ry="6" fill="#40ff80" opacity="0.2" filter="url(#g)"/>
  <!-- Huge head -->
  <ellipse cx="55" cy="28" rx="28" ry="24" fill="#051505" stroke="#40ff80" stroke-width="2.5"/>
  <!-- Crown spikes -->
  <polygon points="30,15 26,2 34,14" fill="#40ff80" opacity="0.8"/>
  <polygon points="42,8 40,-4 47,8" fill="#40ff80" opacity="0.9"/>
  <polygon points="55,5 55,-8 60,5" fill="#40ff80" opacity="1"/>
  <polygon points="68,8 73,-4 70,8" fill="#40ff80" opacity="0.9"/>
  <polygon points="80,15 84,2 76,14" fill="#40ff80" opacity="0.8"/>
  <!-- Compound eyes giant -->
  <ellipse cx="38" cy="26" rx="12" ry="14" fill="#40ff80" opacity="0.9" filter="url(#g)"/>
  <ellipse cx="72" cy="26" rx="12" ry="14" fill="#40ff80" opacity="0.9" filter="url(#g)"/>
  <ellipse cx="38" cy="26" rx="9" ry="11" fill="#001808"/>
  <ellipse cx="72" cy="26" rx="9" ry="11" fill="#001808"/>
  <ellipse cx="38" cy="26" rx="4" ry="5" fill="#80ffb0" filter="url(#g)"/>
  <ellipse cx="72" cy="26" rx="4" ry="5" fill="#80ffb0" filter="url(#g)"/>
  <!-- Mandibles -->
  <path d="M 40 44 Q 28 52 24 60 Q 20 70 26 68" stroke="#40ff80" stroke-width="3" fill="none" filter="url(#g)"/>
  <path d="M 70 44 Q 82 52 86 60 Q 90 70 84 68" stroke="#40ff80" stroke-width="3" fill="none" filter="url(#g)"/>
  <!-- Scythe arms -->
  <path d="M 30 50 Q 10 44 4 30 Q 2 18 12 20 Q 20 22 22 32" stroke="#40ff80" stroke-width="5" fill="none" filter="url(#g)"/>
  <path d="M 80 50 Q 100 44 106 30 Q 108 18 98 20 Q 90 22 88 32" stroke="#40ff80" stroke-width="5" fill="none" filter="url(#g)"/>
  <!-- Tail stinger -->
  <path d="M 55 98 Q 50 110 45 115 Q 48 118 55 112 Q 62 118 65 115 Q 60 110 55 98 Z" fill="#40ff80" opacity="0.9" filter="url(#g)"/>
  <!-- Legs -->
  <line x1="36" y1="70" x2="16" y2="90" stroke="#40ff80" stroke-width="2.5"/>
  <line x1="44" y1="80" x2="24" y2="106" stroke="#40ff80" stroke-width="2.5"/>
  <line x1="66" y1="70" x2="86" y2="90" stroke="#40ff80" stroke-width="2.5"/>
  <line x1="74" y1="80" x2="94" y2="106" stroke="#40ff80" stroke-width="2.5"/>
</svg>`;

export const bossVoidSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <filter id="g"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gg"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <!-- Void singularity outer rings -->
  <circle cx="60" cy="60" r="55" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.3"/>
  <circle cx="60" cy="60" r="48" fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity="0.4"/>
  <circle cx="60" cy="60" r="40" fill="none" stroke="#c084fc" stroke-width="2" opacity="0.5"/>
  <circle cx="60" cy="60" r="32" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.7"/>
  <!-- Event horizon -->
  <circle cx="60" cy="60" r="26" fill="#000010" stroke="#c084fc" stroke-width="3" filter="url(#g)"/>
  <!-- Inner dark void -->
  <circle cx="60" cy="60" r="20" fill="#000000"/>
  <!-- Void face - ancient horrifying -->
  <circle cx="60" cy="60" r="18" fill="#050010"/>
  <!-- Eye sockets void -->
  <ellipse cx="48" cy="56" rx="7" ry="8" fill="#000000"/>
  <ellipse cx="72" cy="56" rx="7" ry="8" fill="#000000"/>
  <!-- Purple eye glow in sockets -->
  <ellipse cx="48" cy="56" rx="4" ry="5" fill="#c084fc" opacity="0.8" filter="url(#g)"/>
  <ellipse cx="72" cy="56" rx="4" ry="5" fill="#c084fc" opacity="0.8" filter="url(#g)"/>
  <!-- Scream void mouth -->
  <ellipse cx="60" cy="68" rx="9" ry="7" fill="#000000"/>
  <ellipse cx="60" cy="68" rx="5" ry="4" fill="#c084fc" opacity="0.2" filter="url(#gg)"/>
  <!-- Reality crack tendrils -->
  <path d="M 60 32 Q 50 20 40 10 Q 35 5 30 8" stroke="#c084fc" stroke-width="2" fill="none" filter="url(#g)" opacity="0.8"/>
  <path d="M 60 32 Q 70 20 80 10 Q 85 5 90 8" stroke="#c084fc" stroke-width="2" fill="none" filter="url(#g)" opacity="0.8"/>
  <path d="M 32 60 Q 20 50 10 40 Q 5 35 6 30" stroke="#8b5cf6" stroke-width="2" fill="none" filter="url(#g)" opacity="0.8"/>
  <path d="M 88 60 Q 100 50 110 40 Q 115 35 114 30" stroke="#8b5cf6" stroke-width="2" fill="none" filter="url(#g)" opacity="0.8"/>
  <path d="M 60 88 Q 50 100 40 110 Q 35 115 30 112" stroke="#c084fc" stroke-width="2" fill="none" filter="url(#g)" opacity="0.8"/>
  <path d="M 60 88 Q 70 100 80 110 Q 85 115 90 112" stroke="#c084fc" stroke-width="2" fill="none" filter="url(#g)" opacity="0.8"/>
  <!-- Gravitational distortion specks -->
  <circle cx="25" cy="35" r="2.5" fill="#c084fc" filter="url(#g)"/>
  <circle cx="95" cy="35" r="2.5" fill="#c084fc" filter="url(#g)"/>
  <circle cx="25" cy="85" r="2.5" fill="#8b5cf6" filter="url(#g)"/>
  <circle cx="95" cy="85" r="2.5" fill="#8b5cf6" filter="url(#g)"/>
  <circle cx="10" cy="60" r="3" fill="#c084fc" filter="url(#g)"/>
  <circle cx="110" cy="60" r="3" fill="#c084fc" filter="url(#g)"/>
</svg>`;
