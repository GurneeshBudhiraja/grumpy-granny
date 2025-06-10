import React, { useState, useEffect, useCallback } from 'react';
import { StartScreen } from './screens/StartScreen';
import { GameScreen } from './screens/GameScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { GameState, GameData, HintPair, GameResponse } from '../shared/types/granny';

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameData, setGameData] = useState<GameData>({
    currentRound: 0,
    grannyMood: 'calm',
    wrongAttempts: 0,
    showCaptcha: false,
    timeLeft: 30
  });
  const [hints, setHints] = useState<HintPair>({
    hint1: '',
    hint2: '',
    password: ''
  });
  const [reactionMessage, setReactionMessage] = useState('');
  const [showReaction, setShowReaction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGameState = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/game/state');
      const data: GameResponse = await response.json();
      
      if (data.status === 'success' && data.gameData && data.hints) {
        setGameData(data.gameData);
        setHints(data.hints);
      } else {
        console.error('Failed to fetch game state:', data.message);
      }
    } catch (error) {
      console.error('Error fetching game state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartGame = async () => {
    setGameState('playing');
    await fetchGameState();
  };

  const handleGuess = async (guess: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/game/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess }),
      });
      
      const data: GameResponse = await response.json();
      
      if (data.status === 'success' && data.gameData) {
        setGameData(data.gameData);
        
        if (data.hints) {
          setHints(data.hints);
        }
        
        if (data.message) {
          setReactionMessage(data.message);
          setShowReaction(true);
          
          // Hide reaction after 3 seconds
          setTimeout(() => {
            setShowReaction(false);
          }, 3000);
        }
        
        if (data.correct) {
          // Show success message briefly, then continue or go to success screen
          setTimeout(() => {
            if (data.gameData!.currentRound >= 8) { // Completed all rounds
              setGameState('success');
            }
          }, 2000);
        }
      } else {
        console.error('Failed to process guess:', data.message);
        setReactionMessage(data.message || 'Something went wrong!');
        setShowReaction(true);
        setTimeout(() => setShowReaction(false), 3000);
      }
    } catch (error) {
      console.error('Error processing guess:', error);
      setReactionMessage('Network error! Please try again.');
      setShowReaction(true);
      setTimeout(() => setShowReaction(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAgain = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/game/reset', {
        method: 'POST',
      });
      
      const data: GameResponse = await response.json();
      
      if (data.status === 'success' && data.gameData && data.hints) {
        setGameData(data.gameData);
        setHints(data.hints);
        setGameState('playing');
        setReactionMessage('');
        setShowReaction(false);
      } else {
        console.error('Failed to reset game:', data.message);
      }
    } catch (error) {
      console.error('Error resetting game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    setGameState('success');
  };

  if (isLoading && gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 
                      flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👵</div>
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  switch (gameState) {
    case 'start':
      return <StartScreen onStartGame={handleStartGame} />;
    
    case 'playing':
      return (
        <GameScreen
          gameData={gameData}
          hints={hints}
          onGuess={handleGuess}
          onSuccess={handleSuccess}
          reactionMessage={reactionMessage}
          showReaction={showReaction}
        />
      );
    
    case 'success':
      return (
        <SuccessScreen
          onPlayAgain={handlePlayAgain}
          roundsCompleted={gameData.currentRound}
        />
      );
    
    default:
      return <StartScreen onStartGame={handleStartGame} />;
  }
};