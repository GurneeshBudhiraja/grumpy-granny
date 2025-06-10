import React from 'react';
import { GrannyMood } from '../../shared/types/granny';

interface GrannyAvatarProps {
  mood: GrannyMood;
  className?: string;
}

const MOOD_COLORS = {
  calm: 'from-green-100 to-green-200',
  annoyed: 'from-yellow-100 to-yellow-200',
  grumpy: 'from-orange-100 to-orange-200',
  furious: 'from-red-100 to-red-200'
};

const MOOD_EXPRESSIONS = {
  calm: '😊',
  annoyed: '😤',
  grumpy: '😠',
  furious: '🤬'
};

export const GrannyAvatar: React.FC<GrannyAvatarProps> = ({ mood, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`w-32 h-32 rounded-full bg-gradient-to-br ${MOOD_COLORS[mood]} 
                   border-4 border-gray-300 flex items-center justify-center 
                   transition-all duration-500 ease-in-out transform hover:scale-105
                   shadow-lg`}
      >
        <div className="text-6xl transition-all duration-300">
          {MOOD_EXPRESSIONS[mood]}
        </div>
      </div>
      
      {/* Granny's glasses */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-8 border-2 border-gray-600 rounded-full bg-white bg-opacity-20"></div>
      </div>
      
      {/* Hair bun */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};