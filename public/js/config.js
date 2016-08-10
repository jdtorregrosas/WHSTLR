$( document ).ready(function() {
  var $baseURL = $('#baseURL')
  var $token = $('#token')
  if (localStorage.baseURL) $baseURL.val(localStorage.baseURL)
  if (localStorage.token) $token.val(localStorage.token)
});
$(document).on('click', '#applyConfig', function() {
  configLoading()
  applyConfig()
  getUserName((userName) => {
    if (userName) {
      localStorage.userName = userName
      window.location.href = '/'
    }
  })
})

function getUserName(callback) {
  $.ajax({
    type: 'GET',
    url: `/api/userName?baseURL=${localStorage.baseURL}&token=${localStorage.token}`,
    dataType: 'json',
    success: function (userName) {
      callback(userName)
    },
    error: function () {
      error('Cannot find the server, check your configuration')
    }
  })
}
function applyConfig() {
  var baseURL = $('#baseURL').val()
  var token = $('#token').val()
  localStorage.baseURL = baseURL
  localStorage.token = token
}
