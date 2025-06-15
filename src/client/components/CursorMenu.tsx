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
  onCursorChange?: (cursorType: 'windows' | 'granny') => void;
}

export default function CursorMenu({ onCursorChange }: CursorMenuProps) {
  const [selected, setSelected] = useState<'windows' | 'granny'>('windows');
  const [hovered, setHovered] = useState(false);

  const pick = (id: 'windows' | 'granny') => {
    setSelected(id);
    if (onCursorChange) onCursorChange(id);
  };

  const active = cursorOptions.find((o) => o.id === selected)!;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* collapsible pill */}
        <motion.div
          className="bg-amber-100/90 backdrop-blur-sm rounded-full border-2 border-amber-300 shadow-lg flex items-center justify-center overflow-hidden"
          animate={{
            width: hovered ? 100 : 50,
            height: 50,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* collapsed: full-circle icon */}
          {!hovered && (
            <button
              onClick={() => pick(selected)}
              className="w-full h-full flex items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100 p-1"
            >
              <img src={active.icon} alt={active.name} className="w-full h-full object-contain" />
            </button>
          )}

          {/* expanded: two 42px buttons + gap */}
          {hovered && (
            <div className="flex items-center gap-2 px-2">
              {cursorOptions.map((o) => {
                const isActive = o.id === selected;
                return (
                  <button
                    key={o.id}
                    onClick={() => pick(o.id)}
                    className={
                      'w-10 h-10 flex items-center justify-center rounded-full transition-all ' +
                      (isActive
                        ? 'border-2 border-blue-500 bg-blue-100'
                        : 'border-2 border-transparent hover:border-amber-400 hover:bg-amber-50')
                    }
                  >
                    <img src={o.icon} alt={o.name} className="w-6 h-6 object-contain" />
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* tooltip */}
        {hovered && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose Cursor
            <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-800" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
