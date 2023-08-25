// when the page is loaded
var discreetButton = document.getElementById("toggle-button");
var discreetStatus = document.getElementById("status-image");

chrome.storage.local.get("enable", function (data) {
  discreetButton.textContent = data.enable ? "disable" : "enable";
  discreetStatus.src = data.enable ? "enabled.png" : "disabled.png";
});

// event listener
document.addEventListener("DOMContentLoaded", function () {
  var discreetButton = document.getElementById("toggle-button");
  var discreetStatus = document.getElementById("status-image");

  discreetButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "toggleExtension" });
    discreetButton.textContent =
      discreetButton.textContent === "enable" ? "disable" : "enable";
    discreetStatus.src =
      discreetButton.textContent === "enable" ? "disabled.png" : "enabled.png";
  });
});
