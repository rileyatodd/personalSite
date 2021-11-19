const fs = require('fs').promises
const path = require('path')
const R = require('ramda')

const { log, getArg, pipeP } = require('../src/lib/util')
const { ensureDir, renderReact } = require('../src/lib/buildHtml.js')

const {AboutPage} = require('../src/components/AboutPage.js')

const outputDir = getArg('--output-dir') || './public'

if (process.argv[1].endsWith('bin/buildAbout.js')) {
  log('building About page', null)
  build({outputDir}).then(_ => process.exit(0))
}

function build({ outputDir }) {
  return pipeP(
    ensureDir(outputDir),
    _ => fs.writeFile(path.join(outputDir, 'about.html'),
                      renderReact(AboutPage, {})))
}

module.exports = {build}