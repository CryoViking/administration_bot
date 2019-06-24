module.exports = {
    commandSwitch: async function commandSwitch(msg){
        var args = msg.content.substring(1).split(" ");
        switch(args[0]){
            case "ping":
                await ping(msg);
                break;
            default:
                msg.channel.send("This is not a valid command.");
        }//END SWITCH
    }
}

async function ping(msg){
    msg.channel.send("Pong!");
}