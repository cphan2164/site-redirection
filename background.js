chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const { url } = details;

  // Check if the requested site needs redirection
  shouldRedirect(url, (shouldRedirect) => {
    if (shouldRedirect) {
      // Redirect to the Google homepage
      chrome.tabs.update(details.tabId, { url: "https://www.google.com/" });
    }
  });
}, { url: [{ schemes: ["http", "https"] }] });

// Check if a URL needs redirection
function shouldRedirect(url, callback) {
  // Load the site list from storage
  chrome.storage.local.get("siteList", (data) => {
    const storedSites = data.siteList;

    if (storedSites && Array.isArray(storedSites)) {
      // Check if the URL matches any site in the list
      const matchFound = storedSites.some((siteUrl) => url.includes(siteUrl));
      callback(matchFound);
    } else {
      callback(false);
    }
  });
}
