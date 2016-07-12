'use strict'
var projectsSchema = require('../app/schemas/projectsSchema')
var commitsSchema = require('../app/schemas/commitsSchema')
var tagsSchema = require('../app/schemas/tagsSchema')

module.exports = {
  getUser: () => {
    return {
      username: 'tsailer'
    }
  },
  getProjects: () => {
    let projects = [
      {
        id: 10,
        name: 'userService2.0'
      },
      {
        id: 11,
        name: 'website'
      }
    ]
    return projectsSchema.validateProjects(projects)
  },
  getTags: (projectId) => {
    let tags
    if (projectId === 10) {
      tags = [
        {
          name: 'release-3.0.0',
          date: '2016-06-07T11:36:43+00:00'
        },
        {
          name: 'release-2.0.0',
          date: '2016-06-02T11:36:43+00:00'
        }
      ]
    } else tags = []
    return tagsSchema.validateTags(tags)
  },
  getCommits: () => {
    let commits = [
      {
        message: 'Add something new',
        author: 'tsailer',
        date: '2016-06-07T11:36:43+00:00'
      },
      {
        message: 'Add something new',
        author: 'tsailer',
        date: '2016-06-09T11:36:43+00:00'
      },
      {
        message: 'Fix something new',
        author: 'tsailer',
        date: '2016-06-08T11:36:43+00:00'
      },
      {
        message: 'Make something new',
        author: 'tsailer',
        date: '2016-06-07T11:36:43+00:00'
      },
      {
        message: 'Add something old\n\nThis and this\n and this \n - and this',
        author: 'ceggert',
        date: '2016-06-04T11:36:43+00:00'
      },
      {
        message: 'Fix something old\n\nThis and this\n and this \n - and this',
        author: 'ceggert',
        date: '2016-06-02T11:36:43+00:00'
      },
      {
        message: 'Remove something new',
        author: 'tsailer',
        date: '2016-06-01T11:36:43+00:00'
      }
    ]
    return commitsSchema.validateCommits(commits)
  },
  getMergeRequests: () => {
    return [
      {
        title: 'Merge Hallo World into Master',
        source_branch: 'test_branch',
        description: 'Added cool things\nRemoved cool things',
        author: 'tsailer',
        date: '2016-06-08T11:36:43+00:00'
      },
      {
        title: 'Merge Bye new World into Master',
        source_branch: 'another_branch',
        description: 'Added cool things\nRemoved cool things',
        author: 'ceggert',
        date: '2016-06-03T11:36:43+00:00'
      },
      {
        title: 'My merge request',
        source_branch: 'last_branch',
        description: 'Added cool things\nRemoved cool things',
        author: 'jtorregrosa',
        date: '2016-06-03T11:36:43+00:00'
      }
    ]
  },
  getError: () => {
    return {
      title: 'Error: Alles kaputt',
      description: 'Du hast alles falsh gemacht!!'
    }
  }
}
