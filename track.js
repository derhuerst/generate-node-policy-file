'use strict'

const {createWriteStream} = require('fs')
const {addHook} = require('pirates')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const destPath = process.env.REQUIRED_FILES
if (!destPath) showError('Missing env REQUIRED_FILES var.')

const dest = createWriteStream(destPath, {encoding: 'utf-8'})
dest.on('error', showError)

dest.write('[\n')
let first = true
addHook((src, filename) => {
	if (first) first = false
	else dest.write(',')
	dest.write(JSON.stringify(filename) + '\n')
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
