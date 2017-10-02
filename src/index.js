window.addEventListener('load', function () {
  var audioSong = document.getElementById('audio-song')
  var audioLaugh = document.getElementById('audio-laugh')

  var audioState = {
    playing: false,
    audio: audioSong,
    pause () {
      audioSong.pause()
      audioLaugh.pause()
      audioSong.currentTime = 0
      audioLaugh.currentTime = 0

      playButton.setPaused(true)
      audioState.playing = false
    },
    play (audio = audioState.audio) {
      audioState.audio = audio
      audio.play()

      playButton.setPaused(false)
      audioState.playing = true
    },
    toggle () {
      if (audioState.playing) {
        audioState.pause()
      } else {
        audioState.play()
      }
    },
    change () {
      if (audioState.audio === audioSong) {
        audioState.audio = audioLaugh
        songSwitch.activateRight()
      } else {
        audioState.audio = audioSong
        songSwitch.activateLeft()
      }
    }
  }

  function handleAudioEnd (audio) {
    audio.addEventListener('ended', _ => window.EventBus.emit('pause'))
  }

  var songSwitch = new window.Switch({
    el: document.querySelector('.switch'),
    left: 'Praça',
    right: 'Cazalbé',
    onClick: name => {
      window.EventBus.emit('pause')

      var currentAudio = audioSong

      if (!songSwitch.isLeftActive()) {
        currentAudio = audioLaugh
      }

      window.EventBus.emit('change', currentAudio)
    }
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

  handleAudioEnd(audioSong)
  handleAudioEnd(audioLaugh)

  window.EventBus.on('pause', audioState.pause)
  window.EventBus.on('play', audioState.play)
  window.EventBus.on('toggle', audioState.toggle)
  window.EventBus.on('change', audioState.change)

  document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
      // Space key
      window.EventBus.emit('toggle')
    } else if (event.keyCode === 13) {
      // Enter key
      window.EventBus.emit('change')
    }
  })
})
