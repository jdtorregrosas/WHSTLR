$(document).on('change', '#projects', function() {
  var projectId = $(this).val()
  var tagsElement = $('#tags')
  tagsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('Fetching Tags...'))
  getTags(projectId, (tags) => {
    tagsElement.empty()
    if (tags.length > 0) {
      tagsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('[Select your Tag]'))
      $.each(tags, function (value, key) {
        tagsElement.append($('<option />').attr('value', key.date).text(key.name))
      })
    } else {
      tagsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('--- No Tags found ---'))
    }
  })
})

function getTags(projectId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/projects/${projectId}/tags?baseURL=${localStorage.baseURL}&token=${localStorage.token}`,
    dataType: 'json',
    success: function (tags) {
      callback(tags)
    },
    error: function (err) {
      console.log(projectId)
      error('Cannot fetch tags, verify your configuration')
    }
  })
}
