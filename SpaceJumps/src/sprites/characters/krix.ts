// KRIX — Rocket Brawler (orange mechanical fists)
export const krixSprites = {
  idle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <!-- Stocky body -->
    <rect x="10" y="22" width="24" height="22" rx="4" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <!-- Chest plate -->
    <rect x="13" y="25" width="18" height="10" rx="3" fill="#cc4400" opacity="0.9"/>
    <rect x="17" y="27" width="10" height="6" rx="2" fill="#ff8844" opacity="0.7"/>
    <!-- Head - rounder/alien -->
    <ellipse cx="22" cy="14" rx="11" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <!-- Visor bar wide -->
    <rect x="13" y="10" width="18" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <!-- Teeth/grill -->
    <rect x="16" y="17" width="12" height="4" rx="1" fill="#0a0400"/>
    <line x1="19" y1="17" x2="19" y2="21" stroke="#ff6b35" stroke-width="1" opacity="0.6"/>
    <line x1="22" y1="17" x2="22" y2="21" stroke="#ff6b35" stroke-width="1" opacity="0.6"/>
    <line x1="25" y1="17" x2="25" y2="21" stroke="#ff6b35" stroke-width="1" opacity="0.6"/>
    <!-- Legs - thick -->
    <rect x="10" y="42" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5"/>
    <rect x="24" y="42" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5"/>
    <!-- Boots with rockets -->
    <rect x="9" y="52" width="12" height="5" rx="2" fill="#331100"/>
    <rect x="23" y="52" width="12" height="5" rx="2" fill="#331100"/>
    <!-- Rocket fist right -->
    <rect x="34" y="24" width="8" height="14" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2"/>
    <rect x="35" y="25" width="6" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <rect x="36" y="35" width="4" height="4" rx="1" fill="#cc4400"/>
    <!-- Rocket exhaust dots -->
    <circle cx="37" cy="38" r="1.5" fill="#ff8844" filter="url(#glow)"/>
    <circle cx="39" cy="38" r="1.5" fill="#ff8844" filter="url(#glow)"/>
    <!-- Arm right -->
    <rect x="33" y="26" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5"/>
    <!-- Rocket fist left -->
    <rect x="2" y="24" width="8" height="14" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2"/>
    <rect x="3" y="25" width="6" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <!-- Arm left -->
    <rect x="6" y="26" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5"/>
    <!-- Shoulder pads huge -->
    <ellipse cx="11" cy="25" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
    <ellipse cx="33" cy="25" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
  </svg>`,

  run1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="10" y="20" width="24" height="22" rx="4" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="13" y="23" width="18" height="10" rx="3" fill="#cc4400" opacity="0.9"/>
    <ellipse cx="22" cy="12" rx="11" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="13" y="8" width="18" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <!-- Running legs stride 1 -->
    <rect x="10" y="40" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5" transform="rotate(-20 15 40)"/>
    <rect x="24" y="40" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5" transform="rotate(15 29 40)"/>
    <!-- Pumping arms -->
    <rect x="32" y="22" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5" transform="rotate(-20 34 22)"/>
    <rect x="7" y="24" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5" transform="rotate(20 9 24)"/>
    <rect x="34" y="22" width="8" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2" transform="rotate(-20 38 22)"/>
    <rect x="2" y="26" width="8" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2" transform="rotate(20 6 26)"/>
    <ellipse cx="11" cy="23" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
    <ellipse cx="33" cy="23" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
  </svg>`,

  run2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="10" y="21" width="24" height="22" rx="4" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="13" y="24" width="18" height="10" rx="3" fill="#cc4400" opacity="0.9"/>
    <ellipse cx="22" cy="13" rx="11" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="13" y="9" width="18" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <rect x="10" y="40" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5" transform="rotate(15 15 40)"/>
    <rect x="24" y="40" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5" transform="rotate(-20 29 40)"/>
    <rect x="32" y="23" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5" transform="rotate(20 34 23)"/>
    <rect x="7" y="23" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5" transform="rotate(-20 9 23)"/>
    <rect x="34" y="23" width="8" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2" transform="rotate(20 38 23)"/>
    <rect x="2" y="25" width="8" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2" transform="rotate(-20 6 25)"/>
    <ellipse cx="11" cy="24" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
    <ellipse cx="33" cy="24" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
  </svg>`,

  jump: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="10" y="18" width="24" height="22" rx="4" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="13" y="21" width="18" height="10" rx="3" fill="#cc4400" opacity="0.9"/>
    <ellipse cx="22" cy="10" rx="11" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="13" y="6" width="18" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <!-- Tuck jump legs with rocket exhaust -->
    <rect x="10" y="38" width="10" height="10" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5" transform="rotate(-35 15 38)"/>
    <rect x="24" y="38" width="10" height="10" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5" transform="rotate(35 29 38)"/>
    <!-- Boot rocket flames -->
    <ellipse cx="12" cy="50" rx="5" ry="3" fill="#ff6b35" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="32" cy="50" rx="5" ry="3" fill="#ff6b35" opacity="0.8" filter="url(#glow)"/>
    <!-- Arms pumped up -->
    <rect x="33" y="18" width="8" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2" transform="rotate(-40 37 18)"/>
    <rect x="3" y="18" width="8" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2" transform="rotate(40 7 18)"/>
    <ellipse cx="11" cy="21" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
    <ellipse cx="33" cy="21" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
  </svg>`,

  slide: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <ellipse cx="28" cy="15" rx="20" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="12" y="9" width="18" height="10" rx="3" fill="#cc4400" opacity="0.8"/>
    <ellipse cx="12" cy="15" rx="11" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="5" y="10" width="16" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <ellipse cx="42" cy="19" rx="10" ry="6" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5"/>
    <!-- Fist forward -->
    <rect x="42" y="8" width="14" height="12" rx="3" fill="#331100" stroke="#ff6b35" stroke-width="2"/>
    <rect x="43" y="9" width="10" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <!-- Speed lines -->
    <line x1="0" y1="8" x2="10" y2="8" stroke="#ff6b35" stroke-width="1.5" opacity="0.5"/>
    <line x1="0" y1="14" x2="14" y2="14" stroke="#ff6b35" stroke-width="1.5" opacity="0.4"/>
    <line x1="0" y1="20" x2="8" y2="20" stroke="#ff6b35" stroke-width="1.5" opacity="0.5"/>
  </svg>`,

  attack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 60">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="8" y="22" width="24" height="22" rx="4" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="11" y="25" width="18" height="10" rx="3" fill="#cc4400" opacity="0.9"/>
    <ellipse cx="20" cy="14" rx="11" ry="11" fill="#1a0800" stroke="#ff6b35" stroke-width="2"/>
    <rect x="11" y="10" width="18" height="6" rx="2" fill="#ff6b35" opacity="0.9" filter="url(#glow)"/>
    <rect x="8" y="42" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5"/>
    <rect x="22" y="42" width="10" height="13" rx="3" fill="#0a0400" stroke="#ff6b35" stroke-width="1.5"/>
    <!-- Rocket punch extended -->
    <rect x="30" y="22" width="5" height="8" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5"/>
    <rect x="35" y="18" width="16" height="16" rx="4" fill="#331100" stroke="#ff6b35" stroke-width="2.5"/>
    <rect x="36" y="19" width="12" height="8" rx="3" fill="#ff6b35" opacity="1" filter="url(#glow)"/>
    <!-- Rocket flame from fist -->
    <ellipse cx="35" cy="26" rx="6" ry="4" fill="#ff8844" filter="url(#glow)" opacity="0.9"/>
    <ellipse cx="33" cy="26" rx="4" ry="3" fill="#ffcc44" filter="url(#glow)" opacity="0.7"/>
    <!-- Impact shockwave -->
    <circle cx="51" cy="26" r="10" fill="rgba(255,107,53,0.2)" filter="url(#glow)"/>
    <circle cx="51" cy="26" r="5" fill="rgba(255,107,53,0.4)" filter="url(#glow)"/>
    <rect x="5" y="26" width="5" height="10" rx="2" fill="#1a0800" stroke="#ff6b35" stroke-width="1.5"/>
    <ellipse cx="9" cy="25" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
    <ellipse cx="31" cy="25" rx="7" ry="5" fill="#331100" stroke="#ff6b35" stroke-width="1.5"/>
  </svg>`,
};
