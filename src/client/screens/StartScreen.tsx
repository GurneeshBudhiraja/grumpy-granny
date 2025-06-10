import React from 'react';

interface StartScreenProps {
  onStartGame: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-black horror-bg flex items-center justify-center p-4">
      <div className="dark-glass rounded-3xl shadow-2xl p-8 max-w-md w-full text-center 
                     border-4 border-red-900 red-glow">
        <div className="mb-6">
          <div className="text-8xl mb-4 animate-creepy-float">👵</div>
          <h1 className="text-4xl font-bold text-red-400 mb-2 creepy-text animate-pulse">
            ESCAPE THE GRANNY
          </h1>
          <p className="text-lg text-red-200 creepy-text">
            Password Nightmare
          </p>
        </div>
        
        <div className="mb-8">
          <div className="dark-glass border-2 border-red-800 rounded-xl p-4 mb-4">
            <p className="text-red-100 leading-relaxed text-sm">
              You're trapped in Granny's house! 🏚️
            </p>
          </div>
          <div className="dark-glass border-2 border-red-800 rounded-xl p-4">
            <p className="text-red-100 leading-relaxed text-sm">
              Crack her computer passwords to escape before she catches you! 
              But beware... each wrong guess makes her ANGRIER! 😈
            </p>
          </div>
        </div>
        
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 
                     hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl 
                     text-xl transition-all duration-300 transform hover:scale-105 
                     shadow-2xl red-glow creepy-text animate-pulse"
        >
          ENTER IF YOU DARE 💀
        </button>
        
        <div className="mt-8 text-xs text-gray-500">
          Built with 🩸 using Bolt.new
        </div>
      </div>
    </div>
  );
};