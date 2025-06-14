import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Hint {
  id: number;
  text: string;
  isCompleted: boolean;
}

const PlayPage = () => {
  const [password, setPassword] = useState('');
  const [hints, setHints] = useState<Hint[]>([
    { id: 1, text: "Granny's favorite knitting pattern", isCompleted: false },
    { id: 2, text: 'The year she first complained about technology', isCompleted: false },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsTyping(true);

    // Clear typing indicator after 500ms
    setTimeout(() => setIsTyping(false), 500);

    // Simulate hint completion based on password length
    if (newPassword.length >= 3 && !hints[0].isCompleted) {
      // Complete first hint
      setHints((prev) =>
        prev.map((hint) => (hint.id === 1 ? { ...hint, isCompleted: true } : hint))
      );
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // For now, just simulate unlock after any password
      if (password.length > 0) {
        console.log('Password is being entered.');
      }
    }
  };

  return (
    <motion.div
      className="w-full h-full bg-desktop-bg relative flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Lock Screen Content - Centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="bg-window-bg border-2 border-button-shadow border-t-button-highlight border-l-button-highlight shadow-lg w-full max-w-md mx-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, inset 2px 2px 0px 0px #dfdfdf'
          }}
        >
          {/* Lock Screen Header */}
          <div className="text-center py-4 px-6">
            <div className="text-lg font-windows font-bold text-text-color mb-2">
              This computer is locked
            </div>
            <div className="text-sm font-windows text-gray-600">
              Only Granny or an administrator can unlock this computer.
            </div>
          </div>

          {/* Granny Profile Section */}
          <div className="flex justify-center pb-4">
            <motion.div
              className="relative"
              animate={{
                scale: isTyping ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-20 h-20 bg-gray-200 border-2 border-button-shadow border-t-button-highlight border-l-button-highlight"
                style={{
                  backgroundImage: 'url(/granny-face.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff'
                }}
              />
              {/* User label */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-200 px-2 py-1 border border-gray-400 text-xs font-windows whitespace-nowrap">
                Granny
              </div>
            </motion.div>
          </div>

          {/* Password Input Section */}
          <div className="px-6 pb-4 space-y-3 mt-4">
            <div className="text-sm font-windows text-text-color">Password:</div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border-2 border-button-shadow border-t-gray-400 border-l-gray-400 bg-white font-windows text-sm focus:outline-none"
                placeholder="Enter password..."
                autoFocus
                autoComplete="off"
                style={{
                  boxShadow: 'inset 1px 1px 0px 0px #808080, inset 2px 2px 0px 0px #c0c0c0'
                }}
              />

              {/* Show/Hide Password Toggle */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-button-face border border-button-shadow hover:bg-gray-300 text-xs font-windows flex items-center justify-center"
                style={{
                  boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff'
                }}
              >
                {showPassword ? '👁️' : '•••'}
              </button>
            </div>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  className="text-xs font-windows text-gray-600 flex items-center space-x-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Typing...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hints Section */}
          <div className="mx-6 mb-4 bg-gray-100 border-2 border-gray-400 border-t-white border-l-white p-3"
            style={{
              boxShadow: 'inset 1px 1px 0px 0px #808080, inset 2px 2px 0px 0px #c0c0c0'
            }}
          >
            <div className="text-sm font-windows font-bold text-text-color mb-2">
              Password Hints:
            </div>

            <div className="space-y-2">
              {hints.map((hint, index) => (
                <motion.div key={hint.id} className="flex items-center space-x-3" layout>
                  {/* Icon */}
                  <motion.div
                    className="w-4 h-4 flex items-center justify-center"
                    animate={{
                      scale: hint.isCompleted ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {hint.isCompleted ? (
                      <motion.img
                        src="/windows98-icons/check-icon.png"
                        alt="Completed"
                        className="w-4 h-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    ) : (
                      <motion.img
                        src="/windows98-icons/cross-icon.png"
                        alt="Incomplete"
                        className="w-4 h-4"
                        animate={{
                          y: hint.isCompleted ? 20 : 0,
                          opacity: hint.isCompleted ? 0 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Hint Text */}
                  <motion.div
                    className={`text-xs font-windows ${
                      hint.isCompleted ? 'text-green-700 line-through' : 'text-text-color'
                    }`}
                    animate={{
                      color: hint.isCompleted ? '#15803d' : '#000000',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {hint.text}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 px-6 pb-4">
            <button
              className="px-4 py-2 bg-button-face border-2 border-button-highlight border-b-button-shadow border-r-button-shadow font-windows text-sm hover:bg-gray-300 active:border-button-shadow active:border-b-button-highlight active:border-r-button-highlight"
              onClick={() => setPassword('')}
              style={{
                boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff'
              }}
            >
              Clear
            </button>

            <button
              className="px-4 py-2 bg-button-face border-2 border-button-highlight border-b-button-shadow border-r-button-shadow font-windows text-sm hover:bg-gray-300 active:border-button-shadow active:border-b-button-highlight active:border-r-button-highlight disabled:opacity-50"
              disabled={password.length === 0}
              style={{
                boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff'
              }}
            >
              OK
            </button>
          </div>
        </motion.div>
      </div>

      {/* Windows 98 Taskbar - Only if it fits without overflow */}
      <div className="h-7 bg-button-face border-t-2 border-button-highlight flex items-center px-2 flex-shrink-0">
        {/* Start Button */}
        <button 
          className="h-5 px-2 bg-button-face border border-button-highlight border-b-button-shadow border-r-button-shadow font-windows text-xs hover:bg-gray-300 flex items-center space-x-1"
          style={{
            boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff'
          }}
        >
          <div className="w-3 h-3 bg-red-500 border border-gray-400"></div>
          <span>Start</span>
        </button>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* System Clock */}
        <div className="text-xs font-windows text-text-color bg-gray-200 px-2 py-1 border border-gray-400"
          style={{
            boxShadow: 'inset 1px 1px 0px 0px #808080, inset 2px 2px 0px 0px #c0c0c0'
          }}
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Vintage CRT Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #000000 2px, #000000 4px)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default PlayPage;