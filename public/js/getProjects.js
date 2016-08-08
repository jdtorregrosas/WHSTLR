$(document).on('click', '#btnApplyConfig', function() {
  var baseURL = $('#baseURL').val()
  var token = $('#token').val()
  var $projects = $('#projects')
  configLoading()
  $.ajax({
    type: 'POST',
    data: {baseURL: baseURL, token: token},
    dataType: 'json',
    url: '/getProjects/',
    success: function(json) {
      window.location = '/index/'
      $projects.html(
        $('<option />').attr('disabled','disabled').attr('selected','selected').text('Select your project')
      )
      $.each(json, function(value, key) {
        $projects.append($('<option />').attr('value', key.name).text(key.name))
      })
    },
    error: function(err) {
      error(err.responseText)
    }
  })
})
