'use strict'

const request = require('superagent')
// 'https://api.github.com'
function GithubClient (baseURL, token) {
  this.baseURL = baseURL
  this.token = token
  this.maxItems = 1000
}
GithubClient.prototype.getTags = function (project) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/repos/${project.owner}/${project.name}/releases`
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
GithubClient.prototype.getRepos = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/user/repos`
    request
    .get(url)
    .set('Authorization', `token ${this.token}`)
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
GithubClient.prototype.getCommitsFromPull = function (project, pullId) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/repos/${project.owner}/${project.name}/pulls/${pullId}/commits`
    request
    .get(url)
    .set('Authorization', `token ${this.token}`)
    .then((res) => {
      let commits = []
      for (let commit in res.body) {
        commits[commit] = res.body[commit]
        commits[commit].mergeid = pullId
      }
      resolve(commits)
    }).catch((err) => {
      console.log(err);
      reject(err)
    })
  })
}
GithubClient.prototype.getCommits = function (project) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/repos/${project.owner}/${project.name}/commits`
    request
    .get(url)
    .set('Authorization', `token ${this.token}`)
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
GithubClient.prototype.getPulls = function (project) {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/repos/${project.owner}/${project.name}/pulls?state=closed`
    request
    .get(url)
    .set('Authorization', `token ${this.token}`)
    .then((res) => {
      let pulls = []
      for (let pull in res.body) {
        pulls[pull] = res.body[pull]
      }
      resolve(pulls)
    }).catch((err) => {
      reject(err)
    })
  })
}
GithubClient.prototype.getCurrentUser = function () {
  return new Promise((resolve, reject) => {
    const url = `${this.baseURL}/user`
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
