module.exports.filterChannelInformation = async function(jsonData){
    let childObjects = [];
    let parentObjects = [];
    let finalStructure = [];
    jsonData.forEach(element => {
        if(element.type === 4){
            parentObjects.push(element);
        }
        else{
            childObjects.push(element);
        }
    });

    var parentMap = new Map();
    parentObjects.forEach(element => {
        parentMap.set(element.id, genericJsonData = {
            name: element.name,
            type: element.type,
            topic: element.topic,
            rate_limit_per_user: element.rate_limit_per_user,
            position: element.position,
            permissions: element.permission_overwrites,
            nsfw: element.nsfw,
            children: []
        });
    });
    let hasParent = [];
    childObjects.forEach(element => {
        if(parentMap.has(element.parent_id)){
            parentMap.get(element.parent_id).children.push(genericJsonData = {
                name: element.name,
                type: element.type,
                topic: element.topic,
                rate_limit_per_user: element.rate_limit_per_user,
                position: element.position,
                permission_overwrites: element.permission_overwrites,
                nsfw: element.nsfw,
            });
            hasParent.push(element);
        }
    });
    childObjects.forEach(element => {
        if(hasParent.includes(element) === false){
            finalStructure.push(genericJsonData = {
                name: element.name,
                type: element.type,
                topic: element.topic,
                rate_limit_per_user: element.rate_limit_per_user,
                position: element.position,
                permission_overwrites: element.permission_overwrites,
                nsfw: element.nsfw,
            });
        }
    });
    parentMap.forEach(element => {
        finalStructure.push(element);
    });
    return finalStructure;
}