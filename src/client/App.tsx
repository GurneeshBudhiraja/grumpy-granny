import { useState } from 'react';
import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';
import { StartPage, RulesPage } from './pages/page';
import { GrannySprite, CursorMenu, GrannyBehindScreen } from './components/components';
import { GameStatus } from '../shared/types';
import { cursorManager } from './utils/cursorManager';
import { AnimatePresence } from 'motion/react';
import './utils/cursorManager'; // Initialize cursor manager

export const App = () => {
  // Add global click sound effect
  useClickSound();

  // Add global keyboard sound effect
  useKeyboardSound();

  const [gameStatus, setGameStatus] = useState<GameStatus>('start');

  const handleCursorChange = (cursorType: 'windows' | 'granny') => {
    cursorManager.setCursorType(cursorType);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden flex justify-center items-center bg-black">
      {/* Wall Background Container */}
      <div className="relative">
        {/* Wall Background - Full Viewport Coverage */}
        <div
          className="bg-conic bg-center bg-no-repeat aspect-[5/3] min-h-[90vh] max-w-6xl"
          style={{ backgroundImage: 'url(/wall-background.png)' }}
        >
          {/* Table at bottom of wall - wider to support larger monitor */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5/6 h-20 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-lg shadow-2xl z-10">
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

        {/* Vintage CRT Monitor - Positioned based on game status */}
        <div
          className={`absolute transform bottom-20 transition-all duration-500 ${
            gameStatus === 'start' 
              ? 'left-1/2 -translate-x-1/2 z-10' 
              : 'right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 z-10'
          }`}
        >
          {/* Monitor Housing - Vintage beige/cream color */}
          <div className={`bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-4 border-amber-200/70 relative ${
            gameStatus === 'start' 
              ? 'w-[500px] h-[300px] md:w-[500px] md:h-[400px]' 
              : 'w-[320px] h-[240px] sm:w-[380px] sm:h-[280px] md:w-[420px] md:h-[320px] lg:w-[460px] lg:h-[360px] xl:w-[500px] xl:h-[400px]'
          }`}>
            {/* Vintage monitor texture */}
            <div className="absolute inset-0 bg-[#EDE3CD] rounded-2xl opacity-80"></div>

            {/* Monitor Bezel - Thick vintage style */}
            <div className="absolute top-0 left-0 bottom-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-inner border-2 border-gray-700 h-full w-full pointer-events-none">
              {/* Inner bezel */}
              <div className="w-full h-full p-2 bg-black rounded-lg">
                {/* CRT Screen with deep curve */}
                <div className="w-full h-full bg-desktop-bg/90 rounded-lg shadow-inner border-2 border-gray-900 relative overflow-hidden pointer-events-auto">
                  {/* CRT Screen curvature and reflection effects */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 rounded-lg pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent opacity-5 rounded-t-lg pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-white to-transparent opacity-3 rounded-l-lg pointer-events-none"></div>

                  {/* Page Content with AnimatePresence for smooth transitions */}
                  <AnimatePresence mode="wait">
                    {gameStatus === 'start' && (
                      <StartPage
                        key="start"
                        setGameStatus={setGameStatus}
                        gameStatus={gameStatus}
                      />
                    )}
                    {gameStatus === 'rules' && (
                      <RulesPage
                        key="rules"
                        setGameStatus={setGameStatus}
                        gameStatus={gameStatus}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Granny Half Portrait - Only visible on start page */}
            {gameStatus === 'start' && <GrannySprite gameStatus={gameStatus} />}

            {/* Control buttons and vents */}
            <div className="absolute bottom-1 right-1 flex space-x-2">
              <div className="w-2 h-2 bg-button-highlight rounded-full" />
            </div>

            {/* Monitor stand - responsive sizing */}
            <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-xl shadow-lg border-2 border-amber-300 ${
              gameStatus === 'start' 
                ? 'w-24 h-12' 
                : 'w-16 h-8 sm:w-18 sm:h-9 md:w-20 md:h-10 lg:w-22 lg:h-11 xl:w-24 xl:h-12'
            }`}></div>
            <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-amber-200 rounded-full shadow-lg border border-amber-300 ${
              gameStatus === 'start' 
                ? 'w-32 h-4' 
                : 'w-20 h-3 sm:w-22 sm:h-3 md:w-24 md:h-3 lg:w-28 lg:h-4 xl:w-32 xl:h-4'
            }`}></div>
          </div>
        </div>

        {/* Granny Behind Screen - Only visible on rules page */}
        <GrannyBehindScreen gameStatus={gameStatus} />
      </div>

      {/* Cursor Selection Menu */}
      <CursorMenu onCursorChange={handleCursorChange} />
    </div>
  );
};