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

const ONE = 'sha512-aj0n4KXeeijx68HWhebYUwVSNmZTsAhXlmv1BBTB5GAnlVX2pg0aO23EpEYBGeLQsbqIP2JCU9ioxyIru+7Vzw=='
const TWO = 'sha512-rwhrYWPpd3JwDExvPA8VFRVaGA2RPq3Cg1VfsQ+OaTDIXgrTBQ1B0gP8fBH02mbpRe1VGA0NlTJb5Dz4+iFznA=='
const THREE = 'sha512-HXk+bqp9VdwuTUPxN9wYpIusnY/fo3yjD7Fn+gMoyEOsrG73nB2OgSFrJYl7ORTNUdo6GDsylXu7VLUmX3CFrw=='

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
