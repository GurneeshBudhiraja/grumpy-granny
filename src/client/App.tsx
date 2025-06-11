import { useState } from 'react';
import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';
import { StartPage } from './pages/page';

export const App = () => {
  // Add global click sound effect
  useClickSound();

  // Add global keyboard sound effect
  useKeyboardSound();

  const [gameStatus, setGameStatus] = useState<string>('start');

  return (
    <div className="h-screen w-full relative overflow-hidden flex justify-center items-center bg-black">
      <div
        className={`inset-0 absolute bg-zinc-600 transition-all ease-linear duration-150 ${gameStatus === 'start' ? 'opacity-20 z-40' : 'opacity-0 z-0'}`}
      />
      {/* Wall Background Container */}
      <div className="relative">
        {/* Wall Background - Full Viewport Coverage */}
        <div
          className="bg-conic bg-center bg-no-repeat aspect-[5/3] min-h-[90vh] max-w-6xl"
          style={{ backgroundImage: 'url(/wall-background.png)' }}
        >
          {/* Table at bottom of wall - wider to support larger monitor */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5/6 h-20 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-lg shadow-2xl">
            {/* Table surface with wood grain effect */}
            <div className="w-full h-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-lg border-t-2 border-amber-600">
              {/* Table edge highlight */}
              <div className="w-full h-1 bg-amber-600 rounded-t-lg"></div>
              {/* Wood grain lines */}
              <div className="absolute top-2 left-0 w-full h-px bg-amber-600 opacity-30"></div>
              <div className="absolute top-4 left-0 w-full h-px bg-amber-600 opacity-20"></div>
            </div>
            {/* Table legs - more of them for wider table */}
            <div className="absolute -bottom-10 left-8 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
            <div className="absolute -bottom-10 left-1/4 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
            <div className="absolute -bottom-10 right-1/4 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
            <div className="absolute -bottom-10 right-8 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
          </div>
        </div>

        {/* Vintage CRT Monitor - Much Wider and Taller */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          {/* Monitor Housing - Vintage beige/cream color */}
          <div className="w-[500px] h-[300px] md:w-[600px] md:h-[400px] bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-4 border-amber-200/70 relative">
            {/* Vintage monitor texture */}
            <div className="absolute inset-0 bg-[#EDE3CD] rounded-2xl opacity-80"></div>

            {/* Monitor Bezel - Thick vintage style */}
            <div className="absolute top-0 left-0 bottom-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-inner border-2 border-gray-700 h-full w-full">
              {/* Inner bezel */}
              <div className="w-full h-full p-2 bg-black rounded-lg">
                {/* CRT Screen with deep curve */}
                <div className="w-full h-full bg-desktop-bg/90 rounded-lg shadow-inner border-2 border-gray-900 relative overflow-hidden">
                  {/* CRT Screen curvature and reflection effects */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent opacity-5 rounded-t-lg"></div>
                  <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-white to-transparent opacity-3 rounded-l-lg"></div>
                  <StartPage gameStatus={gameStatus} setGameStatus={setGameStatus} />
                </div>
              </div>
            </div>

            {/* Granny Half Portrait - Positioned at the very top edge of monitor */}
            {gameStatus === 'start' && (
              <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 left-1/2 transform -translate-x-1/2 z-30">
                <img
                  src="/granny-half-potrait.png"
                  alt="Grumpy Granny"
                  className="w-[8rem] sm:w-[10rem] md:w-[12rem] lg:w-[15rem] h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5))',
                  }}
                />
              </div>
            )}

            {/* Control buttons and vents */}
            <div className="absolute bottom-1 right-1 flex space-x-2">
              <div className="w-2 h-2 bg-button-highlight rounded-full" />
            </div>

            {/* Monitor stand - more robust for larger monitor */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-xl shadow-lg border-2 border-amber-300"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-amber-200 rounded-full shadow-lg border border-amber-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};