module.exports = {

    name: 'leave',
    description: 'Leaves the voice channel',
    execute(client, message, args){
    	message.delete(0)
        message.member.voiceChannel.leave()
    }
}