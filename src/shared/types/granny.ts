export type GrannyMood = 'calm' | 'annoyed' | 'grumpy' | 'furious';

export type GameState = 'start' | 'playing' | 'success';

export interface HintPair {
  hint1: string;
  hint2: string;
  password: string;
}

export interface GameData {
  currentRound: number;
  grannyMood: GrannyMood;
  wrongAttempts: number;
  showCaptcha: boolean;
  timeLeft: number;
}

export type GameResponse = {
  status: 'success' | 'error';
  message?: string;
  correct?: boolean;
  gameData?: GameData;
  hints?: HintPair;
};