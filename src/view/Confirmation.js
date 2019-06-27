const Discord = require('discord.js');

module.exports.confirmAction = async function(msg){
    msg.channel.send(`${msg.author} - Do you wish to proceed (Y/N): `);
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
    await collector.on('collect', message => {
        if(message.content in ["Y", "y"]){
            return true
        }
        else if(message.content in ["N", "n"]){
            return false;
        }
    });
    return false;
}

module.exports.actionCancelled = async function(msg){
    msg.channel.send(`Attempted action by ${msg.author.username} has been cancelled`);
}