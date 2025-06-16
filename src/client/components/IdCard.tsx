import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IdCardProps {
  isOnShelf?: boolean;
  isExpanded?: boolean;
  onClose?: () => void;
}

const IdCard: React.FC<IdCardProps> = ({ isOnShelf = false, isExpanded = false, onClose }) => {
  if (isOnShelf) {
    return (
      <div className="relative">
        {/* ID Card on Shelf */}
        <div
          className="w-12 h-8 bg-blue-600 rounded-sm shadow-md transform rotate-3"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
    // Full screen ID card
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-red-500 rounded-lg shadow-2xl w-11/12 max-w-3xl mx-4 overflow-hidden"
            initial={{ scale: 0.5, rotate: -5, y: -50 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.5, rotate: 5, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {/* Header */}
            <div className="bg-blue-700 text-white px-6 py-2 flex justify-between items-center">
              <div className="text-lg font-bold">GRUMPY GRANNY LICENSING AUTHORITY</div>
              <button
                onClick={onClose}
                className="w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-sm font-bold"
              >
                x
              </button>
            </div>
            <div className="flex flex-col sm:flex-row">
              {/* Photo + QR/Barcode placeholder */}
              <div className="sm:w-1/3 bg-gray-100 p-4 flex flex-col items-center border-r border-gray-300">
                <div
                  className="w-24 h-24 bg-gray-200 rounded-sm shadow-inner mb-2"
                  style={{
                    backgroundImage: 'url(/granny-face-crown.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="text-xs text-gray-600 italic">Granny's Portrait</div>
              </div>
              {/* Details */}
              <div className="sm:w-2/3 p-6 space-y-4">
                <div className="text-sm">
                  <span className="font-bold">Name:</span> Bertha Grumpington
                </div>
                <div className="text-sm">
                  <span className="font-bold">Initials:</span>{' '}
                  <span className="text-red-600">BG</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold">Issued:</span> 2025-06-15
                </div>
                <div className="text-sm">
                  <span className="font-bold">Expires:</span> 2030-06-15
                </div>
                <div className="text-sm">
                  <span className="font-bold">DOB:</span> 1951-08-12
                </div>
                <div className="text-sm">
                  <span className="font-bold">Licence #:</span> GGA-2025-12345
                </div>
                <div className="text-sm">
                  <span className="font-bold">Status:</span>{' '}
                  <span className="text-green-600">Active</span>
                </div>
                <div className="text-xs italic text-gray-500">
                  "I've been perfecting the art of grumpiness since 1951!"
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
