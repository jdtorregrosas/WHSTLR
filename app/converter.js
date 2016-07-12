'use strict'

function convertProjects(projects, tags) {
  let projectsView = []
  for (let project in projects) {
    projectsView[project] = {
      name: projects[project].name,
      tags: tags
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

module.exports = {
  convertProjects,
  convertCommits
}
