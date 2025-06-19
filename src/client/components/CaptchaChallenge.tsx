import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Local captcha images (non-granny)
const normalCaptchaImages = [
  '/captcha/image0.webp',
  '/captcha/image1.webp',
  '/captcha/image2.webp',
  '/captcha/image3.webp',
  '/captcha/image4.webp',
  '/captcha/image5.webp',
  '/captcha/image6.webp',
  '/captcha/image7.webp',
  '/captcha/image8.webp',
];

// Granny captcha images
const grannyCaptchaImages = [
  '/captcha/granny/image0.webp',
  '/captcha/granny/image1.webp',
  '/captcha/granny/image2.webp',
  '/captcha/granny/image3.webp',
];

interface CaptchaChallengeProps {
  onVerified: () => void;
  onClose?: () => void;
}

interface CaptchaImage {
  src: string;
  isGranny: boolean;
  id: string;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onVerified, onClose }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaImages, setCaptchaImages] = useState<CaptchaImage[]>([]);
  const [grannyIndices, setGrannyIndices] = useState<number[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Generate randomized captcha grid
  const generateCaptchaGrid = () => {
    // Randomly decide how many granny images to show (2-4)
    const grannyCount = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4

    // Select random granny images
    const shuffledGrannyImages = [...grannyCaptchaImages].sort(() => Math.random() - 0.5);
    const selectedGrannyImages = shuffledGrannyImages.slice(0, grannyCount);

    // Calculate how many normal images we need (total 9 - granny count)
    const normalCount = 9 - grannyCount;

    // Select random normal images
    const shuffledNormalImages = [...normalCaptchaImages].sort(() => Math.random() - 0.5);
    const selectedNormalImages = shuffledNormalImages.slice(0, normalCount);

    // Create image objects
    const grannyImageObjects: CaptchaImage[] = selectedGrannyImages.map((src, index) => ({
      src,
      isGranny: true,
      id: `granny-${index}-${Date.now()}`,
    }));

    const normalImageObjects: CaptchaImage[] = selectedNormalImages.map((src, index) => ({
      src,
      isGranny: false,
      id: `normal-${index}-${Date.now()}`,
    }));

    // Combine and shuffle all images
    const allImages = [...grannyImageObjects, ...normalImageObjects];
    const shuffledImages = allImages.sort(() => Math.random() - 0.5);

    // Track which indices contain granny images
    const newGrannyIndices: number[] = [];
    shuffledImages.forEach((image, index) => {
      if (image.isGranny) {
        newGrannyIndices.push(index);
      }
    });

    setCaptchaImages(shuffledImages);
    setGrannyIndices(newGrannyIndices);
  };

  useEffect(() => {
    generateCaptchaGrid();
  }, []);

  const toggle = (i: number) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    setShowError(false);
    setErrorMessage('');
  };

  const validateSelection = (): { isValid: boolean; message: string } => {
    // Check if user selected at least one image
    if (selected.length === 0) {
      return { isValid: false, message: 'Please select at least one image' };
    }

    // Check if user selected all granny images
    const selectedGrannyIndices = selected.filter((index) => grannyIndices.includes(index));
    const missedGrannyIndices = grannyIndices.filter((index) => !selected.includes(index));

    if (missedGrannyIndices.length > 0) {
      return { isValid: false, message: 'Please select all images with Granny' };
    }

    // Check if user selected any non-granny images
    const selectedNonGrannyIndices = selected.filter((index) => !grannyIndices.includes(index));

    if (selectedNonGrannyIndices.length > 0) {
      return { isValid: false, message: 'Please only select images with Granny' };
    }

    // Check if user selected exactly all granny images and no others
    if (
      selectedGrannyIndices.length === grannyIndices.length &&
      selectedNonGrannyIndices.length === 0
    ) {
      return { isValid: true, message: 'Success!' };
    }

    return { isValid: false, message: 'Please try again' };
  };

  const regenerateCaptcha = () => {
    setIsRegenerating(true);
    setSelected([]);
    setShowError(false);
    setErrorMessage('');

    // Slide out animation, then regenerate
    setTimeout(() => {
      generateCaptchaGrid();
      setIsRegenerating(false);
    }, 300);
  };

  const handleVerify = () => {
    const validation = validateSelection();

    if (!validation.isValid) {
      setShowError(true);
      setErrorMessage(validation.message);
      setIsVerifying(true);

      // Show error for 1.5 seconds, then regenerate
      setTimeout(() => {
        setIsVerifying(false);
        regenerateCaptcha();
      }, 1500);

      return;
    }

    // Success case
    setIsVerifying(true);
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
          {onClose && (
            <div onClick={onClose} className="cursor-pointer">
              <img src="/windows98-icons/cross-icon.webp" alt="Close" className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Image Grid */}
        <div className="p-3">
          <motion.div
            className="grid grid-cols-3 mb-5"
            animate={{
              x: isRegenerating ? 300 : 0,
              opacity: isRegenerating ? 0 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            {captchaImages.map((image, i) => (
              <motion.div
                key={image.id}
                className={`relative border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                  selected.includes(i)
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => toggle(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              >
                {/* Image */}
                <div className="relative w-full h-20">
                  <img
                    src={image.src}
                    alt={`Captcha option ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

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
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="text-red-500 text-sm text-center mb-3 font-sans"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end items-center space-x-2 mb-6 md:mb-2">
            <button
              onClick={() => setSelected([])}
              disabled={isVerifying || selected.length === 0 || isRegenerating}
              className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-sans"
            >
              Clear
            </button>

            <button
              onClick={handleVerify}
              disabled={isVerifying || isRegenerating}
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
