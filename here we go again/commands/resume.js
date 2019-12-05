module.exports = {

    name: 'resume',
    description: 'resume audio',
    execute(client, message, args){
    	message.delete(0)
        connection = message.guild.voiceConnection
        connection.dispatcher.resume()
    }
}