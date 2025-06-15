import { useState } from 'react';
import { motion } from 'motion/react';

interface CursorOption {
  id: 'windows' | 'granny';
  name: string;
  icon: string;
}

const cursorOptions: CursorOption[] = [
  { id: 'windows', name: 'Windows', icon: '/windows-cursor/normal-cursor.png' },
  { id: 'granny', name: 'Granny', icon: '/granny-cursor/granny-face.png' },
];

interface CursorMenuProps {
  onCursorChange: (cursorType: 'windows' | 'granny') => void;
}

function CursorMenu({ onCursorChange }: CursorMenuProps) {
  const [selectedCursor, setSelectedCursor] = useState<'windows' | 'granny'>('windows');
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = (cursorType: 'windows' | 'granny') => {
    setSelectedCursor(cursorType);
    onCursorChange(cursorType);
  };

  const selectedOption = cursorOptions.find(opt => opt.id === selectedCursor);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="bg-amber-100/95 backdrop-blur-sm rounded-full border-2 border-amber-300 shadow-lg overflow-hidden flex items-center"
          animate={{
            width: isHovered ? 'auto' : 50,
            paddingLeft: isHovered ? 4 : 0,
            paddingRight: isHovered ? 4 : 0,
          }}
          transition={{ 
            duration: 0.2, 
            ease: "easeInOut" 
          }}
          style={{
            height: 50,
            minWidth: 50,
          }}
        >
          {/* Collapsed state - show only selected cursor */}
          {!isHovered && selectedOption && (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
                <img 
                  src={selectedOption.icon} 
                  alt={selectedOption.name} 
                  className="w-6 h-6 object-contain" 
                />
              </div>
            </motion.div>
          )}

          {/* Expanded state - show all options */}
          {isHovered && (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {cursorOptions.map((opt) => {
                const isActive = opt.id === selectedCursor;
                return (
                  <motion.button
                    key={opt.id}
                    className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'border-2 border-blue-500 bg-blue-100' 
                        : 'border-2 border-transparent hover:border-amber-400 hover:bg-amber-50'
                    }`}
                    onClick={() => handleSelect(opt.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      width: 42, 
                      height: 42 
                    }}
                  >
                    <img 
                      src={opt.icon} 
                      alt={opt.name} 
                      className="w-6 h-6 object-contain" 
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Expanded tooltip showing both options */}
        {isHovered && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Choose Cursor Style
            <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default CursorMenu;