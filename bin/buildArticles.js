let [_, __, ...args] = process.argv
const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const { parse } = require('marked')

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

main()

function main() {
  cleanOutputDir()
    .then(_ => Promise.all([getArticles(), getArticlesMeta()]))
    .then(([ articles, meta ]) => 
      pipeVal(articles,
        R.map(([ fileName, html ]) => ({ fileName, 
                                         html, 
                                         ...(meta[fileName] || {}) })),
        R.map(a => getLayoutTemplate(a)
                     .then(R.replace(articlePlaceholder, a.html))
                     .then(output => R.mergeRight(a, {output}))),
        as => Promise.all(as)))
    .then(as => renderUnpublished ? as : as.filter(R.prop('published')))
    .then(R.map(a => fs.writeFile(path.join(outputDir, a.fileName.replace('.md', '.html')), 
                                  a.output)))
    .then(writes => Promise.all(writes))
    .then(_ => process.exit(0))
}

function cleanOutputDir() {
  return fs.access(outputDir)
           .then(_ => fs.rmdir(outputDir, { recursive: true }))
           .catch(_ => fs.mkdir(outputDir, { recursive: true }))
           .then(_ => fs.mkdir(outputDir, { recursive: true }))
}

function getArticles() {
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