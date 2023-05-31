// Get the form and site list elements
const form = document.getElementById("addSiteForm");
const siteInput = document.getElementById("siteInput");
const siteList = document.getElementById("siteList");

// Listen for the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const siteUrl = siteInput.value.trim();

  if (siteUrl) {
    // Add the site URL to the list
    const listItem = document.createElement("li");
    listItem.textContent = siteUrl;
    siteList.appendChild(listItem);

    // Clear the input field
    siteInput.value = "";

    // Save the updated site list to storage
    saveSiteList();
  }
});

// Load the site list from storage when the popup is opened
chrome.storage.local.get("siteList", (data) => {
  const storedSites = data.siteList;

  if (storedSites && Array.isArray(storedSites)) {
    // Populate the site list from storage
    storedSites.forEach((siteUrl) => {
      const listItem = document.createElement("li");
      listItem.textContent = siteUrl;
      siteList.appendChild(listItem);
    });
  }
});

// Save the site list to storage
function saveSiteList() {
  const siteUrls = Array.from(siteList.children).map((listItem) => listItem.textContent);
  chrome.storage.local.set({ siteList: siteUrls });
}
