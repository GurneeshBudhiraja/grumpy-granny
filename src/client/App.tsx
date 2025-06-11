import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  // Add global click sound effect
  useClickSound();

  // Add global keyboard sound effect
  useKeyboardSound();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Wall Background - Full Viewport Coverage */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/wall-background.png)' }}
      />

      {/* Computer Monitor - Bottom Center, Always Responsive */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-auto aspect-[4/3] bg-contain bg-no-repeat bg-center z-20"
        style={{
          backgroundImage: "url('/computer-monitor.png')",
        }}
      >
        {/* Monitor Screen Overlay - Positioned inside the monitor frame */}
        <div
          className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-80 z-30"
          style={{
            backgroundImage: "url('/monitor-screen.png')",
            top: '15%',
            left: '15%',
            right: '15%',
            bottom: '25%',
          }}
        >
          

            
            {/* Main Content Area - Ready for game content */}
            <div className="absolute inset-4 bottom-12 bg-window-bg border-2 border-button-shadow border-t-button-highlight border-l-button-highlight rounded-none">
              {/* Window Title Bar */}
              <div className="h-6 bg-titlebar-active-bg flex items-center justify-between px-2">
                <span className="text-titlebar-active-text text-xs font-windows">Grumpy Granny Game</span>
                <div className="flex gap-1">
                  <button className="w-4 h-4 bg-button-face border border-button-shadow text-xs">_</button>
                  <button className="w-4 h-4 bg-button-face border border-button-shadow text-xs">□</button>
                  <button className="w-4 h-4 bg-button-face border border-button-shadow text-xs">×</button>
                </div>
              </div>
              
              {/* Window Content Area */}
              <div className="p-4 h-full bg-window-bg">
                <div className="text-center text-button-text font-windows">
                  <h1 className="text-lg mb-4">Welcome to Grumpy Granny</h1>
                  <p className="text-sm">Game content will go here...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};