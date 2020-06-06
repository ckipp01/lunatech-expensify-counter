"use strict";

const limitInput = document.getElementById("limit-input");
const saveButton = document.getElementById("save");
browser.storage.sync.get("annualAmount", function (data) {
  if (data.annualAmount) {
    limitInput.value = Number.parseFloat(data.annualAmount).toFixed(2);
  }
});

saveButton.onclick = function () {
  if (limitInput.value && /^-*[0-9]*[.]*[0-9]*$/.test(limitInput.value)) {
    browser.storage.sync.set({ annualAmount: limitInput.value });
  } else {
    alert("invalid value, amount was not changed");
  }
};
