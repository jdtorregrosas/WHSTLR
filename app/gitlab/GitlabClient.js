'use strict'

const request = require('superagent')

function GitlabClient (baseURL, token) {
  this.baseURL = baseURL
  this.token = token
  this.maxItems = 1000
}
// TODO test tags
GitlabClient.prototype.getTags = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/repository/tags?per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .end((err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
GitlabClient.prototype.getProjects = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects?per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .end((err, res) => {
      if (err) reject(err)
      let projects = []
      for (let project in res.body) {
        projects[project] = res.body[project]
      }
      resolve(projects)
    })
  })
}
GitlabClient.prototype.getCommits = function (projectId, since) {
  console.log(since)
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/repository/commits?since=${since}&per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .end((err, res) => {
      if (err) reject(err)
      let commits = []
      for (let commit in res.body) {
        commits[commit] = res.body[commit]
      }
      resolve(commits)
    })
  })
}
GitlabClient.prototype.getMergeRequests = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/merge_requests?state=merged&per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .end((err, res) => {
      if (err) reject(err)
      let mergeRequests = []
      for (let mergeRequest in res.body) {
        mergeRequests[mergeRequest] = res.body[mergeRequest]
      }
      resolve(mergeRequests)
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
