var Store = function (options) {
  this.options = options || {}
  this.subscriptions = {}
  this.emitter;
  this.listener;

  this.id = function () {
    return this.options.id
  }

  this.handleActions = function (actions) {
    for (var a in actions) {
      this.options.actions[a] = actions[a]
    }
  }

  this.dispatch = function (name, message) {
    console.log('dispatch name', name)
    console.log('dispatch message', message)
    if (this.isInstalled() && this.emitter) {
      this.emitter.dispatchMessage(name, message || null)
    } else {
      console.error('Widget not installed')
    }
  }

  this.subscribe = function (name, cb) {
    console.log('ADDING NEW SUBSCRIPTION', name, cb)
    if (this.subscriptions.hasOwnProperty(name)) {
      this.subscriptions.callbacks.push(cb)
    } else {
      this.subscriptions[name] = {
        callbacks: [
          cb
        ]
      }
    }
    // this.subscriptions[name]
  }

  this.getState = function (name, message) {
    this.dispatch(name, message)
  }

  this.onMessage = function (event) {
    console.log('SUBSCRIPTIONS EVENT', event)
    if (!this.options.actions) {
      return console.error('No actions defined')
    }

    var field = event.command ? event.command : event.name

    console.log('field', field)
    if (this.subscriptions[field]) {
      for (var s in this.subscriptions[field].callbacks) {
        console.log('FIRE CALLBACK', this.id() + '_' + field)
        // this.dispatch(this.id() + '_' + field, event.message)
        this.subscriptions[field].callbacks[s](event)
      }
    }

    if (this.options.actions[field]) {
      return this.options.actions[field]()
    }
  }

  this.connect = function (listener, emitter) {
    this.listener = listener
    this.emitter = emitter
  }

  this.isInstalled = function () {
    if (safari && safari.application) {
      this.connect(safari.application, safari.application.activeBrowserWindow.activeTab.page)
      return true
    } else if (safari && safari.self.tab) {
      this.connect(safari.self, safari.self.tab)
      return true
    }
    return false
  }

  this.initOptions = function (options) {
    for (var o in options) {
      if (!this.options.hasOwnProperty(o)) {
        this.options[o] = options[o]
      }

      // defaults
      var defaults = {
        id: '',
        actions: {}
      }

      for (var d in defaults) {
        if (!this.options.hasOwnProperty(d)) {
          this.options[d] = defaults[d]
        }
      }
    }
  }

  this.setupName = function () {
    if (!this.options.id) {
      this.options.id = 'STORE_' + new Date().valueOf().toString()
    }
  }

  this.initEventMessages = function () {
    if (this.isInstalled() && this.listener) {
      this.listener.addEventListener('message', this.onMessage.bind(this), false)
      this.listener.addEventListener('command', this.onMessage.bind(this), false)
    }
  }

  this.init = function () {
    this.initOptions(this.options)
    this.setupName()
    this.connect()
    this.initEventMessages()
  }

  this.init()
}

