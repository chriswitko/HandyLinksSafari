var Users = {
  loginAnonymously: function (cb) {
    firebase.auth().signInAnonymously().then(function (user) {
      console.log('FIRE USER', user)
      cb({
        uid: user.uid,
        isAuthenticated: 'yes'
      })
    }, function () {
      cb(null)
    })
  },
  signOut: function (cb) {
    firebase.auth().signOut().then(function () {
      console.log('Signed Out')
      cb({
        uid: '',
        isAuthenticated: 'no'
      })
    }, function (error) {
      console.error('Sign Out Error', error)
      cb()
    });  
  },
  isAuthenticated: function (user, cb) {
    cb = cb || function () {}
    user = user || firebase.auth().currentUser || {}
    cb({
      uid: user.uid,
      isAuthenticated: user.uid ? 'yes' : 'no'
    })
  }
}
