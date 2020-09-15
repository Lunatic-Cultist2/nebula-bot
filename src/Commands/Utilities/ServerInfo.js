const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const regions = {
	brazil: '🇧🇷 - Brazil',
	europe: '🇪🇺 - Europe',
	hongkong: '🇭🇰 - Hong Kong',
	india: '🇮🇳 - India',
	japan: '🇯🇵 - Japan',
	russia: '🇷🇺 - Russia',
	singapore: '🇸🇬 - Singapore',
	southafrica: '🇿🇦 - South Africa',
	sydney: '🇦🇺 - Sydney',
	'us-central': '🇺🇸 - US Central',
	'us-east': '🇺🇸 - US East',
	'us-west': '🇺🇸 - US West',
	'us-south': '🇺🇸 - US South'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo'],
			description: 'Displays information about the Discord server that said message was run in.',
			category: 'Info Commands'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const serverEmbed = new MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setColor('#333333')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(`**Region:**`, `${regions[message.guild.region]}`)
            .addField(`**Server ID:**`, `${message.guild.id}`)
            .addField(`**Owner:**`, `👑 - <@${message.guild.ownerID}>`, true)
            .addField(`**Boosts:**`, `<:Boost:755566006499409941> - ${message.guild.premiumSubscriptionCount || '0'} (${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'})`, true)
            .addField(`**Total Server Members:**`, `${message.guild.memberCount} **Total** Members, ${members.filter(member => !member.user.bot).size} **Human** Members, ${members.filter(member => member.user.bot).size} **Bot(s)**`)
            .addField(`**Channels Count:**`, `#️⃣ - ${channels.filter(channel => channel.type === 'text').size} Text, 🔊 - ${channels.filter(channel => channel.type === 'voice').size} Voice`)
            .addField(`**Emojis Count:**`, `<:FeelsBadMan:755566006629302292> - ${emojis.size} Emojis`, true)
            .addField(`**Roles Count:**`, `${roles.length} Roles`, true)
            .addField(`**Server Creation Date:**`, `📆 - ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`)
            .setFooter(message.guild.name)
            .setTimestamp();
		message.channel.send(serverEmbed);
	}
};