const ytdl = require('ytdl-core');
const queue = new Map();

module.exports = {

    name: 'play',
    description: 'Plays the given youtube link',
    execute(client, message, args){
        message.delete()
        const serverQueue = queue.get(message.guild.id);

        if (!message.member.voiceChannel){
            message.channel.send("Please connect to a voice channel")
            return
        }
        if (!args[0]){
            message.channel.send("Please give a YouTube link")
            return
        }
        let validate = ytdl.validateURL(args[0])
        if (!validate){
            message.channel.send("Please enter a valid YouTube link")
            return
        }
        var song = args[0]

        message.member.voiceChannel.join().then(connection => {
            const dispatcher = connection.playStream(ytdl(song))

            dispatcher.on("error", error => {
                message.channel.send(error)
            })
            dispatcher.on("end", end => {
                message.member.voiceChannel.leave()
            })
        })
    }
}