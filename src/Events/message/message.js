const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    async run(message) {
        const prefixEmbed = new MessageEmbed();
			prefixEmbed.setDescription(`✅ - My prefix for **${message.guild.name}** is: \`${this.client.prefix}\``);
			prefixEmbed.setColor('#00FF00');
		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

		if (!message.guild || message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(prefixEmbed);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
			
		if(!message.content.startsWith(prefix)) return;

		// eslint-disable-next-line no-unused-vars
		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			command.run(message, args);
		}
    }
};