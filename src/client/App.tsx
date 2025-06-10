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
      
      {/* Computer Scene */}
      <div className="">
        <div className="relative">
          {/* Computer Image */}
          <img 
            src="/computer.png" 
            alt="Vintage Computer"
            className="w-auto h-[60vh] max-w-[90vw] object-contain drop-shadow-2xl"
          />
          
          {/* Screen Glow Effect */}
          <div className="absolute top-[15%] left-[50%] transform -translate-x-1/2 w-[35%] h-[25%] bg-blue-400/20 blur-xl rounded-lg animate-pulse"></div>
          
          {/* Subtle Computer Hum Animation */}
          <div className="absolute inset-0 animate-pulse opacity-30">
            <div className="w-full h-full bg-gradient-to-t from-transparent via-blue-900/10 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Atmospheric Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>
      
      {/* Subtle Vignette Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
};