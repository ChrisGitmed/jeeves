import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT,
    openaiKey: process.env.OPEN_AI_KEY,
    slack: {
        appToken: process.env.SLACK_APP_TOKEN,
        botId: process.env.SLACK_BOT_ID,
        botToken: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    },
};
