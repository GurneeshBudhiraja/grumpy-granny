import { Devvit, useWebView, Context } from '@devvit/public-api';

type WebViewMessage =
  | { type: 'navigate'; data?: { url: string } }
  | { type: 'submitPost'; time: string }
  | { type: 'getLeaderboard'; currentPlayer: string }
  | { type: 'saveLeaderboard'; data: { member: string; score: number } };

type DevvitToWebViewMessage = {
  type: 'leaderboardData';
  data: { member: string; score: number; rank?: number }[];
};

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: '[Grumpy Granny] Post',
  height: 'tall',
  render: (context: Context) => {
    const { mount } = useWebView<WebViewMessage, DevvitToWebViewMessage>({
      url: 'index.html',
      onMessage: async (message, webView) => {
        if (message.type === 'navigate' && message.data?.url) {
          context.ui.navigateTo(message.data.url);
        }
        // Handle leaderboard fetch
        else if (message.type === 'getLeaderboard') {
          const currentPlayer = await context.reddit.getCurrentUsername();

          if (!currentPlayer) {
            console.log('`currentPlayer` is `undefined`');
            return;
          }
          const topN = 9;
          let leaderboard = await context.redis.zRange('leaderboard', 0, topN, {
            reverse: true,
            by: 'score',
          });

          // Check if current player is in the top N
          const playerIndex = leaderboard.findIndex((entry) => entry.member === currentPlayer);

          if (playerIndex === -1) {
            // Get current player's score and rank
            const score = await context.redis.zScore('leaderboard', currentPlayer);
            const rank = await context.redis.zRank('leaderboard', currentPlayer);
            if (score !== undefined && rank !== undefined) {
              // Prepend current player to the leaderboard
              leaderboard = [{ member: currentPlayer, score, rank }, ...leaderboard];
            }
          }

          webView.postMessage({ type: 'leaderboardData', data: leaderboard });
        }
        // Handle leaderboard save
        else if (message.type === 'saveLeaderboard' && message.data) {
          console.log(message.data);
          const member = await context.reddit.getCurrentUsername();
          if (!member) {
            console.log('`member` is `undefined`');
            return;
          }
          await context.redis.zAdd('leaderboard', {
            member,
            score: message.data.score,
          });
          console.log('leaderboard has been updated');
        }
      },
    });

    return (
      <zstack width="100%" height="100%">
        <image
          url="reddit-page.gif"
          height="100%"
          width="100%"
          imageHeight={600}
          imageWidth={600}
          resizeMode="cover"
          description="Background"
        />
        <hstack width="100%" height="20%" alignment="top end" padding="small">
          <image
            onPress={() => {
              context.ui.navigateTo('https://bolt.new/');
            }}
            url="bolt-badge/white-badge.png"
            imageWidth={80}
            imageHeight={80}
            description="Built with Bolt.new badge"
          />
        </hstack>
        <hstack width="100%" height="100%" alignment="bottom center" padding="large">
          <hstack width={40} height={40} backgroundColor="transparent" onPress={mount} />
        </hstack>
      </zstack>
    );
  },
});

export default Devvit;
