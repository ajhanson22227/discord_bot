# discord_bot

This is a simple discord bot made to generate X random numbers from 1-10. It will then determine the number of success and failues from those numbers. This simulates the dice rolling for the RPG Mage: The Awakening.

The main commands in this bot are the `!roll x` which rolls x number of d10 and produces a success/failure result.
There is also `!roll x y z` where x is the number of d10, y is the number threshold for a success, and z is the 'exploding' number to add another dice to the roll.

There is also a music command `!play <title>` where it will play the audio of the first video found with the title in the users voice channel.

## To Use 

Download the directory and `npm install` the required packages
Create a .env file with a discord token as `token` and a youtube api as `ytAPI`
