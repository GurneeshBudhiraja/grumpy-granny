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
        {/* Granny Behind Screen Container - Positioned to maintain minimal gap */}
        <div className={`absolute bottom-0 ${
          // Responsive positioning - much closer to monitor
          'left-[8%] ' +
          'sm:left-[12%] ' +
          'md:left-[16%] ' +
          'lg:left-[18%] ' +
          'xl:left-[20%] ' +
          '2xl:left-[22%]'
        }`}>
          {/* Granny Image - Responsive sizing that scales with monitor */}
          <div className="relative">
            <motion.img
              src={isBlinking ? '/granny-blink.png' : '/granny-idle.png'}
              alt="Granny watching from behind"
              className={`object-contain ${
                // Responsive Granny sizing - scales proportionally with monitor
                'w-[240px] ' +
                'sm:w-[280px] ' +
                'md:w-[320px] ' +
                'lg:w-[360px] ' +
                'xl:w-[400px] ' +
                '2xl:w-[440px]'
              }`}
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))' }}
            />
          </div>
        </div>
        
        {/* Floor shadow for Granny - Positioned proportionally under her */}
        <div
          className={`absolute bottom-0 bg-black opacity-10 rounded-full blur-sm ${
            // Responsive shadow positioning and sizing
            'left-[12%] w-16 h-6 ' +
            'sm:left-[16%] sm:w-20 sm:h-7 ' +
            'md:left-[20%] md:w-24 md:h-8 ' +
            'lg:left-[22%] lg:w-28 lg:h-9 ' +
            'xl:left-[24%] xl:w-32 xl:h-10 ' +
            '2xl:left-[26%] 2xl:w-36 2xl:h-11'
          }`}
          style={{
            transform: 'translateY(10px)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default GrannyBehindScreen;