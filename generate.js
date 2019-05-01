#!/usr/bin/env node
'use strict'

const mri = require('mri')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'version', 'v'
	]
})

if (argv.version || argv.v) {
	process.stdout.write(`generate-node-policy-file v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const {readFileSync} = require('fs')
const generatePolicy = require('.')

const baseDir = argv['base-dir'] || argv.d || process.cwd()
const errorBehavior = argv['on-error'] || 'exit'

const src = argv._[0]
if (!src) showError('The first argument must be the path to a file.')
const files = JSON.parse(readFileSync(src, {encoding: 'utf-8'}))

generatePolicy(baseDir, files, errorBehavior)
.then((policy) => {
	process.stdout.write(JSON.stringify(policy))
})
.catch(showError)
