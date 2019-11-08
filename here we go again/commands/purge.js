module.exports = {

    name: 'purge',
    description: 'Deletes up to 100 Messages',
    execute(client, message, args){
        deleteNumber = Number(args[0]);

        if (deleteNumber <= 0){
            message.channel.send("Use a number 1-99");
            return;
        }
        try{
            message.channel.bulkDelete(deleteNumber).then(() =>{
                message.channel.send(`Deleted ${deleteNumber} messages`).then(msg => msg.delete(3000));
                });
            }catch(error){
                console.error(error)
                message.channel.send("There was a problem running")
            }
    }
}