// Executes python scripts. 

const {spawn} = require('child_process');

module.exports = {
    run: async function(name, args) {
        var path = getScriptPath(name);
        args = [path].concat(args);
        runPy(args);
    }
}

// Returns the script path. (/py/src/name)
function getScriptPath(name) {
    return `py/src/${name}`;
}

// Runs the specified python script. 
function runPy(args) {
    // TODO need to auto activate virtual env in future
    const proc = spawn('python', args);
    proc.stdout.on('data', (data) => {console.log(`stdout: ${data.toString('utf8')}`);});
    proc.stderr.on('data', (data) => {console.log(`stderr: ${data.toString('utf8')}`);});
}

