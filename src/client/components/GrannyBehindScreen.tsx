import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GrannyStatus } from '../../shared/types';

interface GrannyBehindScreenProps {
  grannyStatus: GrannyStatus;
  setGrannyStatus: React.Dispatch<React.SetStateAction<GrannyStatus>>;
}

function GrannyBehindScreen({ grannyStatus, setGrannyStatus }: GrannyBehindScreenProps) {
  // destructure the object
  const { state, words } = grannyStatus;
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (state === 'blinking') {
      const blinkInterval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500);
      return () => clearInterval(blinkInterval);
    }
    if (state === 'shouting') {
      setIsBlinking(false);

      // If words contains an image path, this is a reaction - don't play the default yell sound
      if (!words || !words.includes('/granny-body-shots/')) {
        const audio = new Audio('/sounds/granny-sounds/granny-yell.mp3');
        audio.volume = 1;
        audio.loop = true;
        audio.currentTime = 1;
        audio.play().catch(() => console.log('failed to play yelling audio'));

        setTimeout(() => {
          setGrannyStatus((prev) => ({
            ...prev,
            state: 'blinking',
          }));
          audio.pause();
        }, 2000);
      }
    }
  }, [state, words, setGrannyStatus]);

  // Determine which image to show
  const getDisplayImage = () => {
    // If words contains an image path (from reaction), use it
    if (words && words.includes('/granny-body-shots/')) {
      return words;
    }

    if (state === 'shouting') {
      return '/granny-body-shots/granny-yell-up.webp';
    }

    if (state === 'blinking') {
      return isBlinking
        ? '/granny-body-shots/granny-blink.webp'
        : '/granny-body-shots/granny-idle.webp';
    }

    return '/granny-body-shots/granny-idle.webp';
  };

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
        <div
          className={`absolute bottom-0 ${
            // Responsive positioning - much closer to monitor
            'left-1/2 -translate-x-1/2   ' +
            'sm:left-[24%] sm:top-5  ' +
            'md:left-[28%] md:top-3 ' +
            'lg:left-1/5 lg:-top-10 ' +
            'xl:left-1/4 xl:top-0 '
          }`}
        >
          {/* Granny Image - Responsive sizing */}
          <div className="relative">
            <motion.img
              key={getDisplayImage()} // Force re-render when image changes
              src={getDisplayImage()}
              alt="Granny"
              className={`object-contain ${
                // Responsive Granny sizing - scales proportionally with monitor
                'w-[300px] mb-20 ' +
                'sm:w-[350px] sm:mb-0   ' +
                'md:w-[390px] ' +
                'lg:w-[450px] ' +
                'xl:w-[460px] '
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
