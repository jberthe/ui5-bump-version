const jsonfile = require('jsonfile');
const bump = require('./bump');
const file1 = 'webapp/manifest.json'
const file2 = 'ui5-bump-version/manifest.json'
const tArguments = ['major', 'minor', 'patch', 'build'];

let currentFile = null;
let currentObj = null;




this.isArgumentAvailable = function (sArg) {
    return sArg.indexOf('major') >= 0 ||
        sArg.indexOf('minor') >= 0 ||
        sArg.indexOf('patch') >= 0 ||
        sArg.indexOf('build') >= 0;
};

this.readApplicationVersion = function (jData) {
    if (jData) {
        console.dir("Current version: " + jData["sap.app"].applicationVersion.version);
        return jData["sap.app"].applicationVersion.version;
    }
};

this.readFile = function (sFile) {
    return jsonfile.readFileSync(sFile);
};

this.detectBuild = function (sVersion) {
    let buildIdx = sVersion.indexOf('_Build');

    if (buildIdx >= 0) {
        // remove _Build statement
        return sVersion.slice(0, buildIdx);
    } else {
        return sVersion;
    }
};

this.bumpMajor = function (sVersion) {
    let newVersion = this.detectBuild(sVersion);

    let tNumber = newVersion.split(".");
    let majorNum = parseInt(tNumber[0]) + 1;
    newVersion = majorNum + ".0.0";

    return newVersion;
};

this.bumpMinor = function (sVersion) {
    let newVersion = this.detectBuild(sVersion);

    let tNumber = newVersion.split(".");
    let minorNum = parseInt(tNumber[1]) + 1;
    newVersion = parseInt(tNumber[0]) + "." + minorNum + ".0";

    return newVersion;
};

this.bumpPatch = function (sVersion) {
    let newVersion = this.detectBuild(sVersion);

    let tNumber = newVersion.split(".");
    let patchNum = parseInt(tNumber[2]) + 1;
    newVersion = parseInt(tNumber[0]) + "." + parseInt(tNumber[1]) + "." + patchNum;

    return newVersion;
};

this.bumpBuild = function (sVersion) {
    let newVersion = this.detectBuild(sVersion);

    let dToday = new Date();
    newVersion = newVersion + "_Build" + 
                    dToday.getMonth() + 
                    dToday.getDay() +
                    dToday.getHours() +
                    dToday.getMinutes() +
                    dToday.getSeconds() ;

    return newVersion;
};

this.bumpVersion = function (sVersion, iLevel) {
    let newVersion = "";
    switch (iLevel) {
        case 0: // major
            newVersion = this.bumpMajor(sVersion);
            break;
        case 1: // minor
            newVersion = this.bumpMinor(sVersion);
            break;
        case 2: // patch
            newVersion = this.bumpPatch(sVersion);
            break;
        case 3: // build
            newVersion = this.bumpBuild(sVersion);
            break;
    }

    return newVersion;
};

this.appendNewVersion = function(oData, sVersion){
    let newJSON;
    if(oData){
        newJSON = JSON.parse(JSON.stringify(oData));
        newJSON["sap.app"].applicationVersion.version = sVersion; 
    }
    return newJSON;
};

// Get arguments Level
if (process.argv[2]) {
    let level = process.argv[2];

    if (this.isArgumentAvailable(level)) {
        let oData = this.readFile(file2);
        let oldVersion = this.readApplicationVersion(oData);
        let newVersion = this.bumpVersion(oldVersion, tArguments.indexOf(level));
        let newData = this.appendNewVersion(oData, newVersion);

        jsonfile.writeFile(file2, newData, function (err) {
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