$( document ).ready(function() {
  if (window.location.pathname === '/'){
    $('body').append(
      `<script id='commitTitle' type='text/x-handlebars-template'>
         <div class='col-1'>
            <div class='row center'>
              <img class='commit-title-checkbox' width=20>
            </div>
          </div><div class='col-11 center'>
            <label class='label commit-title'>
            [{{commit.author}}]  {{messageElement}}
            </label>
          </div>
        </script>`
    )
  }
})
