// Swipe events adapted from: https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

window.addEventListener('load', function () {
  var xDown = null
  var yDown = null

  function handleTouchStart (evt) {
    xDown = evt.touches[0].clientX
    yDown = evt.touches[0].clientY
  }

  function handleTouchMove (evt) {
    if (!xDown || !yDown) {
      return
    }

    var xUp = evt.touches[0].clientX
    var yUp = evt.touches[0].clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // left swipe
        window.EventBus.emit('change-audio-source', 'right')
      } else {
        // right swipe
        window.EventBus.emit('change-audio-source', 'left')
      }
    } else {
      if (yDiff > 0) {
        // up swipe
      } else {
        // down swipe
      }
    }
    // reset values
    xDown = null
    yDown = null
  }

  document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
      // Space key
      window.EventBus.emit('toggle-playing')
    } else if (event.keyCode === 13) {
      // Enter key
      window.EventBus.emit('change-audio-source')
    }
  })

  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)
})
