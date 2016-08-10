'use strict'

function convertDate (date) {
  return date.replace(/\+.*/, '')
}

function convertProjects (projects) {
  let projectsView = []
  for (let project in projects) {
    if (projects[project].id === undefined || projects[project].name === undefined) {
      throw new TypeError('No Id or name error')
    }
    projectsView.push({
      id: projects[project].id,
      name: projects[project].name,
      url: projects[project].web_url
    })
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
        date: commits[commit].created_at,
        mergeid: commits[commit].mergeid
      })
    }
  }
  return commitsView
}

function convertTags (tags) {
  let tagsView = []
  for (let tag in tags) {
    tagsView.push({
      name: tags[tag].name,
      date: tags[tag].commit.committed_date
    })
  }
  function compare (a, b) {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  }

  tagsView.sort(compare)
  return tagsView
}

function convertMergeRequests (mergeRequests, date) {
  let mergeRequestsView = []
  let tagDate = (date) ? new Date(date) : new Date('1991-05-25')
  for (let mergeRequest in mergeRequests) {
    let updateDate = new Date(mergeRequests[mergeRequest].updated_at)
    if (tagDate < updateDate) {
      mergeRequestsView.push({
        id: mergeRequests[mergeRequest].id,
        iid: mergeRequests[mergeRequest].iid,
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
