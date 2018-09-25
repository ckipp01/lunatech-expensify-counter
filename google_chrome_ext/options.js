'use strict';
let limitInput = document.getElementById('limit-input');
let saveButton = document.getElementById('save');
chrome.storage.sync.get('annualAmount', function(data) {
  if (data.annualAmount) {
    limitInput.value = Number.parseFloat(data.annualAmount).toFixed(2);
  }
});

saveButton.onclick = function(element) {
  if (limitInput.value && /^-*[0-9]*[.]*[0-9]*$/.test(limitInput.value)) {
    chrome.storage.sync.set({annualAmount: limitInput.value});
  } else {
    alert("invalid value, amount was not changed");
  }
};
