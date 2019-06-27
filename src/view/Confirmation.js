const Discord = require('discord.js');

//TODO - Continue working on this.
module.exports.confirmAction = async function(msg){
    msg.channel.send(`${msg.author} - Do you wish to proceed (Y/N): `);
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
    collector.on('collect', async(message) => {
        if(message.content == "Y" || message.content == "y"){
            message.channel.send("Action confirmed, proceeding...");
            return true;
        }
        else if(message.content == "N" || message.content == "n"){
            message.channel.send("Cancelling Action.");
            return false;
        }
        else{
            message.channel.send("Invalid character - Cancelling action");
            return false;
        }
    });
}

module.exports.actionCancelled = async function(msg){
    msg.channel.send(`Attempted action by ${msg.author.username} has been cancelled`);
}