export interface GameStatus {
  status: 'start' | 'playing' | 'paused' | 'ended' | '';
}

export interface StartPageProps {
  gameStatus?: string;
  setGameStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface WindowsButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface AppState {
  gameStatus: string;
}

// Sound manager types
export interface SoundManagerInterface {
  playClickSound(): Promise<void>;
  playKeyboardSound(): Promise<void>;
  initializeSounds(): Promise<void>;
}

// Game related types
export interface LetterState {
  correct: string;
  present: string;
  absent: string;
}

export interface KeyboardProps {
  letterStates: Record<string, LetterState>;
  onKey: (key: string) => void;
}