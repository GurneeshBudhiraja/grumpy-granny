import { useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

export const useClickSound = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      soundManager.playClickSound();
    };

    // Add click listener to the document
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};