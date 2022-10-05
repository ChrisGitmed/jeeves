import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number,
  slack: {
    appToken: string | undefined,
    botId: string | undefined,
    botToken: string | undefined,
    signingSecret: string | undefined,
  }
}

export const config:Config = {
  port: parseInt(process.env.PORT!, 10),
  slack: {
    appToken: process.env.SLACK_APP_TOKEN!,
    botId: process.env.SLACK_BOT_ID!,
    botToken: process.env.SLACK_BOT_TOKEN!,
    signingSecret: process.env.SLACK_SIGNING_SECRET!,
  }
};
