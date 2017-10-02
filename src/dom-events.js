document.addEventListener('keydown', event => {
  if (event.keyCode === 32) {
    // Space key
    window.EventBus.emit('toggle-playing')
  } else if (event.keyCode === 13) {
    // Enter key
    window.EventBus.emit('change-audio-source')
  }
})
