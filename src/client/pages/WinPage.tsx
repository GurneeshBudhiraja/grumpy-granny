import React from 'react';
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

  const handlePost = () => {
    // Navigate to create post or share functionality
    console.log('Post functionality - could integrate with Reddit API');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 relative z-10 bg-window-bg overflow-hidden">
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
        {/* "YOU" - Coming from left - Smaller text */}
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-pixel drop-shadow-lg mb-1 sm:mb-2 text-green-400"
          style={{
            filter: 'brightness(1.2)',
            WebkitTextStroke: '1px var(--text-color)',
          }}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
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
          className="text-green-400 drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-pixel w-full text-center -mt-2 md:-mt-4 px-2"
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

        {/* Completion Time Tagline - Compact */}
        <motion.div
          className="text-center mt-2 mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm md:text-base font-windows text-text-color font-bold">
            🎉 You cracked Granny's password! 🎉
          </p>
          <p className="text-xs sm:text-sm font-windows text-text-color mt-1">
            Time: <span className="text-green-600 font-bold">{completionTime}</span>
          </p>
        </motion.div>
      </div>

      {/* Action Buttons - Compact layout */}
      <motion.div
        className="flex flex-col sm:flex-row gap-2 mt-2"
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

        {/* Post Button - Smaller */}
        <button
          onClick={handlePost}
          className="relative group cursor-pointer drop-shadow-[2px_3px_black] active:drop-shadow-none"
        >
          <div
            className="border-2 border-button-shadow px-2 sm:px-3 py-1 sm:py-2 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-xs sm:text-sm md:text-base text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              POST
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