const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const Keyv = require('keyv');

const keyv = new Keyv('sqlite://quotes.db');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
var myTimeout

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

keyv.on('error', err => console.error('Keyv connection error:', err));

//ready up
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('you while you sleep.', { type: 'WATCHING' });
});

//command handler
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	//prevent guild only commands being used outside of a guild
	if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
	}

	//error on no arguments
	if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    //check cooldown
    if (!cooldowns.has(command.name)) {
    	cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
	    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	    if (now < expirationTime) {
	        const timeLeft = (expirationTime - now) / 1000;
	        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	    }
	}

	//try console log - catch dm error.
	try {
		console.log(message.guild.name, '-', message.author.username, ':', message.content);
	}
	catch (error){
		console.log('DM -', message.author.username, ':', message.content);
	}

    //try command
	try {
	    command.execute(message, args);
	}
	catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
	}
});

//login
client.login(token);