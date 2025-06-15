import { useState } from 'react';
import { motion } from 'motion/react';

interface CursorOption {
  id: 'windows' | 'granny';
  name: string;
  icon: string;
}

const cursorOptions: CursorOption[] = [
  { id: 'windows', name: 'Windows', icon: '/cursor-image.png' },
  { id: 'granny', name: 'Granny', icon: '/granny-face.png' },
];

interface CursorMenuProps {
  onCursorChange: (cursorType: 'windows' | 'granny') => void;
}

function CursorMenu({ onCursorChange }: CursorMenuProps) {
  const [selectedCursor, setSelectedCursor] = useState<'windows' | 'granny'>('windows');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = (cursorType: 'windows' | 'granny') => {
    setSelectedCursor(cursorType);
    onCursorChange(cursorType);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div className="relative">
        <motion.div
          className="bg-amber-100/90 backdrop-blur-sm rounded-full border-2 border-amber-300 shadow-lg overflow-hidden flex items-center "
          animate={{
            width: isExpanded ? 100 : 50,
            height: 50,
          }}
        >
          {cursorOptions.map((opt) => {
            const isActive = opt.id === selectedCursor;
            return (
              <motion.button
                key={opt.id}
                className={`flex items-center justify-center rounded-full m-0.5 cursor-pointer ${
                  isActive ? 'border-2 border-blue-500 bg-blue-100' : 'border-2 border-transparent'
                }`}
                onClick={() => handleSelect(opt.id)}
                initial={{
                  opacity: opt.id === selectedCursor ? 1 : 0,
                  x: opt.id === selectedCursor ? 0 : -20,
                }}
                animate={isExpanded || isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                style={isExpanded ? { width: 44, height: 44 } : { width: '100%', height: '100%' }}
              >
                <img src={opt.icon} alt={opt.name} className="w-full h-full object-contain p-1" />
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CursorMenu;
