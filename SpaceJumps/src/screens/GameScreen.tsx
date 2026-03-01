import { useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useGameEngine } from '../hooks/useGameEngine';
import { useTouchControls } from '../hooks/useTouchControls';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { GameCanvas } from '../components/GameCanvas';
import { HUD } from '../components/HUD';
import { CombatOverlay } from '../components/CombatOverlay';
import { PauseMenu } from '../components/PauseMenu';
import { MISSIONS } from '../data/missions';
import type { RunResult } from '../types';

export function GameScreen() {
  const { selectedCharacter, selectedWorld, setLastResult, goTo } = useGame();
  const audio = useAudioEngine();

  const character = selectedCharacter!;
  const world = selectedWorld!;

  const onRunEnd = useCallback((result: {
    score: number; coins: number; distance: number;
    killed: number; magicUsed: number; won: boolean;
  }) => {
    const completedMissions: string[] = [];
    const worldMissions = MISSIONS.filter(m => m.worldId === world.id);
    for (const mission of worldMissions) {
      const obj = mission.objective;
      let done = false;
      if (obj.type === 'collect-coins' && result.coins >= obj.count) done = true;
      if (obj.type === 'kill-enemies' && result.killed >= obj.count) done = true;
      if (obj.type === 'survive-distance' && result.distance >= obj.meters) done = true;
      if (obj.type === 'use-magic' && result.magicUsed >= obj.count) done = true;
      if (obj.type === 'kill-boss' && result.won) done = true;
      if (done) completedMissions.push(mission.id);
    }

    let bonusCoins = 0;
    for (const mId of completedMissions) {
      const m = MISSIONS.find(m => m.id === mId);
      if (m) bonusCoins += m.rewardCoins;
    }

    const stars: 1 | 2 | 3 =
      result.won ? 3 :
      result.score > 5000 ? 2 : 1;

    const runResult: RunResult = {
      worldId: world.id,
      characterId: character.id,
      score: result.score,
      coins: result.coins + bonusCoins,
      distanceMeters: result.distance,
      enemiesKilled: result.killed,
      missionsCompleted: completedMissions,
      stars,
    };

    setLastResult(runResult);
    if (result.won) audio.playVictory();
    else audio.playDeath();

    setTimeout(() => goTo('results'), 1200);
  }, [world, character, setLastResult, goTo, audio]);

  const engine = useGameEngine(character, world, onRunEnd);

  const wrappedJump    = useCallback(() => { engine.jump(); audio.playJump(); }, [engine, audio]);
  const wrappedAttack  = useCallback(() => { engine.attack(); audio.playAttack(); }, [engine, audio]);
  const wrappedMagic   = useCallback(() => { engine.castMagic(); audio.playMagic(character.colors.primary); }, [engine, audio, character]);
  const wrappedSlide   = useCallback(() => { engine.slide(); }, [engine]);
  const wrappedShieldStart = useCallback(() => { engine.shield(true); }, [engine]);
  const wrappedShieldEnd   = useCallback(() => { engine.shield(false); }, [engine]);
  const wrappedParry   = useCallback(() => { engine.parry(); }, [engine]);

  useTouchControls({
    onJump: wrappedJump,
    onSlide: wrappedSlide,
    onAttack: wrappedAttack,
    onMagic: wrappedMagic,
  });

  const handlePause  = useCallback(() => engine.pauseGame(), [engine]);
  const handleResume = useCallback(() => engine.resumeGame(), [engine]);
  const handleQuit   = useCallback(() => goTo('world-select'), [goTo]);

  const player = engine.playerRef.current;
  const magicBar = player?.magicBar ?? 0;
  const isShielding = player?.isShielding ?? false;
  const parryCooldownActive = (player?.parryCooldownMs ?? 0) > 0;
  const lastParrySuccessMs = player?.lastParrySuccessMs ?? 0;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <GameCanvas engine={engine} world={world} character={character} />

      {engine.phase !== 'paused' && (
        <HUD engine={engine} character={character} onPause={handlePause} />
      )}

      <CombatOverlay
        character={character}
        magicBar={magicBar}
        onAttack={wrappedAttack}
        onMagic={wrappedMagic}
        onShieldStart={wrappedShieldStart}
        onShieldEnd={wrappedShieldEnd}
        onParry={wrappedParry}
        phase={engine.phase}
        isShielding={isShielding}
        parryCooldownActive={parryCooldownActive}
        lastParrySuccessMs={lastParrySuccessMs}
      />

      {engine.phase === 'paused' && (
        <PauseMenu
          character={character}
          onResume={handleResume}
          onQuit={handleQuit}
          score={engine.score}
        />
      )}
    </div>
  );
}
