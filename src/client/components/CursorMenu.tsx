import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CursorOption {
  id: 'windows' | 'granny';
  name: string;
  icon: string;
}

const cursorOptions: CursorOption[] = [
  {
    id: 'windows',
    name: 'Windows',
    icon: '/cursor-image.png',
  },
  {
    id: 'granny',
    name: 'Granny',
    icon: '/granny-face.png',
  },
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

  return (
    <div className="fixed bottom-6 right-6">
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Main Menu Container */}
        <motion.div
          className="bg-amber-100/90 backdrop-blur-sm rounded-full border-2 border-amber-300 shadow-lg overflow-hidden"
          animate={{
            width: isExpanded ? '140px' : '50px',
            height: '50px',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            duration: 0.2,
          }}
        >
          <div className="flex items-center h-full p-1">
            {/* Cursor Options */}
            <div className="flex items-center space-x-1">
              {cursorOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    selectedCursor === option.id
                      ? 'border-2 border-blue-500 bg-blue-100'
                      : 'border-2 border-transparent hover:bg-amber-200'
                  }`}
                  onClick={() => handleCursorSelect(option.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={index === 0 ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  animate={
                    index === 0 || isExpanded
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Option Icon */}
                  <div className="w-6 h-6 flex items-center justify-center">
                    {option.id === 'windows' ? (
                      <div
                        className="w-full h-full bg-white rounded-sm border border-gray-300"
                        style={{
                          backgroundImage: `url(${option.icon})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                        }}
                      />
                    ) : (
                      <img
                        src={option.icon}
                        alt={option.name}
                        className="w-full h-full object-contain rounded-full"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Wacky Tooltip */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-yellow-200 text-black text-xs rounded-lg border-2 border-yellow-400 whitespace-nowrap font-bold"
              initial={{ opacity: 0, y: 10, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              exit={{ opacity: 0, y: 10, rotate: -5 }}
              transition={{ delay: 0.1 }}
            >
              Pick your cursor! 🖱️
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default CursorMenu;