module.exports = {

    name: 'resume',
    description: 'resume audio',
    execute(client, message, args){
        connection = message.guild.voiceConnection
        connection.dispatcher.resume()
    }
}