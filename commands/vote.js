const Discord = require("discord.js");
module.exports = {
  name: "vote",
  description: "Vote on user string",
  async execute(client, message, args) {
    if (args.length < 1) {
      return;
    }

    let pollEmbed = new Discord.MessageEmbed();
    pollEmbed.setTitle("Poll");
    pollEmbed.setDescription(args.join(" "));

    let pollMessage = await message.channel.send(pollEmbed);
    await pollMessage.react("✅");
    await pollMessage.react("❎");

    const results = await pollMessage.awaitReactions(
      (reaction) =>
        reaction.emoji.name === "✅" || reaction.emoji.name === "❎",
      { time: 10000 }
    );

    let resultsEMbed = new Discord.MessageEmbed();
    resultsEMbed.setTitle("Poll Results");
    resultsEMbed.setDescription(`Results for this poll: ${args.join(" ")}`);
    resultsEMbed.addField("✅:", `${results.get("✅").count - 1} votes`);
    resultsEMbed.addField("❎:", `${results.get("❎").count - 1} votes`);

    message.channel.send(resultsEMbed);
    pollMessage.delete(0);
  },
};
