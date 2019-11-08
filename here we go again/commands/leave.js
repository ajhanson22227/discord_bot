module.exports = {

    name: 'leave',
    description: 'Leaves the voice channel',
    execute(client, message, args){
        message.member.voiceChannel.leave()
    }
}