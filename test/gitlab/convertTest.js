'use strict'

const converter = require('../../app/gitlab/gitlabConvert.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const tagsSchema = require('../../app/schemas/tagsSchema.js')
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
