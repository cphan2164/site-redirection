chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    blockedWebsites: ["example.com", "example2.com"] // Add the websites you want to block here
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    chrome.storage.sync.get("blockedWebsites", function(data) {
      const blockedWebsites = data.blockedWebsites;
      if (blockedWebsites.includes(new URL(details.url).hostname)) {
        return { cancel: true };
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
