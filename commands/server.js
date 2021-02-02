module.exports = {
    name: 'server',
    description: 'Provide server info.',
    guildOnly: true,
    execute(message, args) {
	    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};