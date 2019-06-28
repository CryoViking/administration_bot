module.exports.filterChannelInformation = async function(jsonData){
    let childObjects = [];
    let parentObjects = [];
    let finalStructure = [];
    jsonData.forEach(element => {
        if(element.type === 4){
            parentObjects.push(element);
        }
        else{
            childObjects.push(element);
        }
    });

    var parentMap = new Map();
    parentObjects.forEach(element => {
        parentMap.set(element.id, genericJsonData = {
            name: element.name,
            type: element.type,
            topic: element.topic,
            rate_limit_per_user: element.rate_limit_per_user,
            position: element.position,
            permissions: element.permission_overwrites,
            nsfw: element.nsfw,
            children: []
        });
    });
    let hasParent = [];
    childObjects.forEach(element => {
        if(parentMap.has(element.parent_id)){
            parentMap.get(element.parent_id).children.push(genericJsonData = {
                name: element.name,
                type: element.type,
                topic: element.topic,
                rate_limit_per_user: element.rate_limit_per_user,
                position: element.position,
                permission_overwrites: element.permission_overwrites,
                nsfw: element.nsfw,
            });
            hasParent.push(element);
        }
    });
    childObjects.forEach(element => {
        if(hasParent.includes(element) === false){
            finalStructure.push(genericJsonData = {
                name: element.name,
                type: element.type,
                topic: element.topic,
                rate_limit_per_user: element.rate_limit_per_user,
                position: element.position,
                permission_overwrites: element.permission_overwrites,
                nsfw: element.nsfw,
            });
        }
    });
    parentMap.forEach(element => {
        finalStructure.push(element);
    });
    return finalStructure;
}

module.exports.filterRoleData = async function(data){
    let filteredData = [];
    data.forEach(element=>{
        filteredData.push(jsonData = {
            name: element.name,
            permissions: element.permissions,
            color: element.color,
            hoist: element.hoist,
            managed: element.managed,
            mentionable: element.mentionable
        });
    });
    return filteredData;
}

module.exports.getWebHooks = async function(guild){
    let webHooks = [];
    let data = await guild.fetchWebhooks();
    function filterFields(value) {
        return {
            name: value.name,
            avatar: value.avatar
        }
    }
    async function constructWebHookObject(value, filtered){
        let channel = guild.channels.find(c => c.id === value.channelID);
        let parentChannel = guild.channels.find(p => p.id === channel.parentID);
        return {
            hook : filtered,
            channel: channel.name,
            channelParent: parentChannel.name
        }
    }
    async function storeWebHooks(value, key, map){
        let filtered = filterFields(value);
        let constructed = await constructWebHookObject(value, filtered);
        webHooks.push(constructed);
    }
    data.forEach(storeWebHooks);
    return webHooks;
}

module.exports.mergeJsonData = async function(channelData, roleData, webHooks) {
    let finalStructure = {
        roles: roleData,
        channels: channelData,
        webhooks: webHooks
    }
    return finalStructure;
}