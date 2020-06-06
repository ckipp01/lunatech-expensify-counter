"use strict";

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({ annualAmount: "1200" });
});
