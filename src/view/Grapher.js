module.exports = {
    // Performs graphing and save to a PNG. 
    graph: async function(msg, nums) {
        
        for (var i = 0; i < nums.length; i++) {
            var num = parseInt(nums[i], 10);
            msg.channel.send(`[${i + 1}, ${num}]`);
        }
    }
}

