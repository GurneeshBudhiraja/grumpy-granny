import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Local captcha images (non-granny)
const normalCaptchaImages = [
  '/captcha/image0.png',
  '/captcha/image1.png',
  '/captcha/image2.png',
  '/captcha/image3.png',
  '/captcha/image4.png',
  '/captcha/image5.png',
  '/captcha/image6.png',
  '/captcha/image7.png',
  '/captcha/image8.png',
];

// Granny captcha images
const grannyCaptchaImages = [
  '/captcha/granny/image0.png',
  '/captcha/granny/image1.png',
  '/captcha/granny/image2.png',
  '/captcha/granny/image3.png',
];

interface CaptchaChallengeProps {
  onVerified: () => void;
  onClose?: () => void;
}

interface CaptchaImage {
  src: string;
  isGranny: boolean;
  rotation: number;
  blur: number;
  pixelate: number;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onVerified, onClose }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const [captchaImages, setCaptchaImages] = useState<CaptchaImage[]>([]);

  // Generate randomized captcha grid
  useEffect(() => {
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
      
      // Create image objects with random effects
      const grannyImageObjects: CaptchaImage[] = selectedGrannyImages.map(src => ({
        src,
        isGranny: true,
        rotation: Math.floor(Math.random() * 21) - 10, // -10 to +10 degrees
        blur: Math.random() * 1.5 + 0.5, // 0.5 to 2px blur
        pixelate: Math.random() * 2 + 1, // 1 to 3px pixelation
      }));
      
      const normalImageObjects: CaptchaImage[] = selectedNormalImages.map(src => ({
        src,
        isGranny: false,
        rotation: Math.floor(Math.random() * 21) - 10, // -10 to +10 degrees
        blur: Math.random() * 1.5 + 0.5, // 0.5 to 2px blur
        pixelate: Math.random() * 2 + 1, // 1 to 3px pixelation
      }));
      
      // Combine and shuffle all images
      const allImages = [...grannyImageObjects, ...normalImageObjects];
      const shuffledImages = allImages.sort(() => Math.random() - 0.5);
      
      setCaptchaImages(shuffledImages);
    };

    generateCaptchaGrid();
  }, []);

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

  const getImageStyle = (image: CaptchaImage) => {
    return {
      transform: `rotate(${image.rotation}deg)`,
      filter: `blur(${image.blur}px)`,
      imageRendering: 'pixelated' as const,
      // Add pixelation effect using CSS
      ...(image.pixelate > 1.5 && {
        filter: `blur(${image.blur}px) contrast(1.1) saturate(0.9)`,
      }),
    };
  };

  const getOverlayStyle = (image: CaptchaImage) => {
    return {
      background: `
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${image.pixelate}px,
          rgba(0,0,0,0.1) ${image.pixelate}px,
          rgba(0,0,0,0.1) ${image.pixelate * 2}px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent ${image.pixelate}px,
          rgba(0,0,0,0.1) ${image.pixelate}px,
          rgba(0,0,0,0.1) ${image.pixelate * 2}px
        )
      `,
      mixBlendMode: 'multiply' as const,
    };
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
              <img src="/windows98-icons/cross-icon.png" alt="Close" className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Image Grid */}
        <div className="p-3">
          <div className="grid grid-cols-3 mb-5">
            {captchaImages.map((image, i) => (
              <motion.div
                key={i}
                className={`relative border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                  selected.includes(i)
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => toggle(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image with effects */}
                <div className="relative w-full h-20">
                  <img
                    src={image.src}
                    alt={`Captcha option ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={getImageStyle(image)}
                  />
                  
                  {/* Pixelation/Distortion Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={getOverlayStyle(image)}
                  />
                  
                  {/* Additional noise overlay for authenticity */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                      backgroundSize: `${Math.random() * 3 + 2}px ${Math.random() * 3 + 2}px`,
                    }}
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