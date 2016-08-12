$(document).on('click', '#btnGenerate', function() {
  var projectName = $('#projects option:selected').text()
  $('#releaseNoteTitle').text(projectName)
})
