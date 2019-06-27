const downloader = require('./Downloader.js');
const grapher = require('./Grapher.js');
const fileDisplay = require('../view/DisplayFile.js');
const guildReqeusts = require('./GuildHttpsRequest.js');
const export_command = require('./Export.js');

module.exports = {
    commandSwitch: async function commandSwitch(msg){
        var args = msg.content.substring(1).split(" ");
        switch(args[0]){
            case "ping":
                await ping(msg);
                break;
            case "test":
                await test(msg);
                break;
            case "import":
                await importConfiguration(msg);
                break;
            case "export":
                await exportConfiguration(msg);
                break;
            case "graph":
                await doGraphStuff(msg);
                break;
            default:
                msg.channel.send("This is not a valid command.");
        }//END SWITCH
    }
}

async function ping(msg){
    msg.channel.send("Pong!");
}

async function doGraphStuff(msg) {
    var nums = msg.content.split(" ").map(Number);
    if (nums.length == 1) {
        msg.channel.send("syntax: !graph <numbers>");
    } else {
        nums.shift();
        grapher.graph("graph.png", nums);
    }
}

async function test(msg){
    let newRole = {
        name: "EVERTHING-NON-ADMIN",
        permissions: 1341643969,
        color: 1179394,
        mentionable: true
    }
    guildReqeusts.createRole(msg.guild.id, newRole);
}

async function exportConfiguration(msg){
    msg.channel.send(`Exporting Configuration. Executor - ${msg.author.username}`)
    console.log(`Exporting Configuration. Executor - ${msg.author.username}`);
    let guildID = msg.guild.id;
    let channel_data = await guildReqeusts.requestChannels(guildID);
    let filtered_channel_data = await export_command.filterChannelInformation(channel_data);
    let role_data = await guildReqeusts.requestRoles(guildID);
    let filtered_role_data = await export_command.filterRoleData(role_data);
    let merged_data = await export_command.mergeJsonData(filtered_channel_data, filtered_role_data);
    await downloader.saveJsonFile("current_configuration.json", merged_data);
    msg.channel.send(`${msg.author} - Here is the current configuration`, { files: ["./cache/temp/file/current_configuration.json"] });
}

async function importConfiguration(msg){
    msg.channel.send(`Importing Configuration. Executor - ${msg.author.username}`)
    console.log(`Importing Configuration. Executor - ${msg.author.username}`);
    var author = msg.author.id;
    let url = msg.attachments.first().url;
    msg.channel.send("Reading the file! Fetching Data...");
    try{
        fileDisplay.display(msg, await downloader.download(author, url),url);
    }
    catch(err){
        msg.channel.send("There was an error in reading the file.");
        console.log(err.toString());
    }
}
