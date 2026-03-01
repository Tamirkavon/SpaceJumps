export const asteroidSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <defs><filter id="s"><feGaussianBlur stdDeviation="1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <polygon points="25,2 38,8 46,20 44,34 34,44 20,46 8,38 4,24 10,10" fill="#2a1a0a" stroke="#6b4c2a" stroke-width="2"/>
  <!-- Rock texture -->
  <polygon points="25,6 36,11 40,22 37,33 28,40 17,40 9,32 7,20 14,11" fill="#1a1008" opacity="0.5"/>
  <!-- Craters -->
  <circle cx="20" cy="18" r="4" fill="#150d04" stroke="#4a3010" stroke-width="1"/>
  <circle cx="32" cy="28" r="3" fill="#150d04" stroke="#4a3010" stroke-width="1"/>
  <circle cx="16" cy="34" r="2.5" fill="#150d04" stroke="#4a3010" stroke-width="1"/>
  <!-- Highlight -->
  <polygon points="16,8 26,5 34,12 30,14 22,11 16,8" fill="#4a3818" opacity="0.5"/>
  <!-- Shadow -->
  <ellipse cx="26" cy="50" rx="15" ry="4" fill="rgba(0,0,0,0.3)"/>
</svg>`;

export const debrisSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30">
  <polygon points="8,2 28,0 38,8 36,18 24,28 6,26 2,14" fill="#1a1410" stroke="#4a3828" stroke-width="1.5"/>
  <polygon points="12,4 24,2 32,10 28,20 16,24 6,18 6,10" fill="#0f0d08" opacity="0.5"/>
  <circle cx="18" cy="14" r="3" fill="#0a0804" stroke="#3a2818" stroke-width="1"/>
  <circle cx="28" cy="10" r="2" fill="#0a0804" stroke="#3a2818" stroke-width="1"/>
  <!-- Metal glint -->
  <line x1="10" y1="5" x2="18" y2="3" stroke="#6a5838" stroke-width="1" opacity="0.6"/>
</svg>`;

export const spikeWallSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 60">
  <defs><filter id="g"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Wall base -->
  <rect x="5" y="10" width="20" height="50" rx="2" fill="#1a0010" stroke="#ff1040" stroke-width="1.5"/>
  <!-- Energy field -->
  <rect x="7" y="12" width="16" height="46" rx="1" fill="#ff1040" opacity="0.15"/>
  <!-- Spikes top -->
  <polygon points="8,10 15,0 22,10" fill="#ff1040" filter="url(#g)"/>
  <polygon points="3,14 10,4 14,14" fill="#cc0030" opacity="0.7"/>
  <polygon points="16,14 20,4 27,14" fill="#cc0030" opacity="0.7"/>
  <!-- Energy lines -->
  <line x1="15" y1="12" x2="15" y2="58" stroke="#ff1040" stroke-width="1" opacity="0.5" stroke-dasharray="4,4"/>
  <!-- Warning glow -->
  <rect x="5" y="10" width="20" height="50" rx="2" fill="none" stroke="#ff1040" stroke-width="2" opacity="0.5" filter="url(#g)"/>
</svg>`;

export const laserHSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 20">
  <defs><filter id="g"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Laser emitter left -->
  <rect x="0" y="4" width="16" height="12" rx="2" fill="#1a0010" stroke="#ff2060" stroke-width="1.5"/>
  <circle cx="14" cy="10" r="4" fill="#ff2060" filter="url(#g)"/>
  <!-- Laser beam -->
  <rect x="16" y="8" width="168" height="4" fill="#ff2060" opacity="0.9" filter="url(#g)"/>
  <rect x="16" y="9" width="168" height="2" fill="#ffaacc" opacity="0.8"/>
  <!-- Laser emitter right -->
  <rect x="184" y="4" width="16" height="12" rx="2" fill="#1a0010" stroke="#ff2060" stroke-width="1.5"/>
  <circle cx="186" cy="10" r="4" fill="#ff2060" filter="url(#g)"/>
</svg>`;

export const laserVSprite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 160">
  <defs><filter id="g"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <!-- Emitter top -->
  <rect x="4" y="0" width="12" height="16" rx="2" fill="#1a0010" stroke="#ff2060" stroke-width="1.5"/>
  <circle cx="10" cy="14" r="4" fill="#ff2060" filter="url(#g)"/>
  <!-- Laser beam -->
  <rect x="8" y="16" width="4" height="128" fill="#ff2060" opacity="0.9" filter="url(#g)"/>
  <rect x="9" y="16" width="2" height="128" fill="#ffaacc" opacity="0.8"/>
  <!-- Emitter bottom -->
  <rect x="4" y="144" width="12" height="16" rx="2" fill="#1a0010" stroke="#ff2060" stroke-width="1.5"/>
  <circle cx="10" cy="146" r="4" fill="#ff2060" filter="url(#g)"/>
</svg>`;
