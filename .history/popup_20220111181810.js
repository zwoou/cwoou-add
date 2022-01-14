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
// 1
// 2
// 3
fetch(url, options)
    .then((res) => {
        debugger
        console.log(res)
        return res.json()
    })
    .then((response) => {
        debugger
        console.log(response)
        // 显示类型
        let urlType = document.getElementById("urlType")
        response.map((item, index) => {
            return urlType.options.add(new Option(item.typeName, item.id))
        })
    })
    .catch((error) => console.log(error))
