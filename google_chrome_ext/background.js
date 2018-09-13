'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({partnerUserID: 'test', partnerUserSecret: 'test'});

  chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {
       if (tab.url === "https://www.expensify.com/tools/integrations/?action=regenerate") {
          // todo set correct credentials here
         chrome.storage.sync.set({partnerUserID: 'test2', partnerUserSecret: 'test2'});
       }
  });
});
