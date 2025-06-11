import { Dispatch, SetStateAction } from 'react';

interface WindowsButtonProps {
  className?: string;
  onClick?: () => void | Dispatch<SetStateAction<string | number | object>>;
}

function WindowsButton({ className, onClick }: WindowsButtonProps) {
  return (
    <button className={`${className}`} onClick={onClick && onClick}>
      WindowsButton
    </button>
  );
}

export default WindowsButton;
