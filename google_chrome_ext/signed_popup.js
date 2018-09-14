'use strict';

let disconnectButton = document.getElementById('disconnect');

disconnectButton.onclick = function(element) {
  chrome.storage.sync.set({partnerUserID: 'test', partnerUserSecret: 'test'});
  chrome.browserAction.setPopup({popup: 'popup.html'});
};
