document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("blockedWebsites", (data) => {
    const blockedWebsites = data.blockedWebsites;
    const blockedList = document.getElementById("blockedList");

    blockedWebsites.forEach((website) => {
      const listItem = document.createElement("li");
      listItem.textContent = website;
      blockedList.appendChild(listItem);
    });
  });
});
