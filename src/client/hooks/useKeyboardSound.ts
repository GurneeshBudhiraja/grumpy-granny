import { useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

export const useKeyboardSound = () => {
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // Only play sound for actual typing keys, not modifier keys
      if (!event.ctrlKey && !event.altKey && !event.metaKey &&
        (event.key.length === 1 ||
          ['Backspace', 'Delete', 'Enter', 'Space', 'Tab'].includes(event.key))) {

        // Initialize sounds on first interaction
        await soundManager.initializeSounds();
        await soundManager.playKeyboardSound();
      }
    };

    // Add keydown listener to the document
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};