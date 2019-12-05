module.exports = {

    name: 'leave',
    description: 'Leaves the voice channel',
    execute(client, message, args){
    	message.delete(0)


        try{
        	if (!message.member.voiceChannel){
                    return
                }
                else{
                	message.member.voiceChannel.leave()
                	return
                }
            }
        catch(e){
        	console.log(e)
            }
    }
}