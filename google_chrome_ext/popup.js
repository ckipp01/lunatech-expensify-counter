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

getCookies("https://www.expensify.com", "authToken", function(tokenCookie) {
  if (tokenCookie && tokenCookie.value) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", requestUrl);
    xmlHttp.onload = function() {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          usedField.textContent = getUsedAmount(xmlHttp.response);
          leftField.textContent = annualAmount - usedField.textContent;
        } else {
          console.error(xmlHttp.xmlHttp);
        }
      }
    }
    xmlHttp.send();
  } else {
    openTab(window.open("https://www.expensify.com/signin", "SignIn"));
  }
});

function openTab(url) {
    chrome.tabs.create({
        'url': url
    });
}

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
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
