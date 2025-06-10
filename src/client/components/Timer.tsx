import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeUp?: () => void;
  isActive: boolean;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ 
  initialTime, 
  onTimeUp, 
  isActive, 
  className = '' 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft > 20) return 'text-green-400';
    if (timeLeft > 10) return 'text-yellow-400';
    return 'text-red-400 animate-pulse';
  };

  const getTimerEffect = () => {
    if (timeLeft <= 5) return 'animate-shake';
    if (timeLeft <= 10) return 'animate-pulse';
    return '';
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`text-2xl font-bold ${getTimerColor()} ${getTimerEffect()} 
                      transition-colors duration-300 creepy-text`}>
        ⏰ {timeLeft}s
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 mt-2 border border-gray-700">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${
            timeLeft > 20 ? 'bg-green-500' : 
            timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'
          }`}
          style={{ width: `${(timeLeft / initialTime) * 100}%` }}
        ></div>
      </div>
      {timeLeft <= 10 && (
        <div className="text-red-400 text-sm mt-1 animate-flicker creepy-text">
          Time is running out! 💀
        </div>
      )}
    </div>
  );
};