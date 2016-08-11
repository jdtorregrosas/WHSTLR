$(document).on('click', '#btnGenerate', function() {
  $(".commits-fieldset").hide()
  $("#commits").empty()

  var project = {
    id: $('#projects option:selected').val(),
    url: projectUrl = $('#projects option:selected').attr('url')
  }
  getCommits(project.id, (commits) => {
    if(commits.length > 0){
      localStorage.commitsModus==='true' ? showCommits() : showMerges();
    }
    for (var commit in commits) {
      var messageElements = []
      var counter = 0
      messageElements = commits[commit].message.split(/\n|\r/)
      for (var i in messageElements) {
        if (messageElements[i] && counter === 0) {
          var commitTitleHtml = $("#commitTitle").html()
          var commitTitleTemplate = Handlebars.compile(commitTitleHtml)
          $(`#commits`).append(commitTitleTemplate({
            commit: commits[commit],
            messageElement: messageElements[i]
          }))
          counter = counter + 1
        } else if (messageElements[i]) {
          var commitBodyHtml = $("#commitBody").html()
          var commitBodyTemplate = Handlebars.compile(commitBodyHtml)
          $(`#commits`).append(commitBodyTemplate({
            messageElement: messageElements[i]
          }))
        }
      }
    }
  })
})
function getCommits(projectId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/projects/${projectId}/commits?baseURL=${localStorage.baseURL}&token=${localStorage.token}`,
    dataType: 'json',
    success: function (commits) {
      callback(commits)
    },
    error: function (err) {
      error(err.responseText)
    }
  })
}
