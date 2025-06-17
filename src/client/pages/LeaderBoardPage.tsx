'use strict';
import React, { useEffect, useState } from 'react';
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
        setLeaderboardStats(leaderboardData);
      }
      setLoading(false);
    }
  });

  useEffect(() => {
    getLeaderboardData();
  }, []);

  return (
    <div className={`${loading && 'flex h-full w-full justify-center items-center'}`}>
      {loading ? (
        <div className="h-20 w-20 animate-spin">
          <img src="/granny-face.png" className="" alt="Loading..." />
        </div>
      ) : (
        <div>
          <div onClick={() => setGameStatus('start')}>home</div>

          {leaderboardStats.length ? (
            <div>
              {leaderboardStats.map((stat) => (
                <div>
                  <div className={`${stat.userName === currentUser && 'text-red-400'}`}>
                    Username: {stat.userName}
                  </div>
                  <div>
                    Score: {Math.floor(stat.score / 60)}m {stat.score % 60}s
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>No leaderboard data is present</>
          )}
        </div>
      )}
    </div>
  );
}

export default LeaderBoardPage;
