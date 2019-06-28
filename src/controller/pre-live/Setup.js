const config = require('../../../res/dev_config.js')

module.exports.configure = async function(bot, guild){
    await configureStaffChannel(guild);
    await configureUnverifiedRole(guild);
    await configureAdminBot(guild);
    await configureJoinChannel(guild);
}

async function configureStaffChannel(guild){
    let logChannel = await guild.channels.find(c => c.name === "staff-logs");
    if(logChannel === null || logChannel === undefined){
        guild.createChannel("staff-logs", 'text');
    }
}

async function configureUnverifiedRole(guild){
    let unverified = await guild.roles.find(r => r.name === "unverified");
    if(unverified === null || unverified === undefined){
        await guild.createRole({
            name: "unverified",
            permissions: 0,
            color: 9807270,
            hoist: false,
            mentionable: false
        }).then(role => console.log(`Created new role with name ${role.name}`))
            .catch(/* do nothing */);
    }
}

async function configureJoinChannel(guild){
    let id = config.join_channel_id
    let channel = guild.channels.find(c => c.id === id)
    let unverified = await guild.roles.find(r => r.name === "unverified");
    channel.overwritePermissions(unverified, {VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true})
}