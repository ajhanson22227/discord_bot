module.exports = {

    name: 'volume',
    description: 'Changes volume (1-100)',
    execute(client, message, args){
        if (isNaN(args[0])){
            message.channel.send("Please enter an integer 1-200")
            return
        }
        if (args[0] < 0){
            message.channel.send("Volume option too low")
            return
        }
        volume = args[0] / 100
        connection = message.guild.voiceConnection
        connection.dispatcher.setVolume(volume)
        console.log(volume)
    }
}