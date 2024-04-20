import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: parseInt(process.env.PORT, 10),
    slack: {
        appToken: process.env.SLACK_APP_TOKEN,
        botId: process.env.SLACK_BOT_ID,
        botToken: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    }
};
