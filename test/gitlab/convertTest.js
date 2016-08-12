'use strict'

const converter = require('../../app/gitlab/gitlabConvert.js')
const commitsSchema = require('../../app/schemas/commitsSchema.js')
const mergeRequestsSchema = require('../../app/schemas/mergeRequestsSchema.js')
const projectsSchema = require('../../app/schemas/projectsSchema.js')
const tagsSchema = require('../../app/schemas/tagsSchema.js')
const assert = require('assert')

describe('# Commits', () => {
  it('Should throw error when commits without message are comming', () => {
    assert.throws(() => {
      const badCommits = [{
        test: 'test'
      }, {
        test2: 'test2'
      }]
      converter.convertCommits(badCommits)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when commits are not an array', () => {
    assert.throws(() => {
      const badCommits = 'thatSNotAnArray'
      converter.convertCommits(badCommits)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when commits are not an array of objects', () => {
    assert.throws(() => {
      const badCommits = [1, 2, 3, 4, 5]
      converter.convertCommits(badCommits)
    }, TypeError, 'Expected error')
  })

  it('Should convert a commit to the expected schema', () => {
    const goodCommits = [{
      'id': '8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'title': 'Merge branch',
      'author_name': 'Tobias Sailer',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1',
      'mergeid': '1234'
    }, {
      'id': '6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'created_at': '2016-06-30T17:03:59.000+01:00',
      'message': 'Update documentation descriptions 2',
      'mergeid': '4321'
    }]
    const resultCommits = [{
      'id': '8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'messages': ['Update documentation descriptions 1'],
      'author': 'Tobias Sailer',
      'date': '2016-07-07T11:40:45.000+02:00',
      'path': '/commit/8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'mergeid': '1234'
    }, {
      'id': '6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'messages': ['Update documentation descriptions 2'],
      'author': 'Julian',
      'date': '2016-06-30T17:03:59.000+01:00',
      'path': '/commit/6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'mergeid': '4321'
    }]
    const convertedCommits = converter.convertCommits(goodCommits)
    assert.deepEqual(resultCommits, convertedCommits)
  })

  it('Should throw error when the schema is not converted', () => {
    const goodCommits = [{
      'id': '8574912c1880ce03f89d6d666d0c624c1521e4f0',
      'title': 'Merge branch',
      'author_name': 'Tobias Sailer',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1',
      'mergeid': '1234'
    }, {
      'id': '6d9a3467990ac05de599c3c3757d342da4e1df3e',
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'created_at': '2016-06-30T17:03:59.000+01:00',
      'message': 'Update documentation descriptions 2',
      'mergeid': '4321'
    }]
    assert.throws(() => {
      commitsSchema.validateCommits(goodCommits)
    }, 'Expected error')
  })
})

describe('# Merges', () => {
  it('Should convert a mergeRequest to the expected schema', () => {
    const goodMergeRequests = [{
      'id': 1456,
      'project_id': 140,
      'title': 'Regiestrierungsdatum f575',
      'description': 'Add createdAt in the response',
      'state': 'merged',
      'created_at': '2016-06-30T10:39:46.649+02:00',
      'updated_at': '2016-07-07T11:40:50.742+02:00',
      'target_branch': 'master',
      'source_branch': 'regiestrierungsdatum-f575',
      'author': {
        'name': 'Julian David Torregrosa Simbaqueva',
        'username': 'jdtorregrosas',
        'id': 30,
        'state': 'active',
        'avatar_url': 'http://gitlab.local.coliquio.de/uploads/user/avatar/30/poochieAvatar.png',
        'web_url': 'http://gitlab.local.coliquio.de/u/jdtorregrosas'
      }
    }, {
      'id': 1453,
      'project_id': 140,
      'title': 'Regiestrierungsdatum f572',
      'description': 'Add createdAt in the response 2',
      'state': 'merged',
      'created_at': '2016-06-30T10:39:46.649+02:00',
      'updated_at': '2016-07-07T11:40:50.742+02:00',
      'target_branch': 'master',
      'source_branch': 'regiestrierungsdatum-f5752',
      'author': {
        'name': 'Julian David Torregrosa Simbaqueva',
        'username': 'jdtorregrosas',
        'id': 30,
        'state': 'active',
        'avatar_url': 'http://gitlab.local.coliquio.de/uploads/user/avatar/30/poochieAvatar.png',
        'web_url': 'http://gitlab.local.coliquio.de/u/jdtorregrosas'
      }
    }]
    const convertedMergeRequests = converter.convertMergeRequests(goodMergeRequests)
    assert.doesNotThrow(() => {
      mergeRequestsSchema.validateMergeRequests(convertedMergeRequests)
    }, 'Invalid Schema')
  })

  it('Should throw error when the schema is wrong', () => {
    const badMergeRequests = [{
      'title': 'Merge branch',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1'
    }, {
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'message': 'Update documentation descriptions 2'
    }]
    assert.throws(() => {
      mergeRequestsSchema.validateMergeRequests(badMergeRequests)
    }, 'Expected error')
  })
})
describe('# Tags', () => {
  it('Should throw error when Tags without date are comming', () => {
    assert.throws(() => {
      const badTags = [{
        name: 'test'
      }, {
        name: 'test2'
      }]
      converter.convertTags(badTags)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when Tags without name are comming', () => {
    assert.throws(() => {
      const badTags = [{
        date: '12'
      }, {
        date: '13'
      }]
      converter.convertTags(badTags)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when tags are not an array', () => {
    assert.throws(() => {
      const badTags = 'thatSNotAnArray'
      converter.convertTags(badTags)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when tags are not an array of objects', () => {
    assert.throws(() => {
      const badTags = [1, 2, 3, 4, 5]
      converter.convertTags(badTags)
    }, TypeError, 'Expected error')
  })

  it('Should convert a tag to the expected schema', () => {
    const goodTags = [
      {
        'commit': {
          'author_name': 'John Smith',
          'author_email': 'john@example.com',
          'authored_date': '2012-05-28T04:42:42-07:00',
          'committed_date': '2012-05-28T04:42:42-07:00',
          'committer_name': 'Jack Smith',
          'committer_email': 'jack@example.com',
          'id': '2695effb5807a22ff3d138d593fd856244e155e7',
          'message': 'Initial commit',
          'parents_ids': [
            '2a4b78934375d7f53875269ffd4f45fd83a84ebe'
          ]
        },
        'release': {
          'tag_name': '1.0.0',
          'description': 'Amazing release. Wow'
        },
        'name': 'v1.0.0',
        'message': null
      },
      {
        'commit': {
          'author_name': 'John Smith',
          'author_email': 'john@example.com',
          'authored_date': '2012-05-28T04:42:42-07:00',
          'committed_date': '2012-05-28T04:42:42-07:00',
          'committer_name': 'Jack Smith',
          'committer_email': 'jack@example.com',
          'id': '2695effb5807a22ff3d138d593fd856244e155e7',
          'message': 'Initial commit',
          'parents_ids': [
            '2a4b78934375d7f53875269ffd4f45fd83a84ebe'
          ]
        },
        'release': {
          'tag_name': '2.0.0',
          'description': 'Amazing release. Wow'
        },
        'name': 'v2.0.0',
        'message': null
      }
    ]
    const convertedTags = converter.convertTags(goodTags)
    assert.doesNotThrow(() => {
      tagsSchema.validateTags(convertedTags)
    }, 'Invalid Schema')
  })

  it('Should throw error when the tags schema is wrong', () => {
    const badTags = [{
      'title': 'Merge branch',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1'
    }, {
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'message': 'Update documentation descriptions 2'
    }]
    assert.throws(() => {
      tagsSchema.validateTags(badTags)
    }, 'Expected error')
  })
})
describe('# Projects', () => {
  it('Should throw error when Projects without date id comming', () => {
    assert.throws(() => {
      const badProjects = [{
        name: 'test'
      }, {
        name: 'test2'
      }]
      console.log(converter.convertProjects(badProjects))
    }, TypeError, 'Expected error')
  })
  it('Should throw error when Projects without name are comming', () => {
    assert.throws(() => {
      const badProjects = [{
        date: 'test'
      }, {
        date: 'test2'
      }]
      converter.convertProjects(badProjects)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when Projects are not an array', () => {
    assert.throws(() => {
      const badProjects = 'thatSNotAnArray'
      converter.convertProjects(badProjects)
    }, TypeError, 'Expected error')
  })
  it('Should throw error when Projects are not an array of objects', () => {
    assert.throws(() => {
      const badProjects = [1, 2, 3, 4, 5]
      converter.convertProjects(badProjects)
    }, TypeError, 'Expected error')
  })

  it('Should convert a Project to the expected schema', () => {
    const goodProjects = [{
      'id': 169,
      'description': '',
      'default_branch': 'master',
      'tag_list': [],
      'public': false,
      'archived': false,
      'visibility_level': 0,
      'ssh_url_to_repo': 'git@gitlab.local.coliquio.de:jdtorregrosas/releaseNotesPrinter.git',
      'http_url_to_repo': 'http://gitlab.local.coliquio.de/jdtorregrosas/releaseNotesPrinter.git',
      'web_url': 'http://gitlab.local.coliquio.de/jdtorregrosas/releaseNotesPrinter',
      'owner': {
        'name': 'Julian David Torregrosa Simbaqueva',
        'username': 'jdtorregrosas',
        'id': 30,
        'state': 'active',
        'avatar_url': 'http://gitlab.local.coliquio.de/uploads/user/avatar/30/poochieAvatar.png',
        'web_url': 'http://gitlab.local.coliquio.de/u/jdtorregrosas'
      },
      'name': 'releaseNotesPrinter',
      'name_with_namespace': 'Julian David Torregrosa Simbaqueva / releaseNotesPrinter',
      'path': 'releaseNotesPrinter',
      'path_with_namespace': 'jdtorregrosas/releaseNotesPrinter',
      'issues_enabled': true,
      'merge_requests_enabled': true,
      'wiki_enabled': true,
      'builds_enabled': true,
      'snippets_enabled': false,
      'container_registry_enabled': true,
      'created_at': '2016-07-01T09:41:17.915+02:00',
      'last_activity_at': '2016-07-01T09:41:21.163+02:00',
      'shared_runners_enabled': true,
      'creator_id': 30,
      'namespace': {
        'id': 37,
        'name': 'jdtorregrosas',
        'path': 'jdtorregrosas',
        'owner_id': 30,
        'created_at': '2016-03-01T09:36:33.109+01:00',
        'updated_at': '2016-03-01T09:36:33.109+01:00',
        'description': '',
        'avatar': null,
        'share_with_group_lock': false,
        'visibility_level': 20
      },
      'avatar_url': null,
      'star_count': 0,
      'forks_count': 0,
      'open_issues_count': 0,
      'public_builds': true,
      'permissions': {
        'project_access': {
          'access_level': 40,
          'notification_level': 3
        },
        'group_access': null
      }
    }, {
      'id': 168,
      'description': '',
      'default_branch': 'master',
      'tag_list': [],
      'public': true,
      'archived': false,
      'visibility_level': 20,
      'ssh_url_to_repo': 'git@gitlab.local.coliquio.de:devteam/ci-git-integration.git',
      'http_url_to_repo': 'http://gitlab.local.coliquio.de/devteam/ci-git-integration.git',
      'web_url': 'http://gitlab.local.coliquio.de/devteam/ci-git-integration',
      'name': 'ci-git-integration',
      'name_with_namespace': 'devteam / ci-git-integration',
      'path': 'ci-git-integration',
      'path_with_namespace': 'devteam/ci-git-integration',
      'issues_enabled': true,
      'merge_requests_enabled': true,
      'wiki_enabled': true,
      'builds_enabled': true,
      'snippets_enabled': false,
      'container_registry_enabled': true,
      'created_at': '2016-06-30T09:04:53.122+02:00',
      'last_activity_at': '2016-06-30T09:35:29.901+02:00',
      'shared_runners_enabled': true,
      'creator_id': 18,
      'namespace': {
        'id': 33,
        'name': 'devteam',
        'path': 'devteam',
        'owner_id': null,
        'created_at': '2015-11-25T03:56:49.251+01:00',
        'updated_at': '2015-11-25T04:33:17.108+01:00',
        'description': 'IT internal and dev related projects',
        'avatar': {
          'url': '/uploads/group/avatar/33/The-Simpsons-01-icon.png'
        },
        'share_with_group_lock': false,
        'visibility_level': 20
      },
      'avatar_url': null,
      'star_count': 0,
      'forks_count': 0,
      'open_issues_count': 0,
      'public_builds': true,
      'permissions': {
        'project_access': null,
        'group_access': {
          'access_level': 40,
          'notification_level': 3
        }
      }
    }]
    const convertedProjects = converter.convertProjects(goodProjects)
    assert.doesNotThrow(() => {
      projectsSchema.validateProjects(convertedProjects)
    }, 'Invalid Schema')
  })

  it('Should throw error when the projects schema is wrong', () => {
    const badProjects = [{
      'title': 'Merge branch',
      'created_at': '2016-07-07T11:40:45.000+02:00',
      'message': 'Update documentation descriptions 1'
    }, {
      'title': 'Update documentation descriptions',
      'author_name': 'Julian',
      'message': 'Update documentation descriptions 2'
    }]
    assert.throws(() => {
      projectsSchema.validateTags(badProjects)
    }, 'Expected error')
  })
})
