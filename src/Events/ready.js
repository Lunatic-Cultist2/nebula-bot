const Event = require('../Structures/Event');

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
	}
};