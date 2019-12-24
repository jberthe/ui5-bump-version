var assert = require('assert');
const bump = require('../bump');

describe('Bump Version', function () {
  describe('#isArgumentAvailable()', function () {
    it('Should detect type', function () {
      let oData = bump.isArgumentAvailable('major');
      assert.ok(oData);

      oData = bump.isArgumentAvailable('minor');
      assert.ok(oData);

      oData = bump.isArgumentAvailable('patch');
      assert.ok(oData);

      oData = bump.isArgumentAvailable('build');
      assert.ok(oData);

    });
  });

  describe('#readApplicationVersion()', function () {
    it('Should read the version', function () {
      let curVer = bump.readApplicationVersion({
        "sap.app": {
          "applicationVersion": {
            "version": "1.0.3"
          }
        }
      });
      assert.equal(curVer, "1.0.3");

    });
  });

  describe('#detectBuild()', function () {
    it('Should detect _Build pattern', function () {
      let newVer = bump.detectBuild("1.0.3_Build20102121");
      assert.equal(newVer, "1.0.3");

    });
  });

  describe('#bumpMajor()', function () {
    it('Should increase the major version', function () {
      let newVer = bump.bumpMajor("1.0.3_Build20102121");
      assert.equal(newVer, "2.0.0");

      newVer = bump.bumpMajor("1.0.3");
      assert.equal(newVer, "2.0.0");

      newVer = bump.bumpMajor("0.0.3");
      assert.equal(newVer, "1.0.0");

      newVer = bump.bumpMajor("0.23.3234");
      assert.equal(newVer, "1.0.0");

    });
  });

  describe('#bumpMinor()', function () {
    it('Should increase the minor version', function () {
      let newVer = bump.bumpMinor("1.0.3_Build20102121");
      assert.equal(newVer, "1.1.0");

      newVer = bump.bumpMinor("1.0.3");
      assert.equal(newVer, "1.1.0");

      newVer = bump.bumpMinor("0.0.3");
      assert.equal(newVer, "0.1.0");

      newVer = bump.bumpMinor("0.23.3234");
      assert.equal(newVer, "0.24.0");

    });
  });

  describe('#bumpPatch()', function () {
    it('Should increase the patch version', function () {
      let newVer = bump.bumpPatch("1.0.3_Build20102121");
      assert.equal(newVer, "1.0.4");

      newVer = bump.bumpPatch("1.0.3");
      assert.equal(newVer, "1.0.4");

      newVer = bump.bumpPatch("0.0.3");
      assert.equal(newVer, "0.0.4");

      newVer = bump.bumpPatch("0.23.3234");
      assert.equal(newVer, "0.23.3235");

    });
  });

  describe('#bumpBuild()', function () {
    it('Should add Build pattern', function () {
      let curDate = new Date();
      let newVer = bump.bumpBuild("1.0.3_Build20102121");
      assert.ok(newVer);


    });
  });

  describe('#bumpVersion()', function () {
    it('Should increase the major version', function () {
      let newVer = bump.bumpVersion("1.0.3", 0);
      assert.equal(newVer, "2.0.0");
    });

    it('Should increase the minor version', function () {
      let newVer = bump.bumpVersion("1.0.3", 1);
      assert.equal(newVer, "1.1.0");
    });

    it('Should increase the patch version', function () {
      let newVer = bump.bumpVersion("1.0.3", 2);
      assert.equal(newVer, "1.0.4");
    });

    it('Should increase the build version', function () {
      let newVer = bump.bumpVersion("1.0.3", 3);
      assert.ok(newVer.indexOf("1.0.3_Build") >= 0);
    });

  });

  describe('#appendNewVersion()', function () {
    it('Should change the version', function () {
      let newData = bump.appendNewVersion({
        "sap.app": {
          "applicationVersion": {
            "version": "1.0.3"
          }
        }
      }, "3.2.3");
      let curVer = bump.readApplicationVersion(newData);

       assert.equal(curVer, "3.2.3");


    });
  });


});