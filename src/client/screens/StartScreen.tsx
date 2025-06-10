import React from 'react';

interface StartScreenProps {
  onStartGame: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 
                    flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center 
                     border-4 border-pink-200">
        <div className="mb-6">
          <div className="text-8xl mb-4">👵</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            The Grumpy Granny
          </h1>
          <p className="text-lg text-gray-600">
            Password Guessing Game
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Help crack Grandma's computer password! Use the hints to guess correctly, 
            but be careful - she gets grumpier with each wrong answer! 😤
          </p>
        </div>
        
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 
                     hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl 
                     text-xl transition-all duration-300 transform hover:scale-105 
                     shadow-lg hover:shadow-xl"
        >
          Start Game 🎮
        </button>
        
        <div className="mt-8 text-xs text-gray-500">
          Built with ❤️ using Bolt.new
        </div>
      </div>
    </div>
  );
};