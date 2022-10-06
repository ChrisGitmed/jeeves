import Bolt, { AppOptions } from '@slack/bolt';

import { config } from '../config/index.js';
import { hiRegex, introduceYourselfRegex } from './regex.js';

const app = new Bolt.App<AppOptions>({
  port: config.port,
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  socketMode: true,
  appToken: config.slack.appToken,
});

interface MessageEvent {
  message: any,
  say: Function,
}

// Listens for incoming messages that contain 'Hi', 'Hey', or 'Hello'
app.message(hiRegex, async ({ message, say }:MessageEvent)=>{
  const split = message.text.split(' ');
  const target = split.indexOf(config.slack.botId!);
  let response:string = '';
  if (split[target - 1]?.toLowerCase() === 'hi' || split[target + 1]?.toLowerCase() === 'hi') response = 'Hi';
  else if (split[target - 1]?.toLowerCase() === 'hey' || split[target + 1]?.toLowerCase() === 'hey') response = 'Hey';
  else if (split[target - 1]?.toLowerCase() === 'hello' || split[target + 1]?.toLowerCase() === 'hello') response = 'Hello';
  await say(`${response} <@${message.user}>!`);
});

// TODO: Listen for messages coming from Jira or BitBucket bots
app.message('', async ({ message, say }:MessageEvent) => {
  await say(`Jira update logged`);
});

// Listens for incoming messages that contain 'Introduce yourself'
app.message(introduceYourselfRegex, async({ message, say }) => {
  await say(`Hello <!here>, my name is Jeeves and I'll be your digital assistant. Beep Boop.`);
});

(async () => {
  await app.start()
  console.log(`Bolt app is running`);
})();
