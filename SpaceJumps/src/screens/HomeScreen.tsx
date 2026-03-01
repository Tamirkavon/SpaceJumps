import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

export function HomeScreen() {
  const { goTo, profile } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated star canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: { x: number; y: number; vy: number; r: number; alpha: number }[] = Array.from(
      { length: 120 }, () => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vy: 0.2 + Math.random() * 0.5,
        r: 0.5 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7,
      })
    );

    let raf = 0;
    function loop() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = '#ffffff';
      for (const s of stars) {
        s.y += s.vy;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        ctx!.globalAlpha = s.alpha;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,80,120,0.4) 0%, transparent 60%), linear-gradient(180deg, #0a0a1a 0%, #0a0a2a 100%)' }}>

      {/* Animated star bg */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-safe">

        {/* Header */}
        <div className="flex flex-col items-center pt-16 gap-2">
          {/* Coins badge */}
          <div className="flex items-center gap-2 bg-black/40 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-yellow-400">🪙</span>
            <span className="font-orbitron text-yellow-300 font-bold">{profile.totalCoins.toLocaleString()}</span>
            <span className="text-yellow-500/60 text-xs font-mono">COINS</span>
          </div>

          {/* Title */}
          <h1 className="font-syncopate font-bold text-center leading-tight"
            style={{ fontSize: 'clamp(32px, 10vw, 56px)', color: '#00f0ff', textShadow: '0 0 30px rgba(0,240,255,0.8), 0 0 60px rgba(0,240,255,0.4)' }}>
            SPACE
          </h1>
          <h1 className="font-syncopate font-bold text-center leading-tight"
            style={{ fontSize: 'clamp(32px, 10vw, 56px)', color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            JUMPS
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-space-muted text-sm text-center mt-2 tracking-widest">
            RUNNER · BRAWLER · ADVENTURE
          </p>

          {/* Animated planets */}
          <div className="relative w-64 h-32 mt-4">
            {/* Planet 1 */}
            <div className="absolute top-0 left-8 w-16 h-16 rounded-full animate-float"
              style={{ background: 'radial-gradient(circle at 35% 35%, #2040a0, #0a0a40)', boxShadow: '0 0 20px rgba(0,100,255,0.4)', animationDelay: '0s' }} />
            {/* Planet 2 - large */}
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full animate-float"
              style={{ background: 'radial-gradient(circle at 35% 35%, #c084fc, #4a1090)', boxShadow: '0 0 30px rgba(192,132,252,0.5)', animationDelay: '0.8s' }}>
              {/* Ring */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 rounded-full border-2 border-purple-400/40" style={{ transform: 'translateY(-50%) rotateX(75deg)' }} />
            </div>
            {/* Stars */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
                style={{ left: `${10 + i * 14}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.4}s`, opacity: 0.6 }} />
            ))}
          </div>
        </div>

        {/* Main actions */}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <button
            onPointerDown={() => goTo('character-select')}
            className="btn-primary w-full py-5 text-xl"
          >
            ▶ PLAY
          </button>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onPointerDown={() => goTo('shop')}
              className="btn-secondary py-3 text-sm flex items-center justify-center gap-1.5"
            >
              🛒 SHOP
            </button>
            <button
              onPointerDown={() => goTo('missions')}
              className="btn-secondary py-3 text-sm flex items-center justify-center gap-1.5"
            >
              📋 MISSIONS
            </button>
            <button
              onPointerDown={() => goTo('leaderboard')}
              className="btn-secondary py-3 text-sm flex items-center justify-center gap-1.5"
            >
              🏆 SCORES
            </button>
            <button
              onPointerDown={() => goTo('instructions')}
              className="btn-secondary py-3 text-sm flex items-center justify-center gap-1.5"
            >
              ❓ איך משחקים
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-6 text-center">
          <p className="text-space-muted text-xs font-mono">v1.0  •  SPACE JUMPS</p>
          <div className="flex items-center justify-center gap-3 mt-2">
            {profile.unlockedCharacterIds.includes('zara') && <span className="text-space-cyan text-lg">⚔</span>}
            {profile.unlockedCharacterIds.includes('krix') && <span className="text-orange-400 text-lg">👊</span>}
            {profile.unlockedCharacterIds.includes('lyra') && <span className="text-purple-400 text-lg">✨</span>}
            {profile.unlockedCharacterIds.includes('vorn') && <span className="text-green-400 text-lg">🐾</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
