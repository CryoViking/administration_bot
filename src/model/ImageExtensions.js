const code_extensions = require("../../res/file_extensions/image.json")

class ImageExtensions {
    constructor(){
        this.extensions = [];
        code_extensions.extensions.forEach(element => {
            this.extensions.push(element);
        });
    }

    contains(extension){
        let contains = false;
        this.extensions.forEach(element => {
            if(element === extension) contains = true;
        });
        return contains
    }
}

module.exports = {
    ImageExtensions: ImageExtensions
}