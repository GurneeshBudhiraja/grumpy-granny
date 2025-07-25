import React from 'react';
import { KeyboardProps } from '../shared/types';

const rows = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
];

export const Keyboard: React.FC<KeyboardProps> = ({ letterStates, onKey }) => {
  return (
    <div id="keyboard">
      {rows.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {i === 1 && <div className="spacer"></div>}
          {row.map((key) => (
            <button
              key={key}
              className={`keyboard-button ${key.length > 1 ? 'big' : ''} ${
                letterStates[key] || ''
              }`}
              onClick={() => onKey(key)}
            >
              {key !== 'Backspace' ? (
                <span>{key}</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path
                    fill="currentColor"
                    d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                  ></path>
                </svg>
              )}
            </button>
          ))}
          {i === 1 && <div className="spacer"></div>}
        </div>
      ))}
    </div>
  );
};