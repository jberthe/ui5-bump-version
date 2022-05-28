#! /usr/bin/env node

const jsonfile = require('jsonfile');
const path = require('path');
const bump = require('./bump');
const file = 'webapp/manifest.json'
const tArguments = ['major', 'minor', 'patch', 'build'];



// Get arguments Level
//console.log(path.dirname(__filename));
if (process.argv[2]) {
  let level = process.argv[2];

  if (bump.isArgumentAvailable(level)) {
    try {
      const currFile = process.argv[3] || file;
      let oData = jsonfile.readFileSync(currFile);
      let oldVersion = bump.readApplicationVersion(oData);
      let newVersion = bump.bumpVersion(oldVersion, tArguments.indexOf(level));
      let newData = bump.appendNewVersion(oData, newVersion);

      jsonfile.writeFile(currFile, newData, {
        spaces: 2
      }, function (err) {
        if (err) console.error(err)
      });

      // Show new version
      console.dir(newVersion);
    } catch (error) {
      console.error("File " + process.argv[3] + " not found.");
    }
  } else {
    console.error("Arguments not available.");
  }

} else {
  console.log("\nUsage: ui5-bump {major|minor|patch|build} |path|\n");
  console.log("\Where: path stand for the full path to manifest.json. By default path is webapp/manifest.json\n");
}