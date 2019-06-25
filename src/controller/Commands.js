const downloader = require('./Downloader.js');
const grapher = require('./Grapher.js');
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
                break;
            default:
                msg.channel.send("This is not a valid command.");
        }//END SWITCH
    }
}

async function ping(msg){
    msg.channel.send("Pong!");
}

async function readAttachment(msg){
    var author = msg.author.id;
    let url = msg.attachments.first().url;
    msg.channel.send("Reading the file! Fetching Data...");
    try{
        var body = await downloader.download(author, url);
        let maxChar = 2000;
        let snipperChars = 8;
        if(body.length > maxChar - snippetChar){
            msg.channel.send("File contents exceed char count. Cannot paste content.");
        }
        else{
            msg.channel.send({embed: {
                author:{
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL
                },
                title: "File Contents",
                content: `${snippet.TRIPLE_BACKTICK}${body}${snippet.TRIPLE_BACKTICK}`
            }});
        }
    }
    catch(err){
        msg.channel.send("There was an error in reading the file.");
        console.log(err.toString());
    }
}
