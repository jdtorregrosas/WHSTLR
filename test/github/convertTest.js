'use strict'

const converter = require('../../app/github/githubConvert.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const mergeRequestsSchema = require('../../app/schemas/mergeRequestsSchema.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const tagsSchema = require('../../app/schemas/tagsSchema.js')
const assert = require('assert')

describe('# Github converter', function () {
  it('Should convert a list of commits to the expected schema', () => {
    const goodCommitsData = [{
      'sha': '6dcb09b5b57875f334f61aebed695e2e4193db5e',
      'html_url': 'https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e',
      'commit': {
        'author': {
          'name': 'Monalisa Octocat',
          'date': '2011-04-14T16:00:49Z'
        },
        'message': 'Fix all the bugs\n\rRight now'
      }
    },{
      'sha': '6dcb09b5b57875f334f61aebed695e2e4193db51',
      'html_url': 'https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db51',
      'commit': {
        'author': {
          'name': 'Monalisa Octocato',
          'date': '2011-04-14T11:00:49Z'
        },
        'message': 'Fix one bug\n\rTomorrow'
      }
    }]
    const goodCommitsSchema = [{
      'id': '6dcb09b5b57875f334f61aebed695e2e4193db5e',
      'messages': ['Fix all the bugs', 'Right now'],
      'mergeid': '',
      'author': 'Monalisa Octocat',
      'date': '2011-04-14T16:00:49Z',
      'path': '/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e'
    }, {
      'id': '6dcb09b5b57875f334f61aebed695e2e4193db51',
      'messages': ['Fix one bug', 'Tomorrow'],
      'mergeid': '',
      'author': 'Monalisa Octocato',
      'date': '2011-04-14T11:00:49Z',
      'path': '/commit/6dcb09b5b57875f334f61aebed695e2e4193db51'
    }]
    const convertedCommits = converter.convertCommits(goodCommitsData)
    assert.deepEqual(convertedCommits, goodCommitsSchema)
  })
  it('Should convert a list of repos to the expected schema and return it in alphabetical order', () => {
    const goodReposData = [{
      'id': 1296269,
      "owner": {
        "login": "octocat"
      },
      'name': 'Hello-World',
      'html_url': 'https://github.com/octocat/Hello-World'
    },{
      'id': 1296249,
      "owner": {
        "login": "octocat"
      },
      'name': 'Hallo-Welt',
      'html_url': 'https://github.com/octocat/Hello-World'
    },{
      'id': 1236267,
      "owner": {
        "login": "octocat"
      },
      'name': 'Hola-Mundo',
      'html_url': 'https://github.com/octocat/Hello-World'
    },{
      'id': 1346269,
      "owner": {
        "login": "octocat"
      },
      'name': 'Ciao-Mondo',
      'html_url': 'https://github.com/octocat/Hello-World'
    }]
    const goodReposSchema = [{
      'id': 1346269,
      'name': 'Ciao-Mondo',
      "owner": "octocat",
      'url': 'https://github.com/octocat/Hello-World'
    }, {
      'id': 1296249,
      'name': 'Hallo-Welt',
      "owner": "octocat",
      'url': 'https://github.com/octocat/Hello-World'
    }, {
      'id': 1296269,
      'name': 'Hello-World',
      "owner": "octocat",
      'url': 'https://github.com/octocat/Hello-World'
    }, {
      'id': 1236267,
      'name': 'Hola-Mundo',
      "owner": "octocat",
      'url': 'https://github.com/octocat/Hello-World'
    }]
    const convertedRepos = converter.convertRepos(goodReposData)
    assert.deepEqual(convertedRepos, goodReposSchema)
  })
  it('Should convert a list of releases to the expected schema and return it in alphabetical order', () => {
    const goodReleasesData = [
      {
        'tag_name': 'v1.0.0',
        'published_at': '2013-02-27T19:35:32Z'
      }, {
        'tag_name': 'v2.0.0',
        'published_at': '2013-03-27T19:35:32Z'
      }, {
        'tag_name': 'v3.0.0',
        'published_at': '2013-04-27T19:35:32Z'
      }
    ]

    const goodReleasesSchema = [
      {
        'name': 'v3.0.0',
        'date': '2013-04-27T19:35:32Z'
      }, {
        'name': 'v2.0.0',
        'date': '2013-03-27T19:35:32Z'
      }, {
        'name': 'v1.0.0',
        'date': '2013-02-27T19:35:32Z'
      }
    ]
    const convertedReleases = converter.convertReleases(goodReleasesData)
    assert.deepEqual(convertedReleases, goodReleasesSchema)
  })
  it('Should convert a list of pulls to the expected schema and return it in alphabetical order', () => {
    const goodPullsData = [
      {
        'id': 1,
        'number': 1347,
        'title': 'new-feature',
        'body': 'Please pull these awesome changes',
        'merged_at': '2011-01-26T19:01:12Z',
        'head': {
          'ref': 'new-topic'
        },
        'user': {
          'login': 'octocat'
        }
      }, {
        'id': 2,
        'number': 1342,
        'title': 'new-feature 2',
        'body': 'Please pull these awesome changes 2',
        'merged_at': '2011-01-26T19:01:22Z',
        'head': {
          'ref': 'new-topic 2'
        },
        'user': {
          'login': 'octocato'
        }
      }, {
        'id': 3,
        'number': 1343,
        'title': 'new-feature 3',
        'body': 'Please pull these awesome changes 3\r\n *-* Cool',
        'merged_at': '2011-01-26T19:01:13Z',
        'head': {
          'ref': 'new-topic 3'
        },
        'user': {
          'login': 'octocata'
        }
      }
    ]


    const goodPullsSchema = [
      {
        'id': 1347,
        'title': 'new-feature',
        'source_branch': 'new-topic',
        'descriptions': ['Please pull these awesome changes'],
        'author': 'octocat',
        'date': '2011-01-26T19:01:12Z',
        'path': '/pull/1347'
      }, {
        'id': 1342,
        'title': 'new-feature 2',
        'source_branch': 'new-topic 2',
        'descriptions': ['Please pull these awesome changes 2'],
        'author': 'octocato',
        'date': '2011-01-26T19:01:22Z',
        'path': '/pull/1342'
      }, {
        'id': 1343,
        'title': 'new-feature 3',
        'source_branch': 'new-topic 3',
        'descriptions': ['Please pull these awesome changes 3','Cool'],
        'author': 'octocata',
        'date': '2011-01-26T19:01:13Z',
        'path': '/pull/1343'
      }
    ]
    const convertedPulls = converter.convertPulls(goodPullsData)
    assert.deepEqual(convertedPulls, goodPullsSchema)
  })
})
