const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const { parse } = require('marked')

const { log, getFlag, getArg, pipeP, flatMapP } = require('../src/lib/util')

const inputDir = getArg('--input-dir') || './articles'
const outputDir = getArg('--output-dir') || './dist/articles'
const renderUnpublished = getFlag('--render-unpublished')

const { cleanDir, renderReact } = require('../src/lib/buildHtml.js')

const {ArticlePage} = require('../src/components/ArticlePage.js')
const {ArticleIndex} = require('../src/components/ArticleIndex.js')

if (process.argv[1].endsWith('bin/buildArticles.js')) {
  log('building articles', null)
  build({ outputDir }).then(_ => process.exit(0))
}

let articles = getArticles()

function build({ outputDir }) {
  return pipeP(
    cleanDir(outputDir),
    _ => Promise.all([buildArticles(), buildIndex()]),
    ([ articles, index ]) => articles.concat(index),
    flatMapP(([ name, output ]) => fs.writeFile(path.join(outputDir, name), 
                                                output)))
}

function buildArticles() {
  return pipeP(
    articles,
    flatMapP(article => [article.outputName, renderReact(ArticlePage, {article})]))
}

function buildIndex() {
  return pipeP(
    articles,
    articles => ['index.html', renderReact(ArticleIndex, {articles})])
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