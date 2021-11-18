let [_, __, ...args] = process.argv
const fs = require('fs').promises
const path = require('path')
const R = require('ramda')

const pipeVal = (val, ...fns) => R.pipe(...fns)(val)
const log = R.curry((tag, x) => { console.log(tag, x); return x })

const pipeWithPromise = R.pipeWith((fn, prev) => prev && prev.then ? prev.then(fn) : fn(prev))
const pipePromise = (x, ...fns) => x && x.then ? x.then(pipeWithPromise(fns)) : pipeWithPromise(fns)(x)
const flatMap = R.curry((fn, arr) => Promise.all(arr.map(fn)))

function renderToDir({ outputDir, getData, render }) {
  pipePromise(cleanDir(outputDir),
              getData,
              flatMap(data => render(data).then(output => R.mergeRight(data, {output}))),
              flatMap(data => fs.writeFile(
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

const contentPlaceholder = `<!-- content goes here -->`
const defaultLayoutTemplate = `
<html>
  <body>
    ${contentPlaceholder}
  </body>
</html>
`
const defaultRender = obj => R.replace(contentPlaceholder, obj.html, defaultLayoutTemplate)

module.exports = { renderToDir, cleanDir }