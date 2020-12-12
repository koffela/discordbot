const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '~'

const fs = require('fs');

const fetch = require('node-fetch');

const querystring = require('querystring');

const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Jarvis version 1.0.1 Online');
});

client.on('message', async message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(command == 'ping'){
		client.commands.get('ping').execute(message, args);
		} else if(command == 'zotac'){
			client.commands.get('zotac').execute(message, args);
		} else if (command === 'urban') {
			if (!args.length) {
				return message.channel.send('You need to supply a search term!');
			}
			const query = querystring.stringify({ term: args.join(' ') });
			const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
			if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addField('Definition', trim(answer.definition, 1024))
			.addField('Example', trim(answer.example, 1024))
			.addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`);

		message.channel.send(embed);
		}
});




client.login('Nzg1Mjg5OTE2ODU0MDQyNjQ1.X81sOg.sHPcHvmgR08QW7L2KbH-xF2Z2lw')