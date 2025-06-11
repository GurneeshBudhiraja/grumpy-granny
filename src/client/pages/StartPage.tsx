import { StartPageProps } from '../../shared/types';
import { WindowsButton } from '../components/components';

function StartPage({ gameStatus, setGameStatus }: StartPageProps) {
  const handleButtonClick = () => {
    console.log('Button clicked, current status:', gameStatus);
    setGameStatus((prev) => {
      const newStatus = prev === 'start' ? '' : 'start';
      console.log('Status changing from', prev, 'to', newStatus);
      return newStatus;
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative z-10">
      <div className="text-white mb-4">Current Status: {gameStatus}</div>
      <WindowsButton className="z-50 cursor-pointer" onClick={handleButtonClick}>
        Toggle Game Status
      </WindowsButton>
    </div>
  );
}

export default StartPage;
