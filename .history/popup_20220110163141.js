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


    var url = 'http://121.5.175.153:8080/reTypeList?itemId=';
fetch(url)
    .then(response => console.log(response.text()))
    .then(text =>  console.log(text))
    .catch(error => console.log(error))