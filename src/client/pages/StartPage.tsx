import { Dispatch, SetStateAction } from 'react';
import WindowsButton from '../components/WindowsButton';

interface StartPageProps {
  gameStatus?: string;
  setGameStatus: Dispatch<SetStateAction<string>>;
}

function StartPage({ gameStatus, setGameStatus }: StartPageProps) {
  return (
    <>
      <div>{gameStatus}</div>
      <WindowsButton
        className="z-50 cursor-pointer"
        onClick={() => {
          console.log('click');
          setGameStatus((prev) => {
            if (prev === 'start') {
              return '';
            } else {
              return 'start';
            }
          });
        }}
      />
    </>
  );
}

export default StartPage;
