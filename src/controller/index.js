const Discord = require('discord.js');
const config = require('../../res/dev_config.json');
const commands = require('./Commands.js');
const verification = require('./Verification.js');

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

bot.on('guildMemberAdd', member => {
    verification.verify(member); 
});

bot.login(config.token);
