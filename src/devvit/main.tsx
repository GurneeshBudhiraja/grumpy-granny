import { Devvit, useWebView, Context } from '@devvit/public-api';

type WebViewMessage =
  | { type: 'navigate'; data?: { url: string } }
  | { type: 'submitPost'; time: string }
  | { type: 'getLeaderboard' }
  | { type: 'setLeaderboard'; data: { score: number } }
  // TODO: remove the type in prod
  | { type: 'clearScoreRedis' };

export type DevvitToWebViewMessage = {
  type: 'leaderboardData';
  data: string;
  currentUser: string;
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
        console.log('Message received');
        console.log(message);
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
          const score = (await context.redis.get('score')) ?? '';
          console.log('score');
          console.log(score);

          webView.postMessage({ type: 'leaderboardData', data: score, currentUser: currentPlayer });
        }
        // Handle leaderboard save
        else if (message.type === 'setLeaderboard' && message.data) {
          console.log(message.data);

          const member = await context.reddit.getCurrentUsername();
          if (!member) {
            console.log('`member` is `undefined`');
            return;
          }
          const { score } = message.data;
          const currentScore = (await context.redis.get('score')) as string | undefined;
          if (!currentScore) {
            await context.redis.set('score', JSON.stringify([{ score, userName: member }]));
            console.log('new entry has been updated in the empty leaderboard');
          } else {
            const existingScore = JSON.parse(currentScore) as {
              userName: string;
              score: number;
            }[];
            // checks if the user entry already exists
            const userExists = existingScore.find((entry) => entry.userName === member);
            if (userExists) {
              // updates the current user entry
              const updatedScore = existingScore.map((entry) =>
                entry.userName === member ? { ...entry, score } : entry
              );
              await context.redis.set('score', JSON.stringify(updatedScore));
              return;
            }
            // new entry for the user
            const newScore = [...existingScore, { score, userName: member }];
            await context.redis.set('score', JSON.stringify(newScore));
          }
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
