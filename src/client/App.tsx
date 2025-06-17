import { useState } from 'react';
import { useClickSound, useFakeCursor, useKeyboardSound } from './hooks/hooks';
import { StartPage, RulesPage, PlayPage, WinPage, LeaderBoardPage } from './pages/page';
import { GrannySprite, CursorMenu, GrannyBehindScreen, WallShelf } from './components/components';
import { GameStatus, GrannyStatus } from '../shared/types';
import { AnimatePresence } from 'motion/react';

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

  const [showIdCard, setShowIdCard] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [completionTime, setCompletionTime] = useState<string>('');

  const { setCursorType, CursorImg } = useFakeCursor();

  // Handle win condition
  const handleWin = (time: string) => {
    setCompletionTime(time);
    setGameStatus('win');
  };

  return (
    <div className="h-screen w-full relative overflow-hidden flex justify-center items-center bg-black">
      {/* Bolt badge on the start */}
      {gameStatus === 'start' && (
        <div
          className="fixed top-4 right-4 z-50"
          onClick={() => {
            console.log('Navigating');
            window.parent.postMessage(
              {
                type: 'navigate',
                data: { url: 'https://bolt.new/' },
              },
              '*'
            );
          }}
        >
          <a
            href="https://bolt.new/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 hover:shadow-2xl"
          >
            <img
              src="/bolt-badge/white-badge.png"
              alt="Built with Bolt.new badge"
              className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg  "
            />
          </a>
        </div>
      )}

      {/* Wall Background Container */}
      <div className="relative">
        {/* Wall Background - Full Viewport Coverage */}
        <div
          className="bg-conic bg-center bg-no-repeat aspect-[5/3] min-h-[90vh] max-w-6xl"
          style={{ backgroundImage: 'url(/wall-background.png)' }}
        >
          {/* Wall Shelf - Only visible during playing state */}
          {gameStatus === 'playing' && (
            <WallShelf
              onIdClick={() => setShowIdCard(true)}
              onDocumentClick={() => setShowDocument(true)}
            />
          )}

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
              : `z-10 ${'left-1/2 -translate-x-1/2 sm:left-1/2 sm:-translate-x-20 md:left-1/2 md:-translate-x-24 lg:left-1/2 lg:-translate-x-32 xl:left-[56%]'}`
          }`}
        >
          {/* Monitor Housing - Responsive sizing */}
          <div
            className={`bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-4 border-amber-200/70 relative ${
              'w-[90vw] h-[280px] ' +
              'sm:w-[60vw] sm:h-[50vh] ' +
              'md:w-[62vw] md:h-[50vh] ' +
              'lg:w-[50vw] lg:h-[52vh] ' +
              'xl:w-[37vw] xl:h-[345px] '
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
                        onShowId={() => setShowIdCard(true)}
                        onShowDocument={() => setShowDocument(true)}
                      />
                    )}
                    {gameStatus === 'playing' && (
                      <PlayPage key="playing" setGameStatus={setGameStatus} onWin={handleWin} />
                    )}
                    {gameStatus === 'win' && (
                      <WinPage
                        key="win"
                        setGameStatus={setGameStatus}
                        gameStatus={gameStatus}
                        completionTime={completionTime}
                      />
                    )}
                    {gameStatus === 'leaderboard' && (
                      <LeaderBoardPage setGameStatus={setGameStatus} />
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

        {/* Granny Behind Screen - Visible on rules, playing, and win pages */}
        {gameStatus !== 'start' && (
          <GrannyBehindScreen grannyStatus={grannyStatus} setGrannyStatus={setGrannyStatus} />
        )}
      </div>

      {/* Global ID Card and Document Popups */}
      {showIdCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
          onClick={() => setShowIdCard(false)}
        >
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4">
            <div
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                border: '2px solid #2563eb',
              }}
              className="rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Bigger and more clickable */}
              <button
                onClick={() => setShowIdCard(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-red-600 transition-colors z-10 cursor-pointer"
                style={{ lineHeight: '1' }}
              >
                ×
              </button>

              {/* ID Card Header */}
              <div className="bg-blue-600 text-white p-3 rounded-t-lg">
                <h3 className="font-windows font-bold text-center">OFFICIAL IDENTIFICATION</h3>
                <div className="text-center text-xs opacity-90">Government Issued ID</div>
              </div>

              <div className="p-6">
                {/* Photo */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-20 h-20 bg-gray-200 rounded border-4 border-blue-600"
                    style={{
                      backgroundImage: 'url(/granny-face-crown.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(1.1) contrast(1.1)',
                    }}
                  />
                </div>

                {/* Personal Information */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Full Name:</span>
                    <span className="font-windows">Bertha Grumpington</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Initials:</span>
                    <span className="font-windows text-red-600 font-bold text-lg">BG</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Age:</span>
                    <span className="font-windows">73 years</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Birth Date:</span>
                    <span className="font-windows">1951</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Occupation:</span>
                    <span className="font-windows">Professional Grump</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">ID Number:</span>
                    <span className="font-windows">BG-2024-555</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-windows font-bold text-gray-700">Status:</span>
                    <span className="font-windows text-green-600">Active</span>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-xs font-windows italic text-gray-700">
                    "I've been perfecting the art of grumpiness since 1951!"
                  </p>
                  <p className="text-xs font-windows text-right mt-1 text-gray-500">- Bertha G.</p>
                </div>

                {/* Security Features */}
                <div className="mt-4 text-center">
                  <div className="inline-block bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-xs font-windows text-blue-800">🔒 Verified Identity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDocument && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
          onClick={() => setShowDocument(false)}
        >
          <div className="relative bg-yellow-50 rounded-lg shadow-2xl max-w-md mx-4 border-2 border-yellow-300">
            <div
              style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                backgroundImage: `
                  linear-gradient(90deg, #fbbf24 1px, transparent 1px),
                  linear-gradient(#fbbf24 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px, 20px 20px',
                backgroundPosition: '0 0, 0 0',
              }}
              className="rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Bigger and more clickable */}
              <button
                onClick={() => setShowDocument(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-red-600 transition-colors z-10 cursor-pointer"
                style={{ lineHeight: '1' }}
              >
                ×
              </button>

              {/* Document Header */}
              <div className="text-center p-4 border-b border-yellow-400">
                <h3 className="font-windows font-bold text-lg text-blue-900 underline">
                  PERSONAL DIARY
                </h3>
                <p className="font-windows text-sm italic text-blue-800">Property of Bertha G.</p>
                <div className="text-xs text-gray-600 mt-1">Est. 1951 - Still Grumpy</div>
              </div>

              {/* Document Content */}
              <div className="p-6 text-blue-900">
                <div className="font-windows text-sm leading-relaxed space-y-3">
                  <p className="font-bold">Dear Diary,</p>
                  <p>
                    That fool{' '}
                    <span className="font-bold text-red-600 bg-red-100 px-1 rounded">Melvin</span>{' '}
                    left me again! After 47 years of putting up with his snoring and terrible jokes,
                    he has the audacity to say I'm "too grumpy"!
                  </p>
                  <p>
                    Well, good riddance! I've got my knitting, my cats, and my collection of vintage
                    complaints. Who needs him anyway?
                  </p>
                  <p>
                    Note to self: Change all the passwords. That man knows too much about my secret
                    cookie stash locations.
                  </p>
                  <p className="text-xs bg-yellow-200 p-2 rounded border border-yellow-400">
                    P.S. - If anyone finds this diary, remember:{' '}
                    <span className="font-bold text-red-600 bg-red-100 px-1 rounded">Melvin</span>{' '}
                    is the ex's name, and I\'ll always be grumpier than yesterday!
                  </p>
                  <p className="text-right italic font-bold">- Bertha "The Grump" Grumpington</p>
                </div>

                {/* Signature */}
                <div className="mt-6 pt-4 border-t border-yellow-400">
                  <div className="text-right">
                    <div className="inline-block transform -rotate-2">
                      <div
                        className="text-blue-900 font-windows italic text-lg"
                        style={{ fontFamily: 'cursive' }}
                      >
                        Bertha G. 💢
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paper aging effects */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg opacity-10"
                style={{
                  background:
                    'radial-gradient(circle at 10% 20%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 80% 80%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 40% 40%, #8b5cf6 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {CursorImg}
      {/* Cursor Selection Menu */}
      <CursorMenu onCursorChange={setCursorType} />
    </div>
  );
};
