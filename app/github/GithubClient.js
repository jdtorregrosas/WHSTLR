'use strict'

const request = require('superagent')

function GithubClient (baseURL, token) {
  this.baseURL = 'https://api.github.com'
  this.token = token
  this.maxItems = 1000
}
GithubClient.prototype.getTags = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/repository/tags?per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .then((res) => {
      resolve(res.body)
    }).catch((err) => {
      reject(err)
    })
  })
}
GithubClient.prototype.getProjects = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects?per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .then((res) => {
      let projects = []
      for (let project in res.body) {
        projects[project] = res.body[project]
      }
      resolve(projects)
    }).catch((err) => {
      reject(err)
    })
  })
}
GithubClient.prototype.getCommitsFromMerge = function (projectId, mergeRequestId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/merge_requests/${mergeRequestId}/commits?per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .then((res) => {
      let commits = []
      for (let commit in res.body) {
        commits[commit] = res.body[commit]
        commits[commit].mergeid = mergeRequestId
      }
      resolve(commits)
    }).catch((err) => {
      reject(err)
    })
  })
}
GithubClient.prototype.getCommits = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/repository/commits?per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .then((res) => {
      let commits = []
      for (let commit in res.body) {
        commits[commit] = res.body[commit]
      }
      resolve(commits)
    }).catch((err) => {
      reject(err)
    })
  })
}
GithubClient.prototype.getMergeRequests = function (projectId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/projects/${projectId}/merge_requests?state=merged&per_page=${this.maxItems}`
    request
    .get(url)
    .set('PRIVATE-TOKEN', this.token)
    .then((res) => {
      let mergeRequests = []
      for (let mergeRequest in res.body) {
        mergeRequests[mergeRequest] = res.body[mergeRequest]
      }
      resolve(mergeRequests)
    }).catch((err) => {
      reject(err)
    })
  })
}
GithubClient.prototype.getCurrentUser = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/api/v3/user`
    request
    .get(url)
    .set('Authorization', `token ${this.token}`)
    .then((res) => {
      resolve(res.body)
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = GithubClient
