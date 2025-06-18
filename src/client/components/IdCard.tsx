import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IdCardProps {
  isOnShelf?: boolean;
  isExpanded?: boolean;
  onClose?: () => void;
}

const IdCard: React.FC<IdCardProps> = ({ isOnShelf = false, isExpanded = false, onClose }) => {
  if (isOnShelf) {
    // Small ID card on shelf
    return (
      <div className="relative">
        {/* ID Card on Shelf */}
        <div 
          className="w-12 h-8 bg-blue-600 rounded-sm shadow-md transform rotate-3"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* ID Card Details */}
          <div className="p-1">
            <div className="w-3 h-2 bg-white rounded-sm mb-1 opacity-90"></div>
            <div className="w-full h-px bg-white opacity-60 mb-1"></div>
            <div className="w-2/3 h-px bg-white opacity-40"></div>
          </div>
          
          {/* Holographic effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-10 rounded-sm"></div>
        </div>
        
        {/* Shadow */}
        <div className="absolute top-8 left-1 w-10 h-2 bg-black opacity-20 rounded-full blur-sm transform rotate-3"></div>
      </div>
    );
  }

  if (isExpanded) {
    // Full screen ID card with game theme
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4"
            initial={{ scale: 0.5, rotate: -10, y: -100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.5, rotate: 10, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              border: '2px solid #2563eb'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-red-600 transition-colors z-10 cursor-pointer"
              style={{ lineHeight: '1' }}
            >
              ×
            </button>
            
            {/* ID Card Header */}
            <div className="bg-blue-600 text-white p-3 rounded-t-lg">
              <h3 className="font-windows font-bold text-center text-sm sm:text-base">OFFICIAL IDENTIFICATION</h3>
              <div className="text-center text-xs opacity-90">Government Issued ID</div>
            </div>
            
            <div className="p-4 sm:p-6">
              {/* Photo */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded border-4 border-blue-600"
                  style={{
                    backgroundImage: 'url(/granny-face-shots/granny-face-crown.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                />
              </div>
              
              {/* Personal Information */}
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="font-windows font-bold text-gray-700">Full Name:</span>
                  <span className="font-windows">Bertha Grumpington</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="font-windows font-bold text-gray-700">Initials:</span>
                  <span className="font-windows text-red-600 font-bold text-base sm:text-lg">BG</span>
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
              <div className="mt-4 p-2 sm:p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                <p className="text-xs font-windows italic text-gray-700">
                  "I've been perfecting the art of grumpiness since 1951!"
                </p>
                <p className="text-xs font-windows text-right mt-1 text-gray-500">- Bertha G.</p>
              </div>
              
              {/* Security Features */}
              <div className="mt-4 text-center">
                <div className="inline-block bg-blue-100 px-2 sm:px-3 py-1 rounded-full">
                  <span className="text-xs font-windows text-blue-800">🔒 Verified Identity</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
};

export default IdCard;