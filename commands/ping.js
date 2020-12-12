module.exports = {
	name: 'ping',
	description: "This is the ping command",
	execute(message, args){
		message.channel.send('pong!');
	}
}