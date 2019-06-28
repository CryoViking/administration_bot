const Discord = require('discord.js');
const config = require('../../res/dev_config.json');
const commands = require('./Commands.js');
const verification = require('./Verification.js');
const setup = require('./pre-live/Setup.js');

const bot = new Discord.Client();
var guild;

module.exports = {
    bot: bot,
};

bot.on('ready', async ()=>{
    guild = await bot.guilds.find(g => g.id === config.guild_id);
    await setup.configure(bot, guild);
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

bot.on('guildMemberAdd', async(member) => {
    let role = guild.roles.find(r => r.name === "unverified");
    member.addRole(role);
    await verification.verify(bot, guild, member);
});

bot.login(config.token);
