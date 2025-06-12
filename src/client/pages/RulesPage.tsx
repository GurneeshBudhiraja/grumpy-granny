import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const RULES_TEXT = `GRUMPY GRANNY PASSWORD CHALLENGE
=====================================

OBJECTIVE:
Guess Granny's secret password before she gets too angry!

RULES:
1. You have 6 attempts to guess the password
2. Each guess must be exactly 5 letters long
3. After each guess, you'll get clues:
   - GREEN: Letter is correct and in right position
   - YELLOW: Letter is in password but wrong position  
   - GRAY: Letter is not in the password at all

4. Type your guess and press ENTER to submit
5. Use BACKSPACE to delete letters
6. Granny gets angrier with each wrong guess!

WARNING: Don't make Granny too angry or she'll kick you out!

GOOD LUCK, DEARIE!

Type 'START' to begin the challenge...`;

interface RulesPageProps {
  gameStatus?: string;
  setGameStatus: React.Dispatch<React.SetStateAction<string>>;
}

function RulesPage({ gameStatus, setGameStatus }: RulesPageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < RULES_TEXT.length) {
      const timer = setTimeout(() => {
        setDisplayedText(RULES_TEXT.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Typing speed
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
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
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim() === 'START') {
      setGameStatus('playing');
    }
  };

  return (
    <motion.div 
      className="w-full h-full bg-black text-green-400 font-windows overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 text-white px-4 py-2 text-sm border-b border-gray-600">
        <span className="text-green-400">●</span> GRANNY TERMINAL v1.0 - READY
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-full p-4 overflow-y-auto terminal-scrollbar"
        style={{ height: 'calc(100% - 40px)' }}
      >
        {/* Typed Rules Text */}
        <pre className="whitespace-pre-wrap text-sm leading-relaxed mb-4">
          {displayedText}
          {!isTypingComplete && showCursor && (
            <span className="bg-green-400 text-black">█</span>
          )}
        </pre>

        {/* Interactive Input Section */}
        {isTypingComplete && (
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-green-400 mr-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="bg-transparent border-none outline-none text-green-400 font-windows text-sm flex-1"
              placeholder="Type your command..."
              maxLength={20}
            />
            {showCursor && (
              <span className="bg-green-400 text-black ml-1">█</span>
            )}
          </motion.div>
        )}

        {/* Command feedback */}
        {userInput && userInput !== 'START' && (
          <div className="text-red-400 text-sm mt-2">
            Unknown command: {userInput}
          </div>
        )}
      </div>

      {/* Vintage scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
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