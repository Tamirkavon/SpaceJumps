import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type {
  Screen, CharacterConfig, WorldConfig, RunResult,
  PlayerProfile, SpaceJumpsContextType,
} from '../types';
import { CHARACTERS } from '../data/characters';
import { WORLDS } from '../data/worlds';

const STORAGE_KEY = 'spacejumps-profile-v1';

function loadProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PlayerProfile;
  } catch { /* ignore */ }
  return {
    totalCoins: 0,
    unlockedCharacterIds: ['zara'],
    unlockedWorldIds: ['nebula'],
    bestScores: {},
    completedMissionIds: [],
  };
}

function saveProfile(p: PlayerProfile) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

const GameContext = createContext<SpaceJumpsContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterConfig | null>(CHARACTERS[0]);
  const [selectedWorld, setSelectedWorld] = useState<WorldConfig | null>(WORLDS[0]);
  const [lastResult, setLastResultState] = useState<RunResult | null>(null);
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => { saveProfile(profile); }, [profile]);

  const goTo = useCallback((s: Screen) => setScreen(s), []);

  const selectCharacter = useCallback((c: CharacterConfig) => setSelectedCharacter(c), []);
  const selectWorld = useCallback((w: WorldConfig) => setSelectedWorld(w), []);

  const setLastResult = useCallback((r: RunResult) => {
    setLastResultState(r);
    setProfile(prev => {
      const updated = { ...prev };
      updated.totalCoins += r.coins;
      updated.bestScores = { ...prev.bestScores };
      if (!updated.bestScores[r.worldId] || r.score > updated.bestScores[r.worldId]) {
        updated.bestScores[r.worldId] = r.score;
      }
      r.missionsCompleted.forEach(id => {
        if (!updated.completedMissionIds.includes(id)) {
          updated.completedMissionIds = [...updated.completedMissionIds, id];
        }
      });
      return updated;
    });
  }, []);

  const spendCoins = useCallback((amount: number): boolean => {
    if (profile.totalCoins < amount) return false;
    setProfile(prev => ({ ...prev, totalCoins: prev.totalCoins - amount }));
    return true;
  }, [profile.totalCoins]);

  const earnCoins = useCallback((amount: number) => {
    setProfile(prev => ({ ...prev, totalCoins: prev.totalCoins + amount }));
  }, []);

  const unlockCharacter = useCallback((id: string) => {
    setProfile(prev => ({
      ...prev,
      unlockedCharacterIds: prev.unlockedCharacterIds.includes(id)
        ? prev.unlockedCharacterIds
        : [...prev.unlockedCharacterIds, id],
    }));
  }, []);

  const unlockWorld = useCallback((id: string) => {
    setProfile(prev => ({
      ...prev,
      unlockedWorldIds: prev.unlockedWorldIds.includes(id)
        ? prev.unlockedWorldIds
        : [...prev.unlockedWorldIds, id],
    }));
  }, []);

  const completeMission = useCallback((id: string) => {
    setProfile(prev => ({
      ...prev,
      completedMissionIds: prev.completedMissionIds.includes(id)
        ? prev.completedMissionIds
        : [...prev.completedMissionIds, id],
    }));
  }, []);

  const updateBestScore = useCallback((worldId: string, score: number) => {
    setProfile(prev => {
      if ((prev.bestScores[worldId] ?? 0) >= score) return prev;
      return { ...prev, bestScores: { ...prev.bestScores, [worldId]: score } };
    });
  }, []);

  const replay = useCallback(() => {
    setGameKey(k => k + 1);
    setScreen('game');
  }, []);

  return (
    <GameContext.Provider value={{
      screen, selectedCharacter, selectedWorld, lastResult, profile, gameKey,
      goTo, selectCharacter, selectWorld, setLastResult,
      spendCoins, earnCoins, unlockCharacter, unlockWorld,
      completeMission, updateBestScore, replay,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): SpaceJumpsContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
