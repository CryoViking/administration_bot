const guildReqeusts = require('./GuildHttpsRequest.js');

module.exports.importConfiguration = async function(guildID, JSONConfig){
    var stillExists = await clearRoles(guildID);
    JSONConfig.roles.forEach(element => {
        stillExists.forEach(existing => {
            if(!roleEqual(element, existing)){
                guildReqeusts.createRole(element);
            }
        })
    })
}

async function clearRoles(guildID){
    let currentRoles = guildReqeusts.requestChannels(guildID);
    var stillExists = [];
    currentRoles.forEach(role => {
        if(role.permissions !== 2146958591){
            guildReqeusts.deleteRole(guildID, role.id);
        }
        else{
            stillExists.push(role);
        }
    });
    return stillExists;
}

async function roleEqual(role1, role2){
    if(role1.name === role2.name){
        if(role1.permissions === role2.permissions){
            if(role1.mentionable === role2.mentionable){
                return true;
            }
        }
    }
    return false;
}