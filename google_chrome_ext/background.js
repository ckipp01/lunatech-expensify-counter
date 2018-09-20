'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({annualAmount: "1200"});
});
