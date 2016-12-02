var Store = function (options) {
  this.options = options || {}
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
    if (this.isInstalled() && this.emitter) {
      this.emitter.dispatchMessage(name, message || null)
    } else {
      console.error('Widget not installed')
    }
  }

  this.onMessage = function (event) {
    if (!this.options.actions) {
      return console.error('No actions defined')
    }

    if (this.options.actions[event.name || event.command]) {
      return this.options.actions[event.name || event.command]()
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
      this.connect(safari.self, this.emitter = safari.self.tab)
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

