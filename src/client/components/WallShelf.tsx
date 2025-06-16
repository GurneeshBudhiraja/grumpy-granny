import React from 'react';
import { motion } from 'motion/react';

interface WallShelfProps {
  onIdClick: () => void;
  onDocumentClick: () => void;
}

const WallShelf: React.FC<WallShelfProps> = ({ onIdClick, onDocumentClick }) => {
  return (
    <div className="absolute top-20 left-2/3 transform -translate-x-1/2 z-10">
      {/* Wooden Shelf */}
      <div className="relative">
        {/* Shelf Surface */}
        <div
          className="w-48 h-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg shadow-lg"
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Wood grain effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-30 rounded-lg"></div>
          <div className="absolute top-1 left-0 w-full h-px bg-amber-600 opacity-40"></div>
          <div className="absolute top-2 left-0 w-full h-px bg-amber-800 opacity-60"></div>
        </div>

        {/* Shelf Brackets */}
        <div className="absolute -bottom-2 left-2 w-3 h-6 bg-amber-800 rounded-b transform rotate-12"></div>
        <div className="absolute -bottom-2 right-2 w-3 h-6 bg-amber-800 rounded-b transform -rotate-12"></div>

        {/* Items on Shelf */}
        <div className="absolute -top-8 left-4 flex space-x-8">
          {/* ID Card on Shelf - Realistic Western ID */}
          <div className="relative">
            <motion.div
              onClick={onIdClick}
              className="cursor-pointer relative"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-16 h-10 bg-blue-500 rounded-sm shadow-md transform rotate-3"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1e3a8a 100%)',
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  filter: 'brightness(0.85) saturate(0.8)', // Old, faded look
                }}
              >
                {/* ID Card Header */}
                <div className="p-1">
                  <div className="w-4 h-2 bg-white rounded-sm mb-1 opacity-80"></div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-sm opacity-70"></div>
                    <div className="flex-1">
                      <div className="w-full h-px bg-white opacity-50 mb-1"></div>
                      <div className="w-3/4 h-px bg-white opacity-40 mb-1"></div>
                      <div className="w-2/3 h-px bg-white opacity-30"></div>
                    </div>
                  </div>
                </div>

                {/* Holographic strip */}
                <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-40"></div>
                
                {/* Aging effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-5 rounded-sm"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-200 opacity-30 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-px h-2 bg-white opacity-20"></div>
              </div>

              {/* Shadow */}
              <div className="absolute top-10 left-1 w-14 h-2 bg-black opacity-20 rounded-full blur-sm transform rotate-3"></div>
            </motion.div>
            
            {/* Tooltip for ID */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 mt-2">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-windows">
                ID Card
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-800"></div>
            </div>
          </div>

          {/* Document on Shelf */}
          <div className="relative">
            <motion.div
              onClick={onDocumentClick}
              className="cursor-pointer relative"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-10 h-12 bg-yellow-100 rounded-sm shadow-md transform -rotate-2"
                style={{
                  background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Document Lines */}
                <div className="p-1 pt-2">
                  <div className="w-full h-px bg-blue-800 opacity-60 mb-1"></div>
                  <div className="w-full h-px bg-blue-800 opacity-60 mb-1"></div>
                  <div className="w-3/4 h-px bg-blue-800 opacity-60 mb-1"></div>
                  <div className="w-full h-px bg-blue-800 opacity-60 mb-1"></div>
                  <div className="w-2/3 h-px bg-blue-800 opacity-60"></div>
                </div>

                {/* Paper texture */}
                <div
                  className="absolute inset-0 opacity-20 rounded-sm"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, #d4af37 1px, transparent 1px), radial-gradient(circle at 80% 20%, #d4af37 1px, transparent 1px)',
                  }}
                ></div>
              </div>

              {/* Shadow */}
              <div className="absolute top-12 left-1 w-8 h-2 bg-black opacity-15 rounded-full blur-sm transform -rotate-2"></div>
            </motion.div>
            
            {/* Tooltip for Document */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 mt-2">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-windows">
                Document
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallShelf;