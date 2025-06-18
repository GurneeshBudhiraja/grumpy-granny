import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GrannyStatus } from '../../shared/types';

interface GrannyBehindScreenProps {
  grannyStatus: GrannyStatus;
  setGrannyStatus: React.Dispatch<React.SetStateAction<GrannyStatus>>;
}

// Define Granny body shots and their corresponding sounds
const grannyBodyShots = [
  {
    image: '/granny-body-shots/granny-mild-frustrate.png',
    sounds: [
      '/sounds/granny-sounds/annoyed/granny-ugh.mp3',
      '/sounds/granny-sounds/annoyed/granny-curse.mp3',
    ],
  },
  {
    image: '/granny-body-shots/granny-yell.png',
    sounds: [
      '/sounds/granny-sounds/annoyed/granny-you-dummy.mp3',
      '/sounds/granny-sounds/granny-yell.mp3',
    ],
  },
  {
    image: '/granny-body-shots/granny-yell-up.png',
    sounds: ['/sounds/granny-sounds/granny-yell.mp3'],
  },
  {
    image: '/granny-body-shots/granny-smirk.png',
    sounds: ['/sounds/granny-sounds/granny-laugh.mp3'],
  },
  {
    image: '/granny-body-shots/granny-laughing.png',
    sounds: ['/sounds/granny-sounds/granny-laugh.mp3'],
  },
];

function GrannyBehindScreen({ grannyStatus, setGrannyStatus }: GrannyBehindScreenProps) {
  const { state, words } = grannyStatus;
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentBodyShot, setCurrentBodyShot] = useState<string>(
    '/granny-body-shots/granny-idle.png'
  );
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Timers and refs
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const lastPasswordRef = useRef<string>('');
  const lastHintCountRef = useRef<number>(0);
  const isTypingRef = useRef<boolean>(false);

  // Get random body shot and sound
  const getRandomBodyShot = () => {
    const randomIndex = Math.floor(Math.random() * grannyBodyShots.length);
    const bodyShot = grannyBodyShots[randomIndex]!;
    const randomSoundIndex = Math.floor(Math.random() * bodyShot.sounds.length);
    return {
      image: bodyShot.image,
      sound: bodyShot.sounds[randomSoundIndex]!,
    };
  };

  // Play body shot with sound
  const playBodyShotWithSound = (image: string, soundPath: string) => {
    if (isPlayingSound) return; // Don't interrupt current sound

    setCurrentBodyShot(image);
    setIsPlayingSound(true);

    // Stop any existing sound
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    }

    // Play new sound
    const audio = new Audio(soundPath);
    audio.volume = 0.7;
    soundRef.current = audio;

    audio.play().catch(() => console.log('Failed to play granny sound'));

    audio.onended = () => {
      setIsPlayingSound(false);
      setCurrentBodyShot('/granny-body-shots/granny-idle.png'); // Return to idle
    };

    audio.onerror = () => {
      setIsPlayingSound(false);
      setCurrentBodyShot('/granny-body-shots/granny-idle.png'); // Return to idle
    };
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      if (!isPlayingSound) {
        const { image, sound } = getRandomBodyShot();
        playBodyShotWithSound(image, sound);
      }
    }, 10000); // 10 seconds
  };

  // Reset typing timer
  const resetTypingTimer = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    if (isTypingRef.current) {
      typingTimerRef.current = setTimeout(() => {
        if (!isPlayingSound && isTypingRef.current) {
          const { image, sound } = getRandomBodyShot();
          playBodyShotWithSound(image, sound);
        }
      }, 10000); // 10 seconds after stopping typing
    }
  };

  // Monitor password input and hint completion
  useEffect(() => {
    const passwordInput = document.querySelector(
      'input[type="password"], input[type="text"]'
    ) as HTMLInputElement;

    if (!passwordInput) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const currentPassword = target.value;

      // Check if user started typing
      if (currentPassword.length > 0 && !isTypingRef.current) {
        isTypingRef.current = true;
      } else if (currentPassword.length === 0) {
        isTypingRef.current = false;
      }

      // Reset timers on any input
      resetInactivityTimer();
      resetTypingTimer();

      // Check for hint satisfaction/dissatisfaction
      const currentHintCount = document.querySelectorAll('.text-green-700').length;

      // If hints were satisfied and now dissatisfied
      if (lastHintCountRef.current > currentHintCount && !isPlayingSound) {
        const { image, sound } = getRandomBodyShot();
        playBodyShotWithSound(image, sound);
      }

      lastPasswordRef.current = currentPassword;
      lastHintCountRef.current = currentHintCount;
    };

    const handleKeyDown = () => {
      resetInactivityTimer();
      resetTypingTimer();
    };

    const handleFocus = () => {
      resetInactivityTimer();
    };

    const handleBlur = () => {
      isTypingRef.current = false;
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };

    // Add event listeners
    passwordInput.addEventListener('input', handleInput);
    passwordInput.addEventListener('keydown', handleKeyDown);
    passwordInput.addEventListener('focus', handleFocus);
    passwordInput.addEventListener('blur', handleBlur);

    // Start initial inactivity timer
    resetInactivityTimer();

    return () => {
      passwordInput.removeEventListener('input', handleInput);
      passwordInput.removeEventListener('keydown', handleKeyDown);
      passwordInput.removeEventListener('focus', handleFocus);
      passwordInput.removeEventListener('blur', handleBlur);
    };
  }, [isPlayingSound]);

  // Handle blinking animation for idle state
  useEffect(() => {
    if (state === 'blinking' && !isPlayingSound) {
      const blinkInterval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500);
      return () => clearInterval(blinkInterval);
    } else {
      setIsBlinking(false);
    }
  }, [state, isPlayingSound]);

  // Handle shouting state (existing functionality)
  useEffect(() => {
    if (state === 'shouting') {
      setIsBlinking(false);
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
  }, [state, setGrannyStatus]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      if (soundRef.current) {
        soundRef.current.pause();
      }
    };
  }, []);

  // Determine which image to show
  const getDisplayImage = () => {
    if (isPlayingSound) {
      return currentBodyShot;
    }

    if (state === 'shouting') {
      return '/granny-body-shots/granny-yell-up.png';
    }

    if (state === 'blinking') {
      return isBlinking
        ? '/granny-body-shots/granny-blink.png'
        : '/granny-body-shots/granny-idle.png';
    }

    return '/granny-body-shots/granny-idle.png';
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          delay: 0.2,
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
          {/* Granny Image - Responsive sizing that scales with monitor */}
          <div className="relative">
            <motion.img
              key={getDisplayImage()} // Force re-render when image changes
              src={getDisplayImage()}
              alt="Granny"
              className={`object-contain ${
                // Responsive Granny sizing - scales proportionally with monitor
                'w-[390px] mb-11 ' +
                'sm:w-[350px] sm:mb-0   ' +
                'md:w-[390px] ' +
                'lg:w-[450px] ' +
                'xl:w-[460px] '
              }`}
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))' }}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
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
