'use strict';

chrome.runtime.onInstalled.addListener(function() {
  function getCookies(domain, name, callback) {
      chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
          if(callback && cookie) {
              callback(cookie.value);
          }
      });
  }
  chrome.storage.sync.set({annualAmount: "1200"});//todo remove hardcoded
  getCookies("https://www.expensify.com", "authToken", function(token) {
    chrome.storage.sync.set({authToken: token});
  });


  //old code:
  // chrome.storage.sync.set({partnerUserID: 'test', partnerUserSecret: 'test'});
  //
  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //     if (tab.url === "https://www.expensify.com/tools/integrations/?action=regenerate") {
  //       if (changeInfo.status == 'complete') {
  //         chrome.tabs.executeScript(null, {file: 'payload.js'});
  //         // chrome.tabs.executeScript(null, {file: 'close_tab.js'});
  //       }
  //     }
  // });

  // chrome.runtime.onMessage.addListener(function (message, sender, response) {
  //   if(message.closeThis) chrome.tabs.remove(sender.tab.id);
  //   else {
  //   	// document.getElementById('pagetitle').innerHTML = message;
  //     // console.log("page text: " + message);
  //     var lines = message.split("\n");
  //     var newPartnerUserID = "test";
  //     var newPartnerUserSecret = "test";
  //     for (var i = 0; i < lines.length; i++) {
  //       if (lines[i].includes("partnerUserID:")) {
  //         newPartnerUserID = lines[i].split(/:\s+/)[1].trim()
  //       }
  //       else if (lines[i].includes("partnerUserSecret:")) {
  //         newPartnerUserSecret = lines[i].split(/:\s+/)[1].trim()
  //        }
  //     }
  //     //set credentials:
  //     chrome.storage.sync.set({partnerUserID: newPartnerUserID,
  //       partnerUserSecret: newPartnerUserSecret});
  //     //set new popup:
  //     if (newPartnerUserID != 'test') {
  //       chrome.browserAction.setPopup({popup: 'signed_popup.html'});
  //     }
  //   }
  // });

});
