var filewatcher = require('filewatcher')()
var exec = require('child_process').exec

filewatcher.add('assets/')
filewatcher.add('assets/javascripts/')
filewatcher.add('assets/images/')
filewatcher.add('assets/misc/')
filewatcher.add('assets/stylesheets/')
filewatcher.add('articles/')
filewatcher.add('src/components/')

filewatcher.on('change', () => {
  exec("npm run build", (err, stdout, stderr) => {
    err && filewatcher.removeAll()
    console.log(stdout)
    console.error(stderr)
  })
})

