const fetch = require("node-fetch");
const Discord = require ('discord.js')
const { apiKey } = require('../config.json');

module.exports = {
    name: 'gif',
    description: 'gif!',
    args: true,
    execute(message, args) {
		let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${args}&api_key=${apiKey}&limit=20`;
        fetch(giphyAPI).then(response => {return response.json()})
        .then(json => {
            gif = (json.data[Math.floor(Math.random() * json.data.length)].images.original.url);

            const embed = new Discord.MessageEmbed()
            .setTitle(`it\'s pronounced gif.`)
            .setDescription(`${args}`)
            .setImage(`${gif}`)
            .setColor(0xff0000);
            message.channel.send(embed);
        });
    },
};