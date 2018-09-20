// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let limitInput = document.getElementById('limit-input');
let saveButton = document.getElementById('save');

saveButton.onclick = function(element) {
  if (limitInput.value && /^-*[0-9]*$/.test(limitInput.value)) {
    chrome.storage.sync.set({annualAmount: limitInput.value});
  } else {
    alert("invalid value, amount was not changed");
  }
};
