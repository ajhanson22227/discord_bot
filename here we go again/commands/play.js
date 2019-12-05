const ytdl = require('ytdl-core');
const queue = new Map();
const Youtube = require('simple-youtube-api');
const { youtubeAPI } = require('../config.json');
const youtube = new Youtube(youtubeAPI);

module.exports = {

    name: 'play',
    description: 'Plays the given youtube link',
    async execute(client, message, args){
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
            //message.channel.send("Please enter a valid YouTube link")
            //return
            const videoString = await youtube.searchVideos(args, 1);
            var video = await youtube.getVideoByID(videoString[0].id);
            message.channel.send(`Now Playing ${video.title}`);
            message.channel.send(video.thumbnails.high.url);
            var songurl = `https://www.youtube.com/watch?v=${video.raw.id}`;

        }
        else{
            var songurl = args[0]
        }

        message.member.voiceChannel.join().then(connection => {
            const dispatcher = connection.playStream(ytdl(songurl))
            dispatcher.setVolume(.1)

            dispatcher.on("error", error => {
                message.channel.send(error)
            })
            dispatcher.on("end", end => {
                message.member.voiceChannel.leave()
            })
        })
    }
}