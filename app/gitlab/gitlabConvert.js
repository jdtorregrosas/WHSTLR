'use strict'

function convertDate (date) {
  return date.replace(/\+.*/, '')
}

function convertProjects (projects) {
  let projectsView = []
  for (let project in projects) {
    projectsView[project] = {
      id: projects[project].id,
      name: projects[project].name
    }
  }
  function compare (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    return 0
  }

  projectsView.sort(compare)
  return projectsView
}

function convertCommits (commits) {
  let commitsView = []
  for (let commit in commits) {
    if (!commits[commit].message.match(/Merge.*|Revert.*|.*lint.*/)) {
      commitsView.push({
        message: commits[commit].message,
        author: commits[commit].author_name,
        date: commits[commit].created_at
      })
    }
  }
  return commitsView
}

function convertTags (tags) {
  let tagsView = []
  for (let tag in tags) {
    tagsView[tag] = {
      name: tags[tag].name,
      date: tags[tag].commit.committed_date
    }
  }
  function compare (a, b) {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  }

  tagsView.sort(compare)
  return tagsView
}

function convertMergeRequests (mergeRequests, tagDate) {
  let mergeRequestsView = []
  for (let mergeRequest in mergeRequests) {
    if (convertDate(mergeRequests[mergeRequest].updated_at) > tagDate) {
      mergeRequestsView.push({
        id: mergeRequests[mergeRequest].id,
        title: mergeRequests[mergeRequest].title,
        source_branch: mergeRequests[mergeRequest].source_branch,
        description: mergeRequests[mergeRequest].description,
        author: mergeRequests[mergeRequest].author.username,
        date: mergeRequests[mergeRequest].updated_at
      })
    }
  }
  return mergeRequestsView
}

module.exports = {
  convertProjects,
  convertCommits,
  convertTags,
  convertMergeRequests,
  convertDate
}
