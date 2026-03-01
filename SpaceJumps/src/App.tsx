import { useEffect, useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { HomeScreen } from './screens/HomeScreen';
import { CharacterSelectScreen } from './screens/CharacterSelectScreen';
import { WorldSelectScreen } from './screens/WorldSelectScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { MissionsScreen } from './screens/MissionsScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { preloadAllSprites } from './utils/spriteLoader';

function LoadingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-space-bg gap-4">
      <div className="font-syncopate text-space-cyan text-2xl font-bold animate-pulse-glow">SPACE JUMPS</div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-space-cyan animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <div className="font-mono text-space-muted text-xs">Loading universe...</div>
    </div>
  );
}

function AppContent() {
  const { screen, gameKey } = useGame();

  return (
    <div className="w-full h-full">
      {screen === 'home'             && <HomeScreen />}
      {screen === 'character-select' && <CharacterSelectScreen />}
      {screen === 'world-select'     && <WorldSelectScreen />}
      {screen === 'game'             && <GameScreen key={gameKey} />}
      {screen === 'results'          && <ResultsScreen />}
      {screen === 'shop'             && <ShopScreen />}
      {screen === 'missions'         && <MissionsScreen />}
      {screen === 'leaderboard'      && <LeaderboardScreen />}
      {screen === 'instructions'     && <InstructionsScreen />}
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    preloadAllSprites()
      .then(() => setLoaded(true))
      .catch(() => setLoaded(true)); // fail gracefully
  }, []);

  if (!loaded) return <LoadingScreen />;

  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
