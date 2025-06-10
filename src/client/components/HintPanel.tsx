import React from 'react';

interface HintPanelProps {
  hint1: string;
  hint2: string;
  className?: string;
}

export const HintPanel: React.FC<HintPanelProps> = ({ 
  hint1, 
  hint2, 
  className = '' 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="dark-glass border-l-4 border-red-600 p-4 rounded-r-lg shadow-lg red-glow">
        <div className="flex items-center">
          <div className="text-red-400 mr-2 animate-pulse">🔍</div>
          <p className="text-red-100 font-medium creepy-text">
            <span className="font-semibold text-red-300">Clue 1:</span> {hint1}
          </p>
        </div>
      </div>
      
      <div className="dark-glass border-l-4 border-purple-600 p-4 rounded-r-lg shadow-lg">
        <div className="flex items-center">
          <div className="text-purple-400 mr-2 animate-pulse">🗝️</div>
          <p className="text-purple-100 font-medium creepy-text">
            <span className="font-semibold text-purple-300">Clue 2:</span> {hint2}
          </p>
        </div>
      </div>
    </div>
  );
};