import { motion } from 'motion/react';
import { StartPageProps } from '../../shared/types';
import { WindowsButton } from '../components/components';

function StartPage({ gameStatus, setGameStatus }: StartPageProps) {
  const handleButtonClick = () => {
    // Do nothing for now as requested
    console.log('Start button clicked - no action yet');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative z-10 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Vintage CRT scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-10 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"></div>
        {/* Horizontal scanlines */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
          }}
        ></div>
      </div>

      {/* Main Title Animation Container */}
      <div className="relative mb-16 flex items-center justify-center w-full max-w-2xl">
        {/* "GRUMPY" - Coming from left */}
        <motion.div
          className="text-6xl md:text-8xl font-pixel font-bold text-green-400 drop-shadow-lg"
          style={{
            textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 2px 2px 0px #003300',
            filter: 'brightness(1.2)',
          }}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 1.2,
            delay: 0.3,
          }}
        >
          GRUMPY
        </motion.div>

        {/* Spacing */}
        <div className="w-8"></div>

        {/* "GRANNY" - Coming from right */}
        <motion.div
          className="text-6xl md:text-8xl font-pixel font-bold text-green-400 drop-shadow-lg"
          style={{
            textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 2px 2px 0px #003300',
            filter: 'brightness(1.2)',
          }}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 1.2,
            delay: 0.6,
          }}
        >
          GRANNY
        </motion.div>
      </div>

      {/* Vintage Game Button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <button
          onClick={handleButtonClick}
          className="relative group"
        >
          {/* Button Background with vintage styling */}
          <div className="bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 border-4 border-gray-500 rounded-lg px-12 py-4 shadow-2xl transform transition-all duration-150 group-hover:scale-105 group-active:scale-95">
            {/* Inner button face */}
            <div className="bg-gradient-to-b from-gray-400 to-gray-600 border-2 border-gray-300 border-b-gray-800 border-r-gray-800 rounded px-8 py-3">
              {/* Button text */}
              <span 
                className="text-2xl font-pixel font-bold text-black drop-shadow-sm"
                style={{
                  textShadow: '1px 1px 0px #ffffff, -1px -1px 0px #666666',
                }}
              >
                START GAME
              </span>
            </div>
          </div>

          {/* Vintage button glow effect */}
          <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity duration-300 pointer-events-none"></div>
        </button>
      </motion.div>

      {/* Vintage footer text */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-green-400 font-pixel text-sm opacity-60 text-center">
          © 1985 GRANNY GAMES CORP.
        </p>
      </motion.div>

      {/* Vintage corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400 opacity-30"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-400 opacity-30"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-400 opacity-30"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-400 opacity-30"></div>
    </div>
  );
}

export default StartPage;