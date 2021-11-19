const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const { parse } = require('marked')

const { log, getFlag, getArg, pipeP } = require('../src/lib/util')

const outputDir = getArg('--output-dir') || './public'

const { ensureDir, renderReact } = require('../src/lib/buildHtml.js')
const { getArticles } = require('./buildArticles.js')

const {HomePage} = require('../src/components/HomePage.js')

function build({ outputDir }) {
  return pipeP(
    ensureDir(outputDir),
    getArticles,
    articles => renderReact(HomePage, {articles}),
    html => fs.writeFile(path.join(outputDir, 'index.html'),
                         html))
}

if (process.argv[1].endsWith('bin/buildHomepage.js')) {
  log('building Homepage', null)
  build({outputDir}).then(_ => process.exit(0))
}

module.exports = {build}