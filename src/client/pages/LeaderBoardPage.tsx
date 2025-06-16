import React, { useEffect } from 'react';
import { GameStatus } from '../../shared/types';

interface LeaderBoardPageProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

function LeaderBoardPage({ setGameStatus }: LeaderBoardPageProps) {
  function getLeaderboardData() {
    window.parent.postMessage({ type: 'getLeaderboard' }, '*');
  }

  // Listen for leaderboard data
  window.addEventListener('message', (event) => {
    if (event.data.type === 'leaderboardData') {
      console.log('Leaderboard data received:');
      console.log(event.data);
    } 
  });
  useEffect(() => {
    console.log('getting the leaderboard data');
    getLeaderboardData();
  }, []);
  return <div>LeaderBoardPage</div>;
}

export default LeaderBoardPage;
