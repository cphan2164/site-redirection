// Get the form and site list elements
const form = document.getElementById("addSiteForm");
const siteInput = document.getElementById("siteInput");
const siteList = document.getElementById("siteList");

// Listen for the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const siteUrl = siteInput.value.trim();

  if (siteUrl) {
    // Create a list item
    const listItem = document.createElement("li");

    // Create a span element for the site URL
    const siteUrlSpan = document.createElement("span");
    siteUrlSpan.textContent = siteUrl;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    // Append the site URL and remove button to the list item
    listItem.appendChild(siteUrlSpan);
    listItem.appendChild(removeButton);

    // Append the list item to the site list
    siteList.appendChild(listItem);

    // Clear the input field
    siteInput.value = "";

    // Save the updated site list to storage
    saveSiteList();
  }
});

// Listen for click events on the site list
siteList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    const listItem = target.parentNode;
    listItem.remove();

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
      // Create a list item
      const listItem = document.createElement("li");

      // Create a span element for the site URL
      const siteUrlSpan = document.createElement("span");
      siteUrlSpan.textContent = siteUrl;

      // Create a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";

      // Append the site URL and remove button to the list item
      listItem.appendChild(siteUrlSpan);
      listItem.appendChild(removeButton);

      // Append the list item to the site list
      siteList.appendChild(listItem);
    });
  }
});

// Save the site list to storage
function saveSiteList() {
  const siteUrls = Array.from(siteList.children).map((listItem) => {
    const siteUrlSpan = listItem.querySelector("span");
    return siteUrlSpan.textContent;
  });
  chrome.storage.local.set({ siteList: siteUrls });
}
