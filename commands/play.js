const ytdl = require("ytdl-core");
const queue = new Map();
const Youtube = require("simple-youtube-api");

const youtubeAPI = process.env.ytAPI;
const youtube = new Youtube(youtubeAPI);
const Discord = require("discord.js");

module.exports = {
  name: "play",
  description: "Plays the given youtube link",
  async execute(client, message, args) {
    try {
      try {
        message.delete();
      } catch (e) {
        message.channel.send("CANONONOT DELETE");
      }

      const serverQueue = queue.get(message.guild.id);

      if (!message.member.voiceChannel) {
        message.channel.send("Please connect to a voice channel");
        return;
      }
      if (!args[0]) {
        message.channel.send("Please give a YouTube link/string");
        return;
      }

      let validate = ytdl.validateURL(args[0]);

      if (!validate) {
        const videoList = await youtube.searchVideos(args, 3);
        var videoArray = [];

        for (let i = 0; i < videoList.length; i++) {
          videoArray.push(`${i + 1}: ${videoList[i].title}`);
        }
        videoArray.push("Exit");

        const embed = new Discord.MessageEmbed();
        embed.setColor("#e9f931");
        embed.setTitle("Choose a song by commenting a number between 1 and 3");
        embed.addField("Song 1", videoArray[0]);
        embed.addField("Song 2", videoArray[1]);
        embed.addField("Song 3", videoArray[2]);
        embed.addField("Exit", "exit");
        var songEmbed = await message.channel.send({ embed });

        try {
          // wait 1 minute for the user's response
          var response = await message.channel.awaitMessages(
            (msg) =>
              (msg.content > 0 && msg.content < 4) || msg.content === "exit",
            {
              max: 1,
              maxProcessed: 1,
              time: 60000,
              errors: ["time"],
            }
          );
          // assign videoIndex to user's response
          var videoIndex = parseInt(response.first().content);
        } catch (e) {
          console.eor(e);
          songEmbed.delete();
          return message.say(
            "Please try again and enter a number between 1 and 3 or exit"
          );
        }
        // if the user responded with 'exit', cancel the command
        if (response.first().content === "exit") return;

        var video = await youtube.getVideoByID(videoList[videoIndex - 1].id);

        message.channel.send(`Now Playing ${video.title}`);
        message.channel.send(video.thumbnails.high.url);
        var songurl = `https://www.youtube.com/watch?v=${video.raw.id}`;
      } else {
        var songurl = args[0];
      }

      message.member.voiceChannel.join().then((connection) => {
        const dispatcher = connection.playStream(ytdl(songurl));
        dispatcher.setVolume(0.1);

        dispatcher.on("error", (error) => {
          message.channel.send(error);
        });
        dispatcher.on("end", (end) => {
          message.member.voiceChannel.leave();
        });
      });
    } catch (e) {
      return console.log(e);
    }
  },
};
