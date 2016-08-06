$(document).on("click", '#btnApplyConfig', function() {
  var baseURL = $("#baseURL").val();
  var token = $("#token").val();
  configLoading();
  $.ajax({
    type: "POST",
    data: {baseURL: baseURL, token: token},
    dataType: 'json',
    url: '/applyConfig',
    success: function(redirect) {
      window.location = redirect;
    },
    error: function(err) {
      error(err.responseText);
    }
  })
})
