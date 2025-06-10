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
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 
                    rounded-lg p-6 text-center ${className}`}>
      <div className="text-4xl mb-4">🤖</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Granny-CAPTCHA
      </h3>
      <p className="text-gray-600 mb-4">
        Prove you're not a robot by clicking the button below!
      </p>
      <button
        onClick={onComplete}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 
                   rounded-lg transition-colors duration-200"
      >
        I'm Human! 🙋‍♀️
      </button>
    </div>
  );
};