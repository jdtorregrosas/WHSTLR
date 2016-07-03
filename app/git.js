'use strict'

const exec = require('child_process').exec
const promisify = require('promisify-node')
const fse = promisify(require('fs-extra'))
const temporalPath = `${__dirname}/../tmp`

module.exports = {
  /**
   * Clone a repository's specific branch in the temporal path
   * @param {string} url
   * @param {string} branch
   * @param {function} callback
   */
  clone: function (url, branch = 'master') {
    const command = `git clone -b ${branch} ${url} ${temporalPath}`
    return new Promise((resolve, reject) => {
      fse.remove(temporalPath).then(function () {
        exec(command, { cwd: `${__dirname}/./` }, function (err, stdout, stderr) {
          if (err) reject(err)
          resolve(stdout)
        })
      })
    })
  },
  /**
   * Log in a String all the commit messages in a range
   * @param {Object} options{endTag: {string}, startTag: {string}}
   * @param {function} callback
   */
  log: function (options = {}) {
    let command
    if (!options.endTag) {
      command = `git log --oneline --format="_TITLE%s%n %b"`
    } else if (!options.startTag && options.endTag) {
      command = `git log ${options.endTag}..HEAD --oneline --format="_TITLE%s%n %b"`
    } else if (options.startTag && options.endTag) {
      command = `git log ${options.endTag}..${options.startTag} --oneline --format="_TITLE%s%n %b"`
    }
    return new Promise((resolve, reject) => {
      exec(command, { cwd: temporalPath }, function (err, stdout, stderr) {
        if (err) reject(err)
        resolve(stdout)
      })
    })
  }
}
