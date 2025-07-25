import { motion } from 'motion/react';
import { StartPageProps } from '../../shared/types';

function StartPage({ gameStatus: _gameStatus, setGameStatus }: StartPageProps) {
  const handleButtonClick = () => {
    setGameStatus('rules');
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
      {/* Trophy / Leaderboard button */}
      <button
        className="absolute top-5 right-5 z-50 cursor-pointer"
        onClick={() => {
          console.log('Clicking');
          setGameStatus('leaderboard');
        }}
      >
        <div className="relative group cursor-pointer">
          <button
            className="w-10 h-10 bg-window-bg border-2 border-button-shadow shadow-inner flex items-center justify-center rounded"
            style={{
              boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #fff',
            }}
          >
            <span className="text-xl">🏆</span>
          </button>

          {/* Tooltip */}
          <div
            className="absolute right-1/2 px-2 py-1 bg-window-bg border-2 border-button-shadow text-xs font-windows whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              transform: 'translateX(50%)',
              boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #fff',
            }}
          >
            Leaderboard
          </div>
        </div>
      </button>

      {/* Main Title Animation Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md sm:max-w-xl lg:max-w-2xl px-4 mx-auto mt-3 md:mt-0">
        {/* "GRUMPY" - Coming from left, exits to left QUICKLY */}
        <motion.div
          className="text-6xl sm:text-8xl font-pixel drop-shadow-lg mb-2 md:mb-0 text-highlight-bg"
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
            // Quick exit transition
            exit: { duration: 0.4, delay: 0 },
          }}
        >
          GRUMPY
        </motion.div>

        {/* "GRANNY" - Coming from right, exits to right QUICKLY */}
        <motion.div
          style={{
            filter: 'brightness(1.2)',
            WebkitTextStroke: '2px var(--text-color)',
          }}
          className="text-highlight-bg drop-shadow-lg text-6xl sm:text-8xl font-pixel w-full text-center -mt-7 px-4"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 1.2,
            delay: 0.6,
            // Quick exit transition
            exit: { duration: 0.4, delay: 0 },
          }}
        >
          GRANNY
        </motion.div>
      </div>

      {/* Vintage Game Button - exits downward QUICKLY */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          delay: 1,
          duration: 0.2,
          ease: 'easeOut',
          exit: { duration: 0.2, delay: 0, ease: 'linear' },
        }}
      >
        <button
          onClick={handleButtonClick}
          className="relative group cursor-pointer sm:drop-shadow-[5px_6px_black] active:drop-shadow-none"
          style={{ display: 'block' }}
        >
          {/* Button Background with vintage styling */}
          <div
            className="border-4 border-button-shadow px-4 sm:px-6 py-1 md:py-1 transform transition-all duration-150 bg-button-face group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none"
            style={{
              filter: 'brightness(1.2)',
              display: 'block',
            }}
          >
            {/* Button text */}
            <span
              className="text-4xl text-text-color font-pixel font-bold cursor-pointer tracking-wide group-active:drop-shadow-none"
              style={{ display: 'block' }}
            >
              START GAME
            </span>
          </div>
          <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity duration-300 pointer-events-none"></div>
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

export default StartPage;
