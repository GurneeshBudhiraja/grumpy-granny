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
        className="absolute inset-0 bg-conic bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/wall-background.png)' }}
      />

      {/* Computer Monitor - Bottom Center, Always Responsive */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 max-w-lg h-auto bg-contain bg-no-repeat bg-center z-20"
        style={{
          backgroundImage: "url('/computer-monitor.png')",
        }}
      ></div>
    </div>
  );
};
