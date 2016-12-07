var Links = {
  getAllDemoData: function (cb) {
    var recentPostsRef = firebase.database().ref('linksTest').orderByChild('updatedAt').limitToLast(100)
    var toSend = {};
    recentPostsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key
        var childData = childSnapshot.val()
        toSend[childKey.toString()] = childData
      });

      cb({demos: toSend})
    })
  },
  onSubmitLink: function (link, cb) {
    console.log('SUBMITTING', link)
    var newPostKey = link.id || firebase.database().ref().child('link').push().key
    link.updatedAt = -Date.now()
    firebase.database().ref('linksTest/' + newPostKey).set(link).then(function() {
      console.log('ADDED')
      cb()
    })      
  }
}
