const config = require('../../../res/dev_config.json')

module.exports.configure = async function(bot, guild){
    await configureStaffChannel(guild);
    await configureUnverifiedRole(guild);
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
    var role = guild.roles.find(r => r.name === "unverified");
    guild.channels.forEach(async(channel) => {
        await channel.overwritePermissions(role, {
            CREATE_INSTANT_INVITE: false,
            KICK_MEMBERS: false,
            BAN_MEMBERS: false,
            ADMINISTRATOR: false,
            MANAGE_CHANNELS: false,
            MANAGE_GUILD: false,
            ADD_REACTIONS: false,
            READ_MESSAGES: false,
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false,
            MANAGE_MESSAGES: false,
            EMBED_LINKS: false,
            ATTACH_FILES: false,
            READ_MESSAGE_HISTORY: false,
            MENTION_EVERYONE: false,
            EXTERNAL_EMOJIS: false,
            CONNECT: false,
            SPEAK: false,
            MUTE_MEMBERS: false,
            DEAFEN_MEMBERS: false,
            MOVE_MEMBERS: false,
            USE_VAD: false,
            CHANGE_NICKNAME: false,
            MANAGE_NICKNAMES: false,
            MANAGE_ROLES_OR_PERMISSIONS: false,
            MANAGE_WEBHOOKS: false,
            MANAGE_EMOJIS: false
        });
    });
}

async function configureJoinChannel(guild){
    let id = config.join_channel_id
    let channel = guild.channels.find(c => c.id === id)
    let unverified = await guild.roles.find(r => r.name === "unverified");
    channel.overwritePermissions(unverified, {VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true})
}