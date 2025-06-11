import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  // Add global click sound effect
  useClickSound();

  // Add global keyboard sound effect
  useKeyboardSound();

  return (
    <div className="h-screen w-full relative overflow-hidden flex justify-center items-center bg-black">
      {/* overlay filter */}
      <div
        className="absolute inset-0 z-50 opacity-20"
        style={{ backgroundImage: 'url(/overlay-filter.png)' }}
      />
      {/* Wall Background - Full Viewport Coverage */}
      <div
        className="bg-conic bg-center bg-no-repeat aspect-[5/3] min-h-[90%] max-w-4xl"
        style={{ backgroundImage: 'url(/wall-background.png)' }}
      ></div>
    </div>
  );
};
