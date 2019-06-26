const {spawn} = require('child_process');

module.exports = {
    // Performs graphing and save to a PNG.
    graph: async function(nums, filename) {
        var coor = coorPair(nums);
        runCMD('ls', ['-la'])
        // TODO need graphing library here
    }
}

// Returns the generated coordinates, saved in array of pairs. 
function coorPair(nums, xstart = 1) {
    var ret = [];
    for (var i = 0; i < nums.length; i++)
        ret.push([xstart++, nums[i]])
    return ret;
}

// Returns the generated coordinates, saved in two arrays. 
function coorArray(nums, xstart = 1) {
    var ret = [[], []];
    for (var i = 0; i < nums.length; i++) {
        ret[0].push(xstart++);
        ret[1].push(nums[i]);
    }
    return ret;
}

// Runs a bash command. 
function runCMD(cmd, args) {
    const run = spawn(cmd, args);
    run.stdout.on('data', (data) => {console.log(`${data}`);});
}

