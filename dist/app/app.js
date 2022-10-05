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
const { port, slack: { botToken, signingSecret, appToken, botId, } } = config;
const goodMorningRegex = new RegExp(`(G|g)ood morning ${botId}`);
const app = new Bolt.App({
    token: botToken,
    signingSecret: signingSecret,
    socketMode: true,
    appToken: appToken,
    port: port || 8080,
});
// Listens to incoming messages that contain 'Good morning @Jeeves'
app.message(goodMorningRegex, ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('message: ', message);
    yield say(`Good morning <@${message.user}>, you rang?`);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.start();
    console.log(`Bolt app is running`);
}))();
