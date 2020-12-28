module.exports = {
  name: "pause",
  description: "Pause audio",
  execute(client, message, args) {
    try {
      connection = message.guild.voice.connection;
      connection.dispatcher.pause();
    } catch (e) {
      return message.channel.send("Uh-Oh. Error. Am I not in a Channel?");
    }
  },
};
