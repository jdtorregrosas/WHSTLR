$(document).on('click', '#applyConfig', function() {
  var baseURL = $('#baseURL').val()
  var token = $('#token').val()
  $.ajax({
    type: 'POST',
    data: {
      baseURL: baseURL,
      token: token
    },
    url: '/api/config/',
    dataType: 'json',
    success: function (json) {
      console.log('saved');
    },
    error: function (err) {
      error(err.responseText)
    }
  })
})
