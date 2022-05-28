exports.isArgumentAvailable = function (sArg) {
  return sArg.indexOf('major') >= 0 ||
    sArg.indexOf('minor') >= 0 ||
    sArg.indexOf('patch') >= 0 ||
    sArg.indexOf('build') >= 0;
};

exports.readApplicationVersion = function (jData) {
  if (jData) {
    return jData["sap.app"].applicationVersion.version;
  }
};


exports.detectBuild = function (sVersion) {
  let buildIdx = sVersion.indexOf('+');

  if (buildIdx >= 0) {
    // remove + statement
    return sVersion.slice(0, buildIdx);
  } else {
    return sVersion;
  }
};

exports.bumpMajor = function (sVersion) {
  let newVersion = this.detectBuild(sVersion);

  let tNumber = newVersion.split(".");
  let majorNum = parseInt(tNumber[0]) + 1;
  newVersion = majorNum + ".0.0";

  return newVersion;
};

exports.bumpMinor = function (sVersion) {
  let newVersion = this.detectBuild(sVersion);

  let tNumber = newVersion.split(".");
  let minorNum = parseInt(tNumber[1]) + 1;
  newVersion = parseInt(tNumber[0]) + "." + minorNum + ".0";

  return newVersion;
};

exports.bumpPatch = function (sVersion) {
  let newVersion = this.detectBuild(sVersion);

  let tNumber = newVersion.split(".");
  let patchNum = parseInt(tNumber[2]) + 1;
  newVersion = parseInt(tNumber[0]) + "." + parseInt(tNumber[1]) + "." + patchNum;

  return newVersion;
};

exports.bumpBuild = function (sVersion) {
  let newVersion = this.detectBuild(sVersion);

  let dToday = new Date();
  newVersion = newVersion + "+" +
    dToday.getFullYear() +
    dToday.getMonth() +
    dToday.getDay() +
    dToday.getHours() +
    dToday.getMinutes() +
    dToday.getSeconds();

  return newVersion;
};

exports.bumpVersion = function (sVersion, iLevel) {
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

exports.appendNewVersion = function (oData, sVersion) {
  let newJSON;
  if (oData) {
    newJSON = JSON.parse(JSON.stringify(oData));
    newJSON["sap.app"].applicationVersion.version = sVersion;
  }
  return newJSON;
};