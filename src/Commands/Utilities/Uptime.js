const Command = require('../../Structures/Command.js');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['up', 'ut'],
			description: 'Displays how long the Discord bot has been online for.',
			category: 'Utility Commands'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const uptimeEmbed = new MessageEmbed()
			.setDescription(`📥 - My uptime is: \`${ms(this.client.uptime, { long: true })}\``)
			.setColor('#00FF00')
		message.channel.send(uptimeEmbed);
	}
};