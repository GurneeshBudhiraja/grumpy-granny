import React, { useState, useEffect } from 'react';
import { GrannyAvatar } from '../components/GrannyAvatar';
import { TextBubble } from '../components/TextBubble';
import { HintPanel } from '../components/HintPanel';
import { Timer } from '../components/Timer';
import { CaptchaPlaceholder } from '../components/CaptchaPlaceholder';
import { GameData, HintPair } from '../../shared/types/granny';

interface GameScreenProps {
  gameData: GameData;
  hints: HintPair;
  onGuess: (guess: string) => void;
  onSuccess: () => void;
  reactionMessage: string;
  showReaction: boolean;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameData,
  hints,
  onGuess,
  onSuccess,
  reactionMessage,
  showReaction
}) => {
  const [guess, setGuess] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setShowCaptcha(gameData.showCaptcha);
  }, [gameData.showCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    await onGuess(guess.trim());
    setGuess('');
    setIsSubmitting(false);
  };

  const handleCaptchaComplete = () => {
    setShowCaptcha(false);
  };

  const handleTimeUp = () => {
    // Could add time-up logic here
    console.log('Time up!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-pink-200">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              The Grumpy Granny
            </h1>
            <div className="text-right">
              <div className="text-lg font-semibold text-purple-600">
                Round {gameData.currentRound + 1}
              </div>
              <div className="text-sm text-gray-600">
                Wrong attempts: {gameData.wrongAttempts}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Granny & Reaction */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-pink-200">
              <GrannyAvatar mood={gameData.grannyMood} className="mx-auto mb-4" />
              
              <TextBubble 
                message={reactionMessage} 
                isVisible={showReaction}
                className="mt-4"
              />
            </div>

            <Timer 
              initialTime={gameData.timeLeft}
              onTimeUp={handleTimeUp}
              isActive={!showCaptcha}
              className="bg-white rounded-2xl shadow-lg p-4 border-2 border-pink-200"
            />
          </div>

          {/* Right Column - Hints & Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Password Hints 🔍
              </h2>
              <HintPanel hint1={hints.hint1} hint2={hints.hint2} />
            </div>

            {showCaptcha ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-200">
                <CaptchaPlaceholder onComplete={handleCaptchaComplete} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Enter Password 🔐
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Type your guess here..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                             focus:border-purple-500 focus:outline-none text-lg
                             transition-colors duration-200"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!guess.trim() || isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 
                             hover:from-purple-600 hover:to-pink-700 
                             disabled:from-gray-400 disabled:to-gray-500
                             text-white font-bold py-3 px-6 rounded-lg text-lg
                             transition-all duration-300 transform hover:scale-105
                             disabled:transform-none disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? 'Checking...' : 'Submit Guess 🚀'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-pink-200 inline-block">
            <p className="text-sm text-gray-600">
              Built with ❤️ using <span className="font-semibold">Bolt.new</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};