'use strict'

const request = require('superagent')

function GitlabClient (baseURL, token) {
  this.baseURL = baseURL
  this.token = token
}
GitlabClient.prototype.getProjects = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
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
GitlabClient.prototype.getCommits = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/repository/commits`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
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
GitlabClient.prototype.getMergeRequests = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/merge_requests?state=merged`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
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
GitlabClient.prototype.getCurrentUser = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/user`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .end((err, res) => {
      if (err) reject(err)
      else resolve(res.body)
    })
  })
}

module.exports = GitlabClient
