// Handles metric command parsing
const py = require('./PyExec.js');

module.exports = {
    cmdParse: async function cmdParse(msg, args) {
        if (args.length < 2) {
            msg.channel.send("Invalid metrics command!");
        } else {
            switch (args[1]) {
                case "pop":
                case "population":
                    await populationCalc(msg);
                    break;
            }
        }
    }
}

async function populationCalc(msg) {
    msg.channel.send("Doing population stuff...");
    var confpath = "py/src/config.potato";       // TODO change me after deploy
    var csvpath = "cache/metrics/data.csv";
    py.run("grabpop.py", [confpath, '-o', csvpath]);
    msg.channel.send("Done");
}

