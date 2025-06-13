import React, { useState } from 'react';

const splashImages = [
  '/splash1.png',
  '/splash2.png',
  '/splash3.png',
  '/splash4.png',
  '/splash5.png',
  '/splash6.png',
  '/splash7.png',
  '/splash8.png',
  '/splash9.png',
];

interface CaptchaChallengeProps {
  onVerified: () => void;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onVerified }) => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (i: number) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  return (
    <div className="mt-2">
      {!showCaptcha ? (
        <div
          className="text-yellow-300 font-windows text-sm cursor-pointer select-none"
          onClick={() => setShowCaptcha(true)}
        >
          Prove you’re not Granny’s dentures!
        </div>
      ) : (
        <div
          className="bg-black bg-opacity-90 p-4 rounded font-windows text-green-300 text-sm"
          style={{ border: '2px solid var(--window-border)' }}
        >
          <div>Select all images containing Granny’s dentures:</div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {splashImages.map((src, i) => (
              <div
                key={i}
                className={`border-2 ${
                  selected.includes(i) ? 'border-green-500' : 'border-gray-600'
                } cursor-pointer`}
                onClick={() => toggle(i)}
              >
                <img src={src} alt="splash" className="w-full h-20 object-cover" />
              </div>
            ))}
          </div>
          <button
            onClick={() => onVerified()}
            disabled={selected.length === 0}
            className={`mt-4 px-3 py-1 rounded font-windows text-sm transition 
              ${selected.length ? 'bg-button-face text-text-color' : 'bg-gray-700 text-gray-500'}`}
            style={{
              border: '1px solid var(--button-shadow)',
            }}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default CaptchaChallenge;
