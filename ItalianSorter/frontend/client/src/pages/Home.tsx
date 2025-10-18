import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import WelcomeScreen from "@/components/WelcomeScreen";
import CountdownScreen from "@/components/CountdownScreen";
import GameScreen from "@/components/GameScreen";
import Leaderboard from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import type { Player } from "@shared/schema";

type GameState = 'welcome' | 'countdown' | 'playing' | 'leaderboard';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [gameResults, setGameResults] = useState<{ operations: number; time: number } | null>(null);

  const { data: players = [], refetch } = useQuery<Player[]>({
    queryKey: ['/api/ranking-data'],
    refetchInterval: gameState === 'leaderboard' ? 3000 : false,
  });

  const submitMutation = useMutation({
    mutationFn: async (data: { name: string; operations: number; time: number }) => {
      const response = await apiRequest('POST', '/api/submit', data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ranking-data'] });
      setTimeout(() => {
        setGameState('leaderboard');
      }, 1500);
    },
    onError: (error: any) => {
      console.error('Submission error:', error);
      const errorMsg = error.message?.includes('già stato utilizzato') 
        ? 'Questo nome è già stato utilizzato. Scegli un altro nome.'
        : 'Errore durante il salvataggio. Riprova.';
      setErrorMessage(errorMsg);
      setGameState('welcome');
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleStart = (name: string) => {
    if (players.some(p => p.name === name)) {
      setErrorMessage('Questo nome è già stato utilizzato. Scegli un altro nome.');
      return;
    }
    setPlayerName(name);
    setErrorMessage('');
    setGameState('countdown');
  };

  const handleCountdownComplete = () => {
    setGameState('playing');
  };

  const handleGameComplete = (operations: number, time: number) => {
    setGameResults({ operations, time });
    submitMutation.mutate({
      name: playerName,
      operations,
      time,
    });
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50"
        data-testid="button-theme-toggle"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      {gameState === 'welcome' && (
        <WelcomeScreen
          onStart={handleStart}
          errorMessage={errorMessage}
        />
      )}

      {gameState === 'countdown' && (
        <CountdownScreen onCountdownComplete={handleCountdownComplete} />
      )}

      {gameState === 'playing' && (
        <GameScreen
          playerName={playerName}
          onGameComplete={handleGameComplete}
        />
      )}

      {gameState === 'leaderboard' && (
        <Leaderboard
          players={players}
          currentPlayerName={playerName}
        />
      )}
    </div>
  );
}
