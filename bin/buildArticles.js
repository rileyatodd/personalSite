let [_, __, ...args] = process.argv
const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const { parse } = require('marked')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const Article = require('../src/ArticlePage.js')

const pipeVal = (val, ...fns) => R.pipe(...fns)(val)
const log = R.curry((tag, x) => { console.log(tag, x); return x })

const getFlag = flag => args.includes(flag)
const getArg = name => args.includes(name) && args[args.indexOf(name)+1]

const inputDir = getArg('--input-dir') || './articles'
const outputDir = getArg('--output-dir') || './dist/articles'
const templateLayout = getArg('--template-layout') || 'template.html'
const renderUnpublished = getFlag('--render-unpublished')
const start = getArg('--start')

// useful for caching the template files
const loadedFiles = {}

const { renderToDir } = require('../src/lib/buildHtml.js')

renderToDir({ 
  outputDir, 
  render: renderArticleReact, 
  getData: getArticles
})

function renderArticle(a) {
  return getLayoutTemplate(a).then(R.replace(articlePlaceholder, a.html))
}

function renderArticleReact(article) {
  return renderToStaticMarkup(React.createElement(Article, {article}))
}

function getArticles() {
  return Promise.all([readArticles(), getArticlesMeta()])
    .then(([ articles, meta ]) => 
      articles.map(([ fileName, html ]) => ({ fileName, 
                                              html, 
                                              ...(meta[fileName] || {}) })))
    .then(as => renderUnpublished ? as : as.filter(R.prop('published')))
}
// 800 403 0864 HIP 
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

const loadFileCached = name => { 
  let file = loadedFiles[name]
  if (file) return Promise.resolve(file)
  return fs.readFile(path.join(inputDir, name), 'utf-8')
           .then(file => { loadedFiles[name] = file
                           return file }) }

function getLayoutTemplate(article) {
  return loadFileCached(article.template || templateLayout)
           .catch(_ => defaultLayoutTemplate) 
           //TODO should be selective about what we catch here
}

const articlePlaceholder = `<!-- article goes here -->`
const defaultLayoutTemplate = `
<html>
  <body>
    ${articlePlaceholder}
  </body>
</html>
`