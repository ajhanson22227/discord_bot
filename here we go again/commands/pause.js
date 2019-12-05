module.exports = {

    name: 'pause',
    description: 'Pause audio',
    execute(client, message, args){
    	message.delete(0)
        connection = message.guild.voiceConnection
        connection.dispatcher.pause()
    }
}