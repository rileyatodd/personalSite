const fs = require('fs').promises
const path = require('path')
const R = require('ramda')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

// This allows subsequent requires to correctly process jsx
// as such this buildHtml file MUST be required BEFORE any component files
require('@babel/register')({presets: [require.resolve('@babel/preset-react'),
                                      require.resolve('@babel/preset-env')]})

const { pipeP, flatMapP } = require('./util.js')

function cleanDir(outputDir) {
  return fs.access(outputDir)
           .then(_ => fs.rmdir(outputDir, { recursive: true }))
           .catch(_ => fs.mkdir(outputDir, { recursive: true }))
           .then(_ => fs.mkdir(outputDir, { recursive: true }))
}

function ensureDir(dir) {
  return fs.access(dir).catch(_ => fs.mkdir(dir, { recursive: true }))
}

function renderReact(component, props) {
  return renderToStaticMarkup(React.createElement(component, props))
}

module.exports = { cleanDir, ensureDir, renderReact }