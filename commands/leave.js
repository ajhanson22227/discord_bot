module.exports = {
  name: "leave",
  description: "Leaves the voice channel",
  execute(client, message, args) {
    try {
      if (!message.member.voice.channel) {
        return message.channel.send(
          "You're not in my channel. You're not the boss of me!"
        );
      } else {
        message.member.voice.channel.leave();
        return;
      }
    } catch (e) {
      return message.channel.send("UwU I made a mistake. Sowwy");
    }
  },
};
