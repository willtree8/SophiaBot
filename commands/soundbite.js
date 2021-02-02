module.exports = {
	name: 'soundbite',
	description: 'Play a classic sophia clip',
	execute(message, args) {
		async function play(voiceChannel) {
			const connection = await voiceChannel.join();
			connection.play('audio.mp3');
		}
	},
};