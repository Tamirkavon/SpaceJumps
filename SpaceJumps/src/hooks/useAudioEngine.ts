import { useRef, useCallback } from 'react';

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(
  frequency: number, type: OscillatorType,
  duration: number, volume: number,
  frequencyEnd?: number,
) {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    if (frequencyEnd !== undefined) {
      osc.frequency.linearRampToValueAtTime(frequencyEnd, ctx.currentTime + duration);
    }
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch { /* ignore audio errors */ }
}

function playNoise(duration: number, volume: number, color: 'white' | 'pink' = 'white') {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (color === 'pink' ? Math.pow(i / bufferSize, 0.3) : 1);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    source.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.start();
  } catch { /* ignore */ }
}

export function useAudioEngine() {
  const enabledRef = useRef(true);

  const playJump = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(300, 'sine', 0.2, 0.3, 600);
  }, []);

  const playAttack = useCallback(() => {
    if (!enabledRef.current) return;
    playNoise(0.08, 0.4);
    playTone(180, 'sawtooth', 0.05, 0.2);
  }, []);

  const playHit = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(120, 'square', 0.15, 0.25, 80);
    playNoise(0.1, 0.2);
  }, []);

  const playMagic = useCallback((color: string) => {
    if (!enabledRef.current) return;
    void color;
    const freqs = [440, 554, 659, 880];
    freqs.forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.4, 0.15), i * 60);
    });
  }, []);

  const playCoin = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(880, 'sine', 0.1, 0.2);
    setTimeout(() => playTone(1320, 'sine', 0.1, 0.15), 80);
  }, []);

  const playDeath = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(300, 'sawtooth', 0.6, 0.3, 60);
    setTimeout(() => playNoise(0.3, 0.2), 200);
  }, []);

  const playBossRoar = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(80, 'sawtooth', 0.8, 0.4, 40);
    setTimeout(() => playNoise(0.4, 0.3, 'pink'), 100);
  }, []);

  const playVictory = useCallback(() => {
    if (!enabledRef.current) return;
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.3, 0.2), i * 150);
    });
  }, []);

  const initAudio = useCallback(() => {
    try { getAudioCtx(); } catch { /* ignore */ }
  }, []);

  return { playJump, playAttack, playHit, playMagic, playCoin, playDeath, playBossRoar, playVictory, initAudio, enabledRef };
}
