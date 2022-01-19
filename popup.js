import Fetcher from "./js/Fetcher.js"
import * as UrlConstant from "./js/UrlConstant.js"

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    var url = tabs[0].url
    console.log("当前url:" + url)
    console.log("当前选项卡：" + tabs[0].title)
    let urlName = tabs[0].title
    document.getElementById("curUrl").value = url
    document.getElementById("urlName").value = urlName
})

Fetcher.getData(UrlConstant.RE_TYPE_LIST_URL).then((data) => {
    console.log("typeList :", data)
    // 显示类型
    let urlType = document.getElementById("urlType")
    data.map((item, index) => {
        return urlType.options.add(new Option(item.typeName, item.id))
    })
})

var addTypeBtn = document.getElementById("addType")
addTypeBtn.onclick = function () {
    let typeName = document.getElementById("typeName").value
    console.log("typeName：" + typeName)
    let submitData = {}
    submitData.typeName = typeName
    var url = "http://121.5.175.153:8080/reType"
    // var url = "http://localhost:8080/reType"
    var options = {
        // 如果后台使用@RequestBody修饰接收参数， content-type 一定不能少，否则会报错
        headers: {
            "content-type": "application/json",
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin,
        body: JSON.stringify(submitData),
    }
    fetch(url, options)
        .then((res) => {
            return res.json()
        })
        .then((response) => {
            console.log(response)
            console.log("addType返回：" + response.code)
            alert(response.msg)
            window.close()
        })
        .catch((error) => {
            console.log(error)
            alert("系统异常")
            window.close()
        })
}

var addUrlBtn = document.getElementById("btn_confirm")
addUrlBtn.onclick = function () {
    let curUrl = document.getElementById("curUrl").value
    console.log("url:" + curUrl)
    // urlType
    let obj = document.getElementById("urlType")
    let index = obj.selectedIndex
    let urlType = obj.options[index].value
    // urlName
    let urlName = document.getElementById("urlName").value
    let submitData = {}
    submitData.type = urlType
    submitData.url = curUrl
    submitData.name = urlName

    var url = "http://121.5.175.153:8080/reUrl"
    // var url = "http://localhost:8080/reUrl"
    var options = {
        // 如果后台使用@RequestBody修饰接收参数， content-type 一定不能少，否则会报错
        headers: {
            "content-type": "application/json",
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin,
        body: JSON.stringify(submitData),
    }
    fetch(url, options)
        .then((res) => {
            return res.json()
        })
        .then((response) => {
            console.log(response)
            console.log("addType返回：" + response.code)
            alert(response.msg)
            window.close()
        })
        .catch((error) => {
            console.log(error)
            alert("系统异常")
            window.close()
        })
}
