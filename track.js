'use strict'

const {createWriteStream} = require('fs')
const {sync: findPackageJSON} = require('pkg-up')
const {addHook} = require('pirates')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const destPath = process.env.REQUIRED_FILES
if (!destPath) showError('Missing env REQUIRED_FILES var.')

const pathToPackageJSON = findPackageJSON()

const dest = createWriteStream(destPath, {encoding: 'utf-8'})
dest.on('error', showError)

// Node >= 12.13 seems to require `package.json` to be in the polify file.
dest.write(`[
${JSON.stringify(pathToPackageJSON)}
`)

addHook((src, filename) => {
	dest.write(',' + JSON.stringify(filename) + '\n')
	return src
}, {
	exts: [
		'.js',
		'.mjs', // see also https://github.com/ariporad/pirates/issues/56
		'.json'
	]
})

process.on('exit', (code) => {
	dest.end(']\n')
})
