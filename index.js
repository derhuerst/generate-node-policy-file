'use strict'

const {fromStream} = require('ssri')
const {createReadStream} = require('fs')
const {relative, sep} = require('path')
const Queue = require('queue')

const computeIntegrity = (path) => {
	return fromStream(createReadStream(path))
	.then(src => src.toString())
}

const relativePath = (baseDir, path) => {
	let rel = relative(baseDir, path)
	const first = rel.split(sep)[0]
	if (first !== '.' && first !== '..') rel = '.' + sep + rel
	return rel
}

const generatePolicy = (baseDir, files, errorBehavior) => {
	const res = {}
	const addIntegrity = (file) => (cb) => {
		computeIntegrity(file)
		.then((integrity) => {
			res[relativePath(baseDir, file)] = {
				integrity,
				dependencies: true // todo: implement this, see #3
			}
			cb()
		})
		.catch(cb)
	}

	const queue = new Queue({
		concurrency: 8, // todo: nr of cores?
		autostart: true
	})
	for (const file of files) queue.push(addIntegrity(file))

	return new Promise((resolve, reject) => {
		queue.once('error', reject)
		queue.once('end', () => {
			resolve({
				onerror: errorBehavior,
				resources: res
			})
		})
	})
}

module.exports = generatePolicy
