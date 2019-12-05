module.exports = {

    name: 'stop',
    description: 'Destroys the bot',
    execute(client, message, args){
    	message.delete(0)
        if (message.author.id == "231220240774594560"){
            client.destroy();
        }else return
    }
}