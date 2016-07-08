'use strict'

const expect = require('chai').expect
const gitlab = require('../app/gitlab')

describe('# Projects', () => {
  it('Should get an array of projects', () => {
    return gitlab.getProjects('aqYv_Y-WCMWPQGS7A9rY')
    .then((res) => {
      console.log(res)
      expect(res).to.be.an('array')
    })
  })
})

describe('# Commits', () => {
  it('Should get an array of commits of an specific project', () => {
    const projectId = 139
    const token = 'aqYv_Y-WCMWPQGS7A9rY'
    return gitlab.getCommits(token, projectId)
    .then((res) => {
      console.log(res)
      expect(res).to.be.an('array')
    })
  })
})
