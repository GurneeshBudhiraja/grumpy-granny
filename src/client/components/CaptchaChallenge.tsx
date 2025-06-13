import React, { useState } from 'react';
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
  onClose?: () => void;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onVerified, onClose }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showError, setShowError] = useState(false);

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
      onVerified();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="bg-white rounded-lg shadow-2xl border border-gray-300 overflow-scroll w-full max-w-sm sm:max-w-xs mx-auto h-72 mt-10 lg:my-0"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="font-sans text-sm font-medium">Select all images with Granny</span>
          </div>
          <div onClick={onClose}>
            <img src="/windows98-icons/cross-icon.png" />
          </div>
        </div>

        {/* Image Grid */}
        <div className="p-3">
          <div className="grid grid-cols-3 mb-5">
            {captchaImages.map((src, i) => (
              <motion.div
                key={i}
                className={`relative border-2 cursor-pointer transition-all duration-200 ${
                  selected.includes(i)
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => toggle(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={src}
                  alt={`Captcha option ${i + 1}`}
                  className="w-full h-20 object-cover"
                />

                {/* Selection Overlay */}
                {selected.includes(i) && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="text-red-500 text-sm text-center mb-3 font-sans"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Please select at least one image
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end items-center space-x-2 mb-6 md:mb-2">
            <button
              onClick={() => setSelected([])}
              disabled={isVerifying || selected.length === 0}
              className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-sans"
            >
              Clear
            </button>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className={`px-4 py-2 text-sm rounded transition-all duration-200 font-sans font-medium ${
                isVerifying
                  ? 'bg-blue-400 text-white cursor-wait'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaptchaChallenge;
