import { WindowsButtonProps } from '../../shared/types';

function WindowsButton({
  className = '',
  onClick,
  children,
  disabled = false,
}: WindowsButtonProps) {
  return (
    <button
      className={`relative bg-button-face border-2 border-button-highlight border-b-button-shadow border-r-button-shadow px-4 py-2 text-button-text font-windows text-sm hover:bg-gray-300 active:border-button-shadow active:border-b-button-highlight active:border-r-button-highlight disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children || 'Windows Button'}
    </button>
  );
}

export default WindowsButton;
