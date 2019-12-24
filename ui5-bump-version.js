const jsonfile = require('jsonfile');
const path = require('path');
const bump = require('./bump');
const file1 = 'webapp/manifest.json'
//const file2 = 'ui5-bump-version/manifest.json'
const tArguments = ['major', 'minor', 'patch', 'build'];


// Get arguments Level
console.log(path.dirname(__filename));
if (process.argv[2]) {
    let level = process.argv[2];

    if (this.isArgumentAvailable(level)) {
        let oData = bump.readFile(file1);
        let oldVersion = bump.readApplicationVersion(oData);
        let newVersion = bump.bumpVersion(oldVersion, tArguments.indexOf(level));
        let newData = bump.appendNewVersion(oData, newVersion);

        jsonfile.writeFile(file1, newData, function (err) {
            if (err) console.error(err)
          });


    } else {
        console.error("Arguments not available.");
    }

}






/* console.info("file read: " + currentFile);
 console.dir(jsonfile.readFileSync(currentFile));
 if(currentObj){
   console.info("file read");
   console.dir(jsonfile.readFileSync(currentFile));
 }*/