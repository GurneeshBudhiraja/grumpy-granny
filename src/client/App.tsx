import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  // Add global click sound effect
  useClickSound();
  
  // Add global keyboard sound effect
  useKeyboardSound();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-conic from-gray-800 via-gray-900 to-black">
      
      {/* Wall Background - Full Viewport Coverage */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/wall-background.png)' }}
      />
      
      {/* Computer Monitor - Bottom Center, Always Responsive */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-2 sm:px-4 pb-2 sm:pb-4">
        <div className="relative w-full flex justify-center">
          {/* Computer Monitor Image - Responsive */}
          <img 
            src="/computer-monitor.png" 
            alt="Vintage Computer Monitor"
            className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain drop-shadow-2xl"
            style={{ maxHeight: '80vh' }}
          />
        </div>
      </div>

      {/* Atmospheric Room Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
};