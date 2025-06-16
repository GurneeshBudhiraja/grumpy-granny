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
  verifyFuntion: 'checkWordlePassword' | '';
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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        setHints(prev => 
          prev.map((hint, index) => ({
            ...hint,
            previouslyCompleted: hint.isCompleted,
            isCompleted: result.completedHints[index] || false
          }))
        );
      } catch (error) {
        console.log('Password verification error:', error);
      }
    } else {
      // Reset all hints when password is empty
      setHints(prev => 
        prev.map(hint => ({
          ...hint,
          isCompleted: false,
          previouslyCompleted: false
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

  return (
    <motion.div
      className="w-full h-full bg-desktop-bg relative flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Wall Document Holders - Positioned outside the monitor */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
        {/* ID Card Holder */}
        <motion.div
          className="w-8 h-12 bg-amber-800 border-2 border-amber-900 rounded-sm shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setShowIdCard(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm p-1">
            <div className="w-full h-3 bg-blue-600 rounded-sm mb-1"></div>
            <div className="w-full h-2 bg-gray-300 rounded-sm mb-1"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Document Holder */}
        <motion.div
          className="w-8 h-10 bg-amber-800 border-2 border-amber-900 rounded-sm shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setShowDocument(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm p-1">
            <div className="w-full h-1 bg-blue-800 mb-1"></div>
            <div className="w-full h-1 bg-blue-800 mb-1"></div>
            <div className="w-3/4 h-1 bg-blue-800"></div>
          </div>
        </motion.div>
      </div>

      {/* Main Lock Screen Content - Centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="bg-window-bg border-4 border-gray-400 shadow-2xl w-full max-w-md mx-auto rounded-lg overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 text-center">
            <h2 className="font-windows text-lg font-bold">Windows Lock Screen</h2>
          </div>

          {/* Granny Profile Section */}
          <div className="flex flex-col items-center py-6 bg-gray-100">
            <div
              className="w-24 h-24 bg-gray-200 border-4 border-white rounded-full shadow-lg mb-3"
              style={{
                backgroundImage: 'url(/granny-face-crown.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(1.15) saturate(1.05)',
              }}
            />
            <div className="text-center">
              <h3 className="font-windows text-lg font-bold text-gray-800">Bertha Grumpington</h3>
              <p className="font-windows text-sm text-gray-600">The Chillin Queen</p>
            </div>
          </div>

          {/* Password Input Section */}
          <div className="px-6 pb-4">
            <div className="mb-4">
              <label className="block text-sm font-windows text-gray-700 mb-2">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border-2 border-gray-300 bg-white font-windows text-sm focus:outline-none focus:border-blue-500 rounded"
                  placeholder="Enter password..."
                  autoFocus
                  autoComplete="off"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 border border-gray-400 hover:bg-gray-300 text-xs font-windows flex items-center justify-center rounded"
                >
                  {showPassword ? '👁️' : '•••'}
                </button>
              </div>
            </div>

            {/* Hints Section */}
            {hints.length > 0 && (
              <div className="bg-white border-2 border-gray-300 rounded p-3 mb-4">
                <div className="text-sm font-windows font-bold text-gray-800 mb-2">
                  Password Hints:
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {hints.map((hint) => (
                    <motion.div key={hint.id} className="flex items-center space-x-2" layout>
                      <motion.div
                        className="w-4 h-4 flex items-center justify-center"
                        animate={{
                          scale: hint.isCompleted && !hint.previouslyCompleted ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {hint.isCompleted ? (
                          <motion.div
                            className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                            initial={hint.previouslyCompleted ? {} : { scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <span className="text-white text-xs font-bold">✓</span>
                          </motion.div>
                        ) : (
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✗</span>
                          </div>
                        )}
                      </motion.div>
                      <motion.div
                        className={`text-xs font-windows ${
                          hint.isCompleted ? 'text-green-700 line-through' : 'text-gray-700'
                        }`}
                        animate={{
                          color: hint.isCompleted ? '#15803d' : '#374151',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {hint.text}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 border border-gray-400 font-windows text-sm hover:bg-gray-400 rounded"
                onClick={() => setPassword('')}
              >
                Clear
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white border border-blue-700 font-windows text-sm hover:bg-blue-700 disabled:opacity-50 rounded"
                disabled={password.length === 0}
              >
                OK
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Windows Taskbar Footer */}
      <div className="bg-gray-300 border-t-2 border-gray-400 px-4 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-400 border border-gray-500 px-2 py-1 rounded text-xs font-windows">
            Start
          </div>
        </div>
        <div className="text-xs font-windows text-gray-800">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* ID Card Popup */}
      <AnimatePresence>
        {showIdCard && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowIdCard(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl p-6 max-w-sm mx-4 relative"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowIdCard(false)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600"
              >
                ×
              </button>
              
              <div className="text-center">
                <div className="bg-blue-600 text-white p-2 rounded-t-lg mb-4">
                  <h3 className="font-windows font-bold">OFFICIAL ID CARD</h3>
                </div>
                
                <div
                  className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-blue-600"
                  style={{
                    backgroundImage: 'url(/granny-face-crown.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="font-windows font-bold">Name:</span>
                    <span className="font-windows">Bertha Grumpington</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-windows font-bold">Initials:</span>
                    <span className="font-windows text-red-600 font-bold">BG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-windows font-bold">Age:</span>
                    <span className="font-windows">73</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-windows font-bold">Status:</span>
                    <span className="font-windows">Professional Grump</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-windows font-bold">ID:</span>
                    <span className="font-windows">GG-2024-555</span>
                  </div>
                </div>
                
                <div className="mt-4 p-2 bg-yellow-100 rounded border-l-4 border-yellow-500">
                  <p className="text-xs font-windows italic">
                    "I've been grumpy since before it was cool!"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Popup */}
      <AnimatePresence>
        {showDocument && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDocument(false)}
          >
            <motion.div
              className="bg-yellow-100 rounded-lg shadow-2xl p-6 max-w-md mx-4 relative border-2 border-yellow-300"
              style={{
                backgroundImage: 'linear-gradient(45deg, #fefce8 25%, transparent 25%), linear-gradient(-45deg, #fefce8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fefce8 75%), linear-gradient(-45deg, transparent 75%, #fefce8 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
              initial={{ scale: 0.5, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDocument(false)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600"
              >
                ×
              </button>
              
              <div className="text-blue-800">
                <div className="text-center mb-4">
                  <h3 className="font-windows font-bold text-lg underline">PERSONAL DIARY</h3>
                  <p className="font-windows text-sm italic">Property of Bertha G.</p>
                </div>
                
                <div className="space-y-3 font-windows text-sm leading-relaxed">
                  <p className="text-blue-900">
                    <strong>Dear Diary,</strong>
                  </p>
                  
                  <p>
                    That fool <span className="font-bold text-red-600">Melvin</span> left me again! 
                    After 47 years of putting up with his snoring and terrible jokes, 
                    he has the audacity to say I'm "too grumpy"!
                  </p>
                  
                  <p>
                    Well, good riddance! I've got my knitting, my cats, and my 
                    collection of vintage complaints. Who needs him anyway?
                  </p>
                  
                  <p>
                    Note to self: Change all the passwords. That man knows too much 
                    about my secret cookie stash locations.
                  </p>
                  
                  <p className="text-right italic">
                    - Bertha "The Grump" Grumpington
                  </p>
                  
                  <div className="mt-4 p-2 bg-yellow-200 rounded border border-yellow-400">
                    <p className="text-xs italic">
                      P.S. - If anyone finds this diary, remember: 
                      <span className="font-bold"> Melvin</span> is the ex's name, 
                      and I'll always be grumpier than yesterday!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayPage;