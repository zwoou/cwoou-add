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
var options = {
    // 如果后台使用@RequestBody修饰接收参数， content-type 一定不能少，否则会报错
    headers: {
        "content-type": "application/json",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin,
}

var url = "http://121.5.175.153:8080/reTypeList"
fetch(url, options)
    .then((res) => {
        debugger
        console.log(res)
        return res.json();
    })
    .then((response) => {
        debugger;
        console.log(response);
        // 显示类型
        document.getElementById

    })
    .catch((error) => console.log(error))
