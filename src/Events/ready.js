const Event = require('../Structures/Event');
const { version } = require('../../package.json');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`Logged In As: ${this.client.user.username}`,
			`Loaded: ${this.client.commands.size} Commands!`,
			`Loaded: ${this.client.events.size} Events!`
		].join('\n'));

		this.client.user.setStatus('idle');

		const activities = [
			`${this.client.guilds.cache.size} Server(s)!`,
			`${this.client.channels.cache.size} Channel(s)!`,
			`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} User(s)!`,
			`${version}`,
			`Lunatic Cultist さん#6486`
		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, { type: 'PLAYING' }), 15000);

		// this.client.user.setActivity('discord.js', { type: 'PLAYING'});
	}
};