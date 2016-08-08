$(document).on('click', '#btnGenerate', function() {
  $('#merges').empty()
  var mergeRequests = []
  var project = $('#projects')[0].value
  var tag = $('#tags')[0].value
  indexLoading()
  $.ajax({
    type: 'POST',
    data: {project: project, tag: tag},
    url: '/getMerges/',
    dataType: 'json',
    success: function(merges) {
      $('.merges-fieldset').show()
      for (var merge in merges){
        // if(merge.description!==''){
        // }
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

        $.ajax({
          type: 'POST',
          data: {project: project, mergeid: merges[merge].id},
          url: '/getCommits',
          dataType: 'json',
          success: function (commits) {
            for (var commit in commits) {
              var messageElements = []
              var counter = 0
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
          },
          error: function (err) {
            error(err.responseText)
          }
        })
      }
    },
    error: function(err) {
      $('.merges-fieldset').hide()
      error(err.responseText)
    }
  })
})

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
