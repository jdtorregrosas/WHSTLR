$(document).on('click', '#showModus', function() {
    $(this).is(':checked') ? localStorage.commitsModus = 'true' : localStorage.commitsModus = 'false'
    if($(".merges-fieldset").is(':visible') && $(this).is(':checked')){
        showCommits()
    }else if($(".commits-fieldset").is(':visible') && !$(this).is(':checked')) {
        showMerges()
    }
})

function showCommits(){
    localStorage.commitsModus = 'true'
    $(".commits-fieldset").show()  // checked
    $(".merges-fieldset").hide()  // checked
}

function showMerges(){
    localStorage.commitsModus = 'false'
    $(".commits-fieldset").hide()  // checked
    $(".merges-fieldset").show()  // checked
}
