const fs = require('fs').promises
const path = require('path')
const R = require('ramda')

const { pipeP, flatMapP } = require('./util.js')

function renderToDir({ outputDir, getData, render }) {
  pipeP(cleanDir(outputDir),
        getData,
        flatMapP(data => pipeP(render(data), output => R.mergeRight(data, {output}))),
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