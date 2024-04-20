import { config } from '../config/index.js';
const { botId } = config.slack;
export const goodMorningRegex = new RegExp(`((G|g)ood morning ${botId})|(${botId} (G|g)ood morning)`);
export const hiRegex = new RegExp(`((H|h)(i|ey|ello) ${botId})|(${botId} (H|h)(i|ey|ello))`);
export const introduceYourselfRegex = new RegExp(`((I|i)ntroduce yourself ${botId})|(${botId} (I|i)ntroduce yourself)`);
