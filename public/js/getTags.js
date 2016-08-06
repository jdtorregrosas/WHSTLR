$(document).on("change", '#projects', function() {
  var project = $(this).val()
  var $tags = $("#tags")
  $tags.html(
    $("<option />").attr('disabled','disabled').attr('selected','selected').text('Fetching tags...')
  )

  $.ajax({
    type: "POST",
    data: {project: project},
    url: '/getTags',
    dataType: 'json',
    success: function(json) {
      $tags.empty()
      $.each(json, function(value, key) {
        $tags.append($("<option />").attr("value", key.name).text(key.name))
      })
    }
  })
})
