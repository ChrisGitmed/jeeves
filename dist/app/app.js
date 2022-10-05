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
// Listens for incoming messages that contain 'Hi', 'Hey', or 'Hello'
app.message(hiRegex, ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const split = message.text.split(' ');
    const target = split.indexOf(config.slack.botId);
    let response = '';
    if (((_a = split[target - 1]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'hi' || ((_b = split[target + 1]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'hi')
        response = 'Hi';
    else if (((_c = split[target - 1]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === 'hey' || ((_d = split[target + 1]) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === 'hey')
        response = 'Hey';
    else if (((_e = split[target - 1]) === null || _e === void 0 ? void 0 : _e.toLowerCase()) === 'hello' || ((_f = split[target + 1]) === null || _f === void 0 ? void 0 : _f.toLowerCase()) === 'hello')
        response = 'Hello';
    yield say(`${response} <@${message.user}>!`);
}));
// Listens for incoming messages that contain 'Introduce yourself'
app.message(introduceYourselfRegex, ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    yield say(`Hello <!here>, my name is Jeeves and I'll be your digital assistant. Beep Boop.`);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.start();
    console.log(`Bolt app is running`);
}))();
