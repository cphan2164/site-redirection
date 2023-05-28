document.addEventListener("DOMContentLoaded", function() {
    var websiteInput = document.getElementById("websiteInput");
    var blockButton = document.getElementById("blockButton");
    var statusMessage = document.getElementById("statusMessage");
  
    blockButton.addEventListener("click", function() {
      var website = websiteInput.value.trim();
      if (website !== "") {
        chrome.storage.sync.get({ blockedWebsites: [] }, function(data) {
          var blockedWebsites = data.blockedWebsites;
          blockedWebsites.push(website);
          chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function() {
            statusMessage.textContent = "Website blocked!";
            websiteInput.value = "";
          });
        });
      }
    });
  });
  