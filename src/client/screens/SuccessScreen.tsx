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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 
                    flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center 
                     border-4 border-green-200">
        <div className="mb-6">
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Granny Approves!
          </h1>
          <p className="text-lg text-gray-600">
            Well done, dear!
          </p>
        </div>
        
        <div className="mb-8">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <div className="text-6xl mb-4">👵✨</div>
            <p className="text-green-800 font-medium text-lg">
              "You're quite clever, aren't you? I'm impressed!"
            </p>
          </div>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 font-semibold">
              🏆 Rounds Completed: {roundsCompleted}
            </p>
          </div>
        </div>
        
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 
                     hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl 
                     text-xl transition-all duration-300 transform hover:scale-105 
                     shadow-lg hover:shadow-xl mb-4"
        >
          Play Again 🎮
        </button>
        
        <div className="text-xs text-gray-500">
          Built with ❤️ using Bolt.new
        </div>
      </div>
    </div>
  );
};