const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const { parse } = require('marked')

const { log, getFlag, getArg, pipeP } = require('../src/lib/util')

const inputDir = getArg('--input-dir') || './articles'
const outputDir = getArg('--output-dir') || './dist/articles'
const renderUnpublished = getFlag('--render-unpublished')

const { renderToDir, renderReact } = require('../src/lib/buildHtml.js')

const {ArticlePage} = require('../src/components/ArticlePage.js')
const {ArticleIndex} = require('../src/components/ArticleIndex.js')

let articles = getArticles()

function build({ outputDir }) {
  return pipeP(
    renderToDir({ outputDir, 
                  render: article => renderReact(ArticlePage, {article}),
                  getData: getArticles }),
    _ => articles,
    as => fs.writeFile(path.join(outputDir, 'index.html'),
                       renderReact(ArticleIndex, {articles: as})))
}

if (process.argv[1].endsWith('bin/buildArticles.js')) {
  log('building articles', null)
  build({ outputDir }).then(_ => process.exit(0))
}

function getArticles() {
  return Promise.all([readArticles(), getArticlesMeta()])
    .then(([ articles, meta ]) => 
      articles.map(([ fileName, html ]) => ({ fileName, 
                                              html,
                                              outputName: fileName.replace('.md', '.html'),
                                              ...(meta[fileName] || {}) })))
    .then(as => renderUnpublished ? as : as.filter(R.prop('published')))
}

function readArticles() {
  return fs.readdir(inputDir)
           .then(R.pipe(R.filter(R.endsWith('.md')),
                        R.map(n => fs.readFile(path.join(inputDir, n), 'utf-8')
                                     .then(f => [n, parse(f)])),
                        x => Promise.all(x)))
}

function getArticlesMeta() {
  return fs.readFile(path.join(inputDir, 'meta.json'), 'utf-8')
           .then(JSON.parse)
}

module.exports = {getArticles, build}