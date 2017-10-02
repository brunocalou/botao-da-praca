window.addEventListener('load', function () {
  function handleAudioEnd (audio) {
    audio.addEventListener('ended', _ => window.EventBus.emit('pause'))
  }

  var audioState = {
    playing: false,
    leftAudio: document.getElementById('audio-song'),
    rightAudio: document.getElementById('audio-laugh'),
    audio: undefined,
    _init () {
      audioState.audio = audioState.leftAudio
    },
    pause () {
      audioState.leftAudio.pause()
      audioState.rightAudio.pause()
      audioState.leftAudio.currentTime = 0
      audioState.rightAudio.currentTime = 0
      audioState.playing = false
    },
    play (audio = audioState.audio) {
      audioState.audio = audio
      audio.play()
      audioState.playing = true
    },
    togglePlaying () {
      if (audioState.playing) {
        audioState.pause()
      } else {
        audioState.play()
      }
    },
    change () {
      window.EventBus.emit('pause')
      if (audioState.audio === audioState.leftAudio) {
        audioState.audio = audioState.rightAudio
      } else {
        audioState.audio = audioState.leftAudio
      }
    }
  }

  audioState._init()

  handleAudioEnd(audioState.leftAudio)
  handleAudioEnd(audioState.rightAudio)

  window.EventBus.on('pause', audioState.pause)
  window.EventBus.on('play', audioState.play)
  window.EventBus.on('change-audio-source', audioState.change)
  window.EventBus.on('toggle-playing', audioState.togglePlaying)
})
