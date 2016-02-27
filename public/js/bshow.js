// fullscreen functions
function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

  // audio functions
  function playSound() {
       var song = document.getElementsByTagName('audio')[0];
        song.play();
 }
 function pauseSound()
 {
      var song = document.getElementsByTagName('audio')[0];
      song.pause();
 }

function init_app() {

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 32) {
            launchFullscreen(document.documentElement);
        }
    }, false);
}