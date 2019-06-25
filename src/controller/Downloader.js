const fs = require('fs');

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
    }
}

function extractFileName(url){
    var args = url.split("/");
    return args[args.length - 1];
}

function saveFile(filename, contents){
    var destination = `./cache/temp/file/${filename}`;
    fs.writeFile(destination, contents, (err) => {
        if(err) console.log(err);
        console.log(`Saved file to disk\ndesntion:${contents}`);
    })
}