$(document).on('click', '#btnGenerate', function() {
  $(".merges-fieldset").hide();
  $(".commits-fieldset").hide()
  $('#merges').empty()
  $("#commits").empty()

  var project = {
    id: $('#projects option:selected').val(),
    name: $('#projects option:selected').text(),
    owner: $('#projects option:selected').attr('owner'),
    url: $('#projects option:selected').attr('url')
  }
  getCommits(project, (commits) => {
    if(commits.length > 0){
      localStorage.mergesModus === 'true' ? showMerges() : showCommits();
    }
    for (var commit in commits) {
      var counter = 0
      var messages = commits[commit].messages
      for (var i in messages) {
        if (messages[i] && counter === 0) {
          var commitTitleHtml = $("#commitTitle").html()
          var commitTitleTemplate = Handlebars.compile(commitTitleHtml)
          $(`#commits`).append(commitTitleTemplate({
            commit: commits[commit],
            url: project.url+commits[commit].path,
            messageElement: messages[i]
          }))
          counter = counter + 1
        } else if (messages[i]) {
          var commitBodyHtml = $("#commitBody").html()
          var commitBodyTemplate = Handlebars.compile(commitBodyHtml)
          $(`#commits`).append(commitBodyTemplate({
            messageElement: messages[i]
          }))
        }
      }
    }
  })
})
function getCommits(project, callback) {
  var baseURL = localStorage.baseURL
  var url = ''
  if (baseURL.match(/.*gitlab.*/)) {
    url = `/api/projects/${project.id}/commits?baseURL=${baseURL}&token=${localStorage.token}`
  } else if (baseURL.match(/.*github.*/)) {
    url = `/api/projects/${project.owner}/${project.name}/commits?baseURL=${baseURL}&token=${localStorage.token}`
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
