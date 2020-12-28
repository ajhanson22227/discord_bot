const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}




client.once('ready', ()=>{
    console.log('Ready Freddy!');
});

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)){
        message.channel.send(`'${command}' is not a command`)
        return
    }

    try{
        client.commands.get(command).execute(client, message, args)
    }catch(error){
        console.error(error);
        message.reply('There was an error running that command')
    }
});


client.login(token)