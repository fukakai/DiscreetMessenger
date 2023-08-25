chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "toggleExtension") {
    chrome.storage.local.get("enable", function (data) {
      var enableValue = !data.enable;
      chrome.storage.local.set({ enable: enableValue });
    });
  }
});
