# generate-node-policy-file

**Generate a [Node.js policy file](https://nodejs.org/api/policy.html) for your code.**

*Note:* In Node.js `12` and `13`, the [policy feature](https://nodejs.org/api/policy.html) is marked as **experimental**:

> This feature is still under active development and subject to non-backward compatible changes or removal in any future version. Use of the feature is not recommended in production environments. Experimental features are not subject to the Node.js Semantic Versioning model.

[![npm version](https://img.shields.io/npm/v/generate-node-policy-file.svg)](https://www.npmjs.com/package/generate-node-policy-file)
[![build status](https://api.travis-ci.org/derhuerst/generate-node-policy-file.svg?branch=master)](https://travis-ci.org/derhuerst/generate-node-policy-file)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/generate-node-policy-file.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install generate-node-policy-file
```


## Usage

Generate a list of required files by your app:

```shell
env REQUIRED_FILES=required-files.json node -r generate-node-policy-file/track my-app.js
```

Generate a [Node.js policy file](https://nodejs.org/api/policy.html) from the list:

```shell
generate-node-policy-file <required-files.json >policy.json
```

Make it read-only for the user the app will be running with:

```shell
sudo chown root:admin policy.json
sudo chmod 755 policy.json
```

Let Node.js use it:

```shell
node --experimental-policy=policy.json my-app.js
```

## Options

option | description | default
-------|-------------|--------
`--base-dir`, `-d` | Directory the file paths are relative to. | `$CWD`
`--on-error` | [Error behavior](https://nodejs.org/api/policy.html#policy_error_behavior). | `exit`


## Contributing

If you have a question or need support using `generate-node-policy-file`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/generate-node-policy-file/issues).
