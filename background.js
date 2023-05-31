chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    blockedWebsites: ["example.com", "example2.com"] // Add the websites you want to block here
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openPopup,
  });
});

function openPopup() {
  chrome.runtime.openOptionsPage();
}
