import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameStatus } from '../../shared/types';
import getRandomPassword from '../utils/passwordUtil';
import { checkWordlePassword, PasswordCheckResult } from '../utils/verifyPassword';

interface Hint {
  id: number;
  text: string;
  isCompleted: boolean;
  previouslyCompleted: boolean;
}

export interface PlayPageProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

export interface PasswordAPIResponse {
  hints: string[];
  verifyFuntion: 'checkWordlePassword' | 'checkGrannyAgePassword' | '';
}

const PlayPage = ({ setGameStatus }: PlayPageProps) => {
  const [password, setPassword] = useState('');
  const [hints, setHints] = useState<Hint[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordAPIResponse, setPasswordAPIResponse] = useState<PasswordAPIResponse>({
    hints: [],
    verifyFuntion: '',
  });
  const [showIdCard, setShowIdCard] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  async function fetchPassword() {
    try {
      const { info } = getRandomPassword();
      if (!info) {
        throw new Error('No password info found');
      }
      const { hints } = info;
      setPasswordAPIResponse({
        ...info,
      });
      setHints(
        hints.map((hint: string, index: number) => ({
          id: index + 1,
          text: hint,
          isCompleted: false,
          previouslyCompleted: false,
        }))
      );
    } catch (error) {
      console.log('Error getting random password');
    }
  }

  useEffect(() => {
    fetchPassword().catch(() => setGameStatus('start'));
  }, []);

  // Handle password input changes with real-time verification
  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length > 0) {
      try {
        const result: PasswordCheckResult = await checkWordlePassword(newPassword);

        // Update hints based on verification result
        setHints((prev) =>
          prev.map((hint, index) => ({
            ...hint,
            previouslyCompleted: hint.isCompleted,
            isCompleted: result.completedHints[index] || false,
          }))
        );
      } catch (error) {
        console.log('Password verification error:', error);
      }
    } else {
      // Reset all hints when password is empty
      setHints((prev) =>
        prev.map((hint) => ({
          ...hint,
          isCompleted: false,
          previouslyCompleted: false,
        }))
      );
    }
  };

  // Handle Enter key press
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && password.length > 0) {
      try {
        const result: PasswordCheckResult = await checkWordlePassword(password);
        if (result.isValid) {
          console.log('Password is correct! Unlocking...');
          // Add success logic here
        } else {
          console.log('Password is incorrect');
        }
      } catch (error) {
        console.log('Password verification error:', error);
      }
    }
  };

  // Separate completed and incomplete hints
  const completedHints = hints.filter((hint) => hint.isCompleted);
  const incompleteHints = hints.filter((hint) => !hint.isCompleted);

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
              Chillin Queen
            </div>
          </div>

          {/* Password Input Section */}
          <div className="px-6 pb-1 mt-4">
            <div className="text-button-text ml-1">Let the hints guide you:</div>
            <div className="relative selection:bg-highlight-bg selection:text-highlight-text">
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
          {!!hints.length && (
            <div
              className="mx-6 mb-4 bg-gray-100 border-2 border-gray-400 border-t-white border-l-white p-3"
              style={{
                boxShadow: 'inset 1px 1px 0px 0px #808080, inset 2px 2px 0px 0px #c0c0c0',
              }}
            >
              <div className="text-sm font-windows font-bold text-text-color mb-2">
                Password Hints:
              </div>

              <div className="space-y-2 max-h-20 overflow-y-scroll">
                {/* Incomplete hints first */}
                {incompleteHints.map((hint) => (
                  <motion.div key={hint.id} className="flex items-center space-x-3" layout>
                    {/* Icon */}
                    <motion.div
                      className="w-4 h-4 flex items-center justify-center"
                      animate={{
                        scale: hint.isCompleted ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src="/windows98-icons/cross-icon.png"
                        alt="Incomplete"
                        className="w-4 h-4"
                      />
                    </motion.div>

                    {/* Hint Text */}
                    <motion.div className="text-xs font-windows text-text-color">
                      {hint.text}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Completed hints at the bottom with animation */}
                <AnimatePresence>
                  {completedHints.map((hint) => (
                    <motion.div
                      key={hint.id}
                      className="flex items-center space-x-3"
                      layout
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        layout: { duration: 0.5 },
                      }}
                    >
                      {/* Icon */}
                      <motion.div
                        className="w-4 h-4 flex items-center justify-center"
                        animate={{
                          scale: hint.isCompleted && !hint.previouslyCompleted ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          src="/windows98-icons/check-icon.png"
                          alt="Completed"
                          className="w-4 h-4"
                          initial={hint.previouslyCompleted ? {} : { scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                      </motion.div>

                      {/* Hint Text */}
                      <motion.div
                        className="text-xs font-windows text-green-700 line-through"
                        animate={{
                          color: '#15803d',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {hint.text}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 px-6 pb-4">
            <button
              className="px-4 py-2 bg-button-face border-2 border-button-highlight border-b-button-shadow border-r-button-shadow font-windows text-sm hover:bg-gray-300 active:border-button-shadow active:border-b-button-highlight active:border-r-button-highlight"
              onClick={() => {
                setPassword('');
                setHints(
                  hints.map((hint) => ({
                    ...hint,
                    isCompleted: false,
                    previouslyCompleted: false,
                  }))
                );
              }}
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

      {/* ID Card Popup */}
      {showIdCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-sm mx-4">
            <motion.div
              initial={{ scale: 0.5, rotate: -10, y: -100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.5, rotate: 10, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                border: '2px solid #2563eb',
              }}
              className="rounded-lg"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowIdCard(false)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
              >
                ×
              </button>

              {/* ID Card Header */}
              <div className="bg-blue-600 text-white p-3 rounded-t-lg">
                <h3 className="font-windows font-bold text-center">OFFICIAL IDENTIFICATION</h3>
                <div className="text-center text-xs opacity-90">Government Issued ID</div>
              </div>

              <div className="p-6">
                {/* Photo */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-20 h-20 bg-gray-200 rounded border-4 border-blue-600"
                    style={{
                      backgroundImage: 'url(/granny-face-crown.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(1.1) contrast(1.1)',
                    }}
                  />
                </div>

                {/* Personal Information */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Full Name:</span>
                    <span className="font-windows">Bertha Grumpington</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Initials:</span>
                    <span className="font-windows text-red-600 font-bold text-lg">BG</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Age:</span>
                    <span className="font-windows">73 years</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">Occupation:</span>
                    <span className="font-windows">Professional Grump</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-windows font-bold text-gray-700">ID Number:</span>
                    <span className="font-windows">BG-2024-555</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-windows font-bold text-gray-700">Status:</span>
                    <span className="font-windows text-green-600">Active</span>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-xs font-windows italic text-gray-700">
                    "I've been perfecting the art of grumpiness since 1951!"
                  </p>
                  <p className="text-xs font-windows text-right mt-1 text-gray-500">- Bertha G.</p>
                </div>

                {/* Security Features */}
                <div className="mt-4 text-center">
                  <div className="inline-block bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-xs font-windows text-blue-800">🔒 Verified Identity</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Document Popup */}
      {showDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-yellow-50 rounded-lg shadow-2xl max-w-md mx-4 border-2 border-yellow-300">
            <motion.div
              initial={{ scale: 0.5, y: -100, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.5, y: 100, rotate: 5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                backgroundImage: `
                  linear-gradient(90deg, #fbbf24 1px, transparent 1px),
                  linear-gradient(#fbbf24 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px, 20px 20px',
                backgroundPosition: '0 0, 0 0',
              }}
              className="rounded-lg"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDocument(false)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors z-10"
              >
                ×
              </button>

              {/* Document Header */}
              <div className="text-center p-4 border-b border-yellow-400">
                <h3 className="font-windows font-bold text-lg text-blue-900 underline">
                  PERSONAL DIARY
                </h3>
                <p className="font-windows text-sm italic text-blue-800">Property of Bertha G.</p>
                <div className="text-xs text-gray-600 mt-1">Est. 1951 - Still Grumpy</div>
              </div>

              {/* Document Content */}
              <div className="p-6 text-blue-900">
                <div className="font-windows text-sm leading-relaxed space-y-3">
                  <p className="font-bold">Dear Diary,</p>
                  <p>
                    That fool{' '}
                    <span className="font-bold text-red-600 bg-red-100 px-1 rounded">Melvin</span>{' '}
                    left me again! After 47 years of putting up with his snoring and terrible jokes,
                    he has the audacity to say I'm "too grumpy"!
                  </p>
                  <p>
                    Well, good riddance! I've got my knitting, my cats, and my collection of vintage
                    complaints. Who needs him anyway?
                  </p>
                  <p>
                    Note to self: Change all the passwords. That man knows too much about my secret
                    cookie stash locations.
                  </p>
                  <p className="text-xs bg-yellow-200 p-2 rounded border border-yellow-400">
                    P.S. - If anyone finds this diary, remember:{' '}
                    <span className="font-bold text-red-600 bg-red-100 px-1 rounded">Melvin</span>{' '}
                    is the ex's name, and I'll always be grumpier than yesterday!
                  </p>
                  <p className="text-right italic font-bold">- Bertha "The Grump" Grumpington</p>
                </div>

                {/* Signature */}
                <div className="mt-6 pt-4 border-t border-yellow-400">
                  <div className="text-right">
                    <div className="inline-block transform -rotate-2">
                      <div
                        className="text-blue-900 font-windows italic text-lg"
                        style={{ fontFamily: 'cursive' }}
                      >
                        Bertha G. 💢
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paper aging effects */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg opacity-10"
                style={{
                  background:
                    'radial-gradient(circle at 10% 20%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 80% 80%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 40% 40%, #8b5cf6 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              ></div>
            </motion.div>
          </div>
        </div>
      )}

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
