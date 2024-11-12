const { Events } = require('discord.js');

module.exports = {
	name: Events.ShardError,
	once: true,
	async execute(error, client) {
        client.Log('[ERROR]: ' + error);
	},
};