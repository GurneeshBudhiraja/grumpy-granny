import React from 'react';
import { GrannyMood } from '../../shared/types/granny';

interface GrannyAvatarProps {
  mood: GrannyMood;
  className?: string;
}

const MOOD_COLORS = {
  calm: 'from-gray-700 to-gray-800',
  annoyed: 'from-red-900 to-red-800',
  grumpy: 'from-red-800 to-red-700',
  furious: 'from-red-700 to-red-600'
};

const MOOD_EXPRESSIONS = {
  calm: '👵',
  annoyed: '😡',
  grumpy: '👹',
  furious: '💀'
};

const MOOD_EFFECTS = {
  calm: '',
  annoyed: 'animate-pulse',
  grumpy: 'animate-shake',
  furious: 'animate-pulse-glow'
};

export const GrannyAvatar: React.FC<GrannyAvatarProps> = ({ mood, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`w-32 h-32 rounded-full bg-gradient-to-br ${MOOD_COLORS[mood]} 
                   border-4 border-red-900 flex items-center justify-center 
                   transition-all duration-500 ease-in-out transform hover:scale-105
                   shadow-2xl ${MOOD_EFFECTS[mood]} red-glow`}
      >
        <div className="text-6xl transition-all duration-300 animate-creepy-float">
          {MOOD_EXPRESSIONS[mood]}
        </div>
      </div>
      
      {/* Creepy glowing eyes */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>
      
      {/* Dark aura */}
      {mood === 'furious' && (
        <div className="absolute inset-0 rounded-full bg-red-900 opacity-20 animate-pulse scale-150"></div>
      )}
      
      {/* Blood drips for angry states */}
      {(mood === 'grumpy' || mood === 'furious') && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="text-red-600 text-xl animate-blood-drip">💧</div>
        </div>
      )}
    </div>
  );
};