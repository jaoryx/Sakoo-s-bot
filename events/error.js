const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	once: true,
	async execute(error, client) {
		client.Log('[ERROR]: ' + error);
	},
};