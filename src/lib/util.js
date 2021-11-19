let [_, __, ...args] = process.argv
const R = require('ramda')

const pipeVal = (val, ...fns) => R.pipe(...fns)(val)
const log = R.curry((tag, x) => { console.log(tag, x); return x })

const getFlag = flag => args.includes(flag)
const getArg = name => args.includes(name) && args[args.indexOf(name)+1]

module.exports = {pipeVal, log, getFlag, getArg}