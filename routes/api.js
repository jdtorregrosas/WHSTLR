'use strict'

const express = require('express')
const app = express()
const gitlabConverter = require('../app/gitlab/gitlabConvert')
const githubConverter = require('../app/github/githubConvert')
const ErrorW = require('../app/ErrorW')
const GithubClient = require('../app/github/GithubClient')
const GitlabClient = require('../app/gitlab/GitlabClient')

app.get('/userName', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    client.getCurrentUser().then((user) => {
      const userName = user.name
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(userName, null, 3))
    }).catch((err) => {
      res.status(404).send(new ErrorW('UserName not found ' + err))
    })
  } else if (client instanceof GithubClient) {
    client.getCurrentUser().then((user) => {
      const userName = user.login
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(userName, null, 3))
    }).catch((err) => {
      res.status(404).send(new ErrorW('UserName not found ' + err))
    })
  }
})
app.get('/projects', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    client.getProjects().then((projetsRaw) => {
      const projects = gitlabConverter.convertProjects(projetsRaw)
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(projects, null, 3))
    }).catch((err) => {
      res.status(500).send(new ErrorW('Cannot get gitlab Repos ' + err))
    })
  } else if (client instanceof GithubClient) {
    client.getRepos().then((reposRaw) => {
      const repos = githubConverter.convertRepos(reposRaw)
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(repos, null, 3))
    }).catch((err) => {
      res.status(500).send(new ErrorW('Cannot get github Repos ' + err))
    })
  }
})

app.get('/projects/:projectId/tags', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    client.getTags(req.params.projectId)
    .then((tagsRaw) => {
      const tags = gitlabConverter.convertTags(tagsRaw)
      res.send(tags)
    }).catch((err) => {
      res
      .status(500)
      .send(new ErrorW(err))
    })
  } else if (client instanceof GithubClient) {
    res
    .status(500)
    .send(new ErrorW('Github doesn\'t need the id of a repository'))
  }
})
app.get('/projects/:projectOwner/:projectName/tags', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    res
    .status(500)
    .send(new ErrorW('Gitlab doesn\'t need the owner and the name of a project'))
  } else if (client instanceof GithubClient) {
    const project = {
      owner: req.params.projectOwner,
      name: req.params.projectName
    }
    client.getTags(project)
    .then((tagsRaw) => {
      const tags = githubConverter.convertReleases(tagsRaw)
      res.send(tags)
    }).catch((err) => {
      res
      .status(500)
      .send(new ErrorW(err))
    })
  }
})

app.get('/projects/:projectId/tags/:name', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  let tags
  client.getTags(req.params.projectId)
  .then((tagsRaw) => {
    let tagResponse
    tags = gitlabConverter.convertTags(tagsRaw)
    for (let tag in tags) {
      if (tags[tag].name === req.params.name) {
        tagResponse = tags[tag]
      }
    }
    if (tagResponse) res.send(tagResponse)
    else res.sendStatus(404)
  }).catch((err) => {
    res
    .status(500)
    .send(new ErrorW(err))
  })
})

// Requesting merges by date /projects/:projectId/getMerges?since=
app.get('/projects/:projectId/merges', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    let date = (req.query.since) ? new Date(req.query.since) : new Date('1970-01-01T21:43:37Z')
    if (date) {
      client.getMergeRequests(req.params.projectId)
      .then((mergesRaw) => {
        const mergeRequests = gitlabConverter.convertMergeRequests(mergesRaw, date)
        res.send(mergeRequests)
      }).catch((err) => {
        res
        .status(500)
        .send(new ErrorW(err))
      })
    } else {
      res.sendStatus(403)
    }
  } else if (client instanceof GithubClient) {
    res
    .status(500)
    .send(new ErrorW('Github doesn\'t need the id of a project'))
  }
})
app.get('/projects/:projectOwner/:projectName/merges', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    res
    .status(500)
    .send(new ErrorW('Gitlab doesn\'t need the owner and name of a repo'))
  } else if (client instanceof GithubClient) {
    let date = (req.query.since) ? new Date(req.query.since) : new Date('1970-01-01T21:43:37Z')
    if (date) {
      const project = {
        owner: req.params.projectOwner,
        name: req.params.projectName
      }
      client.getPulls(project)
      .then((pullsRaw) => {
        const pulls = githubConverter.convertPulls(pullsRaw, date)
        res.send(pulls)
      }).catch((err) => {
        res
        .status(500)
        .send(new ErrorW(err))
      })
    } else {
      res.sendStatus(403)
    }
  }
})

