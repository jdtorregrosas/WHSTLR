'use strict'

function convertProjects(projects) {
  let projectsView = []
  for (let project in projects) {
    projectsView[project] = {
      id: projects[project].id,
      name: projects[project].name
    }
  }
  return projectsView
}

function convertCommits(commits) {
  let commitsView = []
  for (let commit in commits) {
    commitsView[commit] = {
      message: commits[commit].message,
      author: commits[commit].author_name,
      date: commits[commit].created_at
    }
  }
  return commitsView
}

function convertTags(tags) {
  let tagsView = []
  for (let tag in tags) {
    tagsView[tag] = {
      name: tags[tag].name,
      date: tags[tag].commit.committed_date
    }
  }
  return tagsView
}

function convertMergeRequests(mergeRequests) {
  let mergeRequestsView = []
  for (let mergeRequest in mergeRequests) {
    mergeRequestsView[mergeRequest] = {
      title: mergeRequests[mergeRequest].title,
      source_branch: mergeRequests[mergeRequest].source_branch,
      description: mergeRequests[mergeRequest].description,
      author: mergeRequests[mergeRequest].author.username,
      date: mergeRequests[mergeRequest].updated_at
    }
  }
  return mergeRequestsView
}

module.exports = {
  convertProjects,
  convertCommits,
  convertTags,
  convertMergeRequests
}
