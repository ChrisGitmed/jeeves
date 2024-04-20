import Bolt from '@slack/bolt';
// import OpenAI from 'openai';
import { OpenAI} from 'openai'

import { config } from '../config/index.js';

const openai = new OpenAI({ apiKey: config.openaiKey });

// Define the Application
const app = new Bolt.App({
    port: config.port,
    token: config.slack.botToken,
    signingSecret: config.slack.signingSecret,
    socketMode: true,
    appToken: config.slack.appToken,
});

// TODO: Listens for incoming messages that contain 'Introduce yourself'

// Listen for incoming messages
app.message('', async ({ message, say }) => {
    console.log('message: ', message);

    // TODO: Pass the message to OpenAI
    try { 
        const GPTOutput = await openai.completions.create({ 
            model: "gpt-3.5-turbo", 
            messages: [{ role: 'user', content: message }], 
        }); 
        const output_text = GPTOutput.data.choices[0].message.content; 
        console.log(output_text); 

    } catch (err) { 
        if (err.response) { 
            console.log(err.response.status); 
            console.log(err.response.data); 
        } else { 
            console.log(err.message); 
        } 
    } 

    // TODO: Pass the message to OpenAI
    // const aiResponse = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: message }],
    //     model: 'gpt-3.5-turbo',
    // });
    // console.log('aiResponse: ', aiResponse)

    // TODO Return the response
    // await say();
});

(async () => {
    await app.start();
    console.log(`Bolt app is running`);
})();
