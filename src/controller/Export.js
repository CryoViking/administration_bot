module.exports.filterChannelInformation = async function(jsonData){
    jsonData.forEach(element => {
        console.log("===========================");
        console.log(element);
        let genericJsonData = {
            name: element.name,
            type: element.type,
            topic: element.topic,
            rate_limit_per_user: 0,
            position: element.position,
            inherit_from_parent: true,
            permissions: element.permission_overwrites,
            nsfw: element.nsfw
        }
        console.log("===========================");
        console.log(genericJsonData);
        console.log("===========================");
    });
}