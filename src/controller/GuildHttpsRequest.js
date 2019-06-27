const config = require('../../res/config.json');
const fetch = require('node-fetch');

module.exports.requestChannels = async function(guildID){
    let url = `https://discordapp.com/api/guilds/${guildID}/channels`;
    let headers = {
        "Authorization": `Bot ${config.token}`,
        "Content-Type":"application/json",
    }
    var options = {
        "method": "GET",
        "headers": headers
    }
    return await fetch(url, options)
        .then(res=> res.json())
        .then(json => {return json});
}

module.exports.requestRoles = async function(guildID){
    let url = `https://discordapp.com/api/guilds/${guildID}/roles`;
    let headers = {
        "Authorization": `Bot ${config.token}`,
        "Content-Type":"application/json",
    }
    var options = {
        "method": "GET",
        "headers": headers
    }
    return await fetch(url, options)
        .then(res=> res.json())
        .then(json => {return json});
}

module.exports.createRole = async function(guildID, newRole){
    let url = `https://discordapp.com/api/guilds/${guildID}/roles`;
    let headers = {
        "Authorization": `Bot ${config.token}`,
        "Content-Type":"application/json",
    }
    var options = {
        "method": "GET",
        "headers": headers,
        "guild_id": guildID,
        "role": newRole
    }
    return await fetch(url, options)
        .then(res=> res.json())
        .then(json => {console.log(json)});
}