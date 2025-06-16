import { Devvit, useWebView, Context } from '@devvit/public-api';

type WebViewMessage =
  | {
      type: 'navigate';
      data?: { url: string };
    }
  | {
      type: 'submitPost';
      time: string;
    };

Devvit.addCustomPostType({
  name: '[Grumpy Granny] Post',
  height: 'tall',
  render: (context: Context) => {
    const { mount } = useWebView<WebViewMessage>({
      url: 'index.html',
      onMessage: async (message, _webView) => {
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

        {/* Button to open the webview */}
        <hstack width="100%" height="100%" alignment="bottom center" padding="large">
          <hstack width={40} height={40} backgroundColor="transparent" onPress={mount} />
        </hstack>
      </zstack>
    );
  },
});

export default Devvit;
