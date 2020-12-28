module.exports = {
  name: "purge",
  description: "Deletes up to 100 Messages",
  execute(client, message, args) {
    deleteNumber = Number(args[0]);

    if (deleteNumber <= 0 || deleteNumber > 99) {
      message.channel.send("Use a number 1-99");
      return;
    }
    try {
      message.channel.bulkDelete(deleteNumber + 1);
    } catch (error) {
      console.error(error);
      return message.channel.send("There was a problem running");
    }
  },
};
