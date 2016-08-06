$(document).on("click", '#btnGenerate', function() {
  $("#merges").empty();
  var mergeRequests = []
  var project = $('#projects')[0].value;
  var tag = $("#tags")[0].value;
  $.ajax({
    type: "POST",
    data: {project: project, tag: tag},
    url: '/getMerges',
    dataType: 'json',
    success: function(merges) {
      indexLoading()
      $(".merges-fieldset").show();
      for (var merge in merges){
        // if(merge.description!==''){
        // }
        var newDate = new Date(merges[merge].date)
        $("#merges").append(`
          <fieldset id="merge-${merges[merge].id}">
            <legend class='merge-title'>${merges[merge].title}</legend>
            <span class="merge-subtitle">Branch:</span>
            <span>${merges[merge].source_branch}</span>
            <br/>
            <span class="merge-subtitle">Author:</span>
            <span>${merges[merge].author}</span>
            <br>
            <span class="merge-subtitle">Date:</span>
            <span>${newDate}
            <br/>
            <hr>
            <span>${merges[merge].description}</span>
            <hr>
            <div class="commit-div">
              <div id="commits-merge-${merges[merge].id}"class="commit-messages-container">
              </div>
            </div>
            <br/>
          </fieldset>`)

        $.ajax({
          type: "POST",
          data: {project: project, mergeid: merges[merge].id},
          url: '/getCommits',
          dataType: 'json',
          success: function(commits) {
            for(commit in commits){
              var messageElements = [];
              var counter = 0;
              messageElements = commits[commit].message.split(/\n|\r/);
              for(i in messageElements){
                if(messageElements[i] && counter === 0){
                  $(`#commits-merge-${commits[commit].mergeid}`).append(`
                    <img class="commit-title-checkbox" width=20>
                    <span class="commit-title">
                      (${commits[commit].author})${messageElements[i]}
                    </span>
                    <br/>`)
                  counter = counter + 1
                }else if (messageElements[i]){
                  $(`#commits-merge-${commits[commit].mergeid}`).append(`
                    <span class="commit-body">
                      ${messageElements[i]}
                    </span>
                    <br/>`)
                }
              }
            }
          },
          error: function(err) {
            error(err)
          }
        })
      }
    },
    error: function(err) {
      $(".merges-fieldset").hide();
      error(err)
    }
  })
})
