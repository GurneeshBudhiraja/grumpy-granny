import { Context } from '@devvit/public-api';
import { RedisClient } from '@devvit/redis';
import { HintPair, GameData, GrannyMood } from '../../shared/types/granny';

const HINT_PAIRS: HintPair[] = [
  {
    hint1: "Must start with 'dead'",
    hint2: "Include at least one number",
    password: "dead666"
  },
  {
    hint1: "Contains the word 'blood'",
    hint2: "Exactly 9 characters long",
    password: "bloodbath"
  },
  {
    hint1: "Starts with 'SCREAM'",
    hint2: "Ends with an exclamation mark",
    password: "SCREAM!"
  },
  {
    hint1: "Contains 'ghost' somewhere",
    hint2: "Has both letters and numbers",
    password: "ghost13"
  },
  {
    hint1: "Must include 'nightmare'",
    hint2: "Contains at least one uppercase letter",
    password: "Nightmare"
  },
  {
    hint1: "Starts with 'evil'",
    hint2: "Contains exactly 8 characters",
    password: "evilgran"
  },
  {
    hint1: "Contains the word 'death'",
    hint2: "Includes a special character",
    password: "death@me"
  },
  {
    hint1: "Must start with 'ESCAPE'",
    hint2: "Contains mixed case letters",
    password: "ESCAPEme"
  }
];

const GRANNY_REACTIONS = {
  calm: "I can hear you breathing... where are you hiding? 👁️",
  annoyed: "I know someone's in my house! Come out, come out! 😡",
  grumpy: "YOU CAN'T HIDE FROM ME FOREVER! I'LL FIND YOU! 👹",
  furious: "THAT'S IT! I'M COMING FOR YOU! NOWHERE TO RUN NOW! 💀"
};

const getGameKey = (postId: string, userId: string) => `escape_granny:${postId}:${userId}`;

export const getGameData = async (
  redis: Context['redis'] | RedisClient,
  postId: string,
  userId: string
): Promise<GameData> => {
  const key = getGameKey(postId, userId);
  const data = await redis.get(key);
  
  if (!data) {
    const newGame: GameData = {
      currentRound: 0,
      grannyMood: 'calm',
      wrongAttempts: 0,
      showCaptcha: false,
      timeLeft: 30
    };
    await redis.set(key, JSON.stringify(newGame), { expiration: 3600 }); // 1 hour expiry
    return newGame;
  }
  
  return JSON.parse(data);
};

export const updateGameData = async (
  redis: Context['redis'] | RedisClient,
  postId: string,
  userId: string,
  gameData: GameData
): Promise<void> => {
  const key = getGameKey(postId, userId);
  await redis.set(key, JSON.stringify(gameData), { expiration: 3600 });
};

export const getCurrentHints = (round: number): HintPair => {
  return HINT_PAIRS[round % HINT_PAIRS.length] || HINT_PAIRS[0];
};

export const checkPassword = (guess: string, round: number): boolean => {
  const currentHints = getCurrentHints(round);
  return guess.toLowerCase() === currentHints.password.toLowerCase();
};

export const getGrannyReaction = (mood: GrannyMood): string => {
  return GRANNY_REACTIONS[mood];
};

export const getNextMood = (currentMood: GrannyMood): GrannyMood => {
  const moods: GrannyMood[] = ['calm', 'annoyed', 'grumpy', 'furious'];
  const currentIndex = moods.indexOf(currentMood);
  return moods[Math.min(currentIndex + 1, moods.length - 1)];
};

export const resetGame = async (
  redis: Context['redis'] | RedisClient,
  postId: string,
  userId: string
): Promise<GameData> => {
  const newGame: GameData = {
    currentRound: 0,
    grannyMood: 'calm',
    wrongAttempts: 0,
    showCaptcha: false,
    timeLeft: 30
  };
  await updateGameData(redis, postId, userId, newGame);
  return newGame;
};