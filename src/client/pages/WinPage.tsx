import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { GameStatus } from '../../shared/types';

interface WinPageProps {
  gameStatus?: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  completionTime: string;
}

function WinPage({ setGameStatus, completionTime }: WinPageProps) {
  const handlePlayAgain = () => {
    setGameStatus('playing');
  };

  const handleHome = () => {
    setGameStatus('start');
  };

  const handleLeaderboard = () => {
    setGameStatus('leaderboard');
  };

  // This will the be the time in seconds
  function setLeaderboardData(userCompletionTime: string) {
    const score = convertCompletionTimeToNumber(userCompletionTime);
    window.parent.postMessage({ type: 'setLeaderboard', data: { score } }, '*');
  }

  function convertCompletionTimeToNumber(completionTime: string): number {
    let total = 0;

    // match minutes (e.g. "1m" or "12m")
    const m = completionTime.match(/(\d+)\s*m/);
    if (m) {
      total += parseInt(m[1], 10) * 60;
    }

    // match seconds (e.g. "30s")
    const s = completionTime.match(/(\d+)\s*s/);
    if (s) {
      total += parseInt(s[1], 10);
    }

    return total;
  }

  useEffect(() => {
    if (!completionTime) return;
    setLeaderboardData(completionTime);
  }, [completionTime]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 relative z-10 bg-window-bg">
      {/* Vintage CRT scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-10 bg-gradient-to-b from-transparent via-amber-500 to-transparent animate-pulse"></div>
        {/* Horizontal scanlines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
          }}
        ></div>
      </div>

      {/* Main Win Content Container - Compact for screen fit */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:max-w-md px-2 mx-auto">
        <div className="flex flex-row flex-wrap items-center justify-center space-x-1 sm:space-x-0 sm:space-y-1">
          {/* "YOU" - Coming from left - Smaller text */}
          <motion.div
            className="text-highlight-bg text-4xl sm:text-6xl font-pixel drop-shadow-lg mb-1 sm:mb-2 "
            style={{
              filter: 'brightness(1.2)',
              WebkitTextStroke: '1px var(--button-text)',
            }}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: -10, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              duration: 1.2,
              delay: 0.3,
            }}
          >
            YOU
          </motion.div>

          {/* "WIN!" - Coming from right - Smaller text */}
          <motion.div
            style={{
              filter: 'brightness(1.2)',
              WebkitTextStroke: '1px var(--text-color)',
            }}
            className="text-highlight-bg text-4xl sm:text-6xl font-pixel drop-shadow-lg mb-1 sm:mb-2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              duration: 1.2,
              delay: 0.6,
            }}
          >
            WIN!
          </motion.div>
        </div>
        {/* Completion Time Tagline - Compact */}
        <motion.div
          className="text-center mt-2 mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm font-windows text-text-color font-bold flex items-center gap-1">
            <img src="../public/granny-face.png" className="w-8 h-8 animate-spin" />
            <span className="text-yellow-400 font-bold tracking-wider bg-highlight-bg p-1">
              You cracked Granny's password!
            </span>
            <img src="../public/granny-face.png" className="w-8 h-8 animate-spin-reverse" />
          </p>
          <p className="text-xs sm:text-sm font-windows text-text-color mt-1">
            Time: <span className="text-green-600 font-bold">{completionTime}</span>
          </p>
        </motion.div>
      </div>

      {/* Action Buttons - Compact layout */}
      <motion.div
        className="flex gap-2 mt-2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Play Again Button - Smaller */}
        <button
          onClick={handlePlayAgain}
          className="relative group cursor-pointer drop-shadow-[2px_3px_black] active:drop-shadow-none"
        >
          <div
            className="border-2 border-button-shadow px-2 sm:px-3 py-1 sm:py-2 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-xs sm:text-sm md:text-base text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              PLAY AGAIN
            </span>
          </div>
        </button>

        {/* Home Button - Smaller */}
        <button
          onClick={handleHome}
          className="relative group cursor-pointer drop-shadow-[2px_3px_black] active:drop-shadow-none"
        >
          <div
            className="border-2 border-button-shadow px-2 sm:px-3 py-1 sm:py-2 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-xs sm:text-sm md:text-base text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              HOME
            </span>
          </div>
        </button>
        {/* Leaderboard Button - Smaller */}
        <button
          onClick={handleLeaderboard}
          className="relative group cursor-pointer drop-shadow-[2px_3px_black] active:drop-shadow-none"
        >
          <div
            className="border-2 border-button-shadow px-2 sm:px-3 py-1 sm:py-2 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-xs sm:text-sm md:text-base text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              Leaderboard &#127942;
            </span>
          </div>
        </button>
      </motion.div>

      {/* Vintage corner decorations - Smaller */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-window-border/50"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-window-border/50"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-window-border/50"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-window-border/50"></div>
    </div>
  );
}

export default WinPage;
