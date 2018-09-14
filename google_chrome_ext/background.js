'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({partnerUserID: 'test', partnerUserSecret: 'test'});

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
       if (tab.url === "https://www.expensify.com/tools/integrations/?action=regenerate") {
         //trigger page text sending to extension
         chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
          file: 'payload.js'
         });;
         //close current tab
         chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
          file: 'close_tab.js'
         });;
       }
  });

  chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if(message.closeThis) chrome.tabs.remove(sender.tab.id);
    else {
    	// document.getElementById('pagetitle').innerHTML = message;
      // console.log("page text: " + message);
      var lines = message.split("\n");
      var newPartnerUserID = "test";
      var newPartnerUserSecret = "test";
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes("partnerUserID:")) {
          newPartnerUserID = lines[i].split(/:\s+/)[1].trim()
        }
        else if (lines[i].includes("partnerUserSecret:")) {
          newPartnerUserSecret = lines[i].split(/:\s+/)[1].trim()
         }
      }
      //set credentials:
      chrome.storage.sync.set({partnerUserID: newPartnerUserID,
        partnerUserSecret: newPartnerUserSecret});
      //set new popup:
      if (newPartnerUserID != 'test') {
        chrome.browserAction.setPopup({popup: 'signed_popup.html'});
      }
    }
  });

});
