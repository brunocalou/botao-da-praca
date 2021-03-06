(function (context) {
  const EventBus = (function () {
    const events = {}

    return {
      on (event, callback) {
        if (!events[event]) {
          events[event] = []
        }

        events[event].push(callback)
      },
      emit (event, ...args) {
        if (events[event]) {
          events[event].forEach(callback => callback.apply(this, args))
        }
      }
    }
  })()

  context.EventBus = EventBus
})(window)
