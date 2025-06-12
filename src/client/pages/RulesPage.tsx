import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const RULES_HTML = `<span class="text-green-400 font-bold text-lg">GRUMPY GRANNY PASSWORD CHALLENGE</span>`;

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
      <div className="bg-gray-800 text-white px-4 py-2 text-sm border-b border-gray-600 flex items-center">
        <span className="text-green-400 mr-2">●</span>
        <span className="text-white">GRANNY TERMINAL v1.0 - READY</span>
        <div className="ml-auto flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
        {isTypingComplete && (
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-green-400 mr-2 font-bold">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="bg-transparent border-none outline-none text-green-400 font-windows text-sm flex-1 caret-green-400"
              placeholder="Type your command..."
              maxLength={20}
              style={{ caretColor: '#00ff00' }}
            />
            {showCursor && <span className="bg-green-400 text-black ml-1">█</span>}
          </motion.div>
        )}

        {/* Command feedback */}
        {showError && userInput && userInput !== 'START' && (
          <motion.div
            className="text-red-400 text-sm mt-2 flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <span className="mr-2">❌</span>
            <span>
              Unknown command: <span className="font-bold">{userInput}</span>
            </span>
          </motion.div>
        )}

        {/* Help text */}
        {isTypingComplete && !userInput && (
          <motion.div
            className="text-gray-500 text-xs mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            💡 Hint: Type "START" and press Enter to continue...
          </motion.div>
        )}
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