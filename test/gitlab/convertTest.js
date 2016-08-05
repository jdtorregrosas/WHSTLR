'use strict'

const converter = require('../../app/gitlab/gitlabConvert.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const mergeRequestsSchema = require('../../app/schemas/mergeRequestsSchema.js')
const assert = require('assert')

describe('# Commits', () => {
  it('Should throw error when commits without message are comming', () => {
    assert.throws(() => {
      const badCommits = [{
        test: 'test'
      }, {
        test2: 'test2'
      }]
      converter.convertCommits(badCommits)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when commits are not an array', () => {
    assert.throws(() => {
      const badCommits = 'thatSNotAnArray'
      converter.convertCommits(badCommits)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when commits are not an array of objects', () => {
    assert.throws(() => {
      const badCommits = [1, 2, 3, 4, 5]
      converter.convertCommits(badCommits)
    }, TypeError, 'Expected error')
  })

  it('Should convert a commit to the expected schema', () => {
    const goodCommits = [{
      'id': '8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'title': 'Merge branch',
      'author_name': 'Tobias Sailer',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1'
    }, {
      'id': '6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'created_at': '2016-06-30T17:03:59.000+01:00',
      'message': 'Update documentation descriptions 2'
    }]
    const convertedCommits = converter.convertCommits(goodCommits)
    assert.doesNotThrow(() => {
      commitsSchema.validateCommits(convertedCommits)
    }, 'Invalid Schema')
  })

  it('Should throw error when the schema is wrong', () => {
    const goodCommits = [{
      'id': '8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'title': 'Merge branch',
      'author_name': 'Tobias Sailer',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1'
    }, {
      'id': '6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'created_at': '2016-06-30T17:03:59.000+01:00',
      'message': 'Update documentation descriptions 2'
    }]
    assert.throws(() => {
      commitsSchema.validateCommits(goodCommits)
    }, 'Expected error')
  })
})

describe('# Merges', () => {
  it('Should throw error when mergeRequests without message are comming', () => {
    assert.throws(() => {
      const badMergeRequests = [{
        test: 'test'
      }, {
        test2: 'test2'
      }]
      converter.convertMergeRequests(badMergeRequests)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when mergeRequests are not an array', () => {
    assert.throws(() => {
      const badMergeRequests = 'thatSNotAnArray'
      converter.convertMergeRequests(badMergeRequests)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when mergeRequests are not an array of objects', () => {
    assert.throws(() => {
      const badMergeRequests = [1, 2, 3, 4, 5]
      converter.convertMergeRequests(badMergeRequests)
    }, TypeError, 'Expected error')
  })

  it('Should convert a mergeRequest to the expected schema', () => {
    const goodMergeRequests = [{
      'id': 1456,
      'project_id': 140,
      'title': 'Regiestrierungsdatum f575',
      'description': 'Add createdAt in the response',
      'state': 'merged',
      'created_at': '2016-06-30T10:39:46.649+02:00',
      'updated_at': '2016-07-07T11:40:50.742+02:00',
      'target_branch': 'master',
      'source_branch': 'regiestrierungsdatum-f575',
      'author': {
        'name': 'Julian David Torregrosa Simbaqueva',
        'username': 'jdtorregrosas',
        'id': 30,
        'state': 'active',
        'avatar_url': 'http://gitlab.local.coliquio.de/uploads/user/avatar/30/poochieAvatar.png',
        'web_url': 'http://gitlab.local.coliquio.de/u/jdtorregrosas'
      }
    }, {
      'id': 1453,
      'project_id': 140,
      'title': 'Regiestrierungsdatum f572',
      'description': 'Add createdAt in the response 2',
      'state': 'merged',
      'created_at': '2016-06-30T10:39:46.649+02:00',
      'updated_at': '2016-07-07T11:40:50.742+02:00',
      'target_branch': 'master',
      'source_branch': 'regiestrierungsdatum-f5752',
      'author': {
        'name': 'Julian David Torregrosa Simbaqueva',
        'username': 'jdtorregrosas',
        'id': 30,
        'state': 'active',
        'avatar_url': 'http://gitlab.local.coliquio.de/uploads/user/avatar/30/poochieAvatar.png',
        'web_url': 'http://gitlab.local.coliquio.de/u/jdtorregrosas'
      }
    }]
    const convertedMergeRequests = converter.convertMergeRequests(goodMergeRequests)
    assert.doesNotThrow(() => {
      mergeRequestsSchema.validateMergeRequests(convertedMergeRequests)
    }, 'Invalid Schema')
  })

  it('Should throw error when the schema is wrong', () => {
    const goodMergeRequests = [{
      'id': '8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'title': 'Merge branch',
      'author_name': 'Tobias Sailer',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1'
    }, {
      'id': '6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'created_at': '2016-06-30T17:03:59.000+01:00',
      'message': 'Update documentation descriptions 2'
    }]
    assert.throws(() => {
      commitsSchema.validateMergeRequests(goodMergeRequests)
    }, 'Expected error')
  })
})
