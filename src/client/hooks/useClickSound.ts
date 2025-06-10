import { useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

export const useClickSound = () => {
  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      // Initialize sounds on first interaction
      await soundManager.initializeSounds();
      await soundManager.playClickSound();
    };

    // Add click listener to the document
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};