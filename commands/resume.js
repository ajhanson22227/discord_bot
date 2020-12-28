module.exports = {
  name: "resume",
  description: "resume audio",
  execute(client, message, args) {
    try {
      connection = message.guild.voice.connection;
      connection.dispatcher.resume();
    } catch (e) {
      return message.channel.send("Uh-Oh. Error. Am I not in a Channel?");
    }
  },
};
