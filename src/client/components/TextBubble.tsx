import React from 'react';

interface TextBubbleProps {
  message: string;
  isVisible: boolean;
  className?: string;
}

export const TextBubble: React.FC<TextBubbleProps> = ({ 
  message, 
  isVisible, 
  className = '' 
}) => {
  if (!isVisible) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border-2 border-gray-200 
                     max-w-xs mx-auto animate-bounce-in">
        <p className="text-gray-800 text-sm font-medium text-center">
          {message}
        </p>
        
        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 
                         border-l-transparent border-r-transparent border-t-white"></div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 
                           border-l-transparent border-r-transparent border-t-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};