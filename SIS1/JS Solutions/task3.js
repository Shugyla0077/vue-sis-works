var filter = function(arr, fn) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Boolean(fn(arr[i], i))) {
            res.push(arr[i]);
        }
    }
    return res;
};