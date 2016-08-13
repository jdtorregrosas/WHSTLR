$(document).ready(function() {
    localStorage.mergesModus = 'false'
})
$(document).on('click', '#showModus', function() {
    $(this).is(':checked') ? localStorage.mergesModus = 'true' : localStorage.mergesModus = 'false'
    if($(".merges-fieldset").is(':visible') && !$(this).is(':checked')){
        showCommits()
    }else if($(".commits-fieldset").is(':visible') && $(this).is(':checked')) {
        showMerges()
    }
})

function showCommits(){
    localStorage.mergesModus = 'false'
    $(".merges-fieldset").hide()  // checked
    $(".commits-fieldset").show()  // checked
}

function showMerges(){
    localStorage.mergesModus = 'true'
    $(".commits-fieldset").hide()  // checked
    $(".merges-fieldset").show()  // checked
}
