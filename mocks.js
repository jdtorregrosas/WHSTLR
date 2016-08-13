'use strict'

const gitlabMock = require('./test/gitlab/helper/mockServer')
const githubMock = require('./test/github/helper/mockServer')

gitlabMock.listen(2001, () => {console.log('Running Gitlab mock in port 2001');})
gitlabMock.listen(2002, () => {console.log('Running Github mock in port 2002');})
