// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor")

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color
})

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    })
})

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color
    })
}
chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    var url = tabs[0].url
    console.log("当前url:" + url)
    document.getElementById("curUrl").innerHTML = url
})
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == 'queryPrice') {

      return true;  // Will respond asynchronously.
    }
  });
  chrome.runtime.sendMessage(
    {contentScriptQuery: 'queryPrice', itemId: 12345} );

    var url = 'http://121.5.175.153:8080/reTypeList?itemId=' +
    encodeURIComponent(request.itemId);
fetch(url)
    .then(response => console.log(response.text()))
    .then(text =>  console.log(text))
    .catch(error => console.log(error))