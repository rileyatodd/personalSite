let [_, __, ...args] = process.argv
const R = require('ramda')

const pipeVal = (val, ...fns) => R.pipe(...fns)(val)
const log = R.curry((tag, x) => { console.log(tag, x); return x })

const getFlag = flag => args.includes(flag)
const getArg = name => args.includes(name) && args[args.indexOf(name)+1]

const pipeWithPromise = R.pipeWith((fn, prev) => prev && prev.then ? prev.then(fn) : fn(prev))
const pipeP = (x, ...fns) => x && x.then ? x.then(pipeWithPromise(fns)) : pipeWithPromise(fns)(x)
const flatMapP = R.curry((fn, arr) => Promise.all(arr.map(fn)))

module.exports = {pipeVal, log, getFlag, getArg, pipeWithPromise, pipeP, flatMapP}