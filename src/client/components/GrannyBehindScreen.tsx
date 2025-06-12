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
        {/* Granny Behind Screen Container - Positioned on the left side */}
        <div className="absolute bottom-0 left-8 sm:left-16 md:left-20 lg:left-24 xl:left-32">
          {/* Granny Image - Positioned behind and slightly above the monitor */}
          <div className="relative">
            {/* Main Granny Image - Responsive sizing */}
            <motion.img
              src={isBlinking ? '/granny-blink.png' : '/granny-idle.png'}
              alt="Granny watching from behind"
              className="object-contain w-64 sm:w-72 md:w-80 lg:w-88 xl:w-96"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))' }}
            />
          </div>
        </div>
        
        {/* Floor shadow for Granny - Positioned under her */}
        <div
          className="absolute bottom-0 left-20 sm:left-28 md:left-32 lg:left-36 xl:left-44 w-16 h-6 sm:w-20 sm:h-7 md:w-24 md:h-8 lg:w-28 lg:h-9 xl:w-32 xl:h-10 bg-black opacity-10 rounded-full blur-sm"
          style={{
            transform: 'translateY(10px)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default GrannyBehindScreen;