$( document ).ready(function() {
  if (window.location.pathname === '/'){
    var projectsElement = $('#projects')
    projectsElement.empty()
    getProjects((projects) => {
      projectsElement.html(
        $('<option />').attr('disabled','disabled').attr('selected','selected').text('Select your project')
      )
      $.each(projects, function(value, key) {
        projectsElement.append($('<option />').attr('value', key.id).attr('url', key.url).text(key.name))
      })
    })
  }
});

function getProjects(callback) {
  $.ajax({
    type: 'GET',
    url: `/api/projects?baseURL=${localStorage.baseURL}&token=${localStorage.token}`,
    dataType: 'json',
    success: function (projects) {
      callback(projects)
    },
    error: function (err) {
      error('Cannot find the server, check your configuration')
    }
  })
}
