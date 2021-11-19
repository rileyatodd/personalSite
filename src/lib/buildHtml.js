const fs = require('fs').promises
const path = require('path')
const R = require('ramda')

const pipeWithPromise = R.pipeWith((fn, prev) => prev && prev.then ? prev.then(fn) : fn(prev))
const pipePromise = (x, ...fns) => x && x.then ? x.then(pipeWithPromise(fns)) : pipeWithPromise(fns)(x)
const flatMapP = R.curry((fn, arr) => Promise.all(arr.map(fn)))

function renderToDir({ outputDir, getData, render }) {
  pipePromise(cleanDir(outputDir),
              getData,
              flatMapP(data => pipePromise(render(data), output => R.mergeRight(data, {output}))),
              flatMapP(data => fs.writeFile(
                                 path.join(outputDir, data.fileName.replace('.md', '.html')), 
                                 data.output)),
              _ => process.exit(0))
}

function cleanDir(outputDir) {
  return fs.access(outputDir)
           .then(_ => fs.rmdir(outputDir, { recursive: true }))
           .catch(_ => fs.mkdir(outputDir, { recursive: true }))
           .then(_ => fs.mkdir(outputDir, { recursive: true }))
}

module.exports = { renderToDir, cleanDir }