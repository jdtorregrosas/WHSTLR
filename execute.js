'use strict'

const git = require('./app/git.js')
const ReleaseNote = require('./app/releaseNote.js')

const repositoryURL = 'https://github.com/jdtorregrosas/releaseNotesPrinter.git'
const version = 'v2.0.0'
const branch = 'master'
const repositoryName = getRepositoryName(repositoryURL)

const releaseNote = new ReleaseNote(repositoryName, version)

const logOptions = {
  endTag: 'v1.0.0'
}
git.clone(repositoryURL, branch, (str) => {
  git.log(logOptions, function (str) {
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
  })
})

function getRepositoryName (path) {
  return path.split('/').reverse()[0].replace(/\..*/, '')
}
