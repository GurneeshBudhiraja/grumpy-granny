import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GrannyBehindScreenProps {
  gameStatus: string;
}

function GrannyBehindScreen({ gameStatus }: GrannyBehindScreenProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (gameStatus !== 'rules') return;

    // Set up random blinking intervals
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      
      // Blink duration (how long eyes stay closed)
      setTimeout(() => {
        setIsBlinking(false);
      }, 150); // Eyes closed for 150ms
      
    }, Math.random() * 4000 + 2000); // Random interval between 2-6 seconds

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
          delay: 0.2 // Slight delay after rules page appears
        }}
      >
        {/* Granny Behind Screen Container */}
        <div className="absolute inset-0 flex items-end justify-center">
          {/* Granny Image - Positioned behind and slightly above the monitor */}
          <div className="relative">
            {/* Main Granny Image */}
            <motion.img
              src={isBlinking ? '/granny-blink.png' : '/granny-idle.png'}
              alt="Granny watching from behind"
              className="w-32 h-auto sm:w-40 md:w-48 lg:w-56 xl:w-64 object-contain"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))',
                transform: 'translateY(-20px)', // Slightly above monitor base
              }}
              // Subtle breathing animation
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Subtle glow effect around Granny */}
            <div 
              className="absolute inset-0 -z-10 blur-xl opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                transform: 'scale(1.2)',
              }}
            />
          </div>
        </div>

        {/* Optional: Subtle shadow on the wall behind Granny */}
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