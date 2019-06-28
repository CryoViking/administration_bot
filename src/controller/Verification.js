const config = require('../../res/dev_config.json')

module.exports.verify = async function(bot, guild, member){
    let joinChannel = guild.channels.find(c => c.id === config.join_channel_id);
    let code = await generateCode();
    joinChannel.send({
        embed:{
            color: 16711680,
            title: 'Verification',
            description: `${member} please verify yourself by:`,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatar
            },
            fields: [{
                name: `Entering in the Verification Code: ${code}`,
                value: "What happens if you don't do it\n or type something else,\n simple: you get kicked."
            }],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: "Administration bot of this server."
            }
        }
    }).then(setTimeout(function() {
        if(member.lastMessage.content !== `${code}`){
            member.kick(`${member.id} - Invalid Verification`);
        }
        else{
            let role = guild.roles.find(r => r.name === "unverified");
            member.removeRole(role).then(`${member.id} || ${member.username} - verified`);
        }
    },5000));
}

async function generateCode(){
    var length = 6;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}