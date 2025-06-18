'use strict';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameStatus } from '../../shared/types';

interface LeaderBoardPageProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

interface LeaderboardStatsType {
  userName: string;
  score: number;
}

function LeaderBoardPage({ setGameStatus }: LeaderBoardPageProps) {
  const [leaderboardStats, setLeaderboardStats] = useState<LeaderboardStatsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>('');

  function getLeaderboardData() {
    window.parent.postMessage({ type: 'getLeaderboard' }, '*');
    window.parent.postMessage({
      type: 'getCurrentUserName',
    });
  }

  // Listen for leaderboard data
  window.addEventListener('message', (event) => {
    const { data: eventData } = event;
    const { data } = eventData;
    const { message } = data as {
      message: {
        type: 'leaderboardData';
        data: string;
        currentUser: string;
      };
    };

    if (message.type === 'leaderboardData') {
      if (!message.data) {
        setLeaderboardStats([]);
      } else {
        const leaderboardData = JSON.parse(message.data) as LeaderboardStatsType[];
        const { currentUser } = message;
        setCurrentUser(currentUser);

        // Sort by score (ascending - lower time is better)
        const sortedData = leaderboardData.sort((a, b) => a.score - b.score);
        setLeaderboardStats(sortedData);
      }
      setLoading(false);
    }
  });

  useEffect(() => {
    getLeaderboardData();
  }, []);

  // Format time helper
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  // Get medal for position
  const getMedal = (position: number): string => {
    switch (position) {
      case 1:
        return '🥇'; // Gold
      case 2:
        return '🥈'; // Silver
      case 3:
        return '🥉'; // Bronze
      default:
        return '';
    }
  };

  // Get background class for position
  const getPositionBg = (position: number, isCurrentUser: boolean): string => {
    if (isCurrentUser) {
      // Classic Windows-98 selection blue
      return 'bg-blue-300 text-black border-blue-700';
    }
    switch (position) {
      case 1:
        // Gold medal row
        return 'bg-yellow-200 text-black border-yellow-600';
      case 2:
        // Silver medal row
        return 'bg-gray-200 text-black border-gray-600';
      case 3:
        // Bronze medal row
        return 'bg-orange-200 text-black border-orange-600';
      default:
        // Default rows: light gray fill with medium gray border
        return 'bg-gray-100 text-black border-gray-500';
    }
  };

  return (
    <motion.div
      className="w-full h-full bg-desktop-bg relative flex flex-col overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Vintage CRT scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
          }}
        />
      </div>

      {loading ? (
        <div className="flex h-full w-full justify-center items-center">
          <motion.div
            className="h-20 w-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <img
              src="/granny-face-shots/granny-face.png"
              className="w-full h-full"
              alt="Loading..."
            />
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col h-full p-2">
          {/* Header */}
          <motion.div
            className="bg-gray-300 text-black border-2 border-gray-500 py-1 px-3 mb-px"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Title Bar */}
            <div className="bg-highlight-bg text-highlight-text px-2 py-1 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGameStatus('start')}
                  className="w-6 h-6 bg-button-face border border-button-shadow hover:bg-gray-300 text-xs font-windows flex items-center justify-center cursor-pointer"
                  style={{
                    boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
                  }}
                >
                  ←
                </button>
              </div>
              <div className="text-xs font-windows">Granny's Password Champions</div>
            </div>
          </motion.div>

          {/* Leaderboard Content */}
          <div className="flex-1 relative">
            {leaderboardStats.length ? (
              <motion.div
                className="bg-gray-300 text-black border-2 border-gray-500 h-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Leaderboard Header Row */}
                <div className="sticky top-0 z-10 bg-gray-300 text-black border-b-2 border-gray-500 p-1">
                  <div className="grid grid-cols-12 gap-2 text-xs sm:text-sm font-windows font-bold text-text-color">
                    <div className="col-span-2 text-center">RANK</div>
                    <div className="col-span-6 sm:col-span-7">PLAYER</div>
                    <div className="col-span-4 sm:col-span-3 text-center">TIME</div>
                  </div>
                </div>

                {/* Scrollable Leaderboard List */}
                <div className="h-full overflow-y-auto windows-scrollbar p-1">
                  <AnimatePresence>
                    {leaderboardStats.map((stat, index) => {
                      const position = index + 1;
                      const isCurrentUser = stat.userName === currentUser;
                      const medal = getMedal(position);

                      return (
                        <motion.div
                          key={`${stat.userName}-${stat.score}`}
                          className={`grid grid-cols-12 gap-2 sm:p-1 mb-2 border-2 rounded relative ${getPositionBg(position, isCurrentUser)}`}
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          style={{
                            boxShadow: isCurrentUser
                              ? 'inset -1px -1px 0px 0px #1e40af, inset 1px 1px 0px 0px #60a5fa, 0 4px 8px rgba(59, 130, 246, 0.3)'
                              : position <= 3
                                ? 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff, 0 2px 4px rgba(0, 0, 0, 0.2)'
                                : 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
                          }}
                        >
                          {/* Rank Column */}
                          <div className="col-span-2 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              {medal && <div className="text-2xl sm:text-3xl mb-1">{medal}</div>}
                              {index > 2 && (
                                <span className="text-sm sm:text-base font-windows font-bold p-1.5">
                                  #{position}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Player Name Column */}
                          <div className="col-span-6 sm:col-span-7 flex items-center">
                            <div className="flex items-center space-x-1 w-full overflow-hidden">
                              <span className="truncate flex-1 text-sm sm:text-lg font-windows font-bold">
                                {stat.userName}
                              </span>
                              {isCurrentUser && (
                                <span className="flex-shrink-0 inline-block bg-blue-700 text-white border border-blue-900 rounded px-1 py-0.5 text-xs sm:text-sm font-windows">
                                  YOU
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Time Column */}
                          <div className="col-span-4 sm:col-span-3 flex items-center justify-center">
                            <span
                              className={`text-sm sm:text-base font-windows font-bold ${
                                position <= 3 && !isCurrentUser ? 'text-gray-800' : ''
                              }`}
                            >
                              {formatTime(stat.score)}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              // no leaderboard stats
              <motion.div
                className="bg-window-bg border-2 border-button-shadow border-t-button-highlight border-l-button-highlight h-full flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  boxShadow:
                    'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, inset 2px 2px 0px 0px #dfdfdf',
                }}
              >
                <div className="text-center p-8">
                  <div className="text-4xl sm:text-6xl mb-4">🏆</div>
                  <h2 className="text-lg sm:text-xl font-windows font-bold text-text-color mb-2">
                    No Champions Yet!
                  </h2>
                  <p className="text-sm font-windows text-text-color mb-4">
                    Be the first to crack Granny's password and claim your spot!
                  </p>
                  <button
                    onClick={() => setGameStatus('start')}
                    className="px-4 py-2 bg-button-face border-2 border-button-highlight border-b-button-shadow border-r-button-shadow font-windows text-sm hover:bg-gray-300 active:border-button-shadow active:border-b-button-highlight active:border-r-button-highlight cursor-pointer"
                    style={{
                      boxShadow: 'inset -1px -1px 0px 0px #808080, inset 1px 1px 0px 0px #ffffff',
                    }}
                  >
                    Start Playing
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default LeaderBoardPage;
