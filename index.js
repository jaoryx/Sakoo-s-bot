require('dotenv').config({ path: 'config/.env' });
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const functions = require('./modules/functions');

// Initiate everything
const client = new Client({ 
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites
    ]
});

client.commands = new Collection();

// Link all functions to the client
const functionKeys = Object.keys(functions);
for (i = 0; i < functionKeys.length; i++) {
    client[functionKeys[i]] = functions[functionKeys[i]];
};

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Handle the unhandled exceptions
process.on('unhandledRejection', (error, p) => {
    client.Log('[ERROR]: ' + error);
})
.on('uncaughtException', err => {
    client.Log('[ERROR]: Uncaught exception: ', err);
});

client.rest.on("rateLimited", client.Log);

client.login(process.env.BOT_TOKEN);