import React, { useState } from 'react';
import { motion } from 'motion/react';

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

  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Simulate hint completion based on password length
    if (newPassword.length >= 3 && hints[0]?.isCompleted) {
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
      className="w-full h-full bg-desktop-bg relative flex flex-col windows-scrollbar overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Lock Screen Content - Centered */}
      <div className="flex-1 flex items-center justify-center p-1">
        <motion.div
          className="bg-window-bg border-2 border-button-shadow border-t-button-highlight border-l-button-highlight shadow-lg w-full max-w-md mx-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            boxShadow:
              'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, inset 2px 2px 0px 0px #dfdfdf',
          }}
        >
          <div className="bg-highlight-text w-[99%] flex px-1 justify-between ml-px">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-red-500 " />
              <span className="font-windows">Password Manager</span>
            </div>
            <div className="relative self-center border cursor-pointer group">
              <img
                src="/windows98-icons/question-icon.png"
                alt="question icon"
                className="w-3 h-3 cursor-pointer"
              />
              {/* Tooltip */}
              <div className="absolute right-1 mt-1 w-max px-2 py-1 bg-window-bg border-2 border-button-shadow border-t-button-highlight border-l-button-highlight text-xs font-windows text-text-color whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                Use the hints to get the correct password.
              </div>
            </div>
          </div>
          {/* Granny Profile Section */}
          <div className="flex flex-col justify-center items-center mt-1 gap-1">
            <div
              className="w-20 h-20 bg-gray-200 border-2 border-button-shadow border-t-button-highlight border-l-button-highlight"
              style={{
                backgroundImage: 'url(/granny-face-crown.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
                filter: 'brightness(1.15) saturate(1.05)',
              }}
            />
            {/* User label */}
            <div className="bg-yellow-200 px-2 py-1 border border-gray-400 text-xs font-windows whitespace-nowrap text-center">
              Calmness Queen
            </div>
          </div>

          {/* Password Input Section */}
          <div className="px-6 pb-1 mt-4">
            <div className="text-button-text ml-1">Let the hints guide you:</div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border-2 border-button-shadow border-t-gray-400 border-l-gray-400 bg-white font-windows text-sm focus:outline-none"
                placeholder="Key in the hint answer..."
                autoFocus
                autoComplete="off"
                style={{
                  boxShadow: 'inset 1px 1px 0px 0px #808080, inset 2px 2px 0px 0px #c0c0c0',
                }}
              />

              {/* Show/Hide Password Toggle */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-button-face border border-button-shadow hover:bg-gray-300 text-xs font-windows flex items-center justify-center"
                style={{
                  boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
                }}
              >
                {showPassword ? '👁️' : '•••'}
              </button>
            </div>
          </div>

          {/* Hints Section */}
          <div
            className="mx-6 mb-4 bg-gray-100 border-2 border-gray-400 border-t-white border-l-white p-3"
            style={{
              boxShadow: 'inset 1px 1px 0px 0px #808080, inset 2px 2px 0px 0px #c0c0c0',
            }}
          >
            <div className="text-sm font-windows font-bold text-text-color mb-2">
              Password Hints:
            </div>

            <div className="space-y-2">
              {hints.map((hint) => (
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
                boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
              }}
            >
              Clear
            </button>

            <button
              className="px-4 py-2 bg-button-face border-2 border-button-highlight border-b-button-shadow border-r-button-shadow font-windows text-sm hover:bg-gray-300 active:border-button-shadow active:border-b-button-highlight active:border-r-button-highlight disabled:opacity-50"
              disabled={password.length === 0}
              style={{
                boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
              }}
            >
              OK
            </button>
          </div>
        </motion.div>
      </div>

      {/* Vintage CRT Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
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
