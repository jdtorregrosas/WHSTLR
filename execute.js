'use strict'

const git = require('./git.js')
const ReleaseNote = require('./releaseNote.js')

const repositoryURL = 'https://github.com/jdtorregrosas/walpurgis-nacht-syntax'
const version = 'v0.0.0.1'
const branch = 'test'
const repositoryName = getRepositoryName(repositoryURL)

const releaseNote = new ReleaseNote(repositoryName, version)

git.clone(repositoryURL, branch, (str) => {
  git.log(version, function (str) {
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
