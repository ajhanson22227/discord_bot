module.exports = {

    name: 'pause',
    description: 'Pause audio',
    execute(client, message, args){
        connection = message.guild.voiceConnection
        connection.dispatcher.pause()
    }
}