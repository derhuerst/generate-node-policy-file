#!/usr/bin/env node
'use strict'

const mri = require('mri')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'version', 'v',
		'help', 'h',
		'pretty', 'p',
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Generate a list of required files by your app:
	env REQUIRED_FILES=required-files.json node -r generate-node-policy-file/track my-app.js

Generate a Node.js policy file from the list:
    generate-node-policy-file required-files.json >policy.json
    sudo chown root:admin policy.json
    sudo chmod 755 policy.json

Options:
    --base-dir  -d  Directory the file paths are relative to. Default: .
    --on-error      Error behavior. Default: exit
                    https://nodejs.org/api/policy.html#policy_error_behavior
	--pretty    -p  Pretty-print the generated JSON.
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`generate-node-policy-file v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const {realpathSync, readFileSync} = require('fs')
const generatePolicy = require('.')

let baseDir = argv['base-dir'] || argv.d
if (baseDir) baseDir = realpathSync(baseDir)
else baseDir = process.cwd()

const src = argv._[0]
if (!src) showError('The first argument must be the path to a file.')
const files = JSON.parse(readFileSync(src, {encoding: 'utf-8'}))

const errorBehavior = argv['on-error'] || 'exit'

const pretty = !!(argv.pretty || argv.p)

generatePolicy(baseDir, files, errorBehavior)
.then((policy) => {
	const json = pretty
		? JSON.stringify(policy, null, '\t')
		: JSON.stringify(policy)
	process.stdout.write(json)
})
.catch(showError)
