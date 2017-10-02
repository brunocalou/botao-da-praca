window.addEventListener('load', function () {
  var songSwitch = new window.Switch({
    el: document.querySelector('.switch'),
    left: 'Praça',
    right: 'Cazalbé',
    onClick: name => { window.EventBus.emit('pause') }
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
  window.EventBus.on('change-audio-source', _ => playButton.setPaused(true))
  window.EventBus.on('change-audio-source', _ => songSwitch.toggle())
})
