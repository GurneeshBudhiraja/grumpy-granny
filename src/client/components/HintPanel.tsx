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
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center">
          <div className="text-blue-600 mr-2">💡</div>
          <p className="text-blue-800 font-medium">
            <span className="font-semibold">Hint 1:</span> {hint1}
          </p>
        </div>
      </div>
      
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center">
          <div className="text-purple-600 mr-2">🔍</div>
          <p className="text-purple-800 font-medium">
            <span className="font-semibold">Hint 2:</span> {hint2}
          </p>
        </div>
      </div>
    </div>
  );
};