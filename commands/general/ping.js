const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping the bot to see the response time to Discord'),
	async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`Bot Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms - Websocket heartbeat: ${interaction.client.ws.ping}ms`);
	},
};