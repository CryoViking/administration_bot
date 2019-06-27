const downloader = require('./Downloader.js');
const grapher = require('./Grapher.js');
const fileDisplay = require('../view/DisplayFile.js');
const guildReqeusts = require('./GuildHttpsRequest.js');
const export_command = require('./Export.js');
const admin_command = require('./AdminCommands');

module.exports = {
    commandSwitch: async function commandSwitch(msg){
        var args = msg.content.substring(1).split(" ");
        switch(args[0]){
            /* Command description: 
             */
            case "ping":
                await ping(msg);
                break;
            /* Command description:
             * Saves the first attachment of the message to disk and displays it's contents, if able.
             */
            case "import":
                await importConfiguration(msg);
                break;
            case "export":
                await exportConfiguration(msg);
                break;
            case "graph":
                await doGraphStuff(msg);
                break;
            case "warn":
                await warn(msg);
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

async function warn(msg) {
    admin_command.warn(msg.author);
}

async function exportConfiguration(msg){
    msg.channel.send(`Exporting Configuration. Executor - ${msg.author.username}`)
    console.log(`Exporting Configuration. Executor - ${msg.author.username}`);
    let guildID = msg.guild.id;
    let data = await guildReqeusts.requestChannels(guildID);
    let filtered = await export_command.filterChannelInformation(data);
    await downloader.saveJsonFile("current_configuration.json", filtered);
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
