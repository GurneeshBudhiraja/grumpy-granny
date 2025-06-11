import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CursorOption {
  id: 'windows' | 'granny';
  name: string;
  icon: string;
  description: string;
}

const cursorOptions: CursorOption[] = [
  {
    id: 'windows',
    name: 'Windows',
    icon: '/cursor-image.cur',
    description: 'Classic Windows cursors'
  },
  {
    id: 'granny',
    name: 'Granny',
    icon: '/granny-face.png',
    description: 'Grumpy Granny cursors'
  }
];

interface CursorMenuProps {
  onCursorChange: (cursorType: 'windows' | 'granny') => void;
}

function CursorMenu({ onCursorChange }: CursorMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCursor, setSelectedCursor] = useState<'windows' | 'granny'>('granny');

  const handleCursorSelect = (cursorType: 'windows' | 'granny') => {
    setSelectedCursor(cursorType);
    onCursorChange(cursorType);
    setIsExpanded(false);
  };

  const selectedOption = cursorOptions.find(option => option.id === selectedCursor);

  return (
    <div className="fixed bottom-6 right-6 z-[10000]">
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Main Menu Container */}
        <motion.div
          className="bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-600/50 shadow-2xl overflow-hidden"
          animate={{
            width: isExpanded ? '280px' : '60px',
            height: '60px'
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3
          }}
        >
          <div className="flex items-center h-full">
            {/* Selected Cursor Indicator (Always Visible) */}
            <div className="flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
              <div className="relative w-8 h-8">
                {selectedOption?.id === 'windows' ? (
                  <div 
                    className="w-full h-full bg-white rounded-sm"
                    style={{
                      backgroundImage: `url(${selectedOption.icon})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  />
                ) : (
                  <img
                    src={selectedOption?.icon}
                    alt={selectedOption?.name}
                    className="w-full h-full object-contain"
                  />
                )}
                {/* Selection Ring */}
                <div className="absolute -inset-1 border-2 border-blue-400 rounded-full opacity-80" />
              </div>
            </div>

            {/* Expanded Options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="flex items-center space-x-3 px-4 pr-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  {cursorOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      className={`relative flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                        selectedCursor === option.id
                          ? 'bg-blue-500/30 border border-blue-400/50'
                          : 'bg-gray-700/50 hover:bg-gray-600/50 border border-transparent'
                      }`}
                      onClick={() => handleCursorSelect(option.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Option Icon */}
                      <div className="w-6 h-6 flex items-center justify-center">
                        {option.id === 'windows' ? (
                          <div 
                            className="w-full h-full bg-white rounded-sm"
                            style={{
                              backgroundImage: `url(${option.icon})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }}
                          />
                        ) : (
                          <img
                            src={option.icon}
                            alt={option.name}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      {/* Option Label */}
                      <span className="text-white text-sm font-medium">
                        {option.name}
                      </span>

                      {/* Selected Indicator */}
                      {selectedCursor === option.id && (
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          layoutId="selected-indicator"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg border border-gray-600/50 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
            >
              Choose your cursor style
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default CursorMenu;