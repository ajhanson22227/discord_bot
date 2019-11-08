module.exports = {

    name: 'stop',
    description: 'Destroys the bot',
    execute(client, message, args){
        if (message.author.id == "231220240774594560"){
            client.destroy();
        }else return
    }
}