module.exports = {

    name: 'stop',
    description: 'Destroys the bot',
    execute(client, message, args){
        try{
    	   message.delete(0)

    	
	       if (message.author.id == "231220240774594560"){
	            client.destroy();
	        }
	        else return
    	}catch(e){
    		return console.log(e)
    	}
    }
}