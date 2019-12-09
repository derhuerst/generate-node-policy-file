'use strict'

const {join} = require('path')
const {deepStrictEqual} = require('assert')

const generatePolicy = require('..')

const baseDir = __dirname
const files = [
	'one.js',
	'some-dir/two.js',
	'some-dir/three.js'
].map(file => join(__dirname, file))
const errorBehavior = 'log'

const ONE = 'sha512-91tZe1ccLCs4KE1l+rRwGgs6zToRDGu7gj7PI+n2O73pZzISFZH3WoTo1mc9z4XnGUhUejx6WzIhF9RLAYVgEw=='
const TWO = 'sha512-rwhrYWPpd3JwDExvPA8VFRVaGA2RPq3Cg1VfsQ+OaTDIXgrTBQ1B0gP8fBH02mbpRe1VGA0NlTJb5Dz4+iFznA=='
const THREE = 'sha512-m5NR/SSdQLPxYLmASg1VgDrgK40hZiAqlBQQEm3UxAxhj4zRcWwcHIkdjs2dpyo4rQVvceuns+9RxDV7Xrpl+A=='

generatePolicy(baseDir, files, errorBehavior)
.then((policy) => {
	deepStrictEqual(policy, {
		onerror: 'log',
		resources: {
			'./one.js': { integrity: ONE, dependencies: true },
			'./some-dir/two.js': { integrity: TWO, dependencies: true },
			'./some-dir/three.js': { integrity: THREE, dependencies: true }
		}
	})
	console.info('ok 2 generates expected policy')
})
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})
