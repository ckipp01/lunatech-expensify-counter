'use strict';

let spentField = document.getElementById('spent');
let leftField = document.getElementById('left');
let limitField = document.getElementById('limit');

let requestUrl = "https://www.expensify.com/api?states=&isAdvancedFilterMode=true&showEmpty=true&offset=0&sortBy=starred&returnValueList=reportListBeta&command=Get&pageName=reports&referer=www"
var annualAmount = 0;
let signInUrl = "https://www.expensify.com/signin";

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
          var jsonResponse = JSON.parse(xmlHttp.response);
          //if token expired
          if (jsonResponse.jsonCode && jsonResponse.jsonCode == 407) {
            openTab(window.open(signInUrl, "SignIn"));
          } else if (jsonResponse.reportListBeta) {
            spentField.textContent = getSpentAmount(jsonResponse);
            leftField.textContent = annualAmount - spentField.textContent;
          }
        } else {
          console.error(xmlHttp.xmlHttp);
        }
      }
    }
    xmlHttp.send();
  } else {
    openTab(window.open(signInUrl, "SignIn"));
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

function getSpentAmount(reports) {
  var currentYear = (new Date()).getFullYear();
  var spentAmount = 0;
  reports.reportListBeta.forEach(function (report) {
    //142B5AA09DC2F3BE is a policy for Personal Budget
    if (report.cachedData.expensify_policyID === "142B5AA09DC2F3BE" &&
        report.status === "Reimbursed" &&
        parseInt(report.submitted) === currentYear) {
      var amount = Number(report.cachedTotal.replace(/[^0-9.-]+/g,""));
      spentAmount = spentAmount + amount;
    }
  });
  return spentAmount;
}
