import Bolt from '@slack/bolt';
import { config } from '../config/index.js';

const app = new Bolt.App({
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  socketMode: true,
  appToken: config.slack.appToken,
  port: config.port || 8080,
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  console.log('received?');
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  await app.start()
  console.log(`Bolt app is running`);
})();
