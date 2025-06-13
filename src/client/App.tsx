import { useState } from 'react';
import { useClickSound, useKeyboardSound } from './hooks/hooks';
import { StartPage, RulesPage, PlayPage } from './pages/page';
import { GrannySprite, CursorMenu, GrannyBehindScreen } from './components/components';
import { GameStatus, GrannyStatus } from '../shared/types';
import { cursorManager } from './utils/cursorManager';
import { AnimatePresence } from 'motion/react';
import './utils/cursorManager'; // Initialize cursor manager

export const App = () => {
  // Add global click sound effect
  useClickSound();

  // Add global keyboard sound effect
  useKeyboardSound();

  const [gameStatus, setGameStatus] = useState<GameStatus>('start');
  const [grannyStatus, setGrannyStatus] = useState<GrannyStatus>({
    state: 'blinking',
    words: '',
  });
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

        {/* Vintage CRT Monitor - Responsive positioning and sizing */}
        <div
          className={`absolute transform bottom-20 transition-all duration-500 ${
            gameStatus === 'start'
              ? 'left-1/2 -translate-x-1/2 z-10'
              : `z-10 ${
                  // Responsive positioning for rules page - much closer to center
                  'left-1/2 -translate-x-1/2 sm:left-1/2 sm:-translate-x-20 md:left-1/2 md:-translate-x-24 lg:left-1/2 lg:-translate-x-32 xl:left-[56%]'
                }`
          }`}
        >
          {/* Monitor Housing - Responsive sizing */}
          <div
            className={`bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-4 border-amber-200/70 relative ${
              gameStatus === 'start'
                ? 'w-[500px] h-[300px] md:w-[500px] md:h-[400px]'
                : `${
                    'w-[90vw] h-[280px] ' +
                    'sm:w-[60vw] sm:h-[50vh] ' +
                    'md:w-[62vw] md:h-[50vh] ' +
                    'lg:w-[50vw] lg:h-[52vh] ' +
                    'xl:w-[37vw] xl:h-[345px] '
                  }`
            }`}
          >
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
                        setGrannyStatus={setGrannyStatus}
                        grannyStatus={grannyStatus}
                      />
                    )}
                    {gameStatus === 'playing' && <PlayPage />}
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
            <div
              className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-xl shadow-lg border-2 border-amber-300 ${
                gameStatus === 'start'
                  ? 'w-24 h-12'
                  : `${
                      'w-14 h-7 ' +
                      'sm:w-16 sm:h-8 ' +
                      'md:w-18 md:h-9 ' +
                      'lg:w-20 lg:h-10 ' +
                      'xl:w-22 xl:h-11 ' +
                      '2xl:w-24 2xl:h-12'
                    }`
              }`}
            ></div>
            <div
              className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-amber-200 rounded-full shadow-lg border border-amber-300 ${
                gameStatus === 'start'
                  ? 'w-32 h-4'
                  : `${
                      'w-18 h-3 ' +
                      'sm:w-20 sm:h-3 ' +
                      'md:w-22 md:h-3 ' +
                      'lg:w-24 lg:h-3 ' +
                      'xl:w-28 xl:h-4 ' +
                      '2xl:w-32 2xl:h-4'
                    }`
              }`}
            ></div>
          </div>
        </div>

        {/* Granny Behind Screen - Only visible on rules page */}
        {gameStatus !== 'start' && (
          <GrannyBehindScreen grannyStatus={grannyStatus} setGrannyStatus={setGrannyStatus} />
        )}
      </div>

      {/* Cursor Selection Menu */}
      <CursorMenu onCursorChange={handleCursorChange} />
    </div>
  );
};
