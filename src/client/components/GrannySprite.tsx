import { motion, AnimatePresence } from 'motion/react';
import { GrannySpriteProps } from '../../shared/types';

const grannyVariants = {
  hidden: {
    y: 100, // Start from below (behind the monitor)
    opacity: 0,
  },
  visible: {
    y: 0, // Final position
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.2,
      ease: 'easeOut',
    },
  },
  exit: {
    y: 100, // Slide back down behind monitor
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.8,
      ease: 'easeIn',
    },
  },
};

function GrannySprite({ gameStatus, className = '' }: GrannySpriteProps) {
  return (
    <AnimatePresence mode="wait">
      {gameStatus === 'start' && (
        <motion.div
          key="granny-sprite"
          className={`absolute -top-10 md:-top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 ${className}`}
          variants={grannyVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.img
            src="/granny-face-shots/granny-half-potrait.png"
            alt="Grumpy Granny"
            className="w-[12rem] sm:w-[13rem] md:w-[14rem] lg:w-[15rem] h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            }}
            // Add subtle floating animation
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GrannySprite;
