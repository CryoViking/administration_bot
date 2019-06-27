const guildReqeusts = require('./GuildHttpsRequest.js');
const Discord = require('discord.js');

module.exports.importConfiguration = async function(guild, JSONConfig){
    await clearRoles(guild);
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