const Command = require('../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['h', 'hi']
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const helloEmbed = new MessageEmbed()
			.setDescription('👋 - Hello!')
			.setColor('#FFD500')
		message.channel.send(helloEmbed);
	}
};
