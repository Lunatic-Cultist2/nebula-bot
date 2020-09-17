const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['p', 'latency'],
			description: 'Displays the Discord bot\'s ping in the Discord server.',
			category: 'Utility Commands'
		});
	}

    // eslint-disable-next-line no-unused-vars
	async run(message, args) {
		message.channel.send('Pinging...').then((msg) => {
			const latency = msg.createdTimestamp - message.createdTimestamp;
			const pingEmbed = new MessageEmbed()
				.setDescription(`🏓 - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``)
				.setColor('#FF0000')
			msg.edit(pingEmbed);
			msg.edit('\u200B');
		});
	}
};