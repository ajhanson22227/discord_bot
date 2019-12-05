module.exports = {

    name: 'stop',
    description: 'Destroys the bot',
    execute(client, message, args){
    	message.delete(0)

    	try{
	        if (message.author.id == "231220240774594560"){
	            client.destroy();
	        }
	        else return
    	}catch(e){
    		console.log(e)
    	}
    }
}