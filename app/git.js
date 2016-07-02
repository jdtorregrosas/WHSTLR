'use strict'

const exec = require('child_process').exec
const promisify = require('promisify-node')
const fse = promisify(require('fs-extra'))
const temporalPath = `${__dirname}/../tmp`

module.exports = {
  clone: function (url, branch = 'master', callback) {
    const command = `git clone -b ${branch} ${url} ${temporalPath}`
    fse.remove(temporalPath).then(function () {
      exec(command, { cwd: `${__dirname}/../` }, function (err, stdout, stderr) {
        // if (err) callback(err)
        callback(stdout)
      })
    })
  },
  log: function (latestTag = '', callback) {
    let command
    if (latestTag === '') {
      command = `git log --oneline --format="_TITLE%s%n %b"`
    } else {
      command = `git log ${latestTag}..HEAD --oneline --format="_TITLE%s%n %b"`
    }
    exec(command, { cwd: temporalPath }, function (err, stdout, stderr) {
      // if (err) callback(err)
      callback(stdout)
    })
  }
}
