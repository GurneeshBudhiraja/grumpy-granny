import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Using real online images for captcha (will be replaced later)
const captchaImages = [
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1108098/pexels-photo-1108098.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1108103/pexels-photo-1108103.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
];

interface CaptchaChallengeProps {
  onVerified: () => void;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onVerified }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const toggle = (i: number) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    setShowError(false);
  };

  const handleVerify = () => {
    if (selected.length === 0) {
      setShowError(true);
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      
      // Random success/failure for demo (80% success rate)
      if (Math.random() > 0.2 || attempts >= 2) {
        onVerified();
      } else {
        setAttempts(prev => prev + 1);
        setShowError(true);
        setSelected([]);
        setTimeout(() => setShowError(false), 3000);
      }
    }, 2000);
  };

  const handleSkip = () => {
    onVerified();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="relative bg-black border-2 border-green-400 p-4 rounded-lg font-windows"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #001100 0%, #002200 50%, #001100 100%)',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)',
        }}
      >
        {/* Glitch Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="w-full h-full opacity-20"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
              animation: 'glitch 0.3s infinite',
            }}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-4 relative z-10">
          <div className="text-red-400 font-bold text-lg mb-2 animate-pulse">
            ⚠️ SECURITY BREACH DETECTED ⚠️
          </div>
          <div className="text-green-300 text-sm">
            Select all images containing <span className="text-yellow-300 font-bold">GRANNY'S DENTURES</span>
          </div>
          <div className="text-gray-400 text-xs mt-1">
            Click to select, then verify to continue...
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
          {captchaImages.map((src, i) => (
            <motion.div
              key={i}
              className={`relative border-2 cursor-pointer transition-all duration-200 ${
                selected.includes(i) 
                  ? 'border-green-400 bg-green-400 bg-opacity-20' 
                  : 'border-gray-600 hover:border-green-300'
              }`}
              onClick={() => toggle(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={src} 
                alt={`Captcha option ${i + 1}`} 
                className="w-full h-20 object-cover"
                style={{ filter: 'brightness(0.8) contrast(1.2)' }}
              />
              
              {/* Selection Overlay */}
              {selected.includes(i) && (
                <motion.div
                  className="absolute inset-0 bg-green-400 bg-opacity-30 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-green-400 text-2xl font-bold">✓</div>
                </motion.div>
              )}

              {/* Glitch effect on hover */}
              <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-200 pointer-events-none">
                <div 
                  className="w-full h-full"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #00ff00 1px, #00ff00 2px)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {showError && (
            <motion.div
              className="text-red-400 text-sm text-center mb-3 font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {selected.length === 0 
                ? "⚠️ Please select at least one image" 
                : "❌ Verification failed. Try again!"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-between items-center relative z-10">
          <button
            onClick={handleSkip}
            className="text-gray-400 text-xs hover:text-green-300 transition-colors underline"
          >
            Skip verification
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelected([])}
              disabled={isVerifying || selected.length === 0}
              className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded border border-gray-600 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
            
            <button
              onClick={handleVerify}
              disabled={isVerifying || selected.length === 0}
              className={`px-4 py-1 text-sm rounded border transition-all duration-200 ${
                isVerifying
                  ? 'bg-yellow-600 text-yellow-100 border-yellow-500 cursor-wait'
                  : selected.length > 0
                  ? 'bg-green-600 text-green-100 border-green-500 hover:bg-green-500 hover:shadow-lg'
                  : 'bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-yellow-200 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        {attempts > 0 && (
          <div className="text-center mt-2 text-xs text-gray-400">
            Attempt {attempts + 1} of 3
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CaptchaChallenge;