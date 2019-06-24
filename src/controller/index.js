const Discord = require('discord.js');
const config = require('../../res/config.json');
const commands = require('./Commands.js');

const bot = new Discord.Client();

module.exports = {
    bot: bot,
};

bot.on('ready', async ()=>{
    console.log('Bot Starting');
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async(msg)=>{
    if(msg.author.bot){
        return;
    }

    if(!msg.content.startsWith(config.prefix)){
        return;
    }

    await commands.commandSwitch(msg);
});

bot.login(config.token);
