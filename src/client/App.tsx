import { useEffect, useState } from 'react';
import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  const [breathing, setBreathing] = useState(false);
  
  // Add global click sound effect
  useClickSound();
  
  // Add global keyboard sound effect
  useKeyboardSound();

  useEffect(() => {
    setTimeout(() => {
      setBreathing(!breathing);
    }, 500);
  });

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