import { App } from '@slack/bolt';
import { config } from '../config/index.js';
import {
  goodMorningRegex,
  introduceYourselfRegex,
} from './regex.js';

const app = new App({
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  socketMode: true,
  appToken: config.slack.appToken,
  port: config.port,
});

// Listens for incoming messages that contain 'Good morning'
app.message(goodMorningRegex, async({ message, say }) => {
  console.log('message: ', message);
  await say(`Good morning <@${message.user}>, you rang?`);
});

// Listens for incoming messages that contain 'Introduce yourself'
app.message(introduceYourselfRegex, async({ message, say }) => {
  console.log('message: ', message);
  await say(`Hello <!here>, my name is Jeeves and I'll be your digital assistant. Beep Boop.`);
});


(async () => {
  await app.start()
  console.log(`Bolt app is running`);
})();
