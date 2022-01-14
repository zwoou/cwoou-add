function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((res) => {
        console.log(res)
        return res.json()
    })
    .then((data) => {
        debugger
        console.log(response)
        // 显示类型
        let urlType = document.getElementById("urlType")
        response.map((item, index) => {
            return urlType.options.add(new Option(item.typeName, item.id))
        })
    })
    .catch((error) => console.log(error))
}
