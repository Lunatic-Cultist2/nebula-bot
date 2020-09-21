const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['h', 'commands'],
			description: 'Displays all the available commands you can use.',
			category: 'Utility Commands',
			usage: '[command]'
		});
	}

	async run(message, [command]) {
		const helpEmbed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`Help Prompt`, this.client.user.displayAvatarURL())
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Use command: ${this.client.prefix}help [command] for more information.`, this.client.user.displayAvatarURL())

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(`Invalid Command Named: \`${command}\``);

			helpEmbed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command`, this.client.user.displayAvatarURL());
			helpEmbed.setDescription([
                `**Prefix:** \`${this.client.prefix}\``,
				`**Description:** ${cmd.description}`,
                `**Category:** ${cmd.category}`,
                `\u200B`,
                `**Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' **,** ') : 'No Aliases'}`,
                `\u200B`,
				`**Example:** \`${cmd.usage}\``
            ])
            helpEmbed.setFooter(`Syntax: <> = required, [] = optional.`)
            helpEmbed.setColor('GREEN')

			return message.channel.send(helpEmbed);
		} else {
			helpEmbed.setDescription([
				`The bot's prefix is: \`${this.client.prefix}\``,
				`🔗 - [Invite Me!](https://discord.com/api/oauth2/authorize?client_id=750873820113403955&permissions=8&scope=bot) • [Support Server](https://discord.gg/NuE4767) • [Patreon](https://www.patreon.com/nebulabot)`
			]);
			let categories;
			if (!this.client.owners.includes(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				helpEmbed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' **,** '));
			}
			return message.channel.send(helpEmbed);
		}
	}
};