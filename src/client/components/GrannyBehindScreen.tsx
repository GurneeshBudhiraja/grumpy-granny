import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GrannyBehindScreenProps {
  gameStatus: string;
}

function GrannyBehindScreen({ gameStatus }: GrannyBehindScreenProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (gameStatus !== 'rules') return;
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [gameStatus]);

  if (gameStatus !== 'rules') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          delay: 0.2, // Slight delay after rules page appears
        }}
      >
        {/* Granny Behind Screen Container */}
        <div className="absolute bottom-0 left-20 sm:left-72 md:left-48">
          {/* Granny Image - Positioned behind and slightly above the monitor */}
          <div className="relative">
            {/* Main Granny Image */}
            <motion.img
              src={isBlinking ? '/granny-blink.png' : '/granny-idle.png'}
              alt="Granny watching from behind"
              className="object-contain w-96 md:w-[420px]"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))' }}
            />
          </div>
        </div>
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12 lg:w-48 lg:h-14 xl:w-56 xl:h-16 bg-black opacity-10 rounded-full blur-sm"
          style={{
            transform: 'translateX(-50%) translateY(10px)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default GrannyBehindScreen;
