'use strict'

const {join} = require('path')
const {readFileSync} = require('fs')
const {deepStrictEqual} = require('assert')

const expected = [
	'one.js',
	'some-dir/two.js',
	'some-dir/three.js'
].map(file => join(__dirname, file))

const path = join(__dirname, 'files.json')
const files = JSON.parse(readFileSync(path, {encoding: 'utf-8'}))

deepStrictEqual(files, expected)
console.info('ok 1 files.json looks good')
