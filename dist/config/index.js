import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT,
    slack: {
        appToken: process.env.SLACK_APP_TOKEN,
        botToken: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    }
};
