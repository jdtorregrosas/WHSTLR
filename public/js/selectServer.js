$( document ).ready(function() {
  if (!localStorage.baseURL || !localStorage.token) {
    if(window.location.pathname !== '/config') {
      window.location.href = '/config'
    }
    $('#configSheet').hide()
    $('#overlay').show()
  } else {
    fadeOverlay()
  }
  if (localStorage.active === 'gitlab') {
    activateGitlab()
  } else if (localStorage.active == 'github') {
    activateGithub()
  }
})

$(document).on('click', '#gitlab', function() {
  fadeOverlay()
  activateGitlab()
})

$(document).on('click', '#github', function() {
  fadeOverlay()
  activateGithub()
})
$(document).on('click', '#gitlab-config', function() {
  activateGitlab()
})
$(document).on('click', '#github-config', function() {
  activateGithub()
})
function fadeOverlay(){
  $('#overlay').hide()
  $('#configSheet').show()
}
function activateGitlab() {
  $('#baseURL').attr('disabled', null)
  $('#gitlab-config').attr('active', 'active')
  $('#github-config').attr('active', null)
  $('#baseURL').val(localStorage.gitlabURL)
  $('#token').val(localStorage.gitlabToken)
  localStorage.active='gitlab'
}

function activateGithub() {
  localStorage.githubURL = 'https://api.github.com'
  $('#baseURL').attr('disabled', 'disabled')
  $('#github-config').attr('active', 'active')
  $('#gitlab-config').attr('active', null)
  $('#baseURL').val(localStorage.githubURL)
  $('#token').val(localStorage.githubToken)
  localStorage.active='github'
}
