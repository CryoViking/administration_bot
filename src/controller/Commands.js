const downloader = require('./Downloader.js');
const grapher = require('./Grapher.js');
const fileDisplay = require('../view/DisplayFile.js');
const snippet = require('../view/ViewConstants.js');

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
                await readAttachment(msg);
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
    // only for testing purpose
    var nums = msg.content.split(" ").map(Number);
    if (nums.length == 1) {
        msg.channel.send("syntax: !graph <numbers>");
    } else {
        nums.shift();
        grapher.graph(msg, nums);
    }
}

async function readAttachment(msg){
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
