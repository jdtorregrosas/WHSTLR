$(document).on('click', '#btnGenerate', function() {
  $('#merges').empty()

  var projectId = $('#projects option:selected').val()
  var tag = $('#tags option:selected').val()
  indexLoading()
  $(".merges-fieldset").show();
  getMerges(projectId, (merges) => {
    for (var merge in merges) {
      var newDate = new Date(merges[merge].date)
      $('#merges').append(`
        <fieldset id='merge-${merges[merge].id}'>
          <legend class='merge-title'>${merges[merge].title}</legend>
          <div class='row'>
            <div class='col-2'>
              <label class='label merge-subtitle'>Branch:</label>
            </div><div class='col-10'>
              <label class='label merge-info'>${merges[merge].source_branch}</label>
            </div>
          </div>
          <div class='row'>
            <div class='col-2'>
              <label class='label merge-subtitle'>Author:</label>
            </div><div class='col-10'>
              <label class='label merge-info'>${merges[merge].author}</label>
            </div>
          </div>
          <div class='row'>
            <div class='col-2'>
              <label class='label merge-subtitle'>Date:</label>
            </div><div class='col-10'>
              <label class='label merge-info'>${newDate}
            </div>
          </div>
          <div class='row'>
            <div class='col-2'>
              <label class='label merge-subtitle'>Info:</label>
            </div><div class='col-10'>
              <label class='label merge-info'>${merges[merge].description}</label>
            </div>
          </div>
          <div class='row center'>
            <button class='button btnShowCommits' id='btnShowCommits-${merges[merge].id}'
            value='commits-merge-${merges[merge].id}'>Show Commits</button>
          </div>
          <hr>
          <div class='row commit-div'>
            <div id='commits-merge-${merges[merge].id}' class='row commit-messages-container' value='hide'>
            </div>
          </div>
        </fieldset>`)
      getCommits(projectId, merges[merge].id, (commits) => {
        var messageElements = []
        var counter = 0
        for (var commit in commits) {
          messageElements = commits[commit].message.split(/\n|\r/)
          for (var i in messageElements) {
            if (messageElements[i] && counter === 0) {
              $(`#commits-merge-${commits[commit].mergeid}`).append(`
                <div class='col-1'>
                  <div class='row center'>
                    <img class='commit-title-checkbox' width=20>
                  </div>
                </div><div class='col-11 center'>
                  <label class='label commit-title'>
                  [${commits[commit].author}]  ${messageElements[i]}
                  </label>
                </div>`)
              counter = counter + 1
            }else if (messageElements[i]) {
              $(`#commits-merge-${commits[commit].mergeid}`).append(`
                <div class='col-1'>
                </div><div class='col-11'>
                  <label class='label commit-body'>
                    ${messageElements[i]}
                  </label>
                </div>`)
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

function getCommits(projectId, mergeId, callback) {
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