app.get('/projects/:projectId/merges/:mergeId', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    client.getMergeRequests(req.params.projectId)
    .then((mergesRaw) => {
      const mergeRequests = gitlabConverter.convertMergeRequests(mergesRaw)
      let mergeResponse
      for (let merge in mergeRequests) {
        if (String(mergeRequests[merge].id) === req.params.mergeId) {
          mergeResponse = mergeRequests[merge]
        }
      }
      if (mergeResponse) res.send(mergeResponse)
      else res.sendStatus(404)
    }).catch((err) => {
      res
      .status(500)
      .send(new ErrorW(err))
    })
  } else if (client instanceof GithubClient) {
    res
    .status(500)
    .send(new ErrorW('Github doesn\'t need the id of a project'))
  }
})

app.get('/projects/:projectId/merges/:mergeid/commits', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    client.getCommitsFromMerge(req.params.projectId, req.params.mergeid)
    .then((commitsRaw) => {
      const commits = gitlabConverter.convertCommits(commitsRaw)
      res.send(commits)
    }).catch((err) => {
      res
      .status(500)
      .send(new ErrorW(err))
    })
  } else if (client instanceof GithubClient) {
    res
    .status(500)
    .send(new ErrorW('Github doesn\'t need the id of a project'))
  }
})
app.get('/projects/:projectOwner/:projectName/merges/:mergeid/commits', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    res
    .status(500)
    .send(new ErrorW('Gitlab doesn\'t need the owner and name of a project'))
  } else if (client instanceof GithubClient) {
    const project = {
      owner: req.params.projectOwner,
      name: req.params.projectName
    }
    client.getCommitsFromPull(project, req.params.mergeid)
    .then((commitsRaw) => {
      const commits = githubConverter.convertCommits(commitsRaw)
      res.send(commits)
    }).catch((err) => {
      res
      .status(500)
      .send(new ErrorW('Cannot get commits from pull ' + err))
    })
  }
})

app.get('/projects/:projectId/commits', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    let date = (req.query.since) ? new Date(req.query.since) : new Date('1970-01-01T21:43:37Z')
    if (date) {
      client.getCommits(req.params.projectId)
      .then((commitsRaw) => {
        const commits = gitlabConverter.convertCommits(commitsRaw, date)
        res.send(commits)
      }).catch((err) => {
        res
        .status(500)
        .send(new ErrorW(err))
      })
    }
  } else if (client instanceof GithubClient) {
    res
    .status(500)
    .send(new ErrorW('Github doesn\'t need the id of a project'))
  }
})
app.get('/projects/:projectOwner/:projectName/commits', (req, res) => {
  const baseURL = req.query.baseURL
  const token = req.query.token
  const client = getClient(baseURL, token)
  if (client instanceof GitlabClient) {
    res
    .status(500)
    .send(new ErrorW('Gitlab doesn\'t need the owner and name of a project'))
  } else if (client instanceof GithubClient) {
    const project = {
      owner: req.params.projectOwner,
      name: req.params.projectName
    }
    let date = (req.query.since) ? new Date(req.query.since) : new Date('1970-01-01T21:43:37Z')
    if (date) {
      client.getCommits(project)
      .then((commitsRaw) => {
        const commits = githubConverter.convertCommits(commitsRaw, date)
        res.send(commits)
      }).catch((err) => {
        res
        .status(500)
        .send(new ErrorW(err))
      })
    }
  }
})

function getClient (baseURL, token) {
  let Client
  if (baseURL.match(/.*github.*/)) {
    Client = new GithubClient(baseURL, token)
  } else if (baseURL.match(/.*gitlab.*/)) {
    Client = new GitlabClient(baseURL, token)
  } else {
    throw new ErrorW('Invalid server')
  }
  return Client
}
module.exports = app
