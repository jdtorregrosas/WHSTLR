function configLoading() {
  swal({
    title: 'Wait a moment, please!',
    text: 'We are applying your configuration ',
    imageUrl: '/public/assets/images/loading.png'
  })
}

function indexLoading() {
  swal({
    title: 'Wait a moment, please!',
    text: 'We are trying to proccess your request',
    imageUrl: '/public/assets/images/thumbs-up.jpg',
    timer: 2000
  })
}
function copied() {
  swal({
    title: 'Copied to your clipboard!',
    imageUrl: '/public/assets/images/clipboard.png',
    timer: 2000
  })
}

function error(err) {
  swal('Oops Error!', err,'error')
}
