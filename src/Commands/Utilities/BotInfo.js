const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../Structures/Command');
const { utc } = require('moment');
const os = require('os');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['info', 'bot', 'stats'],
			description: 'Displays information about the Discord bot.',
			category: 'Information'
		});
	}

	async run(message) {
        const core = os.cpus()[0];
        const botEmbed = new MessageEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
			.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
			.setColor('#333333')
            .addField(`**Servers:**`, `📂 - \`${this.client.guilds.cache.size.toLocaleString()}\``, true)
            .addField(`**Users:**`, `👥 - \`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``, true)
            .addField(`**Channels:**`, `💾 - \`${this.client.channels.cache.size.toLocaleString()}\``, true)
			.addField(`**Creation Date:**`, `📆 - ${utc(this.client.user.createdTimestamp).format('LL')} ${utc(this.client.user.createdTimestamp).format('LT')}\n> ${utc(this.client.user.createdTimestamp).fromNow()}`)
			.addField(`**CPU:**`, `📥 - \`${core.model}\``)
			.addField(`**The Nexus:**`, `🔗 - [Invite Me!](https://discord.com/api/oauth2/authorize?client_id=750873820113403955&permissions=8&scope=bot) • [Support Server](https://discord.gg/NuE4767) • [Patreon](https://www.patreon.com/nebulabot)`)
            .addField(`**Node.js:**`, `\`${process.version}\``, true)
            .addField(`**Version:**`, `\`v${version}\``, true)
			.addField(`**Discord.js:**`, `\`v${djsversion}\``, true)
            .setFooter(this.client.user.tag)
			.setTimestamp()
		return message.channel.send(botEmbed);
	}

};