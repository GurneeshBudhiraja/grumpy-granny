import express from 'express';
import { createServer, getContext, getServerPort } from '@devvit/server';
import { GameResponse } from '../shared/types/granny';
import { 
  getGameData, 
  updateGameData, 
  getCurrentHints, 
  checkPassword, 
  getGrannyReaction, 
  getNextMood,
  resetGame 
} from './core/granny-game';
import { getRedis } from '@devvit/redis';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const router = express.Router();

// Get current game state and hints
router.get<{}, GameResponse>('/api/game/state', async (_req, res): Promise<void> => {
  try {
    const { postId, userId } = getContext();
    const redis = getRedis();

    if (!postId || !userId) {
      res.status(400).json({
        status: 'error',
        message: 'Missing postId or userId'
      });
      return;
    }

    const gameData = await getGameData(redis, postId, userId);
    const hints = getCurrentHints(gameData.currentRound);

    res.json({
      status: 'success',
      gameData,
      hints
    });
  } catch (error) {
    console.error('Error getting game state:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get game state'
    });
  }
});

// Submit password guess
router.post<{}, GameResponse, { guess: string }>('/api/game/guess', async (req, res): Promise<void> => {
  try {
    const { guess } = req.body;
    const { postId, userId } = getContext();
    const redis = getRedis();

    if (!postId || !userId) {
      res.status(400).json({
        status: 'error',
        message: 'Missing postId or userId'
      });
      return;
    }

    if (!guess || typeof guess !== 'string') {
      res.status(400).json({
        status: 'error',
        message: 'Guess is required'
      });
      return;
    }

    const gameData = await getGameData(redis, postId, userId);
    const isCorrect = checkPassword(guess.trim(), gameData.currentRound);

    if (isCorrect) {
      // Correct guess - advance to next round
      gameData.currentRound += 1;
      gameData.grannyMood = 'calm';
      gameData.wrongAttempts = 0;
      gameData.showCaptcha = false;
      gameData.timeLeft = 30;
      
      await updateGameData(redis, postId, userId, gameData);
      
      res.json({
        status: 'success',
        correct: true,
        gameData,
        hints: getCurrentHints(gameData.currentRound),
        message: "Well done, dear! You got it right!"
      });
    } else {
      // Wrong guess - update mood and attempts
      gameData.wrongAttempts += 1;
      gameData.grannyMood = getNextMood(gameData.grannyMood);
      gameData.showCaptcha = gameData.wrongAttempts >= 2;
      
      await updateGameData(redis, postId, userId, gameData);
      
      const reaction = getGrannyReaction(gameData.grannyMood);
      
      res.json({
        status: 'success',
        correct: false,
        gameData,
        hints: getCurrentHints(gameData.currentRound),
        message: reaction
      });
    }
  } catch (error) {
    console.error('Error processing guess:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process guess'
    });
  }
});

// Reset game
router.post<{}, GameResponse>('/api/game/reset', async (_req, res): Promise<void> => {
  try {
    const { postId, userId } = getContext();
    const redis = getRedis();

    if (!postId || !userId) {
      res.status(400).json({
        status: 'error',
        message: 'Missing postId or userId'
      });
      return;
    }

    const gameData = await resetGame(redis, postId, userId);
    const hints = getCurrentHints(gameData.currentRound);

    res.json({
      status: 'success',
      gameData,
      hints,
      message: 'Game reset successfully!'
    });
  } catch (error) {
    console.error('Error resetting game:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reset game'
    });
  }
});

app.use(router);

const port = getServerPort();
const server = createServer(app);
server.on('error', (err) => console.error(`Server error: ${err.stack}`));
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));