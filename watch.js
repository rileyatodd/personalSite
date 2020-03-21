var FileWatcher = require('filewatcher')
var exec = require('child_process').exec

var jadeWatcher = FileWatcher()
jadeWatcher.add('views')
jadeWatcher.add('articles')

jadeWatcher.on('change', () => {
  exec("npm run build", (err, stdout, stderr) => {
    err && filewatcher.removeAll()
    console.log(stdout)
    console.error(stderr)
  })
})

var tailwindWatcher = FileWatcher()
tailwindWatcher.add('src/index.css')
tailwindWatcher.add('tailwind.config.js')

tailwindWatcher.on('change', () => {
  exec("npm run build:tw", (err, stdout, stderr) => {
    err && tailwindWatcher.removeAll()
    console.log(stdout)
    console.log(stderr)
  })
})


