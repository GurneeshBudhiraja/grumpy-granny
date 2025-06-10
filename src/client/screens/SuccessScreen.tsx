import React from 'react';

interface SuccessScreenProps {
  onPlayAgain: () => void;
  roundsCompleted: number;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  onPlayAgain, 
  roundsCompleted 
}) => {
  return (
    <div className="min-h-screen bg-black horror-bg flex items-center justify-center p-4">
      <div className="dark-glass rounded-3xl shadow-2xl p-8 max-w-md w-full text-center 
                     border-4 border-green-600 animate-pulse-glow">
        <div className="mb-6">
          <div className="text-8xl mb-4 animate-creepy-float">🏃‍♂️💨</div>
          <h1 className="text-4xl font-bold text-green-400 mb-2 creepy-text">
            YOU ESCAPED!
          </h1>
          <p className="text-lg text-green-200">
            Freedom at last!
          </p>
        </div>
        
        <div className="mb-8">
          <div className="dark-glass border-2 border-green-600 rounded-2xl p-6 mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-green-200 font-medium text-lg creepy-text">
              "You managed to escape Granny's house! But she'll be waiting for your return..."
            </p>
          </div>
          
          <div className="dark-glass border-2 border-blue-600 rounded-xl p-4">
            <p className="text-blue-300 font-semibold">
              🏆 Rooms Escaped: {roundsCompleted}/8
            </p>
            <p className="text-blue-200 text-sm mt-2">
              {roundsCompleted >= 8 ? "Perfect Escape! 💯" : "Try to escape all rooms next time! 🔓"}
            </p>
          </div>
        </div>
        
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 
                     hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl 
                     text-xl transition-all duration-300 transform hover:scale-105 
                     shadow-2xl red-glow creepy-text mb-4"
        >
          DARE TO RETURN? 👻
        </button>
        
        <div className="text-xs text-gray-500">
          Built with 🩸 using Bolt.new
        </div>
      </div>
    </div>
  );
};