$(document).ready(function() {
    localStorage.editModus = 'false'
})
$(document).on('click', '#editModus', function() {
    $(this).is(':checked') ? localStorage.editModus = 'true' : localStorage.editModus = 'false'
    if(!$(this).is(':checked')){
        disableEditModus()
    }else if($(this).is(':checked')) {
        activateEditModus()
    }
})

function activateEditModus(){
  $('#releaseNoteTitle').attr('contenteditable',true)
  $('#releaseNoteDescription').attr('contenteditable',true)
  $('#releaseNoteFeatures').attr('contenteditable',true)
}

function disableEditModus(){
  $('#releaseNoteTitle').attr('contenteditable',false)
  $('#releaseNoteDescription').attr('contenteditable',false)
  $('#releaseNoteFeatures').attr('contenteditable',false)
}
