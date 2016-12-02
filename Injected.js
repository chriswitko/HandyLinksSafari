// https://hoyois.github.io/safariextensions/universalextension/
// http://www.walid.tn/browser-extension-development/a-step-by-step-tutorial-on-building-your-own-safari-extension-part-2.html
// https://code.tutsplus.com/tutorials/how-to-create-a-safari-extension-from-scratch--net-15050
// http://forums.macrumors.com/threads/safari-extension-current-page-url.979578/


var initialVal = 2
var calculatedVal = 0

var baseURI = safari.extension.baseURI

if (window === window.top) {
  var currentUrl = document.URL // document.location.href
  // var currentTitle = safari.extension.globalPage.contentWindow;

  console.log('baseURI', baseURI)
  console.log('currentUrl', currentUrl)
      safari.self.tab.dispatchMessage('getTitle')

  // console.log('currentTitle', safari.self.title)
}

function doBigCalc(theData) {
    safari.self.tab.dispatchMessage('calcThis', theData)
}

function getAnswer(theMessageEvent) {
  // console.log('theMessageEvent', theMessageEvent);
  if (theMessageEvent.name === 'theAnswer') {
    calculatedVal = theMessageEvent.message;
    console.log(calculatedVal)
  }
  if (theMessageEvent.name === 'theTitle') {
    console.log('theTitle from HandyLinks', theMessageEvent.message)
  }
}

safari.self.addEventListener('message', getAnswer, false)

// doBigCalc(initialVal)
