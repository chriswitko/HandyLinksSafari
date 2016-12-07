var Actions = function (Store) {
  this.actions = {}

  this.add = function (name, fn, params) {
    if (fn) {
      if (params) {
        this.actions[name] = fn.bind(this, params, function (cb) {
          console.log('bind1 arguments', arguments)
          cb = cb || null
          Store.dispatch(name, cb)
        })
      } else {
        this.actions[name] = fn.bind(this, function (cb) {
          console.log('bind2 arguments', arguments)
          cb = cb || null
          Store.dispatch(name, cb)
        })
      }
    } else {
      this.actions[name] = function (cb) {
        Store.dispatch(name, cb)
      }
    }
  }

  this.all = function () {
    return this.actions
  }
}