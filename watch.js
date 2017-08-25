var filewatcher = require('filewatcher')()
var exec = require('child_process').exec

filewatcher.add('views')

filewatcher.on('change', () => {
  exec("npm run build", (err, stdout, stderr) => {
    err && filewatcher.removeAll()
    console.log(stdout)
    console.error(stderr)
  })
})

