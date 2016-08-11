$(document).on('click', '#btnGenerate', function() {
  $(".merges-fieldset").hide();
  $('#merges').empty()

  var project = {
    id: $('#projects option:selected').val(),
    url: projectUrl = $('#projects option:selected').attr('url')
  }
  var tag = $('#tags option:selected').val()
  indexLoading()
  getMerges(project.id, (merges) => {
    if(merges.length > 0){
      localStorage.commitsModus==='true' ? showCommits() : showMerges();
    }
    for (var merge in merges) {
      var mergeScript = $("#merge").html()
      var mergeTemplate = Handlebars.compile(mergeScript)
      $("#merges").append(mergeTemplate({
        merge: merges[merge],
        url: `${project.url}/merge_requests/${merges[merge].iid}`
      }))
      getCommitsFromMerge(project.id, merges[merge].id, (commits) => {
        for (var commit in commits) {
          var messageElements = []
          var counter = 0
          messageElements = commits[commit].message.split(/\n|\r/)
          for (var i in messageElements) {
            if (messageElements[i] && counter === 0) {
              var commitTitleHtml = $("#commitTitle").html()
              var commitTitleTemplate = Handlebars.compile(commitTitleHtml)
              $(`#commits-merge-${commits[commit].mergeid}`).append(commitTitleTemplate({
                commit: commits[commit],
                messageElement: messageElements[i]
              }))
              counter = counter + 1
            } else if (messageElements[i]) {
              var commitBodyHtml = $("#commitBody").html()
              var commitBodyTemplate = Handlebars.compile(commitBodyHtml)
              $(`#commits-merge-${commits[commit].mergeid}`).append(commitBodyTemplate({
                messageElement: messageElements[i]
              }))
            }
          }
        }
      })
    }
  })
})

function getMerges(projectId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/projects/${projectId}/merges?baseURL=${localStorage.baseURL}&token=${localStorage.token}`,
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

function getCommitsFromMerge(projectId, mergeId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/projects/${projectId}/merges/${mergeId}/commits?baseURL=${localStorage.baseURL}&token=${localStorage.token}`,
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
