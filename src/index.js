window.addEventListener('load', function () {
  const songSwitch = document.querySelector('toggle-switch')
  const playButton = document.querySelector('play-button')

  songSwitch.addEventListener('click', event => {
    const direction = songSwitch.isRightActive() ? 'right' : 'left'
    window.EventBus.emit('change-audio-source', direction)
  })

  playButton.addEventListener('click', event => {
    playButton.isPaused() ? window.EventBus.emit('pause') : window.EventBus.emit('play')
  })

  window.EventBus.on('pause', _ => playButton.setPaused(true))
  window.EventBus.on('play', _ => playButton.setPaused(false))
  window.EventBus.on('toggle-playing', _ => playButton.toggle())
  window.EventBus.on('change-audio-source', side => {
    if (side) {
      side === 'left' ? songSwitch.activateLeft() : songSwitch.activateRight()
    } else {
      songSwitch.toggle()
    }
  })
})
