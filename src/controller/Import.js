const guildReqeusts = require('./GuildHttpsRequest.js');
const Discord = require('discord.js');

module.exports.importConfiguration = async function(guild, JSONConfig){
    await clearRoles(guild);
    await clearChannels(guild);
    JSON.parse(JSONConfig).roles.forEach(async(element) => {
            if(element.permissions !== "AdministrationBot" && 
                element.name !== "@everyone" &&
                element.managed !== true)
            {
                await guild.createRole({
                    name: element.name,
                    permissions: element.permissions,
                    color: element.color,
                    hoist: element.hoist,
                    mentionable: element.mentionable
                }).then(role => console.log(`Created new role with name ${role.name}`))
                    .catch(/* do nothing */);
            }
    })
    let categories = [];
    var position = 0;
    JSON.parse(JSONConfig).channels.forEach(element => {
        if(element.type === 4){
            categories.push({
                name: element.name,
                type: element.type,
                topic: element.topic,
                rate_limit_per_user: element.rate_limit_per_user,
                position: position,
                permission_overwrites: element.permission_overwrites,
                parent_id: "",
                nsfw: element.nsfw
            });
        }
        position++;
    });
    categories.forEach(async(element) => {
        /*
        guild.createChannel(JSON.stringify(element))
            .then(jsonObj => console.log(`Created Channel ${jsonObj.name}, ID: ${jsonObj.id}`))
            .catch(console.error);
            */
        let type = await channelType(element.type);
        await guild.createChannel(element.name, type);
    });
    let parentCategories = guildReqeusts.requestChannels();
    for(var ii = 0; ii<parentCategories.length; ii++){
        let created = parentCategories.get(ii);
        let generic = JSON.parse(JSONConfig).channels.get(ii)
        let created_id = created.id;
        await generic.children.forEach(async(child) => {
            /*
            await guild.createChannel(JSON.stringify({
                name: child.name,
                type: child.type,
                topic: child.topic,
                rate_limit_per_user: child.rate_limit_per_user,
                position: child.position,
                permission_overwrites: child.permission_overwrites,
                parent_id: created_id,
                nsfw: child.nsfw
            })).then(jsonObj => console.log(`Created Channel ${jsonObj.name}, ID: ${jsonObj.id}`))
            .catch(console.error);
            guildReqeusts.createChannel(guild.id, JSON.stringify({
                name: child.name,
                type: child.type,
                topic: child.topic,
                rate_limit_per_user: child.rate_limit_per_user,
                position: child.position,
                permission_overwrites: child.permission_overwrites,
                parent_id: created_id,
                nsfw: child.nsfw
            }))
            */
           let childType = channelType(child.type)
           await guild.createChannel(child.name, childType);
        });
    }

}

async function clearRoles(guild){
    let roles = await guildReqeusts.requestRoles(guild.id).catch("Error");
    roles.forEach(role => {
        if(role.name !== "AdministrationBot" &&
            role.managed !== true &&
            role.name !== "@everyone")
        {
            try{
                guildReqeusts.deleteRole(guild.id, role.id);
            }
            catch(err){
                //do nothing
            }
        }
    });
}

async function clearChannels(guild){
    guild.channels.forEach(channel => channel.delete());
}

async function channelType(type)
{
    switch(type){
        case 0:
            return 'text';
        case 1: 
            return 'dm';
        case 2:
            return 'voice';
        case 3:
            return 'group_dm';
        case 4:
            return 'category';
        case 5:
            return 'news';
        case 6:
            return 'store';
    }
}