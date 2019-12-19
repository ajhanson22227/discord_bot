module.exports = {

    name: 'pause',
    description: 'Pause audio',
    execute(client, message, args){
    	
    	try{
    		message.delete(0)
    	}
    	catch(e){
    		message.channel.send("Woops Can't Delete Message");
    	}


    	try{
	        connection = message.guild.voiceConnection;
	        connection.dispatcher.pause();
	    }
	    catch(e){
	    	return message.channel.send("Uh-Oh. Error. Am I not in a Channel?");
	    }
    }
}