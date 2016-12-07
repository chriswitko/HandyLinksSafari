// create a para and insert it at the top of the body

var widgetWidth = 300

var buttonTopPosition = '20%'
var buttonColor = '#B03060'
var buttonTitle = 'You have 2 saved links'

var baseURI = safari.extension.baseURI
var activeBrowserWindow = safari.self.tab

console.log('activeBrowserWindow', activeBrowserWindow)
// document.setHomePage('http://www.mywebsite.com/')


function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var URL = {
  'app': 'HandyLinks.html'
}

function createButton () {
  var handyButton = document.createElement('div')

  handyButton.setAttribute('id', 'handylinks-button')
  handyButton.textContent = buttonTitle
  handyButton.style.cssText = 'position: fixed; right: 0; top: ' + buttonTopPosition + '; background-color: ' + buttonColor + '; box-shadow: 0 1px 2px rgba(0,0,0,0.15); padding: 5px 7px; color: white; cursor: pointer; z-index: 2147483647; display: block; line-height: 1.5rem; font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;-webkit-user-select: none; -moz-user-select: none'

  handyButton.addEventListener('click', function () {
    toggle()
  })

  document.body.insertBefore(handyButton, document.body.firstChild)

  setTimeout(function () {
    o('handylinks-button').remove()
  }, 2000)
}

function createWidget () {
  var widget = document.createElement('div')

  widget.setAttribute('id', 'handylinks-widget')
  widget.style.cssText = 'position: fixed; box-sizing: border-box; overflow: hidden; right: 0; top: 0; width: ' + (widgetWidth + 'px') + '; height: 100%; background-color: silver; color: black; box-shadow: 0 -1px 4px rgba(0,0,0,0.15); z-index: 2147483647; display: none'

  document.body.insertBefore(widget, document.body.firstChild)
}

function routeUrl (routeName) {
  return baseURI + 'app/' + URL[routeName]
}

function createIFrame () {
  var iframe = document.createElement('iframe')
  iframe.frameBorder = 0
  iframe.style.cssText = 'box-sizing: border-box; display:inline-block; width: 100%; height: 100%; border: 0'
  iframe.src = routeUrl('app')

  var widget = o('handylinks-widget')
  widget.appendChild(iframe)
}

function o (el) {
  return document.getElementById(el)
}

function show (el) {
  o(el).style.display = 'block'
}

function hide (el) {
  o(el).style.display = 'none'
}

function move (el, attr, val) {
  if (o(el)) {
    o(el).style[attr] = val + 'px'
  }
}

function openWidget () {
  show('handylinks-widget')
  safari.self.tab.dispatchMessage('widget.onOpen')
  // move('handylinks-button', 'right', widgetWidth)
}

function hideWidget () {
  hide('handylinks-widget')
  safari.self.tab.dispatchMessage('widget.onClose')
  // move('handylinks-button', 'right', 0)
}

function toggle () {
  if (is('handylinks-widget', 'display', 'none')) {
    openWidget()
  } else {
    hideWidget()
  }
}

function is (el, attr, val) {
  return o(el).style[attr] === val
}

function myCommandHandler (event) {
  console.log('command end event', event)
  if (event.name === 'toolbar.onClick') {
    toggle()
  }
}

function init () {
  console.log('STORE LOADED in END.JS')
  console.log('init layout')
  // createButton()
  createWidget()
  createIFrame()
  console.log('safari.extension', safari)
  safari.self.addEventListener('message', myCommandHandler, false)
}

init()
