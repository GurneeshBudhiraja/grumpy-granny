import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  // Add global click sound effect
  useClickSound();
  
  // Add global keyboard sound effect
  useKeyboardSound();

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden" 
         style={{ backgroundImage: 'url(/wall-background.png)' }}>
      {/* Scene content will go here */}
    </div>
  );
};