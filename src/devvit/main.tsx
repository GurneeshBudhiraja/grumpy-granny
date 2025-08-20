import { Devvit, useWebView, Context } from '@devvit/public-api';

type WebViewMessage =
  | { type: 'navigate'; data?: { url: string } }
  | { type: 'submitPost'; time: string }
  | { type: 'getLeaderboard' }
  | { type: 'setLeaderboard'; data: { score: number } }
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

// Add a menu item to create the post
Devvit.addMenuItem({
  label: 'Create Grumpy Granny Post',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const subreddit = await context.reddit.getCurrentSubreddit();
    const post = await context.reddit.submitPost({
      title: '[Grumpy Granny] Post',
      subredditName: subreddit.name,
      preview: (
        <zstack width="100%" height="100%">
          <image
            url="loading.gif"
            height="100%"
            width="100%"
            imageHeight={600}
            imageWidth={600}
            resizeMode="cover"
            description="Background"
          />
        </zstack>
      ),
    });
    context.ui.showToast('Created Grumpy Granny post!');
    context.ui.navigateTo(post);
  },
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
        } else if (message.type === 'getLeaderboard') {
          const currentPlayer = await context.reddit.getCurrentUsername();
          if (!currentPlayer) return;
          const score = (await context.redis.get('score')) ?? '';
          webView.postMessage({ type: 'leaderboardData', data: score, currentUser: currentPlayer });
        } else if (message.type === 'setLeaderboard' && message.data) {
          const member = await context.reddit.getCurrentUsername();
          if (!member) return;
          const { score } = message.data;
          const currentScore = (await context.redis.get('score')) as string | undefined;
          if (!currentScore) {
            await context.redis.set('score', JSON.stringify([{ score, userName: member }]));
          } else {
            const existingScore = JSON.parse(currentScore) as { userName: string; score: number }[];
            const userExists = existingScore.find((entry) => entry.userName === member);
            if (userExists) {
              const updatedScore = existingScore.map((entry) =>
                entry.userName === member ? { ...entry, score } : entry
              );
              await context.redis.set('score', JSON.stringify(updatedScore));
              return;
            }
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
        <hstack width="100%" height="100%" alignment="bottom center" padding="large">
          <hstack width={40} height={40} backgroundColor="transparent" onPress={mount} />
        </hstack>
      </zstack>
    );
  },
});

export default Devvit;
