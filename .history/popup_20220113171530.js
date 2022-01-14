chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    var url = tabs[0].url
    console.log("当前url:" + url)
    document.getElementById("url").value = url
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
var addTypeBtn = document.getElementById("addType")
addTypeBtn.onclick = function () {
    let typeName = document.getElementById("typeName").value;
    console.log("typeName："+typeName);
    let submitData={}
    submitData.typeName = typeName;
  //  var url = "http://121.5.175.153:8080/reType";
    var url = "http://localhost:8080/reType";
    var options = {
        // 如果后台使用@RequestBody修饰接收参数， content-type 一定不能少，否则会报错
        headers: {
            "content-type": "application/json",
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin,
        body:JSON.stringify(submitData)

    }
    fetch(url, options)
    .then((res) => {
        return res.json()
    })
    .then((response) => {
        console.log(response)
        console.log("addType返回："+response.code);
        alert(response.msg);
        window.close();
    })
    .catch((error) => {
        console.log(error);
        
    });
}
