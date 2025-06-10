import { Context } from '@devvit/public-api';
import { RedisClient } from '@devvit/redis';
import { HintPair, GameData, GrannyMood } from '../../shared/types/granny';

const HINT_PAIRS: HintPair[] = [
  {
    hint1: "Must start with 'ap'",
    hint2: "Include at least one number",
    password: "apple123"
  },
  {
    hint1: "Contains the word 'cat'",
    hint2: "Exactly 8 characters long",
    password: "mycat456"
  },
  {
    hint1: "Starts with a capital letter",
    hint2: "Ends with an exclamation mark",
    password: "Hello123!"
  },
  {
    hint1: "Contains 'sun' somewhere",
    hint2: "Has both letters and numbers",
    password: "sunshine7"
  },
  {
    hint1: "Must include 'home'",
    hint2: "Contains at least one uppercase letter",
    password: "Home2024"
  },
  {
    hint1: "Starts with 'gr'",
    hint2: "Contains exactly 6 characters",
    password: "granny"
  },
  {
    hint1: "Contains the word 'tea'",
    hint2: "Includes a special character",
    password: "teatime@"
  },
  {
    hint1: "Must start with 'old'",
    hint2: "Contains mixed case letters",
    password: "OldWise1"
  }
];

const GRANNY_REACTIONS = {
  calm: "Now dear, that's not quite right. Try again!",
  annoyed: "Hmph! Pay attention to the hints, sweetie.",
  grumpy: "Oh for goodness sake! Are you even trying?",
  furious: "THAT'S IT! One more wrong guess and you're in trouble!"
};

const getGameKey = (postId: string, userId: string) => `granny_game:${postId}:${userId}`;

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