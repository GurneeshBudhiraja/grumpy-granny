import { useEffect, useState } from 'react';

export const App = () => {
  const [breating, setBreathing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setBreathing(!breating);
    }, 500);
  });
  return (
    <div className=''>
      Hello
      {breating ? (
        <img src="./granny-idle.png" className="w-64 h-64 object-contain contrast-115 brightness-90 sepia-10 grayscale-15 drop-shadow" />
      ) : (
        <img src="./granny-blink.png" className="w-64 h-64 object-contain contrast-115 brightness-90 sepia-10 grayscale-15 drop-shadow" />
      )}
    </div>
  );
};
