import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  // Add global click sound effect
  useClickSound();
  
  // Add global keyboard sound effect
  useKeyboardSound();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      
      {/* Wall Background - Full Screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/wall-background.png)' }}
      />
      
      {/* Computer Monitor - Bottom Center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 pb-4">
        <div className="relative w-full">
          {/* Computer Image - Responsive */}
          <img 
            src="/computer.png" 
            alt="Vintage Computer Monitor"
            className="w-full h-auto object-contain drop-shadow-2xl max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh]"
          />
          
          {/* Monitor Screen Glow Effect */}
          <div className="absolute top-[12%] left-1/2 transform -translate-x-1/2 w-[42%] h-[32%] bg-blue-400/30 blur-lg rounded-sm animate-pulse"></div>
          
          {/* Screen Content Area - This is where game content will go */}
          <div className="absolute top-[12%] left-1/2 transform -translate-x-1/2 w-[42%] h-[32%] bg-black/80 rounded-sm border border-gray-600/50">
            {/* Placeholder for screen content */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-green-400 text-xs sm:text-sm font-mono animate-pulse">
                SYSTEM READY_
              </div>
            </div>
          </div>
          
          {/* Subtle Computer Hum Animation */}
          <div className="absolute inset-0 animate-pulse opacity-20">
            <div className="w-full h-full bg-gradient-to-t from-transparent via-blue-900/10 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Atmospheric Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none"></div>
      
      {/* Subtle Room Lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none"></div>
    </div>
  );
};