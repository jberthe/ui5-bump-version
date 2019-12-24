#! /usr/bin/env node

const jsonfile = require('jsonfile');
const path = require('path');
const bump = require('./bump');
const file = 'webapp/manifest.json'
const tArguments = ['major', 'minor', 'patch', 'build'];



// Get arguments Level
console.log(path.dirname(__filename));
if (process.argv[2]) {
    let level = process.argv[2];

    if (bump.isArgumentAvailable(level)) {
    //  console.log(path.join(path.dirname(__filename)),"webapp",  file);
        let oData = jsonfile.readFileSync(file);
        let oldVersion = bump.readApplicationVersion(oData);
        let newVersion = bump.bumpVersion(oldVersion, tArguments.indexOf(level));
        let newData = bump.appendNewVersion(oData, newVersion);

        jsonfile.writeFile(file, newData, function (err) {
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