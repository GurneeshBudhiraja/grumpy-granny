import { useEffect, useState } from 'react';
import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';
import { soundManager } from './utils/soundManager';

export const App = () => {
  const [breathing, setBreathing] = useState(false);
  
  // Add global click sound effect
  useClickSound();
  
  // Add global keyboard sound effect
  useKeyboardSound();

  useEffect(() => {
    // Preload sounds on first user interaction
    const handleFirstInteraction = () => {
      soundManager.preloadSounds();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    const breathingTimer = setTimeout(() => {
      setBreathing(!breathing);
    }, 500);

    return () => {
      clearTimeout(breathingTimer);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [breathing]);

  return (
    <div className=''>
      Hello
      {breathing ? (
        <img src="./granny-idle.png" className="w-64 h-64 object-contain contrast-115 brightness-90 sepia-10 grayscale-15 drop-shadow" />
      ) : (
        <img src="./granny-blink.png" className="w-64 h-64 object-contain contrast-115 brightness-90 sepia-10 grayscale-15 drop-shadow" />
      )}
    </div>
  );
};