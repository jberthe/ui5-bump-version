# SAP UI5 Bump version
This module aims to update the version from the *webapp/manifest.json* file. We based the bump process following the [Semantic Versioning 2.0.0](https://semver.org/).

## Install
> npm install --save jsonfile
>
> Usage: ui5-bump {major|minor|patch|build} |path|

## Usage
In your SAP Fiori UI5 application directory, execute the following command. If your manifest file is not under *webapp/manifest.json* you can add the path after the version level.

> ui5-bump

### Major version (from 1.0.2 to 2.0.0)
> ui5-bump major

### Minor version (from 1.0.2 to 1.1.0)
> ui5-bump minor

### Patch version (from 1.0.2 to 1.0.3)
> ui5-bump patch

### Build version (from 1.0.2 to 1.0.2+YYYYMMDDHHmmss)
> ui5-bump build

## Release
### v1.0.0
- The build pattern respect the Version semantic (before it was *_Build*, now it is +)
- Add Year in the generated build number
- Change the documention
