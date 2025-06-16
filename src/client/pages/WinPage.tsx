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
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative z-10 bg-window-bg">
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

      {/* Main Win Content Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md sm:max-w-xl lg:max-w-2xl px-4 mx-auto mt-3 md:mt-0">
        {/* "YOU" - Coming from left */}
        <motion.div
          className="text-6xl sm:text-8xl md:text-9xl font-pixel drop-shadow-lg mb-2 sm:mb-4 text-green-400"
          style={{
            filter: 'brightness(1.2)',
            WebkitTextStroke: '2px var(--text-color)',
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

        {/* "WIN!" - Coming from right */}
        <motion.div
          style={{
            filter: 'brightness(1.2)',
            WebkitTextStroke: '2px var(--text-color)',
          }}
          className="text-green-400 drop-shadow-lg text-6xl sm:text-8xl md:text-9xl font-pixel w-full text-center -mt-8 md:-mt-10 px-4"
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

        {/* Completion Time Tagline */}
        <motion.div
          className="text-center mt-4 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl font-windows text-text-color font-bold">
            🎉 You cracked Granny's password! 🎉
          </p>
          <p className="text-sm sm:text-base md:text-lg font-windows text-text-color mt-2">
            Completion Time: <span className="text-green-600 font-bold">{completionTime}</span>
          </p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Play Again Button */}
        <button
          onClick={handlePlayAgain}
          className="relative group cursor-pointer drop-shadow-[3px_4px_black] active:drop-shadow-none"
        >
          <div
            className="border-4 border-button-shadow px-4 sm:px-6 py-2 md:py-3 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-lg sm:text-xl md:text-2xl text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              PLAY AGAIN
            </span>
          </div>
        </button>

        {/* Home Button */}
        <button
          onClick={handleHome}
          className="relative group cursor-pointer drop-shadow-[3px_4px_black] active:drop-shadow-none"
        >
          <div
            className="border-4 border-button-shadow px-4 sm:px-6 py-2 md:py-3 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-lg sm:text-xl md:text-2xl text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              HOME
            </span>
          </div>
        </button>

        {/* Post Button */}
        <button
          onClick={handlePost}
          className="relative group cursor-pointer drop-shadow-[3px_4px_black] active:drop-shadow-none"
        >
          <div
            className="border-4 border-button-shadow px-4 sm:px-6 py-2 md:py-3 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{ filter: 'brightness(1.2)' }}
          >
            <span className="text-lg sm:text-xl md:text-2xl text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none">
              POST
            </span>
          </div>
        </button>
      </motion.div>

      {/* Vintage corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-window-border/50"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-window-border/50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-window-border/50"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-window-border/50"></div>
    </div>
  );
}

export default WinPage;