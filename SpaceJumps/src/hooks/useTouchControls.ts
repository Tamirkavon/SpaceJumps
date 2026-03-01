import { useEffect, useRef, useCallback } from 'react';

interface TouchActions {
  onJump: () => void;
  onSlide: () => void;
  onAttack: () => void;
  onMagic: () => void;
}

export function useTouchControls({ onJump, onSlide, onAttack, onMagic }: TouchActions) {
  const startRef = useRef<{ x: number; y: number; ts: number } | null>(null);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0];
    startRef.current = { x: t.clientX, y: t.clientY, ts: Date.now() };

    // Long press (400ms) triggers magic
    longPressRef.current = setTimeout(() => {
      onMagic();
      startRef.current = null; // consume
    }, 400);
  }, [onMagic]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    clearTimeout(longPressRef.current);
    const start = startRef.current;
    if (!start) return;
    startRef.current = null;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const elapsed = Date.now() - start.ts;

    const isSwipeUp   = dy < -35 && Math.abs(dx) < 70;
    const isSwipeDown = dy > 35  && Math.abs(dx) < 70;
    const isTap       = Math.abs(dx) < 20 && Math.abs(dy) < 20 && elapsed < 300;

    if (isSwipeDown) {
      onSlide();
    } else if (isSwipeUp || isTap) {
      onJump();
    } else if (dx > 50) {
      onAttack();
    }
  }, [onJump, onSlide, onAttack]);

  const handleTouchCancel = useCallback(() => {
    clearTimeout(longPressRef.current);
    startRef.current = null;
  }, []);

  useEffect(() => {
    const opts: AddEventListenerOptions = { passive: false };
    window.addEventListener('touchstart', handleTouchStart, opts);
    window.addEventListener('touchend',   handleTouchEnd,   opts);
    window.addEventListener('touchcancel', handleTouchCancel, opts);

    // Keyboard fallback (desktop testing)
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); onJump(); }
      if (e.code === 'ArrowDown' || e.code === 'ShiftLeft') { e.preventDefault(); onSlide(); }
      if (e.code === 'KeyZ' || e.code === 'KeyA') { onAttack(); }
      if (e.code === 'KeyX' || e.code === 'KeyS') { onMagic(); }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend',   handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleTouchStart, handleTouchEnd, handleTouchCancel, onJump, onSlide, onAttack, onMagic]);
}
