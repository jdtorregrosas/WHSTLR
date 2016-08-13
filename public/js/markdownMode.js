$(document).ready(function() {
    localStorage.markdownModus = 'false'
})
$(document).on('click', '#markdownModus', function() {
    $(this).is(':checked') ? localStorage.markdownModus = 'true' : localStorage.markdownModus = 'false'
    if($(".md-fieldset").is(':visible') && !$(this).is(':checked')){
      viewHTML()
    }else if(!$(".md-fieldset").is(':visible') && $(this).is(':checked')) {
      viewMD()
    }
})

function viewMD(){
  localStorage.markdownModus = 'true'
  var releaseNote = $('#releaseNote').html()
  $('#md').text(md(releaseNote))
  $('.md-fieldset').show()
  $('.release-note-fieldset').hide()
}

function viewHTML(){
  localStorage.markdownModus = 'false'
  $('.md-fieldset').hide()
  $('.release-note-fieldset').show()
}
