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
        className="absolute -bottom-[108px] left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-auto aspect-[4/3] bg-contain bg-no-repeat bg-center z-20"
        style={{
          backgroundImage: "url('/computer-monitor.png')",
        }}
      >
        {/* Monitor Screen Overlay - Positioned inside the monitor frame with reduced opacity */}
        <div
          className="absolute inset-0 bg-conic bg-no-repeat bg-center opacity-40"
          style={{
            backgroundImage: "url('/monitor-screen.png')",
          }}
        />
      </div>
    </div>
  );
};