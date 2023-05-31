chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const { url } = details;

  // Check if the requested site needs redirection
  if (shouldRedirect(url)) {
    // Redirect to the Google homepage
    chrome.tabs.update(details.tabId, { url: "https://www.google.com/" });
  }
}, { url: [{ schemes: ["http", "https"] }] });

// Check if a URL needs redirection
function shouldRedirect(url) {
  // Check if the URL belongs to YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return true;
  }

  // For this example, we don't redirect other sites
  return false;
}
