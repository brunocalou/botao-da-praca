window.addEventListener('load', function () {
  var songSwitch = document.querySelector('toggle-switch')

  songSwitch.addEventListener('click', event => {
    var direction = songSwitch.isLeftActive() ? 'left' : 'right'
    window.EventBus.emit('change-audio-source', direction)
  })

  var playButton = new window.PlayButton({
    el: document.querySelector('.play-button'),
    onClick: state => {
      if (state === 'paused') {
        window.EventBus.emit('pause')
      } else {
        window.EventBus.emit('play')
      }
    }
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
