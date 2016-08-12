$(document).on('click', '#btnGenerate', function() {
  var projectName = $('#projects option:selected').text()
  $('#releaseNoteTitle').text(projectName)
})

$(document).on('click', '[id^=check-]', function() {
  var id = $(this).attr('id').replace(/check-/,'')
  var message = $(`#commit-${id}`).text()
  if($(this).is(':checked')){
    $('#releaseNoteFeatures').append(`<li id="feature-${id}"> ${message} </li>`)
  } else {
    $(`#feature-${id}`).remove()
  }
})
