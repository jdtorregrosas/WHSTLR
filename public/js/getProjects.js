$(document).on('click', '#btnApplyConfig', function() {
  var baseURL = $('#baseURL').val()
  var token = $('#token').val()
  var $projects = $('#projects')
  configLoading()
  $.ajax({
    type: 'POST',
    data: {baseURL: baseURL, token: token},
    dataType: 'json',
    url: '/config/',
    success: function() {
      $.ajax({
        type: 'GET',
        url: '/projects/',
        success: function(res) {
          window.location = '/'
        },
        error: function(err) {
          error(err.responseText)
        }
      })
    },
    error: function(err) {
      error(err.responseText)
    }
  })
})
