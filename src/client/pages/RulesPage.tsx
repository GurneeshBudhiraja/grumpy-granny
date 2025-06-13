import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GameStatus } from '../../shared/types';
import { CaptchaChallenge } from '../components/components';

const RULES_HTML = `<p class="font-windows text-green-200">Granny's locked herself out (again), and only your brain cells can save her! Use the sneaky hints to guess her password, but beware: every wrong answer means Granny will unleash her full arsenal of grumpy love. No mercy, no turning back—just pure, unfiltered brainrot. 

<span class="font-windows text-yellow-300 font-extrabold">WARNING: Hit the back button if you dare, but be prepared for Granny's scream to echo through your soul!</span> 

Can you outwit her sass and survive the ultimate patience test, or will you be roasted into oblivion?</p>`;

interface RulesPageProps {
  gameStatus?: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

function RulesPage({ gameStatus, setGameStatus }: RulesPageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < RULES_HTML.length) {
      const timer = setTimeout(() => {
        setDisplayedText(RULES_HTML.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 15); // Faster typing speed for better UX
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedText, userInput]);

  // Focus input when typing is complete
  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toUpperCase());
    setShowError(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (userInput.trim() === 'START') {
        setGameStatus('playing');
      } else if (userInput.trim() !== '') {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  return (
    <motion.div
      className="w-full h-full bg-black text-green-400 font-windows overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          backgroundColor: 'var(--titlebar-active-bg)',
          color: 'var(--titlebar-active-text)',
          fontFamily: 'Tahoma, sans-serif',
          fontSize: '12px',
          lineHeight: '14px',
          borderBottom: '2px solid var(--window-border)',
        }}
      >
        {/* Back button */}
        <button
          className="w-4 h-4 flex items-center justify-center mr-2"
          onClick={() => setGameStatus('start')}
          style={{
            backgroundColor: 'var(--button-face)',
            border: '1px solid var(--button-shadow)',
            padding: 0,
          }}
        >
          ←
        </button>
        {/* Title */}
        <span className="flex-1 text-center select-none">GRANNY COMMAND CENTER</span>
        {/* Window controls */}
        <div className="flex space-x-1">
          <img src="/granny-face-laughing.png" className="w-10 h-10" />
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="h-full p-4 overflow-y-auto terminal-scrollbar-hidden"
        style={{ height: 'calc(100% - 40px)' }}
      >
        {/* Typed Rules Text with HTML rendering */}
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed mb-4"
          dangerouslySetInnerHTML={{
            __html:
              displayedText +
              (!isTypingComplete && showCursor
                ? '<span class="bg-blue-400 text-white">█</span>'
                : ''),
          }}
        />

        {/* Interactive Input Section */}
        {isTypingComplete && <CaptchaChallenge onVerified={() => setGameStatus('playing')} />}
      </div>

      {/* Vintage scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
          }}
        />
      </div>
    </motion.div>
  );
}

export default RulesPage;
