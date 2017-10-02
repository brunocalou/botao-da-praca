(function (context) {
  function Switch (options) {
    this._RIGHT_ACTIVE_CLASS = 'right-active'
    this._SWITCH_OPTION_CLASS = 'switch-option'
    this._rightActive = false

    this.el = options.el
    this.left = options.left || 'Left'
    this.right = options.right || 'Right'
    this.onClick = options.onClick || function () {}

    var elements = this.el.getElementsByClassName(this._SWITCH_OPTION_CLASS)

    this.leftEl = elements[0]
    this.rightEl = elements[1]

    this.el.addEventListener('click', event => this._handleClick(event))
    this._updateView()
  }

  Switch.prototype._updateView = function () {
    this._rightActive ? this.el.classList.add(this._RIGHT_ACTIVE_CLASS) : this.el.classList.remove(this._RIGHT_ACTIVE_CLASS)
    this.leftEl.innerText = this.left
    this.rightEl.innerText = this.right
  }

  Switch.prototype._handleClick = function (event) {
    this._rightActive = !this._rightActive

    if (this._rightActive) {
      this.onClick('right')
    } else {
      this.onClick('left')
    }

    this._updateView()
  }

  Switch.prototype.isLeftActive = function () {
    return !this._rightActive
  }

  Switch.prototype.activateLeft = function () {
    if (this._rightActive) {
      this._rightActive = false
      this._updateView()
    }
  }

  Switch.prototype.activateRight = function () {
    if (!this._rightActive) {
      this._rightActive = true
      this._updateView()
    }
  }

  Switch.prototype.toggle = function () {
    this.isLeftActive() ? this.activateRight() : this.activateLeft()
  }

  context.Switch = Switch
})(window)
