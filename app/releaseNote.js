'use strict'

const fs = require('fs')

function ReleaseNote (repositoryName, releaseVersion) {
  this.releaseFileName = `${repositoryName}_${releaseVersion}.md`
  this.releaseFile = `${__dirname}/../releases/${this.releaseFileName}`
  fs.writeFileSync(this.releaseFile, `# ${repositoryName}\n*****\n`)
  this.addTitle(releaseVersion, 2)
}

ReleaseNote.prototype.addItem = function (message) {
  fs.appendFileSync(this.releaseFile, `* ${message}\n`)
}

ReleaseNote.prototype.addSubItem = function (message) {
  fs.appendFileSync(this.releaseFile, ` * ${message}\n`)
}

ReleaseNote.prototype.addTitle = function (title, size = 3) {
  let h = '### '
  let end = '\n'
  if (size === 1) {
    h = '# '
    end = '\n*****\n'
  } else if (size === 2) {
    h = '## '
    end = '\n'
  } else if (size === 3) {
    h = '### '
    end = ':\n'
  }
  fs.appendFileSync(this.releaseFile, `${h}${title}${end}`)
}

module.exports = ReleaseNote
