import Fetcher from "./js/Fetcher.js"
import * as UrlConstant from "./js/UrlConstant.js"

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    if (tabs != null && tabs.length > 0) {
        console.log("tabs:" + tabs[0])
        let { url, title, favIconUrl } = tabs[0]
        console.log("当前url:" + url)
        console.log("当前选项卡：" + title)
        console.log("当前：favIconUrl" + favIconUrl)
        if (url.length > 254) {
            url = url.split("?")[0]
        }
        document.getElementById("curUrl").value = url
        document.getElementById("urlName").value = title
    }
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
    Fetcher.postData(UrlConstant.RE_TYPE_URL, submitData)
        .then((data) => {
            console.log(data)
            console.log("addType返回：" + data.code)
            alert(data.msg)
            window.close()
        })
        .catch((error) => {
            console.log(error)
            alert("系统异常")
            window.close()
        })
}
// 添加
// var addUrlBtn = document.getElementById("btn_confirm")
// addUrlBtn.onclick = function () {
//     let curUrl = document.getElementById("curUrl").value
//     console.log("url:" + curUrl)
//     // urlType
//     let obj = document.getElementById("urlType")
//     let index = obj.selectedIndex
//     let urlType = obj.options[index].value
//     // urlName
//     let urlName = document.getElementById("urlName").value
//     let submitData = {}
//     submitData.type = urlType
//     submitData.url = curUrl
//     submitData.name = urlName

//     Fetcher.postDataTwo(UrlConstant.RE_URL_URL, submitData, addUrlBtn_callBack)
// }
// let addUrlBtn_callBack = (data) => {
//     console.log(data)
//     console.log("addURL返回：" + data.code)
//     alert(data.msg)
//     window.close()
// }

$(document).ready(function(){
    $("#btn_confirm").click(function(){
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
        $.ajax({
            type: "POST",
            url: UrlConstant.RE_URL_URL,
            async:false,
            data: JSON.stringify(submitData),
            contentType: "application/json;charset=utf-8",
            success: function(data,status){
                console.log("addURL返回：" + data.code)
                alert(data.msg)
                window.close()
            },
            error: function(){
                alert("系统错误");
            }
    })



    });



})
