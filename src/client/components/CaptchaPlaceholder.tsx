import React from 'react';

interface CaptchaPlaceholderProps {
  onComplete: () => void;
  className?: string;
}

export const CaptchaPlaceholder: React.FC<CaptchaPlaceholderProps> = ({ 
  onComplete, 
  className = '' 
}) => {
  return (
    <div className={`dark-glass border-2 border-dashed border-red-600 
                    rounded-lg p-6 text-center red-glow ${className}`}>
      <div className="text-4xl mb-4 animate-creepy-float">👻</div>
      <h3 className="text-lg font-semibold text-red-300 mb-2 creepy-text">
        Granny's Security Check
      </h3>
      <p className="text-red-100 mb-4">
        Prove you're not one of her victims... yet! 💀
      </p>
      <button
        onClick={onComplete}
        className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 
                   hover:to-red-700 text-white font-bold py-2 px-4 
                   rounded-lg transition-all duration-200 transform hover:scale-105
                   shadow-lg red-glow creepy-text"
      >
        I'm Still Alive! 🧟‍♀️
      </button>
    </div>
  );
};