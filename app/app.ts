import Bolt from '@slack/bolt';
import { config } from '../config/index.js';
const {
  port,
  slack: {
    botToken,
    signingSecret,
    appToken,
    botId,
  }
} = config
const goodMorningRegex = new RegExp(`((G|g)ood morning ${botId})|(${botId} (G|g)ood morning)`);

const app = new Bolt.App({
  token: botToken,
  signingSecret: signingSecret,
  socketMode: true,
  appToken: appToken,
  port: port || 8080,
});

// Listens to incoming messages that contain 'Good/good morning @Jeeves'
app.message(goodMorningRegex, async({ message, say }) => {
  console.log('message: ', message);
  await say(`Good morning <@${message.user}>, you rang?`);
});


(async () => {
  await app.start()
  console.log(`Bolt app is running`);
})();
