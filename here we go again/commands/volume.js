module.exports = {

    name: 'volume',
    description: 'Changes volume (1-100)',
    execute(client, message, args){
        if (isNaN(args[0])){
            message.channel.send("Please enter an integer 1-200")
            return
        }
        if (args[0] < 0 || args[0] > 200){
            message.channel.send("Volume option not valid. Enter 1-200")
            return
        }
        volume = args[0] / 100
        connection = message.guild.voiceConnection
        connection.dispatcher.setVolume(volume)
        console.log(volume)
    }
}