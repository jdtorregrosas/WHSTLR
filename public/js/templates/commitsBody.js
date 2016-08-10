
$( document ).ready(function() {
  if (window.location.pathname === '/'){
    $('body').append(
      `<script id='commitBody' type='text/x-handlebars-template'>
          <div class='col-1'>
          </div><div class='col-11'>
            <label class='label commit-body'>
              {{messageElement}}
            </label>
          </div>
        </script>`
    )
  }
})
