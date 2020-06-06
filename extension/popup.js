"use strict";

const spentField = document.getElementById("spent");
const leftField = document.getElementById("left");
const limitField = document.getElementById("limit");

let annualAmount = 0;
const requestUrl =
  "https://www.expensify.com/api?states=&isAdvancedFilterMode=true&showEmpty=true&offset=0&sortBy=starred&returnValueList=reportListBeta&command=Get&pageName=reports&referer=www";
const signInUrl = "https://www.expensify.com/signin";

browser.storage.sync
  .get("annualAmount")
  .then((data) => {
    if (data.annualAmount) {
      annualAmount = data.annualAmount;
      limitField.textContent = Number.parseFloat(annualAmount).toFixed(2);
    }
  })
  .then((_) =>
    browser.cookies.get({ url: "https://www.expensify.com", name: "authToken" })
  )
  .then((cookie) => {
    if (cookie && cookie.value) {
      return fetch(requestUrl);
    } else {
      openTab(signInUrl);
      return Promise.reject("You need to sign in first.");
    }
  })
  .then((result) => result.json())
  .then((data) => {
    if (data.jsonCode && data.jsonCode === 407) {
      openTab(signInUrl);
      return Promise.reject("You need to sign in first.");
    } else if (data.reportListBeta) {
      spentField.textContent = Number.parseFloat(
        getSpentAmount(data.reportListBeta)
      ).toFixed(2);
      leftField.textContent = Number.parseFloat(
        annualAmount - spentField.textContent
      ).toFixed(2);
    }
  })
  .catch((err) => {
    console.error(err);
  });

function openTab(url) {
  browser.tabs.create({
    url: url,
  });
}

const isPersonalBudget = (record) => {
  const currentYear = new Date().getFullYear();
  //142B5AA09DC2F3BE is a policy for Personal Budget
  return (
    record.cachedData.expensify_policyID === "142B5AA09DC2F3BE" &&
    record.status === "Reimbursed" &&
    parseInt(record.submitted) === currentYear
  );
};

function getSpentAmount(reports) {
  return reports.reduce((acc, cur) => {
    if (isPersonalBudget(cur)) {
      const amount = Number(cur.cachedTotal.replace(/[^0-9.-]+/g, ""));
      return acc + amount;
    } else {
      return acc;
    }
  }, 0);
}
