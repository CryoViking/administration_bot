const guildReqeusts = require('./GuildHttpsRequest.js');

module.exports.importConfiguration = async function(guild, JSONConfig){
    await clearRoles(guild);
    await clearChannels(guild);
    await importRoles(guild, JSONConfig);
    await importChannels(guild, JSONConfig);

    setTimeout(function() {
        channels = guild.channels;
        JSON.parse(JSONConfig).webhooks.forEach(async(webhook) => {
            let parent = channels.find(p => p.name === webhook.channelParent);
            let channel = channels.find(c => c.parentID === parent.id && c.name === webhook.channel);
            let hook = webhook.hook;
            await channel.createWebhook(hook.name, hook.avatar)
                .then(`Created Webhook: ${hook.name}`);
        });
    }, 60000);
}

async function importRoles(guild, JSONConfig){
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
    });
}

async function importChannels(guild, JSONConfig){
    let generic_parent = [];
    let categories = [];
    let channels = [];
    var categoryPosition = 0;
    JSON.parse(JSONConfig).channels.forEach(element => {
        if(element.type === 4){
            object = {
                name: element.name,
                type: element.type,
                topic: element.topic,
                rate_limit_per_user: element.rate_limit_per_user,
                position: categoryPosition,
                permission_overwrites: element.permission_overwrites,
                parent_id: "",
                nsfw: element.nsfw,
                children: element.children
            }
            categories.push(object);
            generic_parent.push(object);
            categoryPosition++;
        }
    });

    let childPosition = 0;
    let orphanPosition = 0;
    JSON.parse(JSONConfig).channels.forEach(element => {
        if(element.type === 4){
            element.children.forEach(child => {
                channels.push({
                    parent: element,
                    name: child.name,
                    type: child.type,
                    topic: child.topic,
                    rate_limit_per_user: child.rate_limit_per_user,
                    position: childPosition,
                    permission_overwrites: child.permission_overwrites,
                    nsfw: child.nsfw
                });
                childPosition++;
            })
        }
        else{
            channels.push({
                name: child.name,
                type: child.type,
                topic: child.topic,
                rate_limit_per_user: child.rate_limit_per_user,
                position: orphanPosition,
                permission_overwrites: child.permission_overwrites,
                nsfw: child.nsfw
            })
            orphanPosition++;
        }
    });

    categories.forEach(async(element) => {
        let type = await channelType(element.type);
        await guild.createChannel(element.name, type);
    });

    generic_parent.forEach(async(genericParent) => { 
        genericParent.children.forEach(async(child) =>{
        let childType = await channelType(child.type);
        guild.createChannel(child.name, childType)
            .then(channel => {
                let category = guild.channels.find(c => c.name === genericParent.name && c.type == "category");
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
            }).catch(/* */);
        });
    });
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

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}