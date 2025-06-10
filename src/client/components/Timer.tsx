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
    if (timeLeft > 20) return 'text-green-600';
    if (timeLeft > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`text-2xl font-bold ${getTimerColor()} transition-colors duration-300`}>
        ⏰ {timeLeft}s
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft > 20 ? 'bg-green-500' : 
            timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${(timeLeft / initialTime) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};