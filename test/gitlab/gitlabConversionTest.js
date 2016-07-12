'use strict'

const mock = require('./mockServer.js')
const converter = require('../../app/converter.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const request = require('supertest')

it('# Projects', (done) => {
  request(mock)
  .post('/api/v3/projects')
  .send()
  .end((err, res) => {
    if (err) done(err)
    //TODO Tags
    // request(mock)
    // .post('')
    else {
      const projects = converter.convertProjects(res.body, [])
      console.log(projects)
      projectsSchema.validateProjects(projects)
      done()
    }
  })
})

it('# Commits', (done) => {
  request(mock)
  .post('/api/v3/projects/140/repository/commits')
  .send()
  .end((err, res) => {
    if (err) done(err)
    else {
      const commits = converter.convertCommits(res.body)
      commitsSchema.validateCommits(commits)
      done()
    }
  })
})
