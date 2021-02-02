const client = require ('../index.js')
module.exports = {
    name: 'addquote',
    description: 'Attributed a quote to a specific user',
    args: true,
    usage: '<user> <"quote text">',
    execute(message, args) {
        //Extract quote

        //message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
        var messageText = "";
        for (i = 1; i < (args.length); i++) {
        	messageText = messageText + ` ` + args[i];
        }
        //message.channel.send(`${messageText}`);

        //let score = client.getScore.get(args[0], message.guild.id);
    },
};