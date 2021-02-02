const Discord = require ('discord.js')
const fetch = require("node-fetch");
const { apiKey } = require('../config.json');
let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=anime+fight&api_key=${apiKey}&limit=50`;

module.exports = {
	name: 'fight',
	usage: '<@enemy>',
	args: true,
	description: 'Fight dat biatch.',
	execute(message, args) {
		//get gif
        fetch(giphyAPI).then(response => {return response.json()})
        .then(json => {
            gif = (json.data[Math.floor(Math.random() * json.data.length)].images.original.url);
        	
        	//users involved
			hero = message.author
			enemy = args[0]

        	//win messages
			const win_msg = [
			'is victorious',
			'destroyed them!',
			'owned their ass',
			'was an absolute god!',
			'made sure they won\'t be sitting down for a week'
			]
			
			//create embed
			const embed = new Discord.MessageEmbed()
					.setTitle(`Fight!`)
					.setDescription(`${hero} challenges ${enemy} to a duel!`)
					.setImage(`${gif}`)
					.setColor(0xff0000);

			//pick random winner
			num = Math.floor(Math.random() * 2);
			if (num == 1) {
					embed.addField('Ouch!', `${hero} ${win_msg[Math.floor(Math.random() * win_msg.length)]}`);
			} else {
					embed.addField('Ooof!', `${enemy} ${win_msg[Math.floor(Math.random() * win_msg.length)]}`);
			}

			//send embed
			message.channel.send(embed);
		})
	},
};