'use strict'

const formatLine = require('../formatLine')

function convertRepos (repos) {
  let reposView = []
  for (let project in repos) {
    if (repos[project].id === undefined || repos[project].name === undefined) {
      throw new TypeError('No Id or name error')
    }
    reposView.push({
      id: repos[project].id,
      name: repos[project].name,
      owner: repos[project].owner.login,
      url: repos[project].html_url
    })
  }
  function compare (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    return 0
  }

  reposView.sort(compare)
  return reposView
}

function convertCommits (commits, date) {
  let commitsView = []
  const invalidDate = new Date('Not a date')
  let tagDate = (date && !isNaN(date.valueOf())) ? new Date(date) : new Date('1970-01-01T21:43:37Z')
  for (let commit in commits) {
    let committedDate = new Date(commits[commit].commit.author.date)
    if (tagDate < committedDate) {
      if (!commits[commit].commit.message.match(/Merge.*|Revert.*|.*lint.*/)) {
        let messages = commits[commit].commit.message.split(/\n|\r/)
        let formatMessages = []
        for (let message in messages) {
          if (messages[message] !== '') {
            formatMessages.push(formatLine(messages[message]))
          }
        }
        commitsView.push({
          id: commits[commit].sha,
          messages: formatMessages,
          author: commits[commit].commit.author.name,
          date: commits[commit].commit.author.date,
          path: `/commit/${commits[commit].sha}`,
          mergeid: commits[commit].mergeid ? commits[commit].mergeid : ''
        })
      }
    }
  }
  return commitsView
}

function convertReleases (releases) {
  let releasesView = []
  for (let tag in releases) {
    releasesView.push({
      name: releases[tag].tag_name,
      date: releases[tag].published_at
    })
  }
  function compare (a, b) {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  }

  releasesView.sort(compare)
  return releasesView
}

function convertPulls (pulls, date) {
  let pullsView = []
  let tagDate = (date && !isNaN(date.valueOf())) ? new Date(date) : new Date('1970-01-01T21:43:37Z')
  for (let pull in pulls) {
    let mergedDate = new Date(pulls[pull].merged_at)
    if (tagDate < mergedDate) {
      let descriptions = pulls[pull].body.split(/\n|\r/)
      let formatDescriptions = []
      for (let i in descriptions) {
        if (descriptions[i] !== '') {
          formatDescriptions.push(formatLine(descriptions[i]))
        }
      }
      pullsView.push({
        id: pulls[pull].number,
        title: pulls[pull].title,
        source_branch: pulls[pull].head.ref,
        descriptions: formatDescriptions,
        author: pulls[pull].user.login,
        date: pulls[pull].merged_at,
        path: `/pull/${pulls[pull].number}`
      })
    }
  }
  return pullsView
}

module.exports = {
  convertRepos,
  convertCommits,
  convertReleases,
  convertPulls
}
