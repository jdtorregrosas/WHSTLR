$(document).on('change', '#projects', function() {
  var projectId = $(this).val()
  var tagsElement = $('#tags')
  tagsElement.html(
    $('<option />').attr('disabled','disabled').attr('selected','selected').text('Fetching tags...')
  )
  getTags(projectId, (tags) => {
    tagsElement.empty()
    $.each(tags, function (value, key) {
      tagsElement.append($('<option />').attr('value', key.date).text(key.name))
    })
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
