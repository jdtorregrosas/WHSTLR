'use strict'

const gitlabMock = require('./test/gitlab/helper/mockServer')
const githubMock = require('./test/github/helper/mockServer')

gitlabMock.listen(2000, 'gitlab.mock', () => {console.log('Running Gitlab mock in gitlab.mock:2000');})
githubMock.listen(2001, 'github.mock', () => {console.log('Running Github mock in github.mock:2001');})
