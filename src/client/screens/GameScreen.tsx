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
    console.log('Time up! Granny is coming...');
  };

  return (
    <div className="min-h-screen bg-black horror-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="dark-glass rounded-2xl shadow-2xl p-6 mb-6 border-2 border-red-900 red-glow">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-400 creepy-text animate-pulse">
              ESCAPE THE GRANNY
            </h1>
            <div className="text-right">
              <div className="text-lg font-semibold text-red-300 creepy-text">
                Room {gameData.currentRound + 1}/8
              </div>
              <div className="text-sm text-red-200">
                Failed attempts: {gameData.wrongAttempts} 💀
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Granny & Reaction */}
          <div className="space-y-6">
            <div className="dark-glass rounded-2xl shadow-2xl p-8 text-center border-2 border-red-900 red-glow">
              <div className="mb-4">
                <div className="text-red-300 text-sm creepy-text animate-flicker">
                  {gameData.grannyMood === 'calm' && "She's watching... 👁️"}
                  {gameData.grannyMood === 'annoyed' && "She's getting suspicious... 🔍"}
                  {gameData.grannyMood === 'grumpy' && "She knows you're here! 😡"}
                  {gameData.grannyMood === 'furious' && "RUN! SHE'S COMING! 🏃‍♂️💨"}
                </div>
              </div>
              
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
              className="dark-glass rounded-2xl shadow-2xl p-4 border-2 border-red-900 red-glow"
            />
          </div>

          {/* Right Column - Hints & Input */}
          <div className="space-y-6">
            <div className="dark-glass rounded-2xl shadow-2xl p-6 border-2 border-red-900 red-glow">
              <h2 className="text-xl font-bold text-red-300 mb-4 creepy-text">
                Computer Terminal 💻
              </h2>
              <div className="text-green-400 text-xs font-mono mb-4 animate-pulse">
                > ACCESSING GRANNY'S FILES...
                <br />
                > PASSWORD REQUIRED
                <br />
                > HINT SYSTEM ACTIVATED
              </div>
              <HintPanel hint1={hints.hint1} hint2={hints.hint2} />
            </div>

            {showCaptcha ? (
              <div className="dark-glass rounded-2xl shadow-2xl p-6 border-2 border-red-900 red-glow">
                <CaptchaPlaceholder onComplete={handleCaptchaComplete} />
              </div>
            ) : (
              <div className="dark-glass rounded-2xl shadow-2xl p-6 border-2 border-red-900 red-glow">
                <h2 className="text-xl font-bold text-red-300 mb-4 creepy-text">
                  Enter Password 🔐
                </h2>
                <div className="text-green-400 text-xs font-mono mb-4">
                  > ENTER_PASSWORD: _
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Type password here..."
                    className="w-full px-4 py-3 bg-black border-2 border-red-700 rounded-lg 
                             focus:border-red-500 focus:outline-none text-lg text-green-400
                             transition-colors duration-200 font-mono red-glow"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!guess.trim() || isSubmitting}
                    className="w-full bg-gradient-to-r from-red-800 to-red-900 
                             hover:from-red-700 hover:to-red-800 
                             disabled:from-gray-700 disabled:to-gray-800
                             text-white font-bold py-3 px-6 rounded-lg text-lg
                             transition-all duration-300 transform hover:scale-105
                             disabled:transform-none disabled:cursor-not-allowed
                             shadow-2xl red-glow creepy-text"
                  >
                    {isSubmitting ? 'ACCESSING...' : 'HACK SYSTEM 💀'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="dark-glass rounded-2xl shadow-2xl p-4 border-2 border-red-900 red-glow inline-block">
            <p className="text-sm text-red-200">
              Built with 🩸 using <span className="font-semibold text-red-300">Bolt.new</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};