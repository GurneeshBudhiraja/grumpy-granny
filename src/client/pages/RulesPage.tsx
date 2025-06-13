import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GameStatus } from '../../shared/types';
import { CaptchaChallenge } from '../components/components';
import { soundManager } from '../utils/soundManager';

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
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCaptchaButton, setShowCaptchaButton] = useState(false);
  const [showCaptchaOverlay, setShowCaptchaOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typing animation effect with sound
  useEffect(() => {
    if (currentIndex < RULES_HTML.length) {
      const timer = setTimeout(async () => {
        // Play typing sound for visible characters (not HTML tags)
        const currentChar = RULES_HTML[currentIndex];
        if (currentChar && currentChar !== '<' && currentChar !== '>' && 
            !RULES_HTML.slice(Math.max(0, currentIndex - 10), currentIndex + 1).includes('<')) {
          await soundManager.initializeSounds();
          await soundManager.playKeyboardSound();
        }
        
        setDisplayedText(RULES_HTML.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, Math.random() * 30 + 15); // Variable typing speed for realism
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
      // Show captcha button after typing is complete
      setTimeout(() => setShowCaptchaButton(true), 1000);
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
  }, [displayedText, showCaptchaButton]);

  const handleCaptchaButtonClick = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setShowCaptchaOverlay(true);
    }, 2000);
  };

  const handleCaptchaVerified = () => {
    setShowCaptchaOverlay(false);
    setGameStatus('playing');
  };

  const handleCaptchaClose = () => {
    setShowCaptchaOverlay(false);
  };

  return (
    <motion.div
      className="w-full h-full bg-black text-green-400 font-windows overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center justify-between px-2 py-1 relative z-20"
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
          className="w-4 h-4 flex items-center justify-center mr-2 hover:bg-gray-600 transition-colors"
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
        <span className="flex-1 text-center select-none">GRANNY TERMINAL v1.0 - READY</span>
        {/* Window controls */}
        <div className="flex space-x-1">
          <img src="/granny-face-laughing.png" className="w-10 h-10" />
        </div>
      </div>

      {/* Terminal Content with Custom Scrollbar */}
      <div
        ref={terminalRef}
        className="h-full p-4 overflow-y-auto terminal-custom-scrollbar relative"
        style={{ height: 'calc(100% - 40px)' }}
      >
        {/* Typed Rules Text with HTML rendering */}
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed mb-4 relative z-10"
          dangerouslySetInnerHTML={{
            __html:
              displayedText +
              (!isTypingComplete && showCursor
                ? '<span class="bg-green-400 text-black animate-pulse">█</span>'
                : ''),
          }}
        />

        {/* Simple Captcha Button at Bottom */}
        {showCaptchaButton && (
          <div className="mt-8 flex justify-center">
            <div 
              className="bg-white border-2 border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-50 transition-colors flex items-center space-x-3 shadow-lg"
              onClick={handleCaptchaButtonClick}
              style={{ minWidth: '280px' }}
            >
              <div className="w-6 h-6 border-2 border-gray-400 bg-white flex items-center justify-center">
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="text-gray-600">☐</span>
                )}
              </div>
              <span className="text-gray-800 font-sans text-sm">
                {isLoading ? 'Verifying...' : "I'm not a robot"}
              </span>
              <div className="ml-auto">
                <div className="text-xs text-gray-500">reCAPTCHA</div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Captcha Overlay - Appears on top like real captcha */}
      {showCaptchaOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <CaptchaChallenge 
              onVerified={handleCaptchaVerified}
              onClose={handleCaptchaClose}
            />
          </div>
        </div>
      )}

      {/* Vintage scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
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