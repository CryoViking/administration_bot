const mkdirp = require('mkdirp');
const fs = require('fs');
var getDirName = require('path').dirname;

module.exports = {
    /**
     * This function will return the body of the requested url.
     */
    request: async function(url) {
        return new Promise(function(resolve, reject){
            request(url, (err, resp, body)=>{
                if(err) reject();
                resolve(body)
            });
        })
    }, //is this suppose to b a , or ;
    /**
     * This funciton will request the body of the passed url, and download it to disk.
     * And return the body of the request. 
     */
    download: async function(author, url){
        var body = await this.request(url);
        //If one author uploads to files with same name. Override first with second.
        var filename = `${author}_${extractFileName(url)}`;
        saveFile(filename, body);
        return body;
    },
    /**
     * This function saves the content passed to the filename given.
     * Location that it saves to is at ../../cache/temp/file/
     */
    saveFile: async function(filename, contents) {
        let path = "./cache/temp/file/";
        mkdirp(path, function (err) {
            if (err) console.log(error);
            fs.writeFile(`${path}${filename}`, contents, (err)=>{
                if(err) console.log(err);
                console.log(`File saved to disk\ndestination: ${path}${filename}`);
            });
        });
    },
    saveJsonFile: async function(filename, contents) {
        let content = JSON.stringify(contents, null, 4);
        this.saveFile(filename, content);
    }
}

function extractFileName(url){
    var args = url.split("/");
    return args[args.length - 1];
}

