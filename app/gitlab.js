'use strict'

const request = require('superagent')

module.exports = {
  getProjects: (token) => {
    return new Promise((resolve, reject) => {
      request
      .get('http://gitlab.local.coliquio.de/api/v3/projects')
      .set('PRIVATE-TOKEN', token)
      .end((err, res) => {
        if (err) reject(err)
        let projects = []
        for (let project in res.body) {
          projects[project] = res.body[project]
          resolve(projects)
        }
      })
    })
  },
  getCommits: (token, projectId) => {
    return new Promise((resolve, reject) => {
      request
      .get(`http://gitlab.local.coliquio.de/api/v3/projects/${projectId}/repository/commits`)
      .set('PRIVATE-TOKEN', token)
      .end((err, res) => {
        if (err) reject(err)
        let projects = []
        for (let project in res.body) {
          projects[project] = res.body[project]
          resolve(projects)
        }
      })
    })
  }
}
