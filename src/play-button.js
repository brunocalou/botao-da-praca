(function (context) {
  var playState = Object.freeze({
    PLAYING: 'playing',
    PAUSED: 'paused'
  })

  function PlayButton (options) {
    this.el = options.el
    this.imgEl = this.el.querySelector('img')
    this.state = playState.PAUSED
    this.onClick = options.onClick || function () {}
    this.playImgPath = options.playImgPath || 'assets/img/play.svg'
    this.pauseImgPath = options.pauseImgPath || 'assets/img/pause.svg'

    this.el.addEventListener('click', event => this._handleClick(event))

    this._updateView()
  }

  PlayButton.prototype._updateView = function () {
    if (this.state === playState.PAUSED) this.imgEl.setAttribute('src', this.playImgPath)
    else this.imgEl.setAttribute('src', this.pauseImgPath)
  }

  PlayButton.prototype._handleClick = function (event) {
    if (this.state === playState.PAUSED) this.state = playState.PLAYING
    else this.state = playState.PAUSED

    this.onClick(this.state)

    this._updateView()
  }

  PlayButton.prototype.setPaused = function (paused) {
    paused ? this.state = playState.PAUSED : this.state = playState.PLAYING
    this._updateView()
  }

  PlayButton.prototype.isPaused = function () {
    return this.state === playState.PAUSED
  }

  PlayButton.prototype.toggle = function () {
    this.isPaused() ? this.setPaused(false) : this.setPaused(true)
  }

  context.PlayButton = PlayButton
})(window)
