import { Devvit, Post, useWebView, Context } from '@devvit/public-api';
import '../server/index';
import { defineConfig } from '@devvit/server';

defineConfig({
  name: '[Grumpy Granny] Create Post',
  entry: 'index.html',
  height: 'tall',
  menu: { enable: false },
});

export const Preview: Devvit.BlockComponent<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <zstack width="100%" height="100%" alignment="center middle">
      <vstack height={'100%'} width={'100%'}>
        <image
          url="wall-background.png"
          height={'100%'}
          width={'100%'}
          imageHeight={500}
          imageWidth={500}
          resizeMode="cover"
        />
      </vstack>
      <vstack width="100%" height="100%" alignment="center middle">
        <image
          url="loading.gif"
          description="Loading..."
          height="350px"
          width="600px"
          imageHeight="240px"
          imageWidth="240px"
          resizeMode="scale-down"
        />
        <spacer size="small" />
        <text maxWidth="80%" size="large" weight="bold" alignment="center middle" wrap>
          {text}
        </text>
      </vstack>
    </zstack>
  );
};

// Define the expected message type from the webview
type WebViewMessage = {
  type: 'navigate';
  data?: { url: string };
};

Devvit.addCustomPostType({
  name: '[Grumpy Granny] Post',
  height: 'tall',
  render: (context: Context) => {
    const { mount } = useWebView<WebViewMessage>({
      url: 'index.html',
      onMessage: (message, _webView) => {
        if (message.type === 'navigate' && message.data?.url) {
          context.ui.navigateTo(message.data.url);
        }
      },
    });

    return (
      <zstack width="100%" height="100%">
        {/* Background image covers the whole post */}
        <image
          url="reddit-page.gif"
          height="100%"
          width="100%"
          imageHeight={600}
          imageWidth={600}
          resizeMode="cover"
          description="Background"
        />

        {/* Top-right badge */}
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

Devvit.addMenuItem({
  label: '[Grumpy Granny]: New Post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    let post: Post | undefined;
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      post = await reddit.submitPost({
        title: 'Grumpy Granny',
        subredditName: subreddit.name,
        preview: <Preview text="" />,
      });

      ui.showToast({ text: 'Grumpy Granny post!' });
      ui.navigateTo(post);
    } catch (error) {
      if (post) {
        await post.remove(false);
      }
      if (error instanceof Error) {
        ui.showToast({ text: `Error creating post: ${error.message}` });
      } else {
        ui.showToast({ text: 'Error creating post!' });
      }
    }
  },
});

export default Devvit;
