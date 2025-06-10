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
      <div className="dark-glass rounded-2xl px-4 py-3 shadow-2xl border-2 border-red-900 
                     max-w-xs mx-auto animate-bounce-in red-glow">
        <p className="text-red-100 text-sm font-medium text-center creepy-text animate-flicker">
          {message}
        </p>
        
        {/* Creepy speech bubble tail */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 
                         border-l-transparent border-r-transparent border-t-red-900"></div>
        </div>
      </div>
    </div>
  );
};