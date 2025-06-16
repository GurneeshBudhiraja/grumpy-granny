import React from 'react';
import { motion } from 'motion/react';

interface WallShelfProps {
  onIdClick: () => void;
  onDocumentClick: () => void;
}

const WallShelf: React.FC<WallShelfProps> = ({ onIdClick, onDocumentClick }) => {
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
      {/* Wooden Shelf */}
      <div className="relative">
        {/* Shelf Surface */}
        <div 
          className="w-48 h-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg shadow-lg"
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
          {/* ID Card on Shelf */}
          <motion.div
            onClick={onIdClick}
            className="cursor-pointer relative"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
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
          </motion.div>
          
          {/* Document on Shelf */}
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
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
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
              <div className="absolute inset-0 opacity-20 rounded-sm"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 1px, transparent 1px), radial-gradient(circle at 80% 20%, #d4af37 1px, transparent 1px)'
                }}
              ></div>
            </div>
            
            {/* Shadow */}
            <div className="absolute top-12 left-1 w-8 h-2 bg-black opacity-15 rounded-full blur-sm transform -rotate-2"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WallShelf;