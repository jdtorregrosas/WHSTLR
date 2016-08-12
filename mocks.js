'use strict'

const gitlabMock = require('./test/gitlab/helper/mockServer')

gitlabMock.listen(2000, () => {console.log('Running Gitlab mock in port 2000');})
