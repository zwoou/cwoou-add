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
	  "content-type": "application/json"
	},
	method: "POST", // *GET, POST, PUT, DELETE, etc.
	mode: "cors", // no-cors, cors, *same-origin,
	body: JSON.stringify(paramObj)
  };
————————————————
版权声明：本文为CSDN博主「胖鹅68」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/hbiao68/article/details/103974899

var url = 'http://121.5.175.153:8080/reTypeList';
fetch(url)
    .then(response => console.log(response.text()))
    .then(text =>  console.log(text))
    .catch(error => console.log(error))