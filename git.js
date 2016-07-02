'use strict'

const exec = require('child_process').exec
const promisify = require('promisify-node')
const fse = promisify(require('fs-extra'))

module.exports = {
  clone: function (url, branch = 'master', callback) {
    const command = `git clone -b ${branch} ${url} ./tmp`
    fse.remove('./tmp').then(function () {
      exec(command, { cwd: './' }, function (err, stdout, stderr) {
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
    exec(command, { cwd: './tmp' }, function (err, stdout, stderr) {
      // if (err) callback(err)
      callback(stdout)
    })
  }
}
