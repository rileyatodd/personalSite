const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const { parse } = require('marked')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const { log, getFlag, getArg } = require('../src/lib/util')

const inputDir = getArg('--input-dir') || './articles'
const outputDir = getArg('--output-dir') || './dist/articles'
const templateLayout = getArg('--template-layout') || 'template.html'
const renderUnpublished = getFlag('--render-unpublished')

const { renderToDir } = require('../src/lib/buildHtml.js')

require('@babel/register')({presets: [require.resolve('@babel/preset-react'),
                                      require.resolve('@babel/preset-env')]})

const {ArticlePage} = require('../src/components/ArticlePage.js')

renderToDir({ outputDir, 
              render, 
              getData: getArticles })

function render(article) {
  return renderToStaticMarkup(React.createElement(ArticlePage, {article}))
}

function getArticles() {
  return Promise.all([readArticles(), getArticlesMeta()])
    .then(([ articles, meta ]) => 
      articles.map(([ fileName, html ]) => ({ fileName, 
                                              html, 
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
