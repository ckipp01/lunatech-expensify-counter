'use strict';

let usedField = document.getElementById('used');
let leftField = document.getElementById('left');
let limitField = document.getElementById('limit');

let requestUrl = "https://www.expensify.com/api?states=&isAdvancedFilterMode=true&showEmpty=true&offset=0&sortBy=starred&returnValueList=reportListBeta&command=Get&pageName=reports&referer=www"
var annualAmount = 0;
chrome.storage.sync.get('annualAmount', function(data) {
  if (data.annualAmount) {
    annualAmount = data.annualAmount;
    limitField.textContent = annualAmount;
  }
});
chrome.storage.sync.get('authToken', function(data) {
  if (data.authToken) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", requestUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader("Cookie", "authToken=" + data.authToken);
    xmlHttp.send(null);
    usedField.textContent = getUsedAmount(xmlHttp.responseText);
    leftField.textContent = annualAmount - usedField.textContent;
  } else {
    openTab(window.open("https://www.expensify.com/signin", "SignIn"));
  }
});


function openTab(url) {
    chrome.tabs.create({
        'url': url
    });
}

function getUsedAmount(response) {
  var reports = JSON.parse(response);
  var currentYear = (new Date()).getFullYear();
  var usedAmount = 0;
  reports.reportListBeta.forEach(function (report) {
    //142B5AA09DC2F3BE is a policy for Personal Budget
    if (report.cachedData.expensify_policyID === "142B5AA09DC2F3BE" &&
        report.status === "Reimbursed" &&
        parseInt(report.submitted) === currentYear) {
      var amount = Number(report.cachedTotal.replace(/[^0-9.-]+/g,""));
      usedAmount = usedAmount + amount;
    }
  });
  return usedAmount;
}
