import { useEffect, useState } from 'react';
import { GameStatus } from '../../shared/types';

interface UseGrannyAnimationProps {
  gameStatus: GameStatus;
}

interface GrannyAnimationState {
  isVisible: boolean;
  animationPhase: 'entering' | 'idle' | 'exiting' | 'hidden';
}

export const useGrannyAnimation = ({ gameStatus }: UseGrannyAnimationProps) => {
  const [animationState, setAnimationState] = useState<GrannyAnimationState>({
    isVisible: gameStatus === 'start',
    animationPhase: gameStatus === 'start' ? 'entering' : 'hidden',
  });

  useEffect(() => {
    if (gameStatus === 'start') {
      setAnimationState({
        isVisible: true,
        animationPhase: 'entering',
      });

      // After entrance animation completes, set to idle
      const enterTimer = setTimeout(() => {
        setAnimationState(prev => ({
          ...prev,
          animationPhase: 'idle',
        }));
      }, 1200); // Match the entrance animation duration

      return () => clearTimeout(enterTimer);
    } else {
      // Start exit animation
      setAnimationState(prev => ({
        ...prev,
        animationPhase: 'exiting',
      }));

      // After exit animation completes, hide completely
      const exitTimer = setTimeout(() => {
        setAnimationState({
          isVisible: false,
          animationPhase: 'hidden',
        });
      }, 800); // Match the exit animation duration

      return () => clearTimeout(exitTimer);
    }
  }, [gameStatus]);

  return animationState;
};