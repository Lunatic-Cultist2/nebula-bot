const Command = require('../../Structures/Command.js');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['up', 'ut']
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		message.channel.send(`📥 - My uptime is: \`${ms(this.client.uptime, { long: true })}\``);
	}
};