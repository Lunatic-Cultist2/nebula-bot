const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const status = {
    online: '🟢 Online',
    dnd: '🔴 Do Not Disturb',
    offline: '⚪ Offline',
    idle: '🌙 Idle'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'ui', 'whois'],
			description: 'Displays information about a provided user or the message author.',
			category: 'Information',
			usage: '[user]'
		});
	}

	async run(message, [target]) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
            .slice(0, -1);
        function game() {
            let game;
            if (member.presence.activities.length >= 1) game = `${member.presence.activities[0].type.slice(0, 1).toUpperCase() + member.presence.activities[0].type.slice(1).toLowerCase()} **${member.presence.activities[0].name}**`;
            else if (member.presence.activities.length < 1) game = "Not Playing a Game";
                return game;
            }
        const serverEmbed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL(), member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor('#333333')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField(`**User ID:**`, `${member.id}`)
            .addField(`**Roles:**`, `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`)
            .addField(`**Account Created On:**`, `📆 - ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LT')}\n> ${moment(member.user.createdTimestamp).fromNow()}`)
            .addField(`**Joined Guild At:**`, `📆 - ${moment(member.joinedAt).format('LL')} ${moment(member.joinedAt).format('LT')}\n> ${moment(member.joinedAt).fromNow()}`)
			.addField(`**Status:**`, `${status[member.user.presence.status]}`, true)
            .addField(`**🎮 Game:**`, `${game()}`, true)
            .setFooter(member.user.tag)
            .setTimestamp()
		return message.channel.send(serverEmbed);
	}
};