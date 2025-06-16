export type GameStatus =
  | 'start' | 'rules' | 'playing' | 'paused' | 'ended' | 'win' | "leaderboard" | '';

export interface StartPageProps {
  gameStatus?: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
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

// Animation types
export interface GrannySpriteProps {
  gameStatus: GameStatus;
  className?: string;
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  hidden: {
    y: number;
    opacity: number;
  };
  visible: {
    y: number;
    opacity: number;
    transition: {
      type: string;
      duration: number;
      ease: string;
    };
  };
  exit: {
    y: number;
    opacity: number;
    transition: {
      type: string;
      duration: number;
      ease: string;
    };
  };
}

// Cursor types
export type CursorType = 'default' | 'pointer' | 'text' | 'wait' | 'not-allowed';

export interface CursorState {
  type: CursorType;
  isVisible: boolean;
}

export type GrannyStatusState = | "blinking" | "shouting"

export interface GrannyStatus {
  state: GrannyStatusState;
  words: string;
}

// Lock Screen types
export interface LockScreenProps {
  onUnlock: () => void;
}

export interface Hint {
  id: number;
  text: string;
  isCompleted: boolean;
}