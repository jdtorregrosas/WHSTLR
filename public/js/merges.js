$(document).on('click', '#btnGenerate', function() {
  var project = {
    id: $('#projects option:selected').val(),
    name: $('#projects option:selected').text(),
    owner: $('#projects option:selected').attr('owner'),
    url: $('#projects option:selected').attr('url')
  }
  var tag = $('#tags option:selected').val()
  indexLoading()
  getMerges(project, (merges) => {
    if(merges.length > 0){
      localStorage.mergesModus === 'true' ? showMerges() : showCommits();
    }
    for (var merge in merges) {
      var mergeScript = $("#merge").html()
      var mergeTemplate = Handlebars.compile(mergeScript)
      $("#merges").append(mergeTemplate({
        merge: merges[merge],
        url: `${project.url}${merges[merge].path}`
      }))
      getCommitsFromMerge(project, merges[merge].id, (commits) => {
        for (var commit in commits) {
          var counter = 0
          messages = commits[commit].messages
          for (var i in messages) {
            if (messages[i] && counter === 0) {
              var commitTitleHtml = $("#commitTitle").html()
              var commitTitleTemplate = Handlebars.compile(commitTitleHtml)
              $(`#commits-merge-${commits[commit].mergeid}`).append(commitTitleTemplate({
                commit: commits[commit],
                messageElement: messages[i],
                url: `${project.url}${commits[commit].path}`
              }))
              counter = counter + 1
            } else if (messages[i]) {
              var commitBodyHtml = $("#commitBody").html()
              var commitBodyTemplate = Handlebars.compile(commitBodyHtml)
              $(`#commits-merge-${commits[commit].mergeid}`).append(commitBodyTemplate({
                messageElement: messages[i]
              }))
            }
          }
        }
      })
    }
  })
})

function getMerges(project, callback) {
  var baseURL = localStorage.baseURL
  var url = ''
  if (baseURL.match(/.*gitlab.*/)) {
    url = `/api/projects/${project.id}/merges?baseURL=${baseURL}&token=${localStorage.token}`
  } else if (baseURL.match(/.*github.*/)) {
    url = `/api/projects/${project.owner}/${project.name}/merges?baseURL=${baseURL}&token=${localStorage.token}`
  }
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function(merges) {
      callback(merges)
    },
    error: function(err) {
      $('.merges-fieldset').hide()
      error(err.responseText)
    }
  })
}

function getCommitsFromMerge(project, mergeId, callback) {
  var baseURL = localStorage.baseURL
  var url = ''
  if (baseURL.match(/.*gitlab.*/)) {
    url = `/api/projects/${project.id}/merges/${mergeId}/commits?baseURL=${localStorage.baseURL}&token=${localStorage.token}`
  } else if (baseURL.match(/.*github.*/)) {
    url = `/api/projects/${project.owner}/${project.name}/merges/${mergeId}/commits?baseURL=${localStorage.baseURL}&token=${localStorage.token}`
  }
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (commits) {
      callback(commits)
    },
    error: function (err) {
      error(err.responseText)
    }
  })
}
$(document).on('click', '.btnShowCommits', function() {
  var btnId = $(this).attr('id')
  var btnValue = $(this).val()
  if ($(`#${btnValue}`).val()==='show') {
    $(`#${btnValue}`).hide()
    $(`#${btnValue}`).val('hide')
    $(`#${btnId}`).text('Show Commits')
  } else {
    $(`#${btnValue}`).show()
    $(`#${btnValue}`).val('show')
    $(`#${btnId}`).text('Hide Commits')
  }
})
