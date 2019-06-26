const {spawn} = require('child_process');

module.exports = {
    // Performs graphing and save to a PNG.
    graph: async function(filename, nums, x = 1, xinc = 1) {
        var coor = coorPair(nums, x, xinc);
        // TODO invoke python grapher here
    }
}

// Returns the generated coordinates, saved in array of pairs. 
function coorPair(nums, xstart = 1, xinc = 1) {
    var ret = [];
    for (var i = 0; i < nums.length; i++) {
        ret.push([xstart, nums[i]])
        xstart += xinc;
    }
    return ret;
}

// Returns the generated coordinates, saved in two arrays. 
function coorArray(nums, xstart = 1, xinc = 1) {
    var ret = [[], []];
    for (var i = 0; i < nums.length; i++) {
        ret[0].push(xstart);
        ret[1].push(nums[i]);
        xstart += xinc;
    }
    return ret;
}

// Runs a bash command. 
function runCMD(cmd, args) {
    // TODO this function is for debugging purpose
    const run = spawn(cmd, args);
    run.stdout.on('data', (data) => {console.log(`${data}`);});
}

