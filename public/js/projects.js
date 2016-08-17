$( document ).ready(function() {
  if (window.location.pathname === '/'){
    var projectsElement = $('#projects')
    projectsElement.empty()
    projectsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('...Fetching Projects...'))
    getProjects((projects) => {
      projectsElement.empty()
      if (projects.length > 0) {
        projectsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('[Select your project]'))
        $.each(projects, function(value, key) {
          projectsElement.append($('<option />').attr('value', key.id).attr('url', key.url).attr('owner', key.owner).text(key.name))
        })
      } else {
        projectsElement.append($('<option />').attr('disabled','disabled').attr('selected','selected').text('No Projects found'))
      }
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
