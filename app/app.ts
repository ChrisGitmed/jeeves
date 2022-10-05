import Bolt from '@slack/bolt';
import { config } from '../config/index.js';
import {
  goodMorningRegex,
  hiRegex,
  introduceYourselfRegex,
} from './regex.js';

const app = new Bolt.App({
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  socketMode: true,
  appToken: config.slack.appToken,
  port: config.port,
});

interface callbackArgObj {
  message: any, // TODO: Figure out proper type for this
  say: Function,
}

// Listens for incoming messages that contain 'Good morning'
app.message(goodMorningRegex, async({ message, say }:callbackArgObj) => {
  await say(`Good morning <@${message.user}>, you rang?`);
});

// Listens for incoming messages that contain 'Hi', 'Hey', or 'Hello'
app.message(hiRegex, async({ message, say }:callbackArgObj) => {
  const split:string[] = message.text.split(' ');
  const target:number = split.indexOf(config.slack.botId!);
  let response:string = '';
  if (split[target - 1]?.toLowerCase() === 'hi' || split[target + 1]?.toLowerCase() === 'hi') response = 'Hi';
  else if (split[target - 1]?.toLowerCase() === 'hey' || split[target + 1]?.toLowerCase() === 'hey') response = 'Hey';
  else if (split[target - 1]?.toLowerCase() === 'hello' || split[target + 1]?.toLowerCase() === 'hello') response = 'Hello';
  await say(`${response} <@${message.user}>!`);
});

// Listens for incoming messages that contain 'Introduce yourself'
app.message(introduceYourselfRegex, async({ message, say }:callbackArgObj) => {
  await say(`Hello <!here>, my name is Jeeves and I'll be your digital assistant. Beep Boop.`);
});

(async () => {
  await app.start()
  console.log(`Bolt app is running`);
})();
