[![NPM Version](https://img.shields.io/npm/v/ui5-bump-version.svg?style=flat)](https://www.npmjs.org/package/karma-ui5)
[![CircleCI](https://circleci.com/gh/jberthe/ui5-bump-version/tree/master.svg?style=shield)](https://circleci.com/gh/jberthe/ui5-bump-version/tree/master)

# SAP UI5 Bump version
This module aims to update the version from the *webapp/manifest.json* file. We based the bump process following the [Semantic Versioning 2.0.0](https://semver.org/).

## Install
> npm install --save ui5-bump-version
>
> Usage: ui5-bump {major|minor|patch|build} |path|

## Usage
In your SAP Fiori UI5 application directory, execute the following command. If your manifest file is not under *webapp/manifest.json* you can add the path after the version level.

> ui5-bump

### Examples
#### Package script
>"scripts": {
>        "start": "fiori run --open test/flpSandbox.html?sap-client=600",
>        "deploy_build": "ui5-bump build && npm run build && fiori deploy -- -y --config ui5-deploy.yaml && rimraf archive.zip",
>        "deploy_patch": "ui5-bump patch && npm run build && fiori deploy -- -y --config ui5-deploy.yaml && rimraf archive.zip",
>        "deploy_minor": "ui5-bump minor && npm run build && fiori deploy -- -y --config ui5-deploy.yaml && rimraf archive.zip",
>        "deploy_major": "ui5-bump major && npm run build && fiori deploy -- -y --config ui5-deploy.yaml && rimraf archive.zip",
>        ...
>    },

#### Major version (from 1.0.2 to 2.0.0)
> ui5-bump major

#### Minor version (from 1.0.2 to 1.1.0)
> ui5-bump minor

#### Patch version (from 1.0.2 to 1.0.3)
> ui5-bump patch

#### Build version (from 1.0.2 to 1.0.2+YYYYMMDDHHmmss)
> ui5-bump build

## For Developper
To test and run MOCHA you can run :
> npm run test

To test the full module, use VSCode and in the debug section launch the recorded configuration.
## Release
### v1.1.0
- BugFix: When writing into file, the JSON lost his formatting
- Bugfix: the argument *path* wasn't correctly handled
- Feature: the output is now much more clean and flexible. The new version is displayed only on the console. Like this it is possible to store it inside environement variable

### v1.0.2
- BugFix: Dependency *jsoonfile* added
### v1.0.1
- The build pattern respect the Version semantic (before it was *_Build*, now it is +)
- Add Year in the generated build number
- Change the documention
