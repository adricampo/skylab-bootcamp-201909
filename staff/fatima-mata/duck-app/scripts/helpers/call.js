function call(method, url, body, callback) {
    let headers = {}
    // debugger
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (body.token) headers['Authorization'] = `Bearer ${body.token}`

    fetch(method, url, headers, body, function (response) {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText);

            callback(result);
        }
    });
}