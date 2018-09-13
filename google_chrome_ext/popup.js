'use strict';

let connectButton = document.getElementById('connect');
chrome.storage.sync.get('partnerUserID', function(data) {
  console.log("partnerUserID: " + data.partnerUserID);
});

chrome.storage.sync.get('partnerUserSecret', function(data) {
   console.log("partnerUserSecret: " + data.partnerUserSecret);
});

function openTab(url) {
    chrome.tabs.create({
        'url': url
    });
}

connectButton.onclick = function(element) {
  openTab(window.open("https://www.expensify.com/tools/integrations/?action=regenerate",
  "GenerateAuth"));
};
