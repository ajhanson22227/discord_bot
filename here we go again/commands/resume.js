module.exports = {

    name: 'resume',
    description: 'resume audio',
    execute(client, message, args){

    	try{
    		message.delete(0)
    	}
    	catch(e){
    		message.channel.send("Woops, can't delete message")
    	}
        
        try{
	        connection = message.guild.voiceConnection;
	        connection.dispatcher.resume();
	    }
	    catch(e){
	    	return message.channel.send("Uh-Oh. Error. Am I not in a Channel?");
	    }
    }
}