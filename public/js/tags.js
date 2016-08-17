$(document).on('change', '#projects', function() {
  var project = {
    id: $('#projects option:selected').val(),
    name: $('#projects option:selected').text(),
    owner: $('#projects option:selected').attr('owner')
  }
  var tagsElement = $('#tags')
  tagsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('Fetching Tags...'))
  getTags(project, (tags) => {
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

function getTags(project, callback) {
  var baseURL = localStorage.baseURL
  var url = ''
  if (baseURL.match(/.*gitlab.*/)) {
    url = `/api/projects/${project.id}/tags?baseURL=${baseURL}&token=${localStorage.token}`
  } else if (baseURL.match(/.*github.*/)) {
    url = `/api/projects/${project.owner}/${project.name}/tags?baseURL=${localStorage.baseURL}&token=${localStorage.token}`
  }
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (tags) {
      callback(tags)
    },
    error: function (err) {
      error('Cannot fetch tags, verify your configuration')
    }
  })
}
