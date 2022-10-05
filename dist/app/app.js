var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Bolt from '@slack/bolt';
import { config } from '../config/index.js';
import { goodMorningRegex, hiRegex, introduceYourselfRegex, } from './regex.js';
const app = new Bolt.App({
    token: config.slack.botToken,
    signingSecret: config.slack.signingSecret,
    socketMode: true,
    appToken: config.slack.appToken,
    port: config.port,
});
// Listens for incoming messages that contain 'Good morning'
app.message(goodMorningRegex, ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    yield say(`Good morning <@${message.user}>, you rang?`);
}));
// Listens for incoming messages that contain 'Good morning'
app.message(hiRegex, ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    yield say(`Hi <@${message.user}>!`);
}));
// Listens for incoming messages that contain 'Introduce yourself'
app.message(introduceYourselfRegex, ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    yield say(`Hello <!here>, my name is Jeeves and I'll be your digital assistant. Beep Boop.`);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.start();
    console.log(`Bolt app is running`);
}))();
