const fs = require('fs');
const text_extensions = require('../model/TextExtensions.js');
const image_extensions = require('../model/ImageExtensions.js');

module.exports = {
    display: async function(msg, body, url){
        var textExtensions = new text_extensions.TextExtensions();
        var imageExtensions = new image_extensions.ImageExtensions();
        var extension = await extractExtension(url);
        if(textExtensions.contains(extension)){
            await displayTextEmbed(msg, body);
        }
        else if(imageExtensions.contains(extension)){
            await displayImageEmbed(msg, url);
        }
        else{
            await displayInvalidExtensionEmbed(url);
        }
    }
}

async function displayTextEmbed(msg, body){
    let maxChar = 2000;
    let snippetChars = 8;
    if(body.length > maxChar - snippetChars){
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

async function displayImageEmbed(msg, url){
    msg.channel.send({embed: {
        author:{
            name: msg.author.username,
            icon_url: msg.author.avatarURL
        },
        title: "File Contents",
        content: url
    }});
}

async function displayInvalidExtensionEmbed(url){
    msg.channel.send({embed: {
        author:{
            name: msg.author.username,
            icon_url: msg.author.avatarURL
        },
        title: "Invalid File Type",
        content: "We do not support displaying this type of file."
    }});
}

async function extractExtension(url){
    let args = url.split("/");
    let extension = args[args.length - 1].split(".");
    return extension[extension.length-1];
}