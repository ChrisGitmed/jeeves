import { config } from '../config/index.js';
const { botId } = config.slack;

export const goodMorningRegex:RegExp = new RegExp(`((G|g)ood morning ${botId})|(${botId} (G|g)ood morning)`);
export const introduceYourselfRegex:RegExp = new RegExp(`((I|i)ntroduce yourself ${botId})|(${botId} (I|i)ntroduce yourself)`)