'use strict'

const git = require('./app/git.js')
const ReleaseNote = require('./app/releaseNote.js')

function getRepositoryName (path) {
  return path.split('/').reverse()[0].replace(/\..*/, '')
}

module.exports = {
  execute: function (repositoryURL, version, branch, logOptions) {
    return new Promise((resolve, reject) => {
      git.clone(repositoryURL, branch)
      .then(() => {
        const repositoryName = getRepositoryName(repositoryURL)
        const releaseNote = new ReleaseNote(repositoryName, version)
        git.log(logOptions)
        .then((str) => {
          releaseNote.addTitle('Features', 3)
          var array = str.split('\n')
          for (var entry in array) {
            if (array[entry] !== '' && array[entry] !== ' ') {
              if (array[entry].match(/_TITLE./)) {
                releaseNote.addItem(array[entry].replace('_TITLE', ''))
              } else {
                releaseNote.addSubItem(array[entry])
              }
            }
          }
          resolve(releaseNote.releaseFileName)
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
